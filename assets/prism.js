/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+css-extras+json+json5&plugins=line-numbers+show-language+remove-initial-line-feed+inline-color+previewers+toolbar */
var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function(u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof _
              ? new _(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ')
          },
          type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          },
          objId: function(e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id
          },
          clone: function t(e, r) {
            var a,
              n,
              l = C.util.type(e)
            switch (((r = r || {}), l)) {
              case 'Object':
                if (((n = C.util.objId(e)), r[n])) return r[n]
                for (var i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r))
                return a
              case 'Array':
                return (
                  (n = C.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function(e, n) {
                        a[n] = t(e, r)
                      }),
                      a)
                )
              default:
                return e
            }
          },
          getLanguage: function(e) {
            for (; e && !c.test(e.className); ) e = e.parentElement
            return e ? (e.className.match(c) || [, 'none'])[1].toLowerCase() : 'none'
          },
          currentScript: function() {
            if ('undefined' == typeof document) return null
            if ('currentScript' in document) return document.currentScript
            try {
              throw new Error()
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
              if (n) {
                var t = document.getElementsByTagName('script')
                for (var r in t) if (t[r].src == n) return t[r]
              }
              return null
            }
          }
        },
        languages: {
          extend: function(e, n) {
            var t = C.util.clone(C.languages[e])
            for (var r in n) t[r] = n[r]
            return t
          },
          insertBefore: function(t, e, n, r) {
            var a = (r = r || C.languages)[t],
              l = {}
            for (var i in a)
              if (a.hasOwnProperty(i)) {
                if (i == e) for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o])
                n.hasOwnProperty(i) || (l[i] = a[i])
              }
            var s = r[t]
            return (
              (r[t] = l),
              C.languages.DFS(C.languages, function(e, n) {
                n === s && e != t && (this[e] = l)
              }),
              l
            )
          },
          DFS: function e(n, t, r, a) {
            a = a || {}
            var l = C.util.objId
            for (var i in n)
              if (n.hasOwnProperty(i)) {
                t.call(n, i, n[i], r || i)
                var o = n[i],
                  s = C.util.type(o)
                'Object' !== s || a[l(o)]
                  ? 'Array' !== s || a[l(o)] || ((a[l(o)] = !0), e(o, t, i, a))
                  : ((a[l(o)] = !0), e(o, t, null, a))
              }
          }
        },
        plugins: {},
        highlightAll: function(e, n) {
          C.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          }
          C.hooks.run('before-highlightall', r),
            (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
            C.hooks.run('before-all-elements-highlight', r)
          for (var a, l = 0; (a = r.elements[l++]); ) C.highlightElement(a, !0 === n, r.callback)
        },
        highlightElement: function(e, n, t) {
          var r = C.util.getLanguage(e),
            a = C.languages[r]
          e.className = e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r
          var l = e.parentNode
          l &&
            'pre' === l.nodeName.toLowerCase() &&
            (l.className = l.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r)
          var i = { element: e, language: r, grammar: a, code: e.textContent }
          function o(e) {
            ;(i.highlightedCode = e),
              C.hooks.run('before-insert', i),
              (i.element.innerHTML = i.highlightedCode),
              C.hooks.run('after-highlight', i),
              C.hooks.run('complete', i),
              t && t.call(i.element)
          }
          if ((C.hooks.run('before-sanity-check', i), !i.code))
            return C.hooks.run('complete', i), void (t && t.call(i.element))
          if ((C.hooks.run('before-highlight', i), i.grammar))
            if (n && u.Worker) {
              var s = new Worker(C.filename)
              ;(s.onmessage = function(e) {
                o(e.data)
              }),
                s.postMessage(JSON.stringify({ language: i.language, code: i.code, immediateClose: !0 }))
            } else o(C.highlight(i.code, i.grammar, i.language))
          else o(C.util.encode(i.code))
        },
        highlight: function(e, n, t) {
          var r = { code: e, grammar: n, language: t }
          return (
            C.hooks.run('before-tokenize', r),
            (r.tokens = C.tokenize(r.code, r.grammar)),
            C.hooks.run('after-tokenize', r),
            _.stringify(C.util.encode(r.tokens), r.language)
          )
        },
        tokenize: function(e, n) {
          var t = n.rest
          if (t) {
            for (var r in t) n[r] = t[r]
            delete n.rest
          }
          var a = new l()
          return (
            M(a, a.head, e),
            (function e(n, t, r, a, l, i, o) {
              for (var s in r)
                if (r.hasOwnProperty(s) && r[s]) {
                  var u = r[s]
                  u = Array.isArray(u) ? u : [u]
                  for (var c = 0; c < u.length; ++c) {
                    if (o && o == s + ',' + c) return
                    var g = u[c],
                      f = g.inside,
                      h = !!g.lookbehind,
                      d = !!g.greedy,
                      v = 0,
                      p = g.alias
                    if (d && !g.pattern.global) {
                      var m = g.pattern.toString().match(/[imsuy]*$/)[0]
                      g.pattern = RegExp(g.pattern.source, m + 'g')
                    }
                    g = g.pattern || g
                    for (var y = a.next, k = l; y !== t.tail; k += y.value.length, y = y.next) {
                      var b = y.value
                      if (t.length > n.length) return
                      if (!(b instanceof _)) {
                        var x = 1
                        if (d && y != t.tail.prev) {
                          g.lastIndex = k
                          var w = g.exec(n)
                          if (!w) break
                          var A = w.index + (h && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k
                          for (S += y.value.length; S <= A; ) (y = y.next), (S += y.value.length)
                          if (((S -= y.value.length), (k = S), y.value instanceof _)) continue
                          for (
                            var O = y;
                            O !== t.tail && (S < P || ('string' == typeof O.value && !O.prev.value.greedy));
                            O = O.next
                          )
                            x++, (S += O.value.length)
                          x--, (b = n.slice(k, S)), (w.index -= k)
                        } else {
                          g.lastIndex = 0
                          var w = g.exec(b)
                        }
                        if (w) {
                          h && (v = w[1] ? w[1].length : 0)
                          var A = w.index + v,
                            w = w[0].slice(v),
                            P = A + w.length,
                            E = b.slice(0, A),
                            N = b.slice(P),
                            j = y.prev
                          E && ((j = M(t, j, E)), (k += E.length)), W(t, j, x)
                          var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d)
                          if (((y = M(t, j, L)), N && M(t, y, N), 1 < x && e(n, t, r, y.prev, k, !0, s + ',' + c), i))
                            break
                        } else if (i) break
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function(e) {
              var n = [],
                t = e.head.next
              for (; t !== e.tail; ) n.push(t.value), (t = t.next)
              return n
            })(a)
          )
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var t = C.hooks.all
            ;(t[e] = t[e] || []), t[e].push(n)
          },
          run: function(e, n) {
            var t = C.hooks.all[e]
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n)
          }
        },
        Token: _
      }
    function _(e, n, t, r, a) {
      ;(this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length), (this.greedy = !!a)
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null }
      ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
    }
    function M(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r }
      return (n.next = a), (r.prev = a), e.length++, a
    }
    function W(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
      ;((n.next = r).prev = n), (e.length -= a)
    }
    if (
      ((u.Prism = C),
      (_.stringify = function n(e, t) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) {
          var r = ''
          return (
            e.forEach(function(e) {
              r += n(e, t)
            }),
            r
          )
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: 'span',
            classes: ['token', e.type],
            attributes: {},
            language: t
          },
          l = e.alias
        l && (Array.isArray(l) ? Array.prototype.push.apply(a.classes, l) : a.classes.push(l)), C.hooks.run('wrap', a)
        var i = ''
        for (var o in a.attributes) i += ' ' + o + '="' + (a.attributes[o] || '').replace(/"/g, '&quot;') + '"'
        return '<' + a.tag + ' class="' + a.classes.join(' ') + '"' + i + '>' + a.content + '</' + a.tag + '>'
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (C.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function(e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose
                u.postMessage(C.highlight(r, C.languages[t], t)), a && u.close()
              },
              !1
            )),
        C
      )
    var e = C.util.currentScript()
    function t() {
      C.manual || C.highlightAll()
    }
    if ((e && ((C.filename = e.src), e.hasAttribute('data-manual') && (C.manual = !0)), !C.manual)) {
      var r = document.readyState
      'loading' === r || ('interactive' === r && e && e.defer)
        ? document.addEventListener('DOMContentLoaded', t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16)
    }
    return C
  })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': { pattern: /(\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/,
      name: /[^\s<>'"]+/
    }
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] }
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
    }
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i]
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function(a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function(a, e) {
      var s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e]
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      var n = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } }
      n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      var t = {}
      ;(t[a] = {
        pattern: RegExp(
          '(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function() {
              return a
            }
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n
      }),
        Prism.languages.insertBefore('markup', 'cdata', t)
    }
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml)
!(function(s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector'
        }
      }
    },
    url: {
      pattern: RegExp('url\\((?:' + e.source + '|[^\n\r()]*)\\)', 'i'),
      greedy: !0,
      inside: { function: /^url/i, punctuation: /^\(|\)$/ }
    },
    selector: RegExp('[^{}\\s](?:[^{};"\']|' + e.source + ')*?(?=\\s*\\{)'),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  var t = s.languages.markup
  t &&
    (t.tag.addInlined('style', 'css'),
    s.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: s.languages.css }
          },
          alias: 'language-css'
        }
      },
      t.tag
    ))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
  ],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0
    }
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0
    }
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0
    },
    'function-variable': {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  }),
  Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript)
