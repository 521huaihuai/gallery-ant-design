/******************************************************************************
 *  
 *  文件名: List.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.02.28
 *  说　明: 展示布控列表
 * 
******************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import { DropOption } from 'components'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {///定位还没实现
        } else if (e.key === '3') {
            confirm({
                title: '确认删除该记录吗,该操作不可逆?',
                onOk() {
                    onDeleteItem(record.code)
                },
            })
        }
    }

    const columns = [
        // {
        //     title: '对象类型',
        //     dataIndex: 'typestr',
        //     key: 'typestr',
        //     className: styles.avatar,
        // },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            className: styles.avatar,
        }, {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '地址',
            dataIndex: 'addr',
            key: 'addr',
        }, {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '状态',
            dataIndex: 'statusstr',
            key: 'statusstr',
        }, {
            title: '上线时间',
            dataIndex: 'onlinetime',
            key: 'onlinetime',
        }, {
            title: '离线时间',
            dataIndex: 'offlinetime',
            key: 'offlinetime',
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[
                    { key: '1', name: '修改' },
                    { key: '2', name: '定位' },
                    { key: '3', name: '删除' }]} />
            },
        },
    ]

    return (
        <div>
            <Table
                {...tableProps}
                className={classnames({ [styles.table]: true })}
                bordered
                columns={columns}
                simple
                rowSelection={null}
                rowKey={record => record.code}
            />
        </div>
    )
}

List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
}

export default List
