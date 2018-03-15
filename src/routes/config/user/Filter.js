import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Cascader } from 'antd'

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
    regions,
    onAdd,
    onFilterChange,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
      },
}) => {
    const handleSubmit = (value, selectedOptions) => {
        if (value.length > 0) {
            onFilterChange({
                region: value[value.length - 1]
            });
        }
    }

    var defaultValue = [];
    if (regions.length > 0) {
        defaultValue.push(regions[0].value);
    }
    return (
        <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator('ssxq', { initialValue: defaultValue })(
                    <Cascader
                        options={regions}
                        size="large"
                        style={{ width: '100%' }}
                        placeholder="请选择单位"
                        changeOnSelect={true}
                        onChange={handleSubmit}
                    />)}
            </Col>
            <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                        <Button size="large" type="ghost" onClick={onAdd}>新建</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
};

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func
}

export default Form.create()(Filter)