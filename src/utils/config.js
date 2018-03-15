const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'

module.exports = {
  name: '碰撞比对服务',
  prefix: '碰撞比对服务',
  footerText: '碰撞比对服务  © 2017 Codvision',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    userLogin: `${APIV3}/auth/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV3}/user`,
    posts: `${APIV1}/posts`,
    user: `${APIV3}/user/:id`,
    menus: `${APIV3}/menus?type=0`,
    weather: `${APIV1}/weather`,
    dingConfig: `${APIV3}/ding/config2`,
    regions: `${APIV3}/region`,
    enterpriseQuery: `${APIV3}/enterprise/all`,
    dictQuery: `${APIV3}/dict`,
    devices: `${APIV3}/devices`,
    device: `${APIV3}/device`,
    fishyus: `${APIV3}/fishyus`,
    fishyu: `${APIV3}/fishyu`,
  },
}