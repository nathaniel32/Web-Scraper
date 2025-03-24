import Model from './model.js';
import View from './view.js';

const Presenter = (() => {
    const model_class = new Model()
    let bot_ws;
    let view_class;

    function init() {
        bot_ws = new WebSocket("/bot_ws");
        bot_ws.onopen = () => {
            view_class.notification("connection established");
        };

        bot_ws.onmessage = function(event) {
            const json_data = JSON.parse(event.data);
            const action = json_data.action;
            const message = json_data.message
            const data = json_data.data;

            view_class.notification(message);
            
            switch (action) {
                case model_class.ActionMap.REMOTE:
                    view_class.bot_remote.checked = data;
                    break;

                case model_class.ActionMap.SURFING:
                    view_class.update_surfing_info(data);
                    break;

                case model_class.ActionMap.INFORMATION:
                    view_class.update_information(data);
                    break;

                case model_class.ActionMap.CONFIG:
                    console.log(json_data);
                    break;

                case model_class.ActionMap.STATUS:
                    view_class.update_status(data);
                    break;

                default:
                    view_class.notification("Unknown action:", action);
                    break;
            }
        };

        view_class = new View();

        view_class.bind_bot_surfing((event) => { //listener surfing form
            event.preventDefault();
            send_to_server({url: view_class.bot_surfing_url.value, force: true}, model_class.ActionMap.SURFING);
        });

        view_class.bind_bot_remote(() => { //listener remote
            send_to_server(null, model_class.ActionMap.REMOTE);
        });

        view_class.bind_bot_pattern((event) => { //listener pattern
            event.preventDefault();
            if(check_connection()){
                const pattern_container = document.createElement("div");
                const pattern_text = document.createElement("span");
                const pattern_button = document.createElement("button");
                pattern_container.setAttribute("data-pattern", view_class.input_pattern.value);
                pattern_text.textContent = view_class.input_pattern.value;
                pattern_button.textContent = "delete";
                pattern_container.append(pattern_text);
                pattern_container.append(pattern_button);
                view_class.data_pattern.append(pattern_container);
                pattern_button.onclick = ()=>{
                    if(check_connection()){
                        pattern_container.remove();
                        upload_config();
                    }
                };
                upload_config();
                view_class.input_pattern.value = null;
            }
        });

        view_class.bind_bot_time((event) => {
            event.preventDefault();
            if(check_connection()){
                view_class.data_time.textContent = view_class.input_time.value;
                view_class.data_time.setAttribute("data-time", view_class.input_time.value);
                upload_config();
                view_class.input_time.value = null;
            }
        });

        view_class.bind_bot_search((event) => {
            event.preventDefault();
            if(check_connection()){
                const search_container = document.createElement("div");
                const search_text = document.createElement("span");
                const search_typ_text = document.createElement("span");
                const search_typ_category = document.createElement("span");
                const search_button = document.createElement("button");
                search_container.setAttribute("data-search", JSON.stringify({search: view_class.input_search.value, typ: view_class.input_search_typ.value, category: view_class.input_search_category.value}));
                search_text.textContent = view_class.input_search.value;
                search_typ_text.textContent = view_class.input_search_typ.value;
                search_typ_category.textContent = view_class.input_search_category.value;
                search_button.textContent = "delete";
                search_container.append(search_text);
                search_container.append(search_typ_text);
                search_container.append(search_typ_category);
                search_container.append(search_button);
                view_class.data_search.append(search_container);
                search_button.onclick = ()=>{
                    if(check_connection()){
                        search_container.remove();
                        upload_config();
                    }
                };
                upload_config();
                view_class.input_search.value = null;
                view_class.input_search_typ.value = "";
            }
        });
    }

    const check_connection = () => {
        if (bot_ws.readyState === WebSocket.OPEN) {
            return true;
        }
        view_class.notification("Server: 500");
        return false
    }

    const send_to_server = (data, action) =>{
        if (check_connection()) {
            bot_ws.send(JSON.stringify({data: data, action: action}));
        }
    }

    const upload_config = () => { //TODO
        const [pattern_array, data_time_value, search_array] = model_class.get_config_data(view_class);
        send_to_server({data_pattern: pattern_array, data_time:  data_time_value, data_search: search_array}, model_class.ActionMap.CONFIG);
    }
    
    return {init};
})();

export default Presenter;