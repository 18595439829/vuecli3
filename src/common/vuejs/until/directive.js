Vue.options = Object.create(null);
Vue.options['directives'] = Object.create(null);
Vue.directive = function(id, definition) {
    if (!definition) {
        return this.options['directives'][id];
    } else {
        if (typeof definition === 'function') {
            definition = {bind: definition, update: definition};
        }
        this.options['directives'][id] = definition;
        return definition;
    }
}