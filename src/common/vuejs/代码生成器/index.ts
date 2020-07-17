interface ASTElement {
    key: string,
    ref: string,
    pre: boolean,
}
interface CodegenState {}
function genData(el: ASTElement, state: CodegenState): string {
    let data = '{'
    // key 
    if (el.key) {
        data += `key:${el.key},`
    }
    // ref
    if(el.ref) {
        data += `ref:${el.ref}`
    }
    // pre
    if (el.pre) {
        data += `pre: true`
    }
    // 类似的还有很多情况
    data = data.replace(/,$/, '') + '}'
    return data;
}