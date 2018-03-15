/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update } from 'services/user'
import * as usersService from 'services/users'
import * as regionService from 'services/region'
import queryString from 'query-string'
import { pageModel } from '../common'

const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'configuser',

  state: {
    /**
     * 组织级联选择器数据
     */
    regions: [],
    /**
     * 组织级联选择器是否完成初始化
     */
    regionInitial: false,
  },
  subscriptions: {
    ///初始化页面加载的时候监听事件，确认调用函数
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/config/user') {
          dispatch({
            type: 'initialPage',
          })
        }
      })
    },
  },
  effects: {
    * query({ payload = {} }, { select, call, put }) {
      ///查询数据
      const data = yield call(query, payload)
      ///返回数据
      if (data.code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: 1,
              pageSize: data.data.length,
              total: data.data.length,
            },
          },
        })
      }
    },
    /**
     * 初始化页面，包括以下功能
     * 组织级联选择器
     * 获取组织结构，初始化config
     */
    *initialPage({ }, { select, call, put }) {
      /**
       * 组织级联选择器
       */
      const regionInitial = yield select(({ configuser }) => configuser.regionInitial)
      if (regionInitial === false) {
        const result = yield call(regionService.queryByCache, {})
        if (result.data) {
          var arrayList = regionService.list2CascaderOptions(result.data);
          yield put({
            type: 'updateState',
            payload: {
              regions: arrayList,
              regionInitial: true
            },
          })
        }
      }
    },
  },
  reducers: {

  },
})
