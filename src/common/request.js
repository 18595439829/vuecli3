import axios from 'axios'

let httpList = []

const httpCollect = (http) => {
    httpList.push(http)
}

const httpSubmit = () => {
    if (httpList.length) {
        httpList[0].then()
    }
}

export {
    httpCollect
}