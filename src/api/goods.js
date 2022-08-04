import axios from '../utils/request'

// 查询全部货主管理
export const getGoodsList = (data) => {
  return axios({
    url: '/api/owner/page',
    method: 'GET',
    params: data
  })
}

// 根据id查询货主管理
export const getIdGoods = (id) => {
  return axios({
    url: `/api/owner/${id}`
  })
}

// 添加货主管理
export const getAddGoods = (data) => {
  return axios({
    url: '/api/owner',
    method: 'POST',
    data
  })
}

// 修改货主管理
export const getEditGoods = (data) => {
  return axios({
    url: '/api/owner',
    method: 'PUT',
    data
  })
}
