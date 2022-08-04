<template>
  <div>
    <el-card>
      <el-form
        :label-position="labelPosition"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <div class="reservoir">
          <div class="reservoir-input">
            <el-form-item label="库区编号" prop="code">
              <el-input
                v-model="form.code"
                style="width: 240px"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="所属仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="请选择">
                <el-option
                  v-for="item in selectKeys"
                  :key="item.value"
                  :label="item.warehouseName"
                  :value="item.warehouseId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="库区名称" prop="name">
              <el-input v-model="form.name" style="width: 240px"></el-input>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="form.temperatureType" placeholder="请选择">
                <el-option
                  v-for="item in selectTemperatureType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="reservoir">
          <div class="reservoir-input">
            <el-form-item label="承重类型" prop="bearingType">
              <el-select v-model="form.bearingType" placeholder="请选择">
                <el-option
                  v-for="item in selectBearingType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="用途属性" prop="useType">
              <el-select v-model="form.useType" placeholder="请选择">
                <el-option
                  v-for="item in selectUseType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="负责人" prop="personName">
              <el-input
                v-model="form.personName"
                style="width: 240px"
              ></el-input>
            </el-form-item>
          </div>

          <div class="reservoir-input">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" style="width: 240px"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="activity">
          <div class="activity-status">
            <el-form-item label="活动名称" prop="status">
              <template>
                <el-radio v-model="form.status" :label="0">启用</el-radio>
                <el-radio v-model="form.status" :label="1">使用</el-radio>
              </template>
            </el-form-item>
          </div>
        </div>

        <el-row type="flex" justify="center" style="margin-top: 30px">
          <el-form-item>
            <template>
              <el-button round>返回</el-button>
              <el-button type="warning" round @click="submit">提交</el-button>
            </template>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getNextName } from '../../../api/warehouse'
import {
  getReservoirList,
  getAddArea,
  getReservoirId,
  getEditList
} from '../../../api/reservoirArea'
export default {
  data() {
    return {
      labelPosition: 'top',
      selectKeys: [], // 所属仓库
      selectTemperatureType: [
        {
          label: '常温',
          value: 'CW'
        },
        {
          label: '冷藏',
          value: 'LC'
        },
        {
          label: '恒温',
          value: 'HW'
        }
      ], // 温度类型
      selectBearingType: [
        {
          label: '重型',
          value: 'ZX'
        },
        {
          label: '中型',
          value: 'OX'
        },
        {
          label: '轻型',
          value: 'QX'
        }
      ], // 承重类型
      selectUseType: [
        {
          label: '入库缓存区',
          value: 'RKHCQ'
        },
        {
          label: '出库缓存区',
          value: 'CKHCQ'
        },
        {
          label: '存储区',
          value: 'CCQ'
        },
        {
          label: '分拣区',
          value: 'FJQ'
        },
        {
          label: '质检区',
          value: 'ZJQ'
        }
      ], // 用途属性
      form: {
        code: '', // 库区编号
        warehouseId: '', // 所属仓库
        name: '', // 库区名称
        temperatureType: '', // 温度类型
        bearingType: '', // 承重类型
        useType: '', // 用途属性
        personName: '', // 负责人
        phone: '', // 联系电话
        status: '' // 状态
      },
      rules: {
        code: [{ required: true, message: '请输入库区编号', trigger: 'blur' }], // 库区编号
        warehouseId: [
          { required: true, message: '请输入所属仓库', trigger: 'blur' }
        ], // 所属仓库
        name: [{ required: true, message: '请输入库区名称', trigger: 'blur' }], // 库区名称
        temperatureType: [
          { required: true, message: '请输入温度类型', trigger: 'blur' }
        ], // 温度类型
        bearingType: [
          { required: true, message: '请输入承重类型', trigger: 'blur' }
        ], // 承重类型
        useType: [
          { required: true, message: '请输入用途属性', trigger: 'blur' }
        ], // 用途属性
        personName: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ], // 负责人
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: 'blur',
            message: '手机号输入不正确'
          }
        ], // 联系电话
        status: [{ required: true, message: '请输入状态', trigger: 'blur' }] // 状态
      }
    }
  },
  created() {
    this.getNextName()
    this.getReservoirList()
    this.getReservoirId()
  },

  methods: {
    // 查询所属仓库
    async getReservoirList() {
      const res = await getReservoirList(this.form)
      //   console.log(res)
      this.selectKeys = res.data.data.records
    },
    // 判断是编辑/新增
    async getReservoirId() {
      //   console.log(this.$route.query.row)
      if (this.$route.query.row !== 'null') {
        const res = await getReservoirId(this.$route.query.row)
        this.form = res.data.data
      }
    },

    // 提交
    async submit() {
      try {
        this.$refs.form.validate()
        // 新增/编辑
        if (this.$route.query.row !== 'null') {
          await getEditList(this.form)
        } else {
          await getAddArea(this.form)
        }
        // 提示 跳转页面
        this.$message.success('提交成功')
        this.$router.push({
          path: '/manage-base-info/area'
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 库区编码
    async getNextName() {
      const res = await getNextName('KQ')
      //   console.log(res)
      this.form.code = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
.reservoir {
  display: flex;
  .reservoir-input {
    margin-right: 30px;
    margin-left: 30px;
  }
}

.activity {
  .activity-status {
    margin-left: 30px;
  }
}
</style>
