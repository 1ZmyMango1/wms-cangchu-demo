<template>
  <div>
    <div class="divHead">
      <el-card>
        <el-form
          ref="form"
          :label-position="labelPosition"
          :model="locationItem"
          :rules="rules"
          label-width="80px"
        >
          <!-- 库区名称 -->
          <div class="details-top">
            <div class="storage">
              <el-form-item label="库区名称" prop="areaName">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="locationItem.areaName"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="库位名称" prop="name">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="locationItem.name"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="库位状态">
                <el-select
                  placeholder="请选择"
                  value=""
                  v-model="locationItem.status"
                >
                  <el-option
                    v-for="item in selectKeys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="button">
              <template>
                <el-button type="warning" round @click.native="search"
                  >搜索</el-button
                >
                <el-button round @click="reset">重置</el-button>
              </template>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>

    <el-card>
      <template>
        <div class="add-warehouse">
          <el-button
            type="success"
            round
            @click="
              $router.push('/manage-base-info/warehouse/locationDetails/null')
            "
            >新增库区</el-button
          >

          <div class="download">
            <el-button round>下载库区模板</el-button>
            <el-button round>导入库区信息</el-button>
          </div>
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="warehouseName" label="所属仓库">
          </el-table-column>
          <el-table-column prop="areaCode" label="库区编号"> </el-table-column>
          <el-table-column prop="areaName" label="库区名称"> </el-table-column>
          <el-table-column prop="code" label="库区编号"> </el-table-column>
          <el-table-column prop="name" label="库位名称"> </el-table-column>
          <el-table-column label="温度类型">
            <template v-slot="{ row }">
              <span v-if="row.temperatureType === 'CW'">常温</span>
              <span v-else-if="row.temperatureType === 'LC'"></span>
              <span v-else>恒温</span>
            </template>
          </el-table-column>
          <el-table-column prop="bearingType" label="承重类型">
            <template v-slot="{ row }">
              <span v-if="row.bearingType === 'ZX'">重型</span>
              <span v-else>轻型</span>
            </template>
          </el-table-column>
          <el-table-column prop="useType" label="用途属性">
            <template v-slot="{ row }">
              <span v-if="row.useType === 'RKHCQ'">入库缓存区</span>
              <span v-else-if="row.useType === 'CKHCQ'">出库缓存区</span>
              <span v-else-if="row.useType === 'CCQ'">存储区</span>
              <span v-else-if="row.useType === 'FJQ'">分拣区</span>
              <span v-else>质检区</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="停用状态">
            <template v-slot="{ row }">
              <span v-if="row.status === '1'">启用</span>
              <span>停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="maxNum" label="承载上限"> </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column prop="date" label="操作" fixed="right">
            <template v-slot="{ row }">
              <el-button type="text" @click="editItem(row.id)">编辑</el-button>
              <el-button type="text" @click="isStatus(row)">
                {{ row.status === 0 ? '启用' : '停用' }}
              </el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-row type="flex" justify="center" style="margin-top: 30px">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="locationItem.current"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="locationItem.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+total"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getLocationList, getEditLocation } from '../../api/location'
export default {
  data() {
    return {
      input: '',
      tableData: [],
      currentPage4: 1,
      labelPosition: 'top',
      selectKeys: [
        {
          label: '全部',
          value: null
        },
        {
          label: '停用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ],
      total: 0,
      locationItem: {
        areaName: '',
        name: '',
        current: 1,
        size: 5
      },
      rules: {
        areaName: [],
        name: []
      }
    }
  },
  created() {
    this.getLocationList()
  },
  methods: {
    // 查询具体库位详细信息
    async getLocationList() {
      const res = await getLocationList(this.locationItem)
      // console.log(res)
      this.tableData = res.data.data.records
      this.total = res.data.data.total
    },
    sizeChange(page) {
      this.locationItem.size = page
    },
    currentChange(page) {
      this.locationItem.current = page
    },
    // 搜索 重置
    search() {
      this.getLocationList()
      // this.getLocationList()
    },
    reset() {
      this.$refs.form.resetFields()
      this.getLocationList()
    },

    // 添加/编辑
    editItem(row) {
      this.$router.push({
        path: '/manage-base-info/warehouse/locationDetails/null',
        query: { row }
      })
    },

    // 停用 / 启用
    async isStatus(row) {
      await this.$confirm(
        `确定要 : ${row.status === 1 ? '停用' : '启用'} : ${row.name}吗？`
      )
      const data = {
        id: row.id,
        status: row.status === 1 ? 0 : 1
      }
      await getEditLocation(data)
      this.getLocationList()
    }
  }
}
</script>

<style scoped lang="less">
.divHead {
  margin-bottom: 25px;
  .details-top {
    display: flex;
    .storage {
      margin-right: 30px;
      .storage-text {
        color: #887e7e;
        font-size: 15px;
        margin-bottom: 20px;
      }
    }
  }
  .button {
    margin-top: 50px;
  }
}

.add-warehouse {
  margin-bottom: 20px;
  display: flex;
  .download {
    margin-left: 800px;
  }
}
</style>
