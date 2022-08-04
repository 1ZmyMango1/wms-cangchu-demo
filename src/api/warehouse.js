// import axios from 'axios'
import axios from '../utils/request'

// 查询全部仓库
export const getWarehouseList = () => {
  return axios({
    url: '/api/warehouse/list',
    method: 'GET'
  })
}

// 分页查询仓库
export const getWarehouseItem = (list) => {
  return axios({
    url: '/api/warehouse/page',
    method: 'GET',
    params: list
  })
}

// 添加仓库
export const getAddWarehouse = (data) => {
  return axios({
    url: '/api/warehouse',
    method: 'post',
    data
  })
}

// 删除仓库
export const getDelList = (id) => {
  return axios({
    url: '/api/warehouse',
    method: 'DELETE',
    params: {
      id
    }
  })
}

// 获取下一个编码
export const getNextName = (name) => {
  return axios({
    url: `api/codeFactory/next/${name}`,
    method: 'GET'
  })
}

// 根据id查询仓库
export const getWarehouseId = (id) => {
  return axios({
    url: `/api/warehouse/${id}`,
    method: 'GET'
  })
}

// 修改仓库
export const getEditWarehouse = (data) => {
  return axios({
    url: 'api/warehouse',
    method: 'PUT',
    data
  })
}
