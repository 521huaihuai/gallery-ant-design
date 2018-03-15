///单个检查对象
import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, WhiteSpace, Flex } from 'antd-mobile';
import styles from './inspectionTargets.less'
const Item = List.Item;
const Brief = Item.Brief;

const InspectionTargets = (props) => {
    const { list } = props;

    console.log(list);
    console.log(list.length);

    let dispList = [];
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let distance=item.distance;
        if(distance>=0&&distance<1000){
            distance="距离"+parseInt(distance)+"米"

        }else{
            distance="距离"+(distance/1000).toFixed(1)+"千米"
        }


        dispList.push(
            <div key={item.tid}>
                <WhiteSpace />
                <List>
                    <Item>{item.name}</Item>
                    <Item><Brief>{distance}</Brief></Item>
                    <Item>
                        <Flex>
                            <Flex.Item ><div className={styles.listItem}><a href={"/inspectiontarget/collect/tid="+item.tid} >信息详情</a></div></Flex.Item>
                            <Flex.Item ><div className={styles.listItem}><a href={"/inspectiontarget/records/tid="+item.tid} >检查记录</a></div></Flex.Item>
                            <Flex.Item ><div className={styles.listItem1}><a href={"/inspectiontarget/inspect/iid="+item.iid} >开展检查</a></div></Flex.Item>
                        </Flex>
                    </Item>
                </List>
            </div>
        );
    }

    return (
        <div>
            {dispList}
        </div>
    )
}

export default InspectionTargets;