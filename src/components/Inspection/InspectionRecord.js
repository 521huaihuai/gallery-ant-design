import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, WhiteSpace, Flex, WingBlank, SegmentedControl } from 'antd-mobile';
// import styles from './inspectionTargets.less'
const Item = List.Item;
const Brief = Item.Brief;

const InspectionTargets = (props) => {
    const { list } = props;
   
    let dispList = [];
   
    for (let i = 0; i < list.length; i++) { 
        let item = list[i];
        var name=list[i].name;
        let time = item.inspect_time.substr(0, 19)
        let count = parseInt(item.issuenumber);
        let issue = "无问题";
        let rectifydays = item.rectifydays;
        let rectify = " ";
        let color = ""
        if (rectifydays)
            rectify = "整改天数:" + rectifydays;
        if (count) {
            color = "red";
            issue = "存在" + parseInt(count) + "处问题"
        }
        dispList.push(
            <div key={item.rid}  >

                <WhiteSpace />
                <List>
                    <Item><span style={{ color: color }} >
                        {item.category}/{item.type}
                    </span>
                    </Item>
                    <Item>
                        <Brief>
                            检查人：{item.inspecter}
                            <br />
                            检查时间：{time}
                            <br />
                            检查结果:<span style={{ color: color }} > {issue}</span>
                            <br />
                            {rectify}
                        </Brief>
                    </Item>


                </List>
            </div>
        )
    }


    return (
        <div>
            <div style={{textAlign:"center"}} >
            {name}
            </div>
            <WingBlank>
                <SegmentedControl
                    values={['全部', '将到期复查', '待复查']}

                    style={{ height: '40px', width: '100%' }}
                />
            </WingBlank>
            {dispList}
        </div>
    )
}

export default InspectionTargets;