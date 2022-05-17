import elements from "./elements.js";

export default {
    start() {
        elements.get.call(this);
        elements.actions.call(this);
        elements.arraySelectOption.call(this);
    }
}
