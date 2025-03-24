class Model {
    constructor() {
        this.ActionMap = Object.freeze({
            REMOTE: "remote",
            SURFING: "surfing",
            INFORMATION: "information",
            CONFIG: "config",
            STATUS: "status",
        });
        this.pattern_array = []
        this.data_time = 0
        this.search_array = []
    }

    get_config_data(view_class) {
        const pattern_data = view_class.data_pattern.querySelectorAll("[data-pattern]");
        const pattern_array = [];
        pattern_data.forEach((element) => {
            const pattern_value = element.getAttribute("data-pattern");
            pattern_array.push(pattern_value);
        });

        const data_time_value = view_class.data_time.getAttribute("data-time");

        const search_data = view_class.data_search.querySelectorAll("[data-search]");
        const search_array = [];
        search_data.forEach((element) => {
            const search_value = element.getAttribute("data-search");
            search_array.push(JSON.parse(search_value));
        });
        return [pattern_array, data_time_value, search_array];
    }
}

export default Model;