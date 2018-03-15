import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
import { getTypeDefaultValue, getOptions } from 'services/dict'

const FormItem = Form.Item
const TextArea = Input.TextArea

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

const modal = ({
  item = {},
    onOk,
    form: {
    getFieldDecorator,
        validateFields,
        getFieldsValue,
  },
    ...modalProps
}) => {
    const handleOk = () => {
        validateFields((errors) => {
            if (errors) {
                return
            }
            const data = {
                ...getFieldsValue(),
                id: item.id,
            }
            onOk(data)
        })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk,
    }

    return (
        <Modal {...modalOpts}>
            <Form layout="horizontal">
                <FormItem label="名称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="编码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('code', {
                        initialValue: item.code,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="地址" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('addr', {
                        initialValue: item.addr,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>

                <FormItem label="端口" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('port', {
                        initialValue: item.port,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>

                <FormItem label="用户名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue: item.username,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>

                <FormItem label="密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('passwd', {
                        initialValue: item.passwd,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="备注" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('remark', {
                        initialValue: item.remark,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)
