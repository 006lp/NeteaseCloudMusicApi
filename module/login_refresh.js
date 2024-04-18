// 登录刷新

module.exports = async (query, request) => {
  query.cookie.os = 'ios'
  query.cookie.appver = '9.0.65'
  let result = await request(
    'POST',
    `https://music.163.com/weapi/login/token/refresh`,
    {},
    {
      crypto: 'weapi',
      uaType: 'pc',
      cookie: query.cookie,
      ua: query.ua || '',
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
  if (result.body.code === 200) {
    result = {
      status: 200,
      body: {
        ...result.body,
        cookie: result.cookie.join(';'),
      },
      cookie: result.cookie,
    }
  }
  return result
}
