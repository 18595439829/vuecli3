// const identity = _ => _
// const resolveAsset = (options, type ,id, warnMissing ) => {
//     if (typeof id !== 'string' ) {
//         return;
//     }
//     const assets = options[type];
//     // 先检查本地注册的变动
//     if (hasOwn(assets, id)) return assets[id];
//     // 将id格式化为小驼峰
//     const camelizedId = camelize(id)
//     if(hasOwn(assets, camelizedId)) return assets[camelizedId]
//     // 将小驼峰id首字母大写,格式化为大驼峰
//     const PascalCaseId = capitalize(camelizedId)
//     if(hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
//     // 如果还是没有,则检查原型链
//     const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
//     if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
//         warn('Failed to resolve' + type.slice(0, -1) + ':' + id, options)
//     }
//     return res
// }
// export  function resolveFilter (id) {
//     return resolveAsset(this.$option, 'filters', id, true) || identity
// }

// export function parseFilters (exp) {
//     let filters = exp.split('|')
//     let expression = filters.shift().trim();
//     let i 
//     if (filter) {
//         for (let i = 0; i < filters.length; i++) {
//             expression = wrapFilter(expression, filters[i].trim())
//         }
//     }
//     return expression
// }

// function wrapFilter (exp ,filter) {
//     const i = filter.indexOf('(') // 查找传参
//     if(i < 0) {
//         // 过滤器没有参数
//         return `_f('${filter})(${exp})`
//     } else {
//         const name = filter.slice(0 , i)
//         const args = filter.slice(i + 1)
//         return `_f('${name}')(${exp}, ${args}`
//     }
// }

let obj = {
    1234: function (num) {
        console.log(num)
    }
}
obj[1234](1111);
