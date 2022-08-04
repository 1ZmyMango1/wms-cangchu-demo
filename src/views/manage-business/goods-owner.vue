<template>
  <div>
    <div class="divHead">
      <el-card>
        <el-form
          ref="form"
          :label-position="labelPosition"
          :model="goodsItem"
          :rules="rules"
          label-width="80px"
        >
          <!-- 仓库编码 -->
          <div class="details-top">
            <div class="storage">
              <el-form-item label="货主编号" prop="like_code">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="goodsItem.like_code"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="货主名称" prop="like_name">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="goodsItem.like_name"
                ></el-input>
              </el-form-item>
            </div>

            <div class="storage">
              <el-form-item label="联系人" prop="personName">
                <el-input
                  placeholder="请输入"
                  style="width: 300px"
                  v-model="goodsItem.personName"
                ></el-input>
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
              $router.push(
                '/manage-business/goods-owner/goods-ownerDetails/null'
              )
            "
            >新增库区</el-button
          >
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="code" label="货主编号"> </el-table-column>
          <el-table-column prop="name" label="货主名称"> </el-table-column>
          <el-table-column prop="personName" label="联系人"> </el-table-column>
          <el-table-column prop="phone" label="联系人电话"> </el-table-column>
          <el-table-column prop="email" label="联系邮箱"> </el-table-column>
          <el-table-column label="省/市/区" prop="location"> </el-table-column>
          <el-table-column prop="address" label="详细地址"> </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column prop="date" label="操作" fixed="right">
            <template v-slot="{ row }">
              <el-button type="text" @click="editItem(row.id)">编辑</el-button>
              <el-button type="text" @click="isStatus(row)">{{
                row.status === 1 ? '停用' : '启用'
              }}</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-row type="flex" justify="center" style="margin-top: 30px">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="goodsItem.current"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="goodsItem.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList, getEditGoods } from '../../api/goods'
export default {
  data() {
    return {
      labelPosition: 'top',
      input: '',
      tableData: [],
      currentPage4: 1,
      total: 0,
      goodsItem: {
        id: '',
        like_code: '',
        like_name: '',
        like_personName: '',
        size: 5,
        current: 1,
        descs: 'createTime'
      },
      rules: {},
      selectKeys: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 查询货主管理
    async getGoodsList() {
      const res = await getGoodsList(this.goodsItem)
      // console.log(res)
      this.tableData = res.data.data.records
      this.total = res.data.data.total - 0
    },
    sizeChange(page) {
      this.goodsItem.current = page
      this.getGoodsList()
    },
    currentChange(page) {
      this.goodsItem.size = page
      this.getGoodsList()
    },

    // 停用/启用
    async isStatus(row) {
      await this.$confirm(
        `确定要 ${row.status === 1 ? '停用' : '启用'}: ${row.name}吗？`
      )
      const data = {
        id: row.id,
        status: row.status === 1 ? 0 : 1
      }
      await getEditGoods(data)
      this.getGoodsList()
    },

    // 搜索 / 重置
    async search() {
      await getGoodsList(this.goodsItem)
      this.getGoodsList()
    },
    reset() {
      this.$refs.form.resetFields()
      this.getGoodsList()
    },

    // 编辑
    editItem(row) {
      this.$router.push({
        path: '/manage-business/goods-owner/goods-ownerDetails/null',
        query: { row }
      })
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
