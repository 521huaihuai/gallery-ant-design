import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Cascader, Input, Select } from 'antd';
import { FilterItem } from 'components'
import { getTypeDefaultValue, getOptions } from 'services/dict'

const Option = Select.Option;

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16,
    },
}

const TwoColProps = {
    ...ColProps,
    xl: 96,
}

const Filter = ({
    onAdd,
    onFilterChange,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
      },
}) => {
    const handleSubmit = () => {
        let fields = getFieldsValue()
        onFilterChange(fields);
    }

    return (
        <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
                <div>
                    {getFieldDecorator('name', {})(
                        <Input
                            placeholder="设备名称"
                            style={{ width: '100%' }}
                        />)}
                </div>
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
                <div>
                    {getFieldDecorator('code', {})(
                        <Input
                            placeholder="设备编码"
                            style={{ width: '100%' }}
                        />)}
                </div>
            </Col>
            <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                        <Button size="large" type="ghost" onClick={handleSubmit}>查询</Button>
                        <Button size="large" type="ghost" onClick={onAdd}>新建</Button>
                    </div>
                </div>
            </Col>
        </Row >
    )
};

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func
}

export default Form.create()(Filter)