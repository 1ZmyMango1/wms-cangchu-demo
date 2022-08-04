<template>
  <div>
    <div class="divHead">
      <div class="storage">
        <div class="storage-text">仓库编号</div>
        <el-input
          v-model="input"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>

      <div class="storage">
        <div class="storage-text">仓库名称</div>
        <el-input
          v-model="input"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>

      <div class="storage">
        <div class="storage-text">仓库状态</div>
        <el-input
          v-model="input"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="button">
        <template>
          <el-button type="warning" round>搜索</el-button>
          <el-button round>重置</el-button>
        </template>
      </div>
    </div>

    <el-card>
      <template>
        <div class="add-warehouse">
          <el-button type="success" round>新增库区</el-button>

          <!-- <div class="download">
            <el-button round>下载库区模板</el-button>
            <el-button round>导入库区信息</el-button>
          </div> -->
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="code" label="仓库编码"> </el-table-column>
          <el-table-column prop="name" label="仓库名称"> </el-table-column>
          <el-table-column prop="date" label="仓库类型">
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
              <span v-if="row.status === '1'">启用</span>
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
            <template>
              <el-button type="text">编辑</el-button>
              <el-button type="text">停用</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-row>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getWarehouseList } from '../../api/warehouse'
export default {
  data() {
    return {
      input: '',
      tableData: [],
      currentPage4: 1
    }
  },
  created() {
    this.getWarehouseList()
  },
  methods: {
    async getWarehouseList() {
      const res = await getWarehouseList()
      console.log(res)
      this.tableData = res.data.data
    },
    sizeChange() {},
    currentChange() {}
  }
}
</script>

<style scoped lang="less">
.divHead {
  height: 127px;
  background: #fff;
  border-radius: 12px;
  // box-shadow: 0 0 6px 0rgba (144, 142, 142, 0.17);
  padding: 30px;
  display: flex;
  box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
  border-radius: 12px;
  margin-bottom: 20px;
  .storage {
    margin-top: 25px;
    margin-right: 20px;
    .storage-text {
      color: #ab98c2;
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
  .button {
    margin-left: 300px;
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