!(function(e) {
  var a,
    n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(e.languages.css.selector = {
    pattern: e.languages.css.selector,
    inside: (a = {
      'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      'pseudo-class': /:[-\w]+/,
      class: /\.[-\w]+/,
      id: /#[-\w]+/,
      attribute: {
        pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
        greedy: !0,
        inside: {
          punctuation: /^\[|\]$/,
          'case-sensitivity': { pattern: /(\s)[si]$/i, lookbehind: !0, alias: 'keyword' },
          namespace: { pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } },
          'attr-name': { pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0 },
          'attr-value': [n, { pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/, lookbehind: !0 }],
          operator: /[|~*^$]?=/
        }
      },
      'n-th': [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: !0,
          inside: { number: /[\dn]+/, operator: /[+-]/ }
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 }
      ],
      combinator: />|\+|~|\|\|/,
      punctuation: /[(),]/
    })
  }),
    (e.languages.css.atrule.inside['selector-function-argument'].inside = a),
    e.languages.insertBefore('css', 'property', {
      variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i, lookbehind: !0 }
    })
  var r = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 },
    i = { pattern: /(^|[^\w.-])-?\d*\.?\d+/, lookbehind: !0 }
  e.languages.insertBefore('css', 'function', {
    operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
    hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: 'color' },
    color: [
      /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
      {
        pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ }
      }
    ],
    entity: /\\[\da-f]{1,8}/i,
    unit: r,
    number: i
  })
})(Prism)
;(Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' }
}),
  (Prism.languages.webmanifest = Prism.languages.json)
