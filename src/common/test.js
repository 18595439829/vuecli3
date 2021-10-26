let asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise')
    }, 1000)
  })
}
let func = async () => {
  let a = await asyncFunc()
  console.log(a)
}
func()