import { request } from 'alita';

/**
 * 请求服务端数据
 */
export async function queryHeroList(): Promise<any> {
    return request('/api/herolist.json');//使用代理--api
}

/**
 * 根据英雄类型获取数据
 */
export async function queryListByHeroType(params): Promise<any> {
    return request('/api/heroType.json', {
        method: 'POST',
        body: JSON.stringify(params),
      });
}


export async function getBannerHeros(params) {
    return request('/api/freeheros.json', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
