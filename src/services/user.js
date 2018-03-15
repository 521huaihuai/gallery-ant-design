import { request, config } from 'utils'
import qs from 'qs';

const { api } = config
const { user } = api

export async function query(params) {
  let url = addToken(user);
  return request({
    url: url,
    method: 'post',
    data: qs.stringify(params)
  })
}

export async function create(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
