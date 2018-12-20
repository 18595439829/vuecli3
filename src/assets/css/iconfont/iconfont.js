!(function(d) {
  var e,
    a =
      '<svg><symbol id="icon-kongxian" viewBox="0 0 1024 1024"><path d="M512 0C229.22752 0 0 229.22752 0 512s229.22752 512 512 512 512-229.22752 512-512S794.77248 0 512 0z m251.9296 755.75808c-19.09248 19.84-40.63744 35.456-67.34336 43.53024-20.06528 6.06208-40.1152 6.13888-60.54912 3.0976-68.8384-10.13248-128.49152-41.14432-182.96832-82.45248-66.46272-50.3296-123.53024-109.98784-170.75712-178.82112-22.72256-33.08544-40.04352-68.91008-47.14496-108.80512-7.10656-39.74656-6.144-78.8992 12.50816-115.98336 9.92256-19.7632 24.27904-35.89632 41.37984-49.43872 14.58176-11.5456 36.26496-10.43968 49.5104 2.59072a6003.87584 6003.87584 0 0 1 86.82496 86.74304c15.54432 15.91808 14.3616 38.71232-2.00192 55.58272-13.02016 13.47584-26.42432 26.5728-39.66976 39.75168-1.92512 1.92-3.99872 3.62496-5.70368 5.10976 43.74528 91.3408 110.65856 158.54592 202.06592 202.28608 14.14144-14.13632 28.86656-27.97568 42.56256-42.85952 16.64512-18.05312 44.70272-19.75296 63.1296-0.06656 25.2416 26.93632 52.03456 52.47488 78.16192 78.67904 19.16928 19.24096 18.87744 41.51808-0.00512 61.056zM669.01504 491.52h-117.76a39.07584 39.07584 0 0 1-27.75552-11.49952C516.39296 472.95488 512 463.2576 512 452.6592V294.8608c0-21.43232 17.42336-38.8608 39.25504-38.8608a39.25504 39.25504 0 0 1 39.24992 38.8608v118.15424h78.51008a39.168 39.168 0 0 1 39.24992 39.24992A39.168 39.168 0 0 1 669.01504 491.52z" fill="#5FB878" ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[
      e.length - 1
    ].getAttribute('data-injectcss')
  if (t && !d.__iconfont__svg__cssinject__) {
    d.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState))
        setTimeout(e, 0)
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e()
        }
        document.addEventListener('DOMContentLoaded', t, !1)
      }
    else
      document.attachEvent &&
        ((n = e),
        (o = d.document),
        (i = !1),
        (c = function() {
          i || ((i = !0), n())
        }),
        (a = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(a, 50)
          }
          c()
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), c())
        }))
    var n, o, i, c, a
  })(function() {
    var e, t, n, o, i, c
    ;((e = document.createElement('div')).innerHTML = a),
      (a = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (c = o.firstChild).parentNode.insertBefore(i, c))
          : o.appendChild(n))
  })
})(window)
