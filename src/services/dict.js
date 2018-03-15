import { request, config, addToken } from 'utils';
import { Select } from 'antd';
import qs from 'qs';

const Option = Select.Option;
const { api, prefix } = config
const { dictQuery } = api

/**
 * 将字典缓存进入session中
 */
export async function cacheDict() {
    let dict = await query();
    window.localStorage.setItem(`${prefix}dict`, JSON.stringify(dict.data.list));
}

/**
 * 进行查询
 */
export async function query() {
    ///进行密码加密
    return request({
        url: dictQuery,
        method: 'post',
        data: qs.stringify({
            page: 1,
            size: 100000
        })
    })
}

/**
 * 根据k获取字典中相应的值
 */
export function getValueByK(type, k) {
    let dict = JSON.parse(window.localStorage.getItem(`${prefix}dict`));

    let findItem = dict.find(element => {
        return element.type === type && element.k === (k + "");
    });
    if (findItem === undefined) {
        return '';
    }
    else {
        return findItem.v;
    }
}

/**
 * 根据k获取字典中相应的值
 */
export function getTypeDefaultValue(type, k) {
    let dict = JSON.parse(window.localStorage.getItem(`${prefix}dict`));

    let findItem = dict.find(element => {
        return element.type === type
    });
    if (findItem === undefined) {
        return '';
    }
    else {
        return findItem.k;
    }
}

export function getOptions(type, all = false) {
    let dict = JSON.parse(window.localStorage.getItem(`${prefix}dict`));

    let reArr = [];
    if (all === true) {
        reArr.push(
            <Option key='-1' value="-1">全部</Option>
        );
    }
    dict.forEach(element => {
        if (element.type == type) {
            reArr.push(
                <Option key={element.k} value={element.k}>{element.v}</Option>
            );
        }
    });
    return reArr
}