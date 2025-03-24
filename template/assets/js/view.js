class View {
    constructor() {
        this.bot_surfing = null;
        this.bot_surfing_url = "url";
        this.bot_remote = null;

        this.data_pattern = null;
        this.form_pattern = null;
        this.input_pattern = null;

        this.data_time = null;
        this.form_time = null;
        this.input_time = null;

        this.data_search = null;
        this.form_search = null;
        this.input_search = null;
        this.input_search_typ = null;
        this.input_search_category = null;

        this.notification_info_value = null;
        this.bot_online_value = null;
        this.total_page_value = null;
        this.url_status_value = null;
        this.url_index_status_value = null;
        this.rest_status_value = null;
        this.url_surfing_info_value = null;
        this.data_surfing_info_value_container = null;
        this.template();
    }

    template() {
        const app = document.getElementById('app');
        app.textContent = "";

        //notification
        const notificationSection = document.createElement('section');
        notificationSection.id = 'info_surfing';
        
        const notificationTitle = document.createElement('h2');
        notificationTitle.textContent = 'Notification';
        notificationSection.appendChild(notificationTitle);

        const notificationInfo = document.createElement('span');
        notificationInfo.textContent = 'Notif:';
        notificationSection.appendChild(notificationInfo);
        const notificationInfoValue = document.createElement('span');
        this.notification_info_value = notificationInfoValue;
        notificationSection.appendChild(notificationInfoValue);

        app.appendChild(notificationSection);

        // Information
        const informationSection = document.createElement('section');
        informationSection.id = 'information';

        const informationTitle = document.createElement('h2');
        informationTitle.textContent = 'Information';
        informationSection.appendChild(informationTitle);

        const botOnlineContainer = document.createElement('div');
        const botOnline = document.createElement('span');
        botOnline.textContent = 'Online:';
        botOnlineContainer.appendChild(botOnline);
        const botOnlineValue = document.createElement('span');
        this.bot_online_value = botOnlineValue;
        botOnlineContainer.appendChild(botOnlineValue);
        informationSection.appendChild(botOnlineContainer);

        const totalPageContainer = document.createElement('div');
        const totalPage = document.createElement('span');
        totalPage.textContent = 'Page:';
        totalPageContainer.appendChild(totalPage);
        const totalPageValue = document.createElement('span');
        this.total_page_value = totalPageValue;
        totalPageContainer.appendChild(totalPageValue);
        informationSection.appendChild(totalPageContainer);

        app.appendChild(informationSection);

        // Status
        const statusSection = document.createElement('section');
        informationSection.id = 'status';
        
        const statusTitle = document.createElement('h2');
        statusTitle.textContent = 'Status';
        statusSection.appendChild(statusTitle);

        const urlStatusContainer = document.createElement('div');
        const urlStatus = document.createElement('span');
        urlStatus.textContent = 'Url:';
        urlStatusContainer.appendChild(urlStatus);
        const urlStatusValue = document.createElement('span');
        this.url_status_value = urlStatusValue;
        urlStatusContainer.appendChild(urlStatusValue);
        statusSection.appendChild(urlStatusContainer);

        const urlIndexStatusContainer = document.createElement('div');
        const urlIndexStatus = document.createElement('span');
        urlIndexStatus.textContent = 'Index:';
        urlIndexStatusContainer.appendChild(urlIndexStatus);
        const urlIndexStatusValue = document.createElement('span');
        this.url_index_status_value = urlIndexStatusValue;
        urlIndexStatusContainer.appendChild(urlIndexStatusValue);
        statusSection.appendChild(urlIndexStatusContainer);

        const restStatusContainer = document.createElement('div');
        const restStatus = document.createElement('span');
        restStatus.textContent = 'Rest:';
        restStatusContainer.appendChild(restStatus);
        const restStatusValue = document.createElement('span');
        this.rest_status_value = restStatusValue;
        restStatusContainer.appendChild(restStatusValue);
        statusSection.appendChild(restStatusContainer);

        app.appendChild(statusSection);

        //Surfing Info
        const surfingInfoSection = document.createElement('section');
        surfingInfoSection.id = 'info_surfing';
        
        const surfingInfoTitle = document.createElement('h2');
        surfingInfoTitle.textContent = 'Surfing Info';
        surfingInfoSection.appendChild(surfingInfoTitle);

        const urlSurfingInfoContainer = document.createElement('div');
        const urlSurfingInfo = document.createElement('span');
        urlSurfingInfo.textContent = 'URL:';
        urlSurfingInfoContainer.appendChild(urlSurfingInfo);
        const urlSurfingInfoValue = document.createElement('span');
        this.url_surfing_info_value = urlSurfingInfoValue;
        urlSurfingInfoContainer.appendChild(urlSurfingInfoValue);
        surfingInfoSection.appendChild(urlSurfingInfoContainer);

        const dataSurfingInfoContainer = document.createElement('div');
        const dataSurfingInfo = document.createElement('span');
        dataSurfingInfo.textContent = 'Data:';
        dataSurfingInfoContainer.appendChild(dataSurfingInfo);
        const dataSurfingInfoValueContainer = document.createElement('div');
        this.data_surfing_info_value_container = dataSurfingInfoValueContainer;
        dataSurfingInfoContainer.appendChild(dataSurfingInfoValueContainer);
        surfingInfoSection.appendChild(dataSurfingInfoContainer);

        app.appendChild(surfingInfoSection);
        
        // Bot Surfing
        const botSurfingSection = document.createElement('section');
        botSurfingSection.id = 'bot_surfing';

        const botSurfingTitle = document.createElement('h2');
        botSurfingTitle.textContent = 'Surfing';
        botSurfingSection.appendChild(botSurfingTitle);

        const botSurfingForm = document.createElement('form');
        this.bot_surfing = botSurfingForm;
        botSurfingForm.id = 'form_url';

        const urlLabel = document.createElement('label');
        urlLabel.setAttribute('for', 'url');
        urlLabel.textContent = 'URL:';
        botSurfingForm.appendChild(urlLabel);

        const urlInput = document.createElement('input');
        this.bot_surfing_url = urlInput;
        urlInput.type = 'url';
        urlInput.name = 'url';
        urlInput.id = 'url';
        urlInput.required = true;
        botSurfingForm.appendChild(urlInput);

        const urlSubmit = document.createElement('button');
        urlSubmit.type = 'submit';
        urlSubmit.textContent = 'Submit';
        botSurfingForm.appendChild(urlSubmit);

        botSurfingSection.appendChild(botSurfingForm);
        app.appendChild(botSurfingSection);

        // Config
        const configSection = document.createElement('section');
        configSection.id = 'config';

        const configTitle = document.createElement('h2');
        configTitle.textContent = 'Config';
        configSection.appendChild(configTitle);

        // Pattern
        const patternSection = document.createElement('div');
        patternSection.classList.add('config-section');

        const patternTitle = document.createElement('h3');
        patternTitle.textContent = 'Pattern';
        patternSection.appendChild(patternTitle);

        const dataPatternDiv = document.createElement('div');
        this.data_pattern = dataPatternDiv;
        dataPatternDiv.id = 'data_pattern';
        patternSection.appendChild(dataPatternDiv);

        const patternForm = document.createElement('form');
        this.form_pattern = patternForm;
        patternForm.id = 'form_pattern';

        const patternLabel = document.createElement('label');
        patternLabel.setAttribute('for', 'pattern');
        patternLabel.textContent = 'Pattern:';
        patternForm.appendChild(patternLabel);

        const patternInput = document.createElement('input');
        this.input_pattern = patternInput;
        patternInput.type = 'text';
        patternInput.name = 'pattern';
        patternInput.id = 'pattern';
        patternInput.required = true;
        patternForm.appendChild(patternInput);

        const patternSubmit = document.createElement('button');
        patternSubmit.type = 'submit';
        patternSubmit.textContent = 'Submit';
        patternForm.appendChild(patternSubmit);

        patternSection.appendChild(patternForm);
        configSection.appendChild(patternSection);

        // Time
        const timeSection = document.createElement('div');
        timeSection.classList.add('config-section');

        const timeTitle = document.createElement('h3');
        timeTitle.textContent = 'Time';
        timeSection.appendChild(timeTitle);

        const dataTimeDiv = document.createElement('div');
        this.data_time = dataTimeDiv;
        dataTimeDiv.id = 'data_time';
        timeSection.appendChild(dataTimeDiv);

        const timeForm = document.createElement('form');
        this.form_time = timeForm;
        timeForm.id = 'form_time';

        const timeLabel = document.createElement('label');
        timeLabel.setAttribute('for', 'time');
        timeLabel.textContent = 'Time:';
        timeForm.appendChild(timeLabel);

        const timeInput = document.createElement('input');
        this.input_time = timeInput;
        timeInput.type = 'number';
        timeInput.name = 'time';
        timeInput.id = 'time';
        timeInput.required = true;
        timeForm.appendChild(timeInput);

        const timeSubmit = document.createElement('button');
        timeSubmit.type = 'submit';
        timeSubmit.textContent = 'Submit';
        timeForm.appendChild(timeSubmit);

        timeSection.appendChild(timeForm);
        configSection.appendChild(timeSection);

        // Search Data
        const searchSection = document.createElement('div');
        searchSection.classList.add('config-section');

        const searchTitle = document.createElement('h3');
        searchTitle.textContent = 'Search Data';
        searchSection.appendChild(searchTitle);

        const dataSearchDiv = document.createElement('div');
        this.data_search = dataSearchDiv;
        dataSearchDiv.id = 'data_search';
        searchSection.appendChild(dataSearchDiv);

        const searchForm = document.createElement('form');
        this.form_search = searchForm;
        searchForm.id = 'form_search';

        const searchLabel = document.createElement('label');
        searchLabel.setAttribute('for', 'search');
        searchLabel.textContent = 'Search:';
        searchForm.appendChild(searchLabel);

        const searchInput = document.createElement('input');
        this.input_search = searchInput;
        searchInput.type = 'text';
        searchInput.name = 'search';
        searchInput.id = 'search';
        searchInput.required = true;
        searchForm.appendChild(searchInput);

        const searchTypLabel = document.createElement('label');
        searchTypLabel.setAttribute('for', 'search_typ');
        searchTypLabel.textContent = 'Type:';
        searchForm.appendChild(searchTypLabel);

        const searchTypSelect = document.createElement('select');
        this.input_search_typ = searchTypSelect;
        searchTypSelect.name = 'search_typ';
        searchTypSelect.id = 'search_typ';
        searchTypSelect.required = true;
        const option1 = document.createElement('option');
        option1.value = '1';
        option1.textContent = 'TAG_NAME';
        searchTypSelect.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = '2';
        option2.textContent = 'CSS_SELECTOR';
        searchTypSelect.appendChild(option2);
        searchForm.appendChild(searchTypSelect);

        const searchCategoryLabel = document.createElement('label');
        searchCategoryLabel.setAttribute('for', 'search_category');
        searchCategoryLabel.textContent = 'Category:';
        searchForm.appendChild(searchCategoryLabel);

        const searchCategoryInput = document.createElement('input');
        this.input_search_category = searchCategoryInput;
        searchCategoryInput.type = 'text';
        searchCategoryInput.name = 'search_category';
        searchCategoryInput.id = 'search_category';
        searchCategoryInput.required = true;
        searchForm.appendChild(searchCategoryInput);

        const searchSubmit = document.createElement('button');
        searchSubmit.type = 'submit';
        searchSubmit.textContent = 'Submit';
        searchForm.appendChild(searchSubmit);

        searchSection.appendChild(searchForm);
        configSection.appendChild(searchSection);

        app.appendChild(configSection);

        // Worker
        const workerSection = document.createElement('section');
        workerSection.id = 'worker';

        const workerTitle = document.createElement('h2');
        workerTitle.textContent = 'Worker';
        workerSection.appendChild(workerTitle);

        const workerCheckboxLabel = document.createElement('label');
        workerCheckboxLabel.setAttribute('for', 'bot_remote');
        workerCheckboxLabel.textContent = 'On/Off';
        workerSection.appendChild(workerCheckboxLabel);

        const workerCheckbox = document.createElement('input');
        this.bot_remote = workerCheckbox;
        workerCheckbox.type = 'checkbox';
        workerCheckbox.id = 'bot_remote';
        workerSection.appendChild(workerCheckbox);

        app.appendChild(workerSection);
    }

    notification(message) {
        this.notification_info_value.textContent = message;
        setTimeout(() => {
            this.notification_info_value.textContent = null;
        }, 3000);
    }

    bind_bot_surfing(handler) {
        this.bot_surfing.addEventListener("submit", handler);
    }

    bind_bot_remote(handler) {
        this.bot_remote.addEventListener("change", handler);
    }

    bind_bot_pattern(handler) {
        this.form_pattern.addEventListener("submit", handler);
    }

    bind_bot_time(handler) {
        this.form_time.addEventListener("submit", handler);
    }

    bind_bot_search(handler) {
        this.form_search.addEventListener("submit", handler);
    }

    update_information(data) {
        this.bot_online_value.textContent = data.active_bots;
        this.total_page_value.textContent = data.total_global_page;
    }

    update_status(data) {
        this.url_status_value.textContent = data.url.length;
        this.url_index_status_value.textContent = data.url_index;
        this.rest_status_value.textContent = this.url_status_value.textContent - this.url_index_status_value.textContent;
    }

    update_surfing_info(data) {
        this.data_surfing_info_value_container.innerHTML = null;
        this.url_surfing_info_value.textContent = data.url;
        data.data_search.forEach(element => {
            const category = document.createElement("div");
            const data = document.createElement("div");
            category.innerHTML = `<b>Category:</b> `;
            category.appendChild(document.createTextNode(element.category));
            data.innerHTML = `<b>Data:</b> `;
            data.appendChild(document.createTextNode(element.data));
            this.data_surfing_info_value_container.appendChild(category);
            this.data_surfing_info_value_container.appendChild(data);
        });
    }
}

export default View;








/* const View = (() => {
    let bot_surfing;
    let bot_surfing_url;
    let bot_remote;

    function init(){
        template()
    }

    function get_bot_surfing_url(){
        return bot_surfing_url; //gk bisa mendapatkan data real time tanpa fungsi
    }

    function template() {
        const app = document.getElementById('app');
        app.textContent = "";
        
        //Bot Surfing
        const botSurfingSection = document.createElement('section');
        botSurfingSection.id = 'bot_surfing';

        ...

        app.appendChild(workerSection);
    }

    function notification(message){
        console.log(message);
    }
    
    function bind_bot_surfing(handler) {
        bot_surfing.addEventListener("submit", handler);
    }

    function bind_bot_remote(handler) {
        bot_remote.addEventListener("change", handler);
    }

    return {
        bot_surfing_url, //tidak berguna karena tidak realtime
        get_bot_surfing_url,
        init,
        notification,
        bind_bot_surfing,
        bind_bot_remote,
    };
})();

export default View; */