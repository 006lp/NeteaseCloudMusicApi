const assert = require('assert')
const { default: axios } = require('axios')
const host = global.host || 'http://localhost:3000'
describe('测试获取歌曲是否正常', () => {
  it('应返回当前歌曲的下载信息', (done) => {
    const qs = {
      id: 464315036,
      br: 999000,
      realIP: global.cnIp,
    }

    axios
      .get(`${host}/song/url`, {
        params: qs,
      })
      .then(({ status, data }) => {
        if (status == 200) {
          assert(Array.isArray(data.data))
          assert(data.data.length > 0)
          assert(data.data[0].id === qs.id)
          assert(typeof data.data[0].code === 'number')
        }
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
