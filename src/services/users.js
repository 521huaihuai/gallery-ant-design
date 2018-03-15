import { request, config } from 'utils'
import qs from 'qs';

const { api } = config
const { users } = api

export async function query(params) {
  
  return request({
    url: users,
    method: 'post',
    data: qs.stringify(params)
  })
}

export async function remove(params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
