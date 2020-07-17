export default class Stack {
    constructor () {
        this.arr = [];
    }
    push(item) {
        this.arr.push(item);
    }
    remove() {
        this.arr.pop();
    }
    get() {
        return this.arr;
    }
}