!(function(n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
  n.languages.json5 = n.languages.extend('json', {
    property: [
      { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
      { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/, alias: 'unquoted' }
    ],
    string: { pattern: e, greedy: !0 },
    number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+\b)?/
  })
})(Prism)
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var l = 'line-numbers',
      c = /\n(?!$)/g,
      m = function(e) {
        var t = a(e)['white-space']
        if ('pre-wrap' === t || 'pre-line' === t) {
          var n = e.querySelector('code'),
            r = e.querySelector('.line-numbers-rows')
          if (!n || !r) return
          var s = e.querySelector('.line-numbers-sizer'),
            i = n.textContent.split(c)
          s || (((s = document.createElement('span')).className = 'line-numbers-sizer'), n.appendChild(s)),
            (s.style.display = 'block'),
            i.forEach(function(e, t) {
              s.textContent = e || '\n'
              var n = s.getBoundingClientRect().height
              r.children[t].style.height = n + 'px'
            }),
            (s.textContent = ''),
            (s.style.display = 'none')
        }
      },
      a = function(e) {
        return e ? (window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null) : null
      }
    window.addEventListener('resize', function() {
      Array.prototype.forEach.call(document.querySelectorAll('pre.' + l), m)
    }),
      Prism.hooks.add('complete', function(e) {
        if (e.code) {
          var t = e.element,
            n = t.parentNode
          if (n && /pre/i.test(n.nodeName) && !t.querySelector('.line-numbers-rows')) {
            for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode)
              if (s.test(i.className)) {
                r = !0
                break
              }
            if (r) {
              ;(t.className = t.className.replace(s, ' ')), s.test(n.className) || (n.className += ' line-numbers')
              var l,
                a = e.code.match(c),
                o = a ? a.length + 1 : 1,
                u = new Array(o + 1).join('<span></span>')
              ;(l = document.createElement('span')).setAttribute('aria-hidden', 'true'),
                (l.className = 'line-numbers-rows'),
                (l.innerHTML = u),
                n.hasAttribute('data-start') &&
                  (n.style.counterReset = 'linenumber ' + (parseInt(n.getAttribute('data-start'), 10) - 1)),
                e.element.appendChild(l),
                m(n),
                Prism.hooks.run('line-numbers', e)
            }
          }
        }
      }),
      Prism.hooks.add('line-numbers', function(e) {
        ;(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0)
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function(e, t) {
          if ('PRE' === e.tagName && e.classList.contains(l)) {
            var n = e.querySelector('.line-numbers-rows'),
              r = parseInt(e.getAttribute('data-start'), 10) || 1,
              s = r + (n.children.length - 1)
            t < r && (t = r), s < t && (t = s)
            var i = t - r
            return n.children[i]
          }
        },
        resize: function(e) {
          m(e)
        }
      })
  }
})()
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var i = [],
      l = {},
      c = function() {}
    Prism.plugins.toolbar = {}
    var e = (Prism.plugins.toolbar.registerButton = function(e, n) {
        var t
        ;(t =
          'function' == typeof n
            ? n
            : function(e) {
                var t
                return (
                  'function' == typeof n.onClick
                    ? (((t = document.createElement('button')).type = 'button'),
                      t.addEventListener('click', function() {
                        n.onClick.call(this, e)
                      }))
                    : 'string' == typeof n.url
                    ? ((t = document.createElement('a')).href = n.url)
                    : (t = document.createElement('span')),
                  n.className && t.classList.add(n.className),
                  (t.textContent = n.text),
                  t
                )
              }),
          e in l ? console.warn('There is a button with the key "' + e + '" registered already.') : i.push((l[e] = t))
      }),
      t = (Prism.plugins.toolbar.hook = function(a) {
        var e = a.element.parentNode
        if (e && /pre/i.test(e.nodeName) && !e.parentNode.classList.contains('code-toolbar')) {
          var t = document.createElement('div')
          t.classList.add('code-toolbar'), e.parentNode.insertBefore(t, e), t.appendChild(e)
          var r = document.createElement('div')
          r.classList.add('toolbar')
          var n = i,
            o = (function(e) {
              for (; e; ) {
                var t = e.getAttribute('data-toolbar-order')
                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : []
                e = e.parentElement
              }
            })(a.element)
          o &&
            (n = o.map(function(e) {
              return l[e] || c
            })),
            n.forEach(function(e) {
              var t = e(a)
              if (t) {
                var n = document.createElement('div')
                n.classList.add('toolbar-item'), n.appendChild(t), r.appendChild(n)
              }
            }),
            t.appendChild(r)
        }
      })
    e('label', function(e) {
      var t = e.element.parentNode
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
        var n,
          a,
          r = t.getAttribute('data-label')
        try {
          a = document.querySelector('template#' + r)
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute('data-url')
                ? ((n = document.createElement('a')).href = t.getAttribute('data-url'))
                : (n = document.createElement('span')),
              (n.textContent = r)),
          n
        )
      }
    }),
      Prism.hooks.add('complete', t)
  }
})()
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document)
    if (Prism.plugins.toolbar) {
      var r = {
        html: 'HTML',
        xml: 'XML',
        svg: 'SVG',
        mathml: 'MathML',
        ssml: 'SSML',
        rss: 'RSS',
        css: 'CSS',
        clike: 'C-like',
        js: 'JavaScript',
        abap: 'ABAP',
        abnf: 'Augmented Backus–Naur form',
        al: 'AL',
        antlr4: 'ANTLR4',
        g4: 'ANTLR4',
        apacheconf: 'Apache Configuration',
        apl: 'APL',
        aql: 'AQL',
        arff: 'ARFF',
        asciidoc: 'AsciiDoc',
        adoc: 'AsciiDoc',
        asm6502: '6502 Assembly',
        aspnet: 'ASP.NET (C#)',
        autohotkey: 'AutoHotkey',
        autoit: 'AutoIt',
        basic: 'BASIC',
        bbcode: 'BBcode',
        bnf: 'Backus–Naur form',
        rbnf: 'Routing Backus–Naur form',
        conc: 'Concurnas',
        csharp: 'C#',
        cs: 'C#',
        dotnet: 'C#',
        cpp: 'C++',
        cil: 'CIL',
        coffee: 'CoffeeScript',
        cmake: 'CMake',
        csp: 'Content-Security-Policy',
        'css-extras': 'CSS Extras',
        dax: 'DAX',
        django: 'Django/Jinja2',
        jinja2: 'Django/Jinja2',
        'dns-zone-file': 'DNS zone file',
        'dns-zone': 'DNS zone file',
        dockerfile: 'Docker',
        ebnf: 'Extended Backus–Naur form',
        ejs: 'EJS',
        etlua: 'Embedded Lua templating',
        erb: 'ERB',
        'excel-formula': 'Excel Formula',
        xlsx: 'Excel Formula',
        xls: 'Excel Formula',
        fsharp: 'F#',
        'firestore-security-rules': 'Firestore security rules',
        ftl: 'FreeMarker Template Language',
        gcode: 'G-code',
        gdscript: 'GDScript',
        gedcom: 'GEDCOM',
        glsl: 'GLSL',
        gml: 'GameMaker Language',
        gamemakerlanguage: 'GameMaker Language',
        graphql: 'GraphQL',
        hs: 'Haskell',
        hcl: 'HCL',
        hlsl: 'HLSL',
        http: 'HTTP',
        hpkp: 'HTTP Public-Key-Pins',
        hsts: 'HTTP Strict-Transport-Security',
        ichigojam: 'IchigoJam',
        iecst: 'Structured Text (IEC 61131-3)',
        inform7: 'Inform 7',
        javadoc: 'JavaDoc',
        javadoclike: 'JavaDoc-like',
        javastacktrace: 'Java stack trace',
        jq: 'JQ',
        jsdoc: 'JSDoc',
        'js-extras': 'JS Extras',
        'js-templates': 'JS Templates',
        json: 'JSON',
        webmanifest: 'Web App Manifest',
        jsonp: 'JSONP',
        json5: 'JSON5',
        latex: 'LaTeX',
        tex: 'TeX',
        context: 'ConTeXt',
        lilypond: 'LilyPond',
        ly: 'LilyPond',
        emacs: 'Lisp',
        elisp: 'Lisp',
        'emacs-lisp': 'Lisp',
        llvm: 'LLVM IR',
        lolcode: 'LOLCODE',
        md: 'Markdown',
        'markup-templating': 'Markup templating',
        matlab: 'MATLAB',
        mel: 'MEL',
        moon: 'MoonScript',
        n1ql: 'N1QL',
        n4js: 'N4JS',
        n4jsd: 'N4JS',
        'nand2tetris-hdl': 'Nand To Tetris HDL',
        nasm: 'NASM',
        neon: 'NEON',
        nginx: 'nginx',
        nsis: 'NSIS',
        objectivec: 'Objective-C',
        objc: 'Objective-C',
        ocaml: 'OCaml',
        opencl: 'OpenCL',
        parigp: 'PARI/GP',
        objectpascal: 'Object Pascal',
        pcaxis: 'PC-Axis',
        px: 'PC-Axis',
        peoplecode: 'PeopleCode',
        pcode: 'PeopleCode',
        php: 'PHP',
        phpdoc: 'PHPDoc',
        'php-extras': 'PHP Extras',
        plsql: 'PL/SQL',
        powerquery: 'PowerQuery',
        pq: 'PowerQuery',
        mscript: 'PowerQuery',
        powershell: 'PowerShell',
        properties: '.properties',
        protobuf: 'Protocol Buffers',
        purebasic: 'PureBasic',
        pbfasm: 'PureBasic',
        py: 'Python',
        q: 'Q (kdb+ database)',
        qml: 'QML',
        rkt: 'Racket',
        jsx: 'React JSX',
        tsx: 'React TSX',
        renpy: "Ren'py",
        rpy: "Ren'py",
        rest: 'reST (reStructuredText)',
        robotframework: 'Robot Framework',
        robot: 'Robot Framework',
        rb: 'Ruby',
        sas: 'SAS',
        sass: 'Sass (Sass)',
        scss: 'Sass (Scss)',
        'shell-session': 'Shell session',
        solidity: 'Solidity (Ethereum)',
        sol: 'Solidity (Ethereum)',
        'solution-file': 'Solution file',
        sln: 'Solution file',
        soy: 'Soy (Closure Template)',
        sparql: 'SPARQL',
        rq: 'SPARQL',
        'splunk-spl': 'Splunk SPL',
        sqf: 'SQF: Status Quo Function (Arma 3)',
        sql: 'SQL',
        tap: 'TAP',
        toml: 'TOML',
        tt2: 'Template Toolkit 2',
        trig: 'TriG',
        ts: 'TypeScript',
        't4-cs': 'T4 Text Templates (C#)',
        t4: 'T4 Text Templates (C#)',
        't4-vb': 'T4 Text Templates (VB)',
        't4-templating': 'T4 templating',
        uscript: 'UnrealScript',
        uc: 'UnrealScript',
        vbnet: 'VB.Net',
        vhdl: 'VHDL',
        vim: 'vim',
        'visual-basic': 'Visual Basic',
        vb: 'Visual Basic',
        wasm: 'WebAssembly',
        wiki: 'Wiki markup',
        xeoracube: 'XeoraCube',
        'xml-doc': 'XML doc (.net)',
        xojo: 'Xojo (REALbasic)',
        xquery: 'XQuery',
        yaml: 'YAML',
        yml: 'YAML'
      }
      Prism.plugins.toolbar.registerButton('show-language', function(e) {
        var a = e.element.parentNode
        if (a && /pre/i.test(a.nodeName)) {
          var s,
            t =
              a.getAttribute('data-language') ||
              r[e.language] ||
              ((s = e.language) ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(/s(?=cript)/, 'S') : s)
          if (t) {
            var o = document.createElement('span')
            return (o.textContent = t), o
          }
        }
      })
    } else console.warn('Show Languages plugin loaded before Toolbar plugin.')
})()
'undefined' != typeof self &&
  self.Prism &&
  self.document &&
  Prism.hooks.add('before-sanity-check', function(e) {
    if (e.code) {
      var s = e.element.parentNode,
        n = /(?:^|\s)keep-initial-line-feed(?:\s|$)/
      !s ||
        'pre' !== s.nodeName.toLowerCase() ||
        n.test(s.className) ||
        n.test(e.element.className) ||
        (e.code = e.code.replace(/^(?:\r?\n|\r)/, ''))
    }
  })
