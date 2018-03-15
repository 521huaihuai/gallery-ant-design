import React from 'react';
import PropTypes from 'prop-types';
import { List, WhiteSpace, Flex, WingBlank, SegmentedControl, InputItem, TextareaItem, Button, } from 'antd-mobile';
// import styles from './inspectionTargets.less'
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;

const InspectionCollects = (props) => {
    const { data } = props;
    const { getFieldProps } = props.form;


    //   let item = data.name;
     console.log(data);
    if (data !== undefined) {
        // console.log(data.address);


        var dispList = (<div>
            <List>
                <InputItem
                    {...getFieldProps('name',
                        { initialValue: data.name, }
                    ) }
                    editable={false}
                >单位名称*</InputItem>
                <InputItem
                    {...getFieldProps('address',
                        { initialValue: data.address, }
                    ) }
                    editable={false}
                >单位地址</InputItem>
                <InputItem
                 {...getFieldProps('address') }
                    clear
                    placeholder="请输入唯一编码"
                >唯一编码</InputItem>
                <InputItem
                    {...getFieldProps('director',
                        { initialValue: data.director, }
                    ) }
                    clear
                    placeholder="请输入负责人"
                >负责人</InputItem>
                <InputItem
                 {...getFieldProps('director' ) }
                    clear
                    placeholder="请输入联系电话"
                >联系电话</InputItem>
                <InputItem
                  {...getFieldProps('lng' ) }
                  editable={false}
                    value={data.lng + "," + data.lat}
                >定位
                    </InputItem>
                <TextareaItem
                 {...getFieldProps('jbms' ) }
                    placeholder="基本描述"
                    rows={5}
                    autoHeight
                    labelNumber={5}
                />
            </List>
            <WhiteSpace size="lg" />
            <Button type="primary" >保存</Button><WhiteSpace />
        </div>
        )
    }

    return (
        <div>
            {dispList}
        </div>
    )
}
const Collects = createForm()(InspectionCollects);
export default Collects;