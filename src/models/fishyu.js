/******************************************************************************
 *  @文件名: fishyu.js 
 *  @作　者: zjm 
 *  @日　期: 2018-03-14 10:45:36 
 *  @修改人: zjm 
 *  @修  改: 2018-03-14 10:45:36 
 *  @说  明: 模板
 ******************************************************************************/

import modelExtend from 'dva-model-extend'
import { config } from 'utils'
// import { query, create, remove, update } from 'services/eventRecord'
import { pageModel } from 'models/common'
import queryString from 'query-string'
import { getValueByK } from 'services/dict'

export default modelExtend(pageModel, {
    namespace: 'fishyu',

    state: {
        currentItem: {},
        modalType: 'create',
    }, subscriptions: {
        ///初始化页面加载的时候监听事件，确认调用函数
        setup({ dispatch, history }) {
            history.listen((location) => {
                // if (location.pathname === '/fishyu') {
                //     dispatch({
                //         type: 'query',
                //         payload: queryString.parse(location.search),
                //     })
                // }
            })
        },
    },
    effects: {
        * query() { }
    },
    reducers: {
    },
})
