/******************************************************************************
 *  
 *  文件名: List.js
 *  作　者: 风小邪
 *  版  本: 
 *  日　期: 2018.02.24
 *  说　明: 展示用户列表信息
******************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, ...tableProps }) => {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            className: styles.avatar,
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            className: styles.avatar,
        }, {
            title: '角色名',
            dataIndex: 'rolename',
            key: 'rolename',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '电话',
            dataIndex: 'tel',
            key: 'tel',
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
                rowKey={record => record.id}
            />
        </div>
    )
}

List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
}

export default List
