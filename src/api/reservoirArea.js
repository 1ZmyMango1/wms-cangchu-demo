import axios from '../utils/request.js'

// 分页查询库区详细信息
export const getReservoirList = (data) => {
  return axios({
    url: '/api/area/pageDetail',
    params: data
  })
}

// 添加库区
export const getAddArea = (data) => {
  return axios({
    url: '/api/area',
    method: 'POST',
    data
  })
}

// 根据id查询库区
export const getReservoirId = (id) => {
  return axios({
    url: `/api/area/${id}`,
    method: 'GET'
  })
}

// 修改库区
export const getEditList = (data) => {
  return axios({
    url: 'api/area',
    method: 'PUT',
    data
  })
}
