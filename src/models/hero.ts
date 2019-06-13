import { queryHeroList, getBannerHeros } from '@/services/hero';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface HeroObj {
  cname?: string;
  ename?: string;
  hero_type?: string;
  new_type?: string;
  skin_name?: string;
  title?: string;
}
export interface HeroModelState {
  heroList: HeroObj[];
  tempList: HeroObj[];//临时变量
  bannerList: any;
  itemHover?:number;


}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    getListByHeroType: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}


const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heroList: [],
    tempList: [],
    bannerList: [],
    itemHover:0,
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const res = yield call(queryHeroList, payload);
      // console.info(res);
      if (res) {
        yield put({
          type: 'save',
          payload: {
            heroList: res,
            tempList: res
          },
        });
      }
      const data = yield call(getBannerHeros, { number: 7 });

      if (data) {
        yield put({
          type: 'save',
          payload: {
            bannerList: data,
          },
        })
      }
    },
    *getListByHeroType({ payload }, { call, put, select }) {
      let { heroList, tempList } = yield select(_ => _.hero);
      const heroType = payload.heroType;
      let tempTypeList = tempList.filter(item => (item.hero_type + '') === (heroType + ''));

      heroList = heroType === 0 || heroType === '0' ? tempList : tempTypeList

      yield put({
        type: 'save',
        payload: { heroList },
      });
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'query'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default HeroModel;
