const splitText = require('./splitText')
const zipLongest = require('./zipLongest')
const deeplTranslate = require('./deeplTranslate')
// vec1.extend(vec2) -> vec1.concat(vec2): vec1.concat([...zipLongest()])
// lst = [[1, 2, 3], [4, 5, 6]]
// [*zip(*lst)] -> transpose: lst[0].map((_, idx) => lst.map(el => el[idx]))

const logger = require('tracer').colorConsole({
  // format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
  level: process.env.TRACER_DEBUG || 'info' // set TRACER_DEBUG=debug
})

const trText = async (text, fromLang = null, to_lang = null, limit = null) => {
  /*
    const splitText = require('./src/splitText');const zipLongest = require('./src/zipLongest');const deeplTranslate = require('./src/deeplTranslate');

    ch = splitText(text)
    el = ch[0]
  */
  let res = []
  // splitText(text).forEach( el =>
  for (const el of splitText(text)) {
    let trel
    try {
      trel = await deeplTranslate(el, fromLang, to_lang)
    } catch (e) {
      logger.error(e)
      trel = e.name + ': ' + e.message
    }

    // logger.debug(typeof trel)
    if (el.split(/[\r\n]+/).length !== trel.split(/[\r\n]+/).length) {
      logger.warn(' text paras # and trtext paras # not equal \n\t this may indicate a potential problem, but we proceed nevertheless ')
    }
    res = res.concat([...zipLongest(el.split(/[\r\n]+/), trel.split(/[\r\n]+/))])
  }
  return res
}

module.exports = trText
