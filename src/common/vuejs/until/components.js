Vue.options['components'] = Object.create(null);

Vue.component = function(id, definition) {
    if (!definition) {
        return this.options['components'][id];
    } else {
        if(isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = Vue.extend(definition);
        }
        this.options['components'][id] = definition;
        return definition;
    }
}