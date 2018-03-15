/******************************************************************************
 *  
 *  文件名: region.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.02.17
 *  说　明: 组织获取接口
******************************************************************************/

import { request, config, addToken } from 'utils'
import qs from 'qs';

const { api, prefix } = config
const { regions } = api

/**
 * 使用windowStorage进行查询
 * 如果存在缓存则直接返回
 * 否则进行查询
 */
export async function queryByCache() {
    if (sessionStorage.getItem(`${prefix}region`) === null) {
        console.log("get Region from server");
        let result = await query();
        sessionStorage.setItem(`${prefix}region`, JSON.stringify(result));
    }

    return JSON.parse(sessionStorage.getItem(`${prefix}region`));
}

export async function query() {
    ///进行密码加密
    return request({
        url: regions,
        method: 'post'
    })
}

/**
 * 大联动系统定制接口
 * 将['330110','33011002','080702','08070202']
 * 转换为星桥街道，南星社区，庆子网格
 * {jd:'星桥街道',sq:'南星社区',wg:'庆子网格'}
 * 其中330110为根节点过滤
 */
export async function array2jdsqwg(values) {
    let reInfo = {
        jd: "",
        sq: "",
        wg: ""
    };
    if (values === undefined) {
        return reInfo;
    }

    let result = await queryByCache();
    console.log(values.length);
    if (values.length > 1) {
        reInfo["jd"] = getNameByCode(result.data, values[1]);
    }
    if (values.length > 2) {
        reInfo["sq"] = getNameByCode(result.data, values[2]);
    }
    if (values.length > 3) {
        reInfo["wg"] = getNameByCode(result.data, values[3]);
    }

    return reInfo;
}

/**
 * 大联动系统定制接口
 * 将['330110','33011002','080702','08070202']
 * 转换为星桥街道，南星社区，庆子网格
 * {jd:'星桥街道',sq:'南星社区',wg:'庆子网格'}
 * 其中330110为根节点过滤
 */
export function jdsqwg2array(item) {
    let reArray = [];
    reArray.push('330110');

    let result = JSON.parse(sessionStorage.getItem(`${prefix}region`)).data;
    let jdcode = getCodeByName(result, item.jd, '', '');
    if (jdcode !== '') {
        reArray.push(jdcode);
        let sqcode = getCodeByName(result, item.jd, item.sq, '');
        if (sqcode !== '') {
            reArray.push(sqcode);
            let wgcode = getCodeByName(result, item.jd, item.sq, item.wg);
            if (wgcode !== '') {
                reArray.push(wgcode);
            }
        }
    }
    console.log(reArray);
    return reArray;
}

export function list2CascaderOptions(list) {
    var level = 100;
    list.forEach(element => {
        if (element.level < level) {
            level = element.level;
        }
    });

    var reList = [];
    list.forEach(element => {
        if (element.level === level) {
            var newItem = {
                value: element.code,
                label: element.name,
                element: element,
                children: []
            };

            initialList(newItem, list);
            reList.push(newItem);
        }
    });
    return reList;
}

/**
 * 初始化列表
 * @param {*} list 
 * @param {*} dict 
 */
function initialList(item, list) {
    list.forEach(element => {
        if (item.element.code === element.parent) {
            var childItem = {
                value: element.code,
                label: element.name,
                element: element,
                children: []
            };
            item.children.push(childItem);
            initialList(childItem, list);
        }
    });
}

function getItemByCode(list, code) {
    let reItem;
    list.forEach(element => {
        if (code === element.code) {
            reItem = element;
        }
    });
    return reItem;
}

function getNameByCode(list, code) {
    let reItem;
    list.forEach(element => {
        if (code === element.code) {
            reItem = element;
        }
    });
    if (reItem !== undefined) {
        return reItem.name;
    } else {
        return "";
    }
}

function getCodeByName(list, jd, sq, wg) {
    if (jd === '') {
        return '';
    }
    let path = '余杭区/' + jd;
    if (sq !== '') {
        path = path + '/' + sq;
    }
    if (wg !== '') {
        path = path + '/' + wg;
    }
    let code = '';
    list.forEach(element => {
        if (path === element.path) {
            code = element.code;
        }
    });
    return code;
}