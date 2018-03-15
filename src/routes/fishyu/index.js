import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Button, Icon, Row, Col, Breadcrumb } from 'antd';
import { Dropdown, Menu } from 'antd';
import { Steps } from 'antd';
import StepExt from './StepExt/StepExt'

const FishYu = ({ location, dispatch, fishyu, loading }) => {
    location.query = queryString.parse(location.search)

    const { list, pagination, currentItem, modalVisible, modalType, } = fishyu
    const { pageSize } = pagination
    const Step = Steps.Step;

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );

    const stepProps = {
    }

    return (
        <Page inner>

            {/* <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>

            <div>
                <Button type="primary" shape="circle" icon="search" />
                <Button type="primary" icon="search">Search</Button>
                <Button shape="circle" icon="search" />
                <Button icon="search">Search</Button>
                <br />
                <Button shape="circle" icon="search" />
                <Button icon="search">Search</Button>
                <Button type="dashed" shape="circle" icon="search" />
                <Button type="dashed" icon="search">Search</Button>
            </div>


            <br />

            <Icon type="step-backward" />

            <br />
            <Row gutter={16}>
                <Col span={6} />
                <Col span={6} />
                <Col span={6} />
                <Col span={6} />
            </Row> */}

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="http://localhost:8000/eventrecord">事件管理</a></Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>

            <br />
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Click me <Icon type="down" />
                </a>
            </Dropdown>

            <br />
            <br />
            <Steps>
                <Step status="In Progress" title="注册" icon={<Icon type="loading" />} />
                <Step status="wait" title="认证" icon={<Icon type="solution" />} />
                <Step status="wait" title="支付" icon={<Icon type="pay-circle-o" />} />
                <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
            </Steps>

            {/* <StepExt/> */}
            <StepExt />
            {modalVisible}
        </Page>
    );
}

export default connect(({ fishyu, loading }) => ({ fishyu, loading }))(FishYu)