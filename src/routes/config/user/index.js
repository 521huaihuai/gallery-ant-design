import React from 'react'
import { connect } from 'dva'
import Filter from './Filter';
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import { routerRedux } from 'dva/router'

const ConfigUser = ({ location, dispatch, configuser, loading }) => {
    location.query = queryString.parse(location.search)
    const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = configuser

    const filterProps = {
        regions: configuser.regions,
        onFilterChange(value) {
            dispatch({
                type: 'configuser/query',
                payload: {
                    ...value
                },
            })
        },
        onSearch(fieldsValue) {
            fieldsValue.keyword.length ? dispatch(routerRedux.push({
                pathname: '/user',
                search: queryString.stringify({
                    field: fieldsValue.field,
                    keyword: fieldsValue.keyword,
                }),
            })) : dispatch(routerRedux.push({
                pathname: '/user',
            }))
        },
        onAdd() {
            dispatch({
                type: 'user/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        }
    }

    const listProps = {
        dataSource: list,
        loading: loading.effects['configuser/query'],
        pagination,
        location,
        onChange(page) {
            const { query, pathname } = location
            dispatch(routerRedux.push({
                pathname,
                search: queryString.stringify({
                    ...query,
                    page: page.current,
                    pageSize: page.pageSize,
                }),
            }))
        },
        onDeleteItem(id) {
            dispatch({
                type: 'user/delete',
                payload: id,
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'user/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            })
        },
        rowSelection: {
            selectedRowKeys,
            onChange: (keys) => {
                dispatch({
                    type: 'user/updateState',
                    payload: {
                        selectedRowKeys: keys,
                    },
                })
            },
        },
    }

    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
        </Page>
    );
}

export default connect(({ configuser, loading }) => ({ configuser, loading }))(ConfigUser)