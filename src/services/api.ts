import { request } from 'alita';

/**
 * 请求服务端数据
 */
export async function query(): Promise<any> {
  return request('/api/hello');
}
