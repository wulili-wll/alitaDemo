import { connect } from 'dva';
import React, { Component } from 'react';

import { HeroModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';
import { Row, Col, Radio, Card } from 'antd';

import BannerItem from '@/components/BannerItem';

const RadioGroup = Radio.Group;
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}
interface PageState {

};

@connect(({ hero }) => ({ hero }))
class Page extends Component<PageProps, PageState> {
  state: PageState = {

  };

  onClickRadio = (event) => {
    this.props.dispatch({
      type: 'hero/getListByHeroType',
      payload: {
        heroType: event.target.value
      }

    })
  }

  onItemHover = (event) => {

    this.props.dispatch({
      type: 'hero/save',
      payload: {
        itemHover: event
      }
    })

  }
  render() {
    const {
      hero: { heroList, bannerList, itemHover },
    } = this.props;
    return <div className={styles.pageContent}>

      <div className={styles.info}>
        <Row className={styles.freehero}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {bannerList.map((data, index) => {
                return (
                  <BannerItem
                    data={data}
                    itemHover={itemHover}
                    onItemHover={this.onItemHover}
                    thisIndex={index}
                    key={index}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </div>

      <Card className={styles.radioPanel}>
        <RadioGroup>
          {heroType.map(item => (
            <Radio value={item.key} key={`hero-rodio-${item.key}`} onClick={this.onClickRadio}>
              {item.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>

      <Row>
        {heroList.map(item => (
          <Col key={item.ename} span={3} className={styles.heroItem}>
            <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`} />
            <p>{item.cname}</p>
          </Col>
        ))}
      </Row>
    </div>;
  }
}

export default Page;
