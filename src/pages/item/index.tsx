import { connect } from 'dva';
import React, { Component } from 'react';

import { ItemModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

interface PageState {}

@connect(({ item }) => ({ item }))
class Page extends Component<PageProps, PageState> {
  state: PageState  = {};

  render() {
    const {
      item: {  },
    } = this.props;
    return <div className={styles.userCenter}>item</div>;
  }
}

export default Page;
