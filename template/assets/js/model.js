class Model {
    constructor() {
        this.ActionMap = Object.freeze({
            REMOTE: "remote",
            SURFING: "surfing",
            INFORMATION: "information",
            CONFIG: "config",
            STATUS: "status",
        });
        this.pattern_array = [];
        this.data_time = 0;
        this.data_title = {feature: null, typ:null};
        this.data_description = {feature: null, typ:null};
        this.data_location = {feature: null, typ:null};
        this.data_content = {feature: null, typ:null};
        this.data_email = {feature: null, typ:null};
    }

    get_config_data(view_class) {
        const pattern_data = view_class.data_pattern.querySelectorAll("[data-pattern]");
        const pattern_array = [];
        pattern_data.forEach((element) => {
            const pattern_value = element.getAttribute("data-pattern");
            pattern_array.push(pattern_value);
        });        
        return [pattern_array, this.data_time, this.data_title, this.data_description, this.data_location, this.data_content, this.data_email];
    }
}

export default Model;