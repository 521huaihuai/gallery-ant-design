/******************************************************************************
 *  
 *  文件名: device\index.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.02.28
 *  说　明: 布控管理，功能包括如下:
 *      查询列表，编辑，新建，删除
 * 
******************************************************************************/

import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import Filter from './Filter'
import List from './List'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import Modal from './Modal'

const Device = ({ location, dispatch, device, loading }) => {
    location.query = queryString.parse(location.search)

    const { list, pagination, currentItem, modalVisible, modalType, } = device
    const { pageSize } = pagination

    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects['device/update'],
        title: `${modalType === 'create' ? '新增设备' : '编辑设备'}`,
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: `device/${modalType}`,
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'device/hideModal',
            })
        },
    }

    const listProps = {
        dataSource: list,
        loading: loading.effects['device/query'],
        pagination,
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
        }, onDeleteItem(code) {
            dispatch({
                type: 'device/delete',
                payload: code,
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'device/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            })
        }
    }

    const filterProps = {
        onFilterChange(value) {
            dispatch(routerRedux.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    ...value,
                    page: 1,
                    pageSize,
                }),
            }))
        },
        onAdd() {
            dispatch({
                type: 'device/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        }
    }

    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
        </Page>
    );
}

export default connect(({ device, loading }) => ({ device, loading }))(Device)