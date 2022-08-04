import axios from '../utils/request'

// 分页查询库位详细信息
export const getLocationList = (data) => {
  return axios({
    url: '/api/location/pageDetail',
    method: 'GET',
    params: data
  })
}

// 根据id查查询库位
export const getIdLocation = (id) => {
  return axios({
    url: `/api/location/${id}`,
    method: 'GET'
  })
}

// 新增库位
export const getAddLocation = (data) => {
  return axios({
    url: '/api/location',
    method: 'POST',
    data
  })
}

// 修改库位
export const getEditLocation = (data) => {
  return axios({
    url: '/api/location',
    method: 'PUT',
    data
  })
}
