// 精品歌单 tags
module.exports = (query, request) => {
  const data = {}
  return request(
    'POST',
    `https://music.163.com/api/playlist/highquality/tags`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      ua: query.ua || '',
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
