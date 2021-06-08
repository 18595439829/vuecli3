const diffVersion = (newV, oldV) => {
    let newArr = newV.split('.').map(item => Number(item));
    let oldArr = oldV.split('.').map(item => Number(item));
    let result;
    for(let i = 0; i < newArr.length; i ++) {
        if ((newArr[i] || oldArr[i] === 0) && (oldArr[i] || oldArr[i] === 0)) {
            if (newArr[i] > oldArr[i]) {
                result = 1;
                break
            } else if (newArr[i] < oldArr[i]) {
                result = -1;
                break
            } else {
                result = 0
            }
        } else if ((newArr[i] || oldArr[i] === 0) && !(oldArr[i] || oldArr[i] === 0)) {
            let otherArr = newArr.slice(i)
            if (otherArr.some(item => item)) {
                result = 1;
            }
            break
        } else if (!(newArr[i] || oldArr[i] === 0) && (oldArr[i] || oldArr[i] === 0)) {
            let otherArr = oldArr.slice(i)
            if (otherArr.some(item => item)) {
                result = -1;
            }
            break
        }
    }
    return result
}

console.log(diffVersion('0.1.0', '0.1.0'))
console.log(diffVersion('1.1.0', '0.1.0'))
console.log(diffVersion('0.1.0', '1.1.0'))
console.log(diffVersion('0.1.0.0', '0.1.0'))
console.log(diffVersion('1.1.0,', '0.1.0.1'))
console.log(diffVersion('0.1.0', '1.1.0.0'))