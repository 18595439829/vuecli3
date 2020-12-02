Vue.use = function(plugin) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
        return this;
    }
    // 其他参数
    const argus = toArray(arguments, 1);
    argus.unshift(this);
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, argus);
    } else if (typeof plugin === 'function') {
        plugin.apply(null, argus);
    }
    installedPlugins.push(plugin);
    return this;
}