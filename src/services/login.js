import { request, config } from 'utils'
import qs from 'qs';

const { api } = config
const { userLogin } = api

export async function login(data) {
  ///进行密码加密
  return request({
    url: userLogin,
    method: 'post',
    data: qs.stringify({
      username: 'admin',
      password: '123456'
    })
  })
}
