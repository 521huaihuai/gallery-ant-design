/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
import * as menusService from 'services/menus'
import queryString from 'query-string'
import { cacheDict, getValueByK } from 'services/dict'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    /// 此处需要做出服务端接口，等待俞健实现
    menu: [
       {
        id: 1003,
        bpid: 1000,
        mpid: 1000,
        name: '设备管理',
        icon: 'user',
        route: '/device',
        authority: 1000
      },
      {
        id: 1004,
        bpid: 1000,
        mpid: 1000,
        name: '设备管理',
        icon: 'user',
        route: '/fishyu',
        authority: 1000
      }
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    ///在每次加载页面的时候都会调用这个函数,原代码在此处进行权限校验,此处修改,相应的menu,用户信息存入session,后续如果未传入payload则直接将信息读取出来,否则异常
    * query({
      payload,
    }, { call, put, select }) {
      ///查询当前用户，此处无必要，在我们的登录中直接返回了相应的信息
      // const { success, user } = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (window.localStorage.getItem(`${prefix}login`) === "true") {
        ///已经登录进行初次初始化,后续不再进行权限判断校验,在Api中服务端有做用户权限判断,此处取消重复判断
        ///在第一次获取的时候对menu进行初始化,并且将信息存入window.localStorage
        if (payload !== undefined) {
          yield cacheDict();
          let user = payload.data;
          ///查询菜单
          user.permissions = {};
          user.auth = [
            {
              authcode: 1000,
              active: 1
            }
          ];
          const { permissions, auth } = user;
          permissions.visit = auth.filter(item => item.active)
            .map(item => item.authcode);
          window.localStorage.setItem(`${prefix}user`, JSON.stringify(user));
        }
        
        ///直接从session中取出相应的对象
        let user = JSON.parse(window.localStorage.getItem(`${prefix}user`));
        const { permissions } = user;
        const app = yield select(_ => _.app)
        /**
         * 按照权限进行过滤
         */
        let menu = app.menu.filter(item => {
          ///用户配置页面
          let findItem = permissions.visit.find(p => p === item.authority);
          if (findItem !== undefined) {
            return true;
          } else {
            return false;
          }
        });
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: '/dashboard',
          }))
        }
      } else {
        yield put(routerRedux.push({
          pathname: '/login'
        }))
      }
    },

    * logout({
      payload,
    }, { call, put }) {
      ///服务端未支持登出
      // const data = yield call(logout, parse(payload))
      if (true) {
        window.localStorage.setItem(`${prefix}login`, "false");
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    * changeNavbar(action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
