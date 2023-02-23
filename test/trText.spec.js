// -r esm
// import { expect } from "chai";
// import foo from "../src/foo";
// import consola from "consola";

/* eslint-env mocha */
const expect = require('chai').expect
const file2lines = require('../src/file2lines')
const trText = require('../src/trText')

// const consola = require('consola')
// consola.level = process.env.CONSOLA_DEBUG || 4 // set CONSOLA_DEBUG=4 to show debug

const logger = require('tracer').colorConsole({
  // format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
  level: process.env.TRACER_DEBUG || 'debug' // set TRACER_DEBUG=debug
})

const file1 = './data/test-en.txt'
// const file2 = '../data/test-zh.txt'

const lines1 = file2lines(file1)
// const lines2 = file2lines(file2)

logger.debug('test-en.txt lines1: %s', lines1.slice(0, 3))
// logger.debug('test-zh.txt lines2: %j', lines2.slice(0, 2))

// yarn test -f "@1 index"
describe('@1-trText-sanity-test', () => {
  // context(' ==== ', () => {

    test('#1-trText-test-en.txt', async () => {
      /*
        const expect = require('chai').expect; const file2lines = require('./src/file2lines'); const trText = require('./src/trText'); const logger = require('tracer').colorConsole();
        const file1 = './data/test-en.txt'; const lines1 = file2lines(file1);
        lines1.length === 34

        import { expect } from 'chai' SyntaxError: Cannot use import statement inside the Node.js REPL
        node -r esm

        import { expect } from 'chai'
        import file2lines from './src/file2lines' // with module.exports = file2lines
        import trText from './src/trText' // axios does not work
        const file1 = './data/test-en.txt';
        const lines1 = file2lines(file1)

       */
      const result = await trText(lines1.slice(0,10).join("\n"))
      logger.debug('result: %s', result)
      // console.log(result)

      // assert(result.length > 9)
      // assert(result[result.length -1][1].includes('小姐'))

      expect(result.length > 7).to.equal(true)
      expect(result[result.length -1][1].includes('小姐')).to.equal(true)
    })

    test('#2-test-en.txt', async () => {
      const result = await trText(lines1.join("\n"))
      logger.debug('result: %s', typeof result)

      expect(result.length).to.equal(lines1.length);

    })
  // })

})
