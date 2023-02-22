/* restAlign
  input texts = [text1: str, text2: str]
  output: Rowdata [{text1: ... , text2: ..., metri: .3 ,}...]
 */
// refer to zmq-client.js
// const zmq = require('zeromq')
const axios = require('axios')
const genRowdata = require('./genRowdata')

const logger = require('tracer').colorConsole({
  // format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
  level: process.env.TRACER_DEBUG || 'info' // set TRACER_DEBUG=debug
})

// const port = 5555
// const port = 8104
const port = 8000

// const restAlign = async (lines1, lines2, url = null, split2sents = false) => {
const deeplTranslate = async (text, url=null, from_lang=null, to_lang=null) => {
  // text is string not list

  // if (!url) url = `http://forindo.net:${port}/post/`

  // deepltr 8104
  if (!url) url = `http://127.0.0.1:${port}/text/`

  // mlbee 7860
  // const data = { data: [text1, text2, false, false] }

  const data = { text, from_lang, to_lang }

  let rep
  try {
    // rep = await axios.post(`http://127.0.0.1:${port}/post/`, texts)
    // rep = await axios.post(`http://111.194.226.116:${port}/post/`, texts)
    rep = await axios.post(url, data)
  } catch (e) {
    logger.error(e.name + ': ' + e.message)
    text1 = e.name
    text2 = e.message + '\n\t Is the server up running? Anything loaded?'
    // return [{ text1, text2 }]
    rep = { data: { result: text1 + ': ' + text2 }}
  }

  // logger.debug('rep.data: ', rep.data)

  // rep.data: jdata, jdata.get('data')[0].get('data')
  // const result = rep.data.data[0].data

  /* rep.data:
  {
  "q": {
    "text": "测试这个\n  和那个",
    "from_lang": null,
    "to_lang": null,
    "description": "string"
  },
  "result": "Test this\n    and that"
  }
  // */
  const { result } = rep.data

  logger.debug('result: %s', result)
  // logger.debug('result[result.length - 1]: %s', result[result.length - 1])

  // const _ = genRowdata({ col1: result, isRow: true })

  return result
}

module.exports = deeplTranslate
