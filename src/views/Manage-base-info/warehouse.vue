<template>
  <div>
    <div class="divHead">
      <el-card>
        <el-form
          ref="form"
          :label-position="labelPosition"
          :model="page"
          :rules="rules"
          label-width="80px"
        >
          <!-- 仓库编码 -->
          <div class="details-top">
            <div class="storage">
              <el-form-item label="仓库编号" prop="like_code">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="page.like_code"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="仓库名称" prop="like_name">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="page.like_name"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="仓库状态" prop="status">
                <el-select v-model="page.status" placeholder="请选择">
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
            @click="$router.push('/manage-base-info/warehouse/details/null')"
            >新增库区</el-button
          >
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="code" label="仓库编码"> </el-table-column>
          <el-table-column prop="name" label="仓库名称"> </el-table-column>
          <el-table-column prop="type" label="仓库类型">
            <template v-slot="{ row }">
              <span v-if="row.type === 'ZZ'">中转仓</span>
              <span v-else-if="row.type === 'JG'">加工仓</span>
              <span v-else-if="row.type === 'CB'">储备仓</span>
              <span v-else>冷藏仓</span>
            </template>
          </el-table-column>
          <el-table-column prop="location" label="省/市/区"> </el-table-column>
          <el-table-column prop="address" label="详细地址"> </el-table-column>
          <el-table-column label="仓库状态">
            <template v-slot="{ row }">
              <span v-if="row.status === 1">启用</span>
              <span v-else>停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="surface" label="仓库面积"> </el-table-column>
          <el-table-column prop="includedNum" label="库区数量">
          </el-table-column>
          <el-table-column prop="personName" label="负责人"> </el-table-column>
          <el-table-column prop="phone" label="联系电话"> </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column prop="date" label="操作" fixed="right">
            <template v-slot="{ row }">
              <el-button type="text" @click="editItem(row.id)">编辑</el-button>
              <el-button type="text" @click="isStatus(row)">
                {{ row.status === 1 ? '停用' : '启用' }}
              </el-button>
              <el-button type="text" @click="delItem(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-row type="flex" justify="center" style="margin-top: 30px">
        <!-- 分页 -->
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.current"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getWarehouseItem, getEditWarehouse } from '../../api/warehouse'
export default {
  data() {
    return {
      input: '',
      tableData: [],
      total: 0,
      page: {
        size: 5,
        current: 1,
        like_name: '',
        like_code: '',
        descs: 'createTime',
        status: ''
      },
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
      rules: {
        code: [],
        name: [],
        status: []
      }
    }
  },
  created() {
    this.getWarehouseItem()
    // const num = 0
    // if (num) {
    //   console.log(1)
    // } else {
    //   console.log(2)
    // }
  },
  methods: {
    // 分页查询仓库
    async getWarehouseItem() {
      const { data } = await getWarehouseItem(this.page)
      this.tableData = data.data.records
      this.total = data.data.total - 0
    },
    sizeChange(page) {
      this.page.current = page
      this.getWarehouseItem()
    },
    currentChange(page) {
      this.page.size = page
      this.getWarehouseItem()
    },
    // 删除
    async delItem() {
      // 提示
      this.$notify({
        title: '提示',
        message: ('i', { style: 'color: teal' }, '演示系统，不支持此操作')
      })
    },

    // 搜索
    async search() {
      await getWarehouseItem(this.page)
      this.getWarehouseItem()
    },
    // 重置
    reset() {
      this.$refs.form.resetFields()
      this.getWarehouseItem()
    },

    // 添加 编辑  ---通过插槽传id  --路由传参
    editItem(row) {
      // console.log(row)
      this.$router.push({
        path: '/manage-base-info/warehouse/details/null',
        query: { row }
      })
    },
    // 修改状态
    async isStatus(row) {
      await this.$confirm(
        `确定要 ${row.status === 1 ? '停用' : '启用'}：${row.name}吗？`
      )
      console.log(row)
      const data = {
        id: row.id,
        status: row.status === 0 ? 1 : 0
      }
      await getEditWarehouse(data)
      this.getWarehouseItem()
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
