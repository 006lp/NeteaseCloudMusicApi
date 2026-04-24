const assert = require('assert')
const { default: axios } = require('axios')
const host = global.host || 'http://localhost:3000'
describe('测试搜索是否正常', () => {
  it('应返回搜索结果列表', (done) => {
    const qs = {
      keywords: '海阔天空',
      type: 1,
      realIP: global.cnIp,
    }
    axios
      .get(`${host}/search`, {
        params: qs,
      })
      .then(({ status, data }) => {
        if (status == 200) {
          assert(Array.isArray(data.result.songs))
          assert(data.result.songs.length > 0)
          assert(typeof data.result.songCount === 'number')
        }
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
