import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {temporaryDirectory} from 'tempy'
import fse from 'fs-extra'
import path from 'node:path'
import {fix} from '../../main/js/index.js'

const test = suite('index')
const argv = process.argv

test('fix() patches contents by required opts', async () => {
  const temp = temporaryDirectory()
  const before = ``
  const after = ``

  await fse.outputFile(path.join(temp, 'index.js'), before)
  await fix({cwd: temp, target: '**/*'})
  const result = await fse.readFile(path.join(temp, 'index.js'), {encoding: 'utf8'})

  assert.fixture(result, after)
})

test('fix() asserts arguments', async () => {
  try {
    await fix({})
    assert.unreachable('should have thrown')

  } catch (err) {
    assert.instance(err, Error)
    assert.match(err.message, 'target is required')
  }
})

test.run()
