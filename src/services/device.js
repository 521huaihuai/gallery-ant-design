/******************************************************************************
 *  
 *  文件名: services\device.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.03.07
 *  说　明: 设备管理，功能包括如下:
 *      查询列表，编辑，新建，删除
 * 
******************************************************************************/

import { request, config } from 'utils';
import qs from 'qs';
import queryString from 'query-string'

const { api } = config
const { device, devices } = api

/**
 * 查询列表
 * @param {*查询参数} params 
 */
export async function query(params) {
    return request({
        url: `${devices}?${queryString.stringify(params)}`,
        method: 'get',
    })
}

/**
 * 创建
 * @param {*} params 
 */
export async function create(params) {
    return request({
        url: device,
        method: 'post',
        data: params
    })
}

/**
 * 删除
 * @param {*} params 
 */
export async function remove(params) {
    console.log(params);
    return request({
        url: `${device}?${queryString.stringify(params)}`,
        method: 'delete',
    })
}

/**
 * 更新
 * @param {*} params 
 */
export async function update(params) {
    return request({
        url: device,
        method: 'put',
        data: params
    })
}
