import $ from 'jquery'
import home from './home'
import 'jquery'
export default {
  conlog(i, j) {
    console.log('honeChild', home.data.num += 222)
    let a = $('.iptsDiv')
    if (home.data.num > 500) {
      a.css('color', 'red')
      console.log(20 + i * 120, a)
      a.animate(
        { top: 20 + i * 120, left: 20 + j * 120},
        2000
      )
    }
    console.log('点击外部js按钮',home.data.num,a)
  }
}