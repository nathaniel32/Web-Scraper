class View {
    constructor() {
        this.bot_surfing = null;
        this.bot_surfing_url = "url";
        this.bot_remote = null;

        this.data_pattern = null;
        this.form_pattern = null;
        this.input_pattern = null;

        this.form_time = null;
        this.input_time = null;

        this.form_title_search = null;
        this.input_title_search = null;
        this.input_search_title_typ = null;

        this.form_description_search = null;
        this.input_description_search = null;
        this.input_search_description_typ = null;

        this.form_location_search = null;
        this.input_location_search = null;
        this.input_search_location_typ = null;

        this.form_content_search = null;
        this.input_content_search = null;
        this.input_search_content_typ = null;

        this.form_email_search = null;
        this.input_email_search = null;
        this.input_search_email_typ = null;

        this.notification_info_value = null;
        this.bot_online_value = null;
        this.total_page_value = null;
        this.url_status_value = null;
        this.url_index_status_value = null;
        this.rest_status_value = null;
        this.tbody_data_table = null;
        this.template();
    }
    search_template(container, form_id, search_id, search_name) {
        const search_typ_id = `typ_${search_id}`;
        const searchForm = document.createElement('form');
        searchForm.id = form_id;

        const searchLabel = document.createElement('label');
        searchLabel.setAttribute('for', search_id);
        searchLabel.textContent = `${search_name}:`;
        searchForm.appendChild(searchLabel);

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.name = search_id;
        searchInput.id = search_id;
        searchInput.required = true;
        searchForm.appendChild(searchInput);

        const searchTypLabel = document.createElement('label');
        searchTypLabel.setAttribute('for', search_typ_id);
        searchTypLabel.textContent = 'Type:';
        searchForm.appendChild(searchTypLabel);

        const searchTypSelect = document.createElement('select');
        searchTypSelect.name = search_typ_id;
        searchTypSelect.id = search_typ_id;
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

        container.appendChild(searchForm);
        const hr = document.createElement("hr");
        hr.style.marginTop = "10px";
        hr.style.border = "3px solid black";
        container.appendChild(hr);
        return [searchForm, searchInput, searchTypSelect];
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
        patternLabel.textContent = 'Pattern: https?://[^\s]+';
        patternForm.appendChild(patternLabel);

        const patternInput = document.createElement('input');
        patternInput.value = "https://www.linkedin.com/in/(?!AC)[^/?#]+";
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

        const timeForm = document.createElement('form');
        this.form_time = timeForm;
        timeForm.id = 'form_time';

        const timeLabel = document.createElement('label');
        timeLabel.setAttribute('for', 'time');
        timeLabel.textContent = 'Time:';
        timeForm.appendChild(timeLabel);

        const timeInput = document.createElement('input');
        timeInput.value = 5;
        this.input_time = timeInput;
        timeInput.type = 'number';
        timeInput.name = 'time';
        timeInput.id = 'time';
        timeInput.required = true;
        timeForm.appendChild(timeInput);

        timeSection.appendChild(timeForm);
        configSection.appendChild(timeSection);

        // Search Data
        const searchSection = document.createElement('div');
        searchSection.classList.add('config-section');

        const searchTitle = document.createElement('h3');
        searchTitle.textContent = 'Search Data';
        searchSection.appendChild(searchTitle);

        //---------------------------------------------------------------------
        [this.form_title_search, this.input_title_search, this.input_search_title_typ] = this.search_template(searchSection, "form_search_title", "input_search_title", "Title");
        [this.form_description_search, this.input_description_search, this.input_search_description_typ] = this.search_template(searchSection, "form_search_description", "input_search_description", "Description");
        [this.form_location_search, this.input_location_search, this.input_search_location_typ] = this.search_template(searchSection, "form_search_location", "input_search_location", "Location");
        [this.form_content_search, this.input_content_search, this.input_search_content_typ] = this.search_template(searchSection, "form_search_content", "input_search_content", "Content");
        [this.form_email_search, this.input_email_search, this.input_search_email_typ] = this.search_template(searchSection, "form_search_email", "input_search_email", "Email");
        //---------------------------------------------------------------------
        this.input_title_search.value = "h1";
        this.input_search_title_typ.value = "1";

        this.input_description_search.value = ".text-body-medium.break-words";
        this.input_search_description_typ.value = "2";

        this.input_location_search.value = ".text-body-small.inline.t-black--light.break-words";
        this.input_search_location_typ.value = "2";
        
        this.input_content_search.value = ".display-flex.ph5.pv3";
        this.input_search_content_typ.value = "2";

        this.input_email_search.value = ".display-flex.ph5.pv3";
        this.input_search_email_typ.value = "2";

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

        const table = document.createElement("table");
        table.id = "data_table";

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");

        ["URL", "Username", "Description",  "Location", "Content", "Email"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            trHead.appendChild(th);
        });

        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        this.tbody_data_table = tbody;
        table.appendChild(tbody);

        app.appendChild(table);
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
        this.form_time.addEventListener("change", handler);
    }

    bind_bot_title(handler) {
        this.form_title_search.addEventListener("change", handler);
    }

    bind_bot_description(handler) {
        this.form_description_search.addEventListener("change", handler);
    }

    bind_bot_location(handler) {
        this.form_location_search.addEventListener("change", handler);
    }

    bind_bot_content(handler) {
        this.form_content_search.addEventListener("change", handler);
    }

    bind_bot_email(handler) {
        this.form_email_search.addEventListener("change", handler);
    }

    update_information(data) {
        this.bot_online_value.textContent = data.active_bots;
        this.total_page_value.textContent = data.total_global_page;
    }

    update_status(data) {
        //console.log(data)
        this.url_status_value.textContent = data.url;
        this.url_index_status_value.textContent = data.url_index;
        this.rest_status_value.textContent = this.url_status_value.textContent - this.url_index_status_value.textContent;
    }

    update_surfing_info(data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="${data.url}">${data.url}</a></td>
            <td>${data.title}</td>
            <td>${data.description}</td>
            <td>${data.location}</td>
            <td>${data.content}</td>
            <td>${data.email}</td>
        `;
        this.tbody_data_table.prepend(row);
    }
}

export default View;