import React from 'react';
import PropTypes from 'prop-types';
import { List, InputItem, Button, Badge, WhiteSpace } from 'antd-mobile';
// import styles from './inspectionTargets.less'
const Item = List.Item;
const Brief = Item.Brief;

const Inspect = (props) => {
    const { list } = props;
    console.log(list)
    let dispList = [];


    for (let i = 0; i < list.length; i++) {
        let item = list[i];

        dispList.push(

            <Item wrap>
                <Badge text={i + 1} style={{ backgroundColor: '#067CE6', marginTop: -3 }} />
                <span style={{ color: '#3337B9' }} >{item.title}</span>
            </Item>

        )
    }


    return (
        <div>
            <List>
                {dispList}
            </List>
            <WhiteSpace size="lg" />
            <Button type="primary" >
                检查完成，提交
            </Button>
            <WhiteSpace />
        </div>
    )
}

export default Inspect;