!(function() {
  if ('undefined' != typeof self && 'undefined' != typeof Prism && 'undefined' != typeof document) {
    var a = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
      f = [
        function(n) {
          var r = c.exec(n)
          if (r) {
            for (
              var o = 6 <= (n = r[1]).length ? 2 : 1, e = n.length / o, s = 1 == o ? 1 / 15 : 1 / 255, t = [], i = 0;
              i < e;
              i++
            ) {
              var a = parseInt(n.substr(i * o, o), 16)
              t.push(a * s)
            }
            return (
              3 == e && t.push(1),
              'rgba(' +
                t
                  .slice(0, 3)
                  .map(function(n) {
                    return String(Math.round(255 * n))
                  })
                  .join(',') +
                ',' +
                String(Number(t[3].toFixed(3))) +
                ')'
            )
          }
        },
        function(n) {
          var r = new Option().style
          return (r.color = n), r.color ? n : void 0
        }
      ]
    Prism.hooks.add('wrap', function(n) {
      if ('color' === n.type || 0 <= n.classes.indexOf('color')) {
        for (var r, o = n.content, e = o.split(a).join(''), s = 0, t = f.length; s < t && !r; s++) r = f[s](e)
        if (!r) return
        var i =
          '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
          r +
          ';"></span></span>'
        n.content = i + o
      }
    })
  }
})()
!(function() {
  if (('undefined' == typeof self || self.Prism) && self.document && Function.prototype.bind) {
    var r,
      s,
      o = {
        gradient: {
          create:
            ((r = {}),
            (s = function(e) {
              if (r[e]) return r[e]
              var s = e.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/),
                t = s && s[1],
                i = s && s[2],
                a = e
                  .replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, '')
                  .split(/\s*,\s*/)
              return 0 <= i.indexOf('linear')
                ? (r[e] = (function(e, s, t) {
                    var i = '180deg'
                    return (
                      /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(t[0]) &&
                        (i = t.shift()).indexOf('to ') < 0 &&
                        (0 <= i.indexOf('top')
                          ? (i =
                              0 <= i.indexOf('left')
                                ? 'to bottom right'
                                : 0 <= i.indexOf('right')
                                ? 'to bottom left'
                                : 'to bottom')
                          : 0 <= i.indexOf('bottom')
                          ? (i =
                              0 <= i.indexOf('left')
                                ? 'to top right'
                                : 0 <= i.indexOf('right')
                                ? 'to top left'
                                : 'to top')
                          : 0 <= i.indexOf('left')
                          ? (i = 'to right')
                          : 0 <= i.indexOf('right')
                          ? (i = 'to left')
                          : e &&
                            (0 <= i.indexOf('deg')
                              ? (i = 90 - parseFloat(i) + 'deg')
                              : 0 <= i.indexOf('rad') && (i = Math.PI / 2 - parseFloat(i) + 'rad'))),
                      s + '(' + i + ',' + t.join(',') + ')'
                    )
                  })(t, i, a))
                : 0 <= i.indexOf('radial')
                ? (r[e] = (function(e, s, t) {
                    if (t[0].indexOf('at') < 0) {
                      var i = 'center',
                        a = 'ellipse',
                        r = 'farthest-corner'
                      if (
                        (/\bcenter|top|right|bottom|left\b|^\d+/.test(t[0]) &&
                          (i = t.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, '')),
                        /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(t[0]))
                      ) {
                        var n = t.shift().split(/\s+/)
                        !n[0] || ('circle' !== n[0] && 'ellipse' !== n[0]) || (a = n.shift()),
                          n[0] && (r = n.shift()),
                          'cover' === r ? (r = 'farthest-corner') : 'contain' === r && (r = 'clothest-side')
                      }
                      return s + '(' + a + ' ' + r + ' at ' + i + ',' + t.join(',') + ')'
                    }
                    return s + '(' + t.join(',') + ')'
                  })(0, i, a))
                : (r[e] = i + '(' + a.join(',') + ')')
            }),
            function() {
              new Prism.plugins.Previewer(
                'gradient',
                function(e) {
                  return (
                    (this.firstChild.style.backgroundImage = ''),
                    (this.firstChild.style.backgroundImage = s(e)),
                    !!this.firstChild.style.backgroundImage
                  )
                },
                '*',
                function() {
                  this._elt.innerHTML = '<div></div>'
                }
              )
            }),
          tokens: {
            gradient: {
              pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ }
            }
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line']
              },
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['property-line']
              }
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside
              },
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside
              }
            ]
          }
        },
        angle: {
          create: function() {
            new Prism.plugins.Previewer(
              'angle',
              function(e) {
                var s,
                  t,
                  i = parseFloat(e),
                  a = e.match(/[a-z]+$/i)
                if (!i || !a) return !1
                switch ((a = a[0])) {
                  case 'deg':
                    s = 360
                    break
                  case 'grad':
                    s = 400
                    break
                  case 'rad':
                    s = 2 * Math.PI
                    break
                  case 'turn':
                    s = 1
                }
                return (
                  (t = (100 * i) / s),
                  (t %= 100),
                  this[(i < 0 ? 'set' : 'remove') + 'Attribute']('data-negative', ''),
                  (this.querySelector('circle').style.strokeDasharray = Math.abs(t) + ',500'),
                  !0
                )
              },
              '*',
              function() {
                this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
              }
            )
          },
          tokens: { angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value']
            },
            sass: [
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
              {
                lang: 'sass',
                before: 'operator',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line']
              }
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside
              },
              {
                lang: 'stylus',
                before: 'func',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside
              }
            ]
          }
        },
        color: {
          create: function() {
            new Prism.plugins.Previewer('color', function(e) {
              return (this.style.backgroundColor = ''), (this.style.backgroundColor = e), !!this.style.backgroundColor
            })
          },
          tokens: { color: [Prism.languages.css.hexcode].concat(Prism.languages.css.color) },
          languages: {
            css: !1,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value']
            },
            sass: [
              {
                lang: 'sass',
                before: 'punctuation',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line']
              },
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] }
            ],
            scss: !1,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside
              }
            ]
          }
        },
        easing: {
          create: function() {
            new Prism.plugins.Previewer(
              'easing',
              function(e) {
                var s = (e =
                  {
                    linear: '0,0,1,1',
                    ease: '.25,.1,.25,1',
                    'ease-in': '.42,0,1,1',
                    'ease-out': '0,0,.58,1',
                    'ease-in-out': '.42,0,.58,1'
                  }[e] || e).match(/-?\d*\.?\d+/g)
                if (4 !== s.length) return !1
                ;(s = s.map(function(e, s) {
                  return 100 * (s % 2 ? 1 - e : e)
                })),
                  this.querySelector('path').setAttribute(
                    'd',
                    'M0,100 C' + s[0] + ',' + s[1] + ', ' + s[2] + ',' + s[3] + ', 100,0'
                  )
                var t = this.querySelectorAll('line')
                return (
                  t[0].setAttribute('x2', s[0]),
                  t[0].setAttribute('y2', s[1]),
                  t[1].setAttribute('x2', s[2]),
                  t[1].setAttribute('y2', s[3]),
                  !0
                )
              },
              '*',
              function() {
                this._elt.innerHTML =
                  '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" marker-end="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" marker-end="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" /></svg>'
              }
            )
          },
          tokens: {
            easing: {
              pattern: /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ }
            }
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: 'sass',
                inside: 'inside',
                before: 'punctuation',
                root: Prism.languages.sass && Prism.languages.sass['variable-line']
              },
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] }
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside
              }
            ]
          }
        },
        time: {
          create: function() {
            new Prism.plugins.Previewer(
              'time',
              function(e) {
                var s = parseFloat(e),
                  t = e.match(/[a-z]+$/i)
                return (
                  !(!s || !t) && ((t = t[0]), (this.querySelector('circle').style.animationDuration = 2 * s + t), !0)
                )
              },
              '*',
              function() {
                this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
              }
            )
          },
          tokens: { time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: 'markup',
              before: 'punctuation',
              inside: 'inside',
              root: Prism.languages.markup && Prism.languages.markup.tag.inside['attr-value']
            },
            sass: [
              { lang: 'sass', inside: 'inside', root: Prism.languages.sass && Prism.languages.sass['property-line'] },
              {
                lang: 'sass',
                before: 'operator',
                inside: 'inside',
                root: Prism.languages.sass && Prism.languages.sass['variable-line']
              }
            ],
            scss: !0,
            stylus: [
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['property-declaration'].inside
              },
              {
                lang: 'stylus',
                before: 'hexcode',
                inside: 'rest',
                root: Prism.languages.stylus && Prism.languages.stylus['variable-declaration'].inside
              }
            ]
          }
        }
      },
      t = /(?:^|\s)token(?=$|\s)/,
      e = /(?:^|\s)active(?=$|\s)/g,
      i = /(?:^|\s)flipped(?=$|\s)/g,
      n = function(e, s, t, i) {
        ;(this._elt = null),
          (this._type = e),
          (this._clsRegexp = RegExp('(?:^|\\s)' + e + '(?=$|\\s)')),
          (this._token = null),
          (this.updater = s),
          (this._mouseout = this.mouseout.bind(this)),
          (this.initializer = i)
        var a = this
        t || (t = ['*']),
          Array.isArray(t) || (t = [t]),
          t.forEach(function(e) {
            'string' != typeof e && (e = e.lang),
              n.byLanguages[e] || (n.byLanguages[e] = []),
              n.byLanguages[e].indexOf(a) < 0 && n.byLanguages[e].push(a)
          }),
          (n.byType[e] = this)
      }
    for (var a in ((n.prototype.init = function() {
      this._elt ||
        ((this._elt = document.createElement('div')),
        (this._elt.className = 'prism-previewer prism-previewer-' + this._type),
        document.body.appendChild(this._elt),
        this.initializer && this.initializer())
    }),
    (n.prototype.isDisabled = function(e) {
      do {
        if (e.hasAttribute && e.hasAttribute('data-previewers'))
          return -1 === (e.getAttribute('data-previewers') || '').split(/\s+/).indexOf(this._type)
      } while ((e = e.parentNode))
      return !1
    }),
    (n.prototype.check = function(e) {
      if (!t.test(e.className) || !this.isDisabled(e)) {
        do {
          if (t.test(e.className) && this._clsRegexp.test(e.className)) break
        } while ((e = e.parentNode))
        e && e !== this._token && ((this._token = e), this.show())
      }
    }),
    (n.prototype.mouseout = function() {
      this._token.removeEventListener('mouseout', this._mouseout, !1), (this._token = null), this.hide()
    }),
    (n.prototype.show = function() {
      if ((this._elt || this.init(), this._token))
        if (this.updater.call(this._elt, this._token.textContent)) {
          this._token.addEventListener('mouseout', this._mouseout, !1)
          var e = (function(e) {
            var s = e.getBoundingClientRect(),
              t = s.left,
              i = s.top,
              a = document.documentElement.getBoundingClientRect()
            return (
              (t -= a.left),
              {
                top: (i -= a.top),
                right: innerWidth - t - s.width,
                bottom: innerHeight - i - s.height,
                left: t,
                width: s.width,
                height: s.height
              }
            )
          })(this._token)
          ;(this._elt.className += ' active'),
            0 < e.top - this._elt.offsetHeight
              ? ((this._elt.className = this._elt.className.replace(i, '')),
                (this._elt.style.top = e.top + 'px'),
                (this._elt.style.bottom = ''))
              : ((this._elt.className += ' flipped'),
                (this._elt.style.bottom = e.bottom + 'px'),
                (this._elt.style.top = '')),
            (this._elt.style.left = e.left + Math.min(200, e.width / 2) + 'px')
        } else this.hide()
    }),
    (n.prototype.hide = function() {
      this._elt.className = this._elt.className.replace(e, '')
    }),
    (n.byLanguages = {}),
    (n.byType = {}),
    (n.initEvents = function(e, s) {
      var t = []
      n.byLanguages[s] && (t = t.concat(n.byLanguages[s])),
        n.byLanguages['*'] && (t = t.concat(n.byLanguages['*'])),
        e.addEventListener(
          'mouseover',
          function(e) {
            var s = e.target
            t.forEach(function(e) {
              e.check(s)
            })
          },
          !1
        )
    }),
    (Prism.plugins.Previewer = n),
    Prism.hooks.add('before-highlight', function(r) {
      for (var n in o) {
        var l = o[n].languages
        if (r.language && l[r.language] && !l[r.language].initialized) {
          var e = l[r.language]
          Array.isArray(e) || (e = [e]),
            e.forEach(function(e) {
              var s, t, i, a
              ;(e =
                (!0 === e
                  ? ((s = 'important'), (t = r.language))
                  : ((s = e.before || 'important'),
                    (t = e.inside || e.lang),
                    (i = e.root || Prism.languages),
                    (a = e.skip)),
                r.language)),
                !a &&
                  Prism.languages[e] &&
                  (Prism.languages.insertBefore(t, s, o[n].tokens, i),
                  (r.grammar = Prism.languages[e]),
                  (l[r.language] = { initialized: !0 }))
            })
        }
      }
    }),
    Prism.hooks.add('after-highlight', function(e) {
      ;(n.byLanguages['*'] || n.byLanguages[e.language]) && n.initEvents(e.element, e.language)
    }),
    o))
      o[a].create()
  }
})()
