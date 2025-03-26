import Model from './model.js';
import View from './view.js';

const Presenter = (() => {
    const model_class = new Model()
    let bot_ws;
    let view_class;

    async function init() {
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
                    //console.log(json_data);
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

        function update_pattern(){
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
        }

        view_class.bind_bot_pattern((event) => { //listener pattern
            event.preventDefault();
            update_pattern();
        });

        view_class.bind_bot_time(() => {
            if(check_connection()){
                upload_config();
            }
        });

        view_class.bind_bot_title(() => {
            if(check_connection()){
                upload_config();
            }
        });

        view_class.bind_bot_description(() => {
            if(check_connection()){
                upload_config();
            }
        });

        view_class.bind_bot_location(() => {
            if(check_connection()){
                upload_config();
            }
        });

        view_class.bind_bot_content(() => {
            if(check_connection()){
                upload_config();
            }
        });

        view_class.bind_bot_email(() => {
            if(check_connection()){
                upload_config();
            }
        });
        
        setTimeout(function() {
            update_pattern();
            upload_config();
        }, 500);
    }

    const check_connection = () => {
        if (bot_ws.readyState === WebSocket.OPEN) {
            return true;
        }
        view_class.notification("Server: 500");
        return false
    }

    const send_to_server = (data, action) =>{
        //console.log(data, action);
        if (check_connection()) {
            bot_ws.send(JSON.stringify({data: data, action: action}));
        }else{
            console.log("ws error");
        }
    }

    const upload_config = () => {
        model_class.data_time = view_class.input_time.value;
        model_class.data_title.feature = view_class.input_title_search.value;
        model_class.data_title.typ = view_class.input_search_title_typ.value;
        model_class.data_description.feature = view_class.input_description_search.value;
        model_class.data_description.typ = view_class.input_search_description_typ.value;
        model_class.data_location.feature = view_class.input_location_search.value;
        model_class.data_location.typ = view_class.input_search_location_typ.value;
        model_class.data_content.feature = view_class.input_content_search.value;
        model_class.data_content.typ = view_class.input_search_content_typ.value;
        model_class.data_email.feature = view_class.input_email_search.value;
        model_class.data_email.typ = view_class.input_search_email_typ.value;
        const [pattern_array, data_time_value, data_title_value, data_description_value, data_location_value, data_content_value, data_email_value] = model_class.get_config_data(view_class);
        send_to_server({data_pattern: pattern_array, data_time:  data_time_value, data_title: data_title_value, data_description: data_description_value, data_location: data_location_value, data_content: data_content_value, data_email: data_email_value}, model_class.ActionMap.CONFIG);
    }
    
    return {init};
})();

export default Presenter;