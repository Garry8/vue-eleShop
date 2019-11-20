!(function (d) {
  var t
  var n = '<svg><symbol id="icon-lvcheng" viewBox="0 0 1024 1024"><path d="M102.4 0h819.2a102.4 102.4 0 0 1 102.4 102.4v716.8H0V102.4A102.4 102.4 0 0 1 102.4 0z" fill="#DBED94" ></path><path d="M522.24 0h30.72L0 624.64v-30.72z" fill="#E5F2B1" ></path><path d="M1024 204.8s-435.46624-78.70464-450.56 307.2c0 0-3.13344 386.9184 450.56 307.2V204.8z" fill="#FFBE50" ></path><path d="M0 757.76h1024v163.84a102.4 102.4 0 0 1-102.4 102.4H102.4A102.4 102.4 0 0 1 0 921.6V757.76z" fill="#BAEBF1" ></path><path d="M0 542.72s319.77472-124.69248 583.68 174.08a557.4144 557.4144 0 0 1 440.32-61.44v102.4H0V542.72z" fill="#BAEBF1" ></path><path d="M286.72 0h194.56L0 542.72V317.44z" fill="#E5F2B1" ></path></symbol></svg>'
  var e = (t = document.getElementsByTagName('script'))[t.length - 1].getAttribute('data-injectcss')
  if (e && !d.__iconfont__svg__cssinject__) {
    d.__iconfont__svg__cssinject__ = !0
    try {
      document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>')
    } catch (t) {
      console && console.log(t)
    }
  }!(function (t) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(t, 0)
      else {
        var e = function () {
          document.removeEventListener('DOMContentLoaded', e, !1), t()
        }
        document.addEventListener('DOMContentLoaded', e, !1)
      }
    } else {
      document.attachEvent && (i = t, o = d.document, a = !1, (l = function () {
        try {
          o.documentElement.doScroll('left')
        } catch (t) {
          return void setTimeout(l, 50)
        }
        n()
      })(), o.onreadystatechange = function () {
        o.readyState == 'complete' && (o.onreadystatechange = null, n())
      })
    }

    function n () {
      a || (a = !0, i())
    }
    var i, o, a, l
  }(function () {
    var t, e;
    (t = document.createElement('div')).innerHTML = n, n = null, (e = t.getElementsByTagName('svg')[0]) && (e.setAttribute('aria-hidden', 'true'), e.style.position = 'absolute', e.style.width = 0, e.style.height = 0, e.style.overflow = 'hidden', (function (t, e) {
      e.firstChild ? (function (t, e) {
        e.parentNode.insertBefore(t, e)
      }(t, e.firstChild)) : e.appendChild(t)
    }(e, document.body)))
  }))
}(window))
