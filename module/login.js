// 邮箱登录

const CryptoJS = require('crypto-js')

module.exports = async (query, request) => {
  const data = {
    username: query.email,
    password: query.md5_password || CryptoJS.MD5(query.password).toString(),
    rememberLogin: 'true',
  }
  let result = await request('POST', `https://music.163.com/api/login`, data, {
    crypto: 'weapi',
    uaType: 'pc',
    cookie: query.cookie,
    ua: query.ua || '',
    proxy: query.proxy,
    realIP: query.realIP,
  })
  if (result.body.code === 502) {
    return {
      status: 200,
      body: {
        msg: '账号或密码错误',
        code: 502,
        message: '账号或密码错误',
      },
    }
  }
  if (result.body.code === 200) {
    result = {
      status: 200,
      body: {
        ...JSON.parse(
          JSON.stringify(result.body).replace(
            /avatarImgId_str/g,
            'avatarImgIdStr',
          ),
        ),
        cookie: result.cookie.join(';'),
      },
      cookie: result.cookie,
    }
  }
  return result
}
