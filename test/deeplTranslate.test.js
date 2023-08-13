// -r esm
// import { expect } from "chai";
// import foo from "../src/foo";
// import consola from "consola";

/* eslint-env mocha */
const expect = require('chai').expect
const file2lines = require('../src/file2lines')
const deeplTranslate = require('../src/deeplTranslate')

const consola = require('consola')
consola.level = process.env.CONSOLA_DEBUG || 4 // 3 set CONSOLA_DEBUG=4 to show debug

const file1 = './data/test-en.txt'
// const file2 = './data/test-zh.txt'

const lines1 = file2lines(file1)
// const lines2 = file2lines(file2)

consola.debug('test-en.txt lines1: %j', lines1.slice(0, 3))
// consola.debug('test-zh.txt lines2: %j', lines2.slice(0, 2))

// yarn test -f "@1 index"
describe('@1 deeplTranslate: sanity test ', () => {
  // context(' ==== ', () => {

    it('#1  test-en.txt   ', async () => {
      // let [lines1a, lines2a] = [lines1.slice(0,10), lines2.slice(0,10)]

      numb_para = 6  // 1246 chars
      let lines1a = lines1.slice(0,numb_para)
      const result = await deeplTranslate(lines1a.join("\n"))
      consola.debug('result: %o', result)
      // console.log(result)

      // splitlines(result)
      lines = result.trim().split(/[\r\n]+/)
      consola.debug('result: %o', lines.length)

      expect(lines.length).to.equal(numb_para)
    })

    it('#2 test-en.txt/test-zh.txt  ', async () => {
      const len = 5
      const result = await deeplTranslate(lines1.slice(0,len).join("\n"))
      consola.debug('result: %o', result)
      // console.log(result)
      lines = result.trim().split(/[\r\n]+/)
      expect(lines.length).to.equal(len)
    })
  // })
})
