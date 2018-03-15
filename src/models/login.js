import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import config from 'config'
import { message } from 'antd'
const { prefix } = config

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      ///进行登录
      const data = yield call(login, payload)
      ///
      const { locationQuery } = yield select(_ => _.app)
      if (data.code === 200) {
        const { from } = locationQuery
        window.localStorage.setItem(`${prefix}login`, 'true');
        ///登录控制
        yield put({ type: 'app/query', payload: data })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/device'))
        }
      } else {
        /**
         * 提示登录错误信息
         */
        message.error(data.message);
      }
    },
  },

}
