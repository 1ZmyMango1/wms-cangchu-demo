import axios from '../utils/request'

// 待办信息
export const getEnter = () => {
  return axios({
    url: '/ips/home/todo',
    method: 'GET'
  })
}
