/******************************************************************************
 *  
 *  文件名: models\device.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.03.07
 *  说　明: 设备管理，功能包括如下:
 *      查询，编辑，新建，删除
 * 
******************************************************************************/

import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { query, create, remove, update } from 'services/device'
import { pageModel } from 'models/common'
import queryString from 'query-string'
import { getValueByK } from 'services/dict'

export default modelExtend(pageModel, {
    namespace: 'device',

    state: {
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
    }, subscriptions: {
        ///初始化页面加载的时候监听事件，确认调用函数
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/device') {
                    dispatch({
                        type: 'query',
                        payload: queryString.parse(location.search),
                    })
                }
            })
        },
    },
    effects: {
        /**
         * 
         * 
         * @param {*} param0 
         * @param {*} param1 
         */
        * query({ payload = {} }, { call, put }) {
            ///查询数据
            const data = yield call(query, { ...payload })
            
            // data.data.list.forEach(element => {
            //     element.typestr = getValueByK('controltype', element.type);
            //     element.bklxstr = getValueByK('bklx', element.bklx);
            //     element.info2str = getValueByK('hpys', element.info2);
            // });

            // ///返回数据
            if (data.code === 200) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.list,
                        pagination: {
                            current: data.data.page,
                            pageSize: data.data.size,
                            total: data.data.total,
                        },
                    },
                })
            }
        },
        * create({ payload }, { call, put }) {
            const data = yield call(create, { ...payload })
            if (data.code === 200) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
        * delete({ payload }, { call, put, select }) {
            const data = yield call(remove, { code: payload })
            if (data.code === 200) {
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
        * update({ payload }, { select, call, put }) {
            const data = yield call(update, { ...payload })
            if (data.code === 200) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
    },
    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true }
        },
        hideModal(state) {
            return { ...state, modalVisible: false }
        },
    },
})
