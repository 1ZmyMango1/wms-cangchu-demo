<template>
  <div>
    <el-card>
      <el-steps
        :space="800"
        :active="active"
        finish-status="success"
        align-center
      >
        <el-step title="基础信息"></el-step>
        <el-step title="分配库位"></el-step>
      </el-steps>

      <div v-show="active === 0">
        <el-form
          :label-position="labelPosition"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <div class="goods">
            <div class="goods-input">
              <el-form-item label="货主编号" prop="code">
                <el-input
                  v-model="form.code"
                  style="width: 240px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="goods-input">
              <el-form-item label="货主名称" prop="name">
                <el-input v-model="form.name" style="width: 240px"></el-input>
              </el-form-item>
            </div>
            <div class="goods-input">
              <el-form-item label="联系人" prop="personName">
                <el-input
                  v-model="form.personName"
                  style="width: 240px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="goods-input">
              <el-form-item label="联系人电话" prop="phone">
                <el-input v-model="form.phone" style="width: 240px"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="goods">
            <div class="goods-input">
              <el-form-item label="联系人邮箱" prop="email">
                <el-input v-model="form.email" style="width: 240px"></el-input>
              </el-form-item>
            </div>

            <div class="goods-input">
              <el-form-item label="省/市/区" prop="location">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                >
                </el-cascader>
              </el-form-item>
            </div>

            <div class="goods-input">
              <el-form-item label="详细地址" prop="address">
                <el-input
                  v-model="form.address"
                  style="width: 540px"
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="goods">
            <div class="goods-input">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" style="width: 540px"></el-input>
              </el-form-item>
            </div>
          </div>

          <el-row type="flex" justify="center" style="margin-top: 30px">
            <el-form-item>
              <template>
                <el-button
                  round
                  @click="$router.push('/manage-business/goods-owner')"
                  >返回</el-button
                >
                <el-button type="warning" round @click="submit">提交</el-button>
              </template>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <div v-show="active === 1">
        <el-row type="flex" justify="center" style="margin-top: 30px">
          <img src="../../../assets/imgs/empty.png" alt="" />
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 30px">
          <el-button type="info" round @click="active--">上一步</el-button>
          <el-button
            type="warning"
            round
            @click="$router.push('/manage-business/goods-owner')"
            >提交</el-button
          >
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getNextName } from '../../../api/warehouse'
import { getIdGoods, getEditGoods, getAddGoods } from '../../../api/goods'
import {
  regionDataPlus,
  provinceAndCityData,
  CodeToText
} from 'element-china-area-data'
export default {
  data() {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      addressData: provinceAndCityData,
      selectedAddress: [],
      active: 0,
      labelPosition: 'top',
      form: {
        code: '',
        name: '',
        personName: '',
        phone: '',
        email: '',
        location: '',
        address: '',
        remark: '',
        area: '',
        city: '',
        province: ''
      },
      rules: {
        name: [{ required: true, message: '请输入货主名称', trigger: 'blur' }],
        personName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系人手机号', trigger: 'blur' }
        ],
        email: [],
        location: [
          { required: true, message: '请输入省市区', trigger: 'blur' }
        ],
        address: [],
        remark: []
      }
    }
  },
  created() {
    this.getNextName()
    this.getIdGoods()
    // console.log(this.$route.query.row)
  },
  methods: {
    // 判断是否是编辑 呈现数据回显
    async getIdGoods() {
      if (this.$route.query.row !== 'null') {
        const res = await getIdGoods(this.$route.query.row)
        this.form = res.data.data
      }
    },
    async submit() {
      this.$refs.form.validate()
      // 省市区
      const data = this.form.location
      this.form.location = []
      for (let i = 0; i < data.length; i++) {
        const code = data[i]
        this.form.location.push(CodeToText[code])
      }
      this.form.location = this.form.location.join('/')
      this.form.area = data[0]
      this.form.city = data[1]
      this.form.province = data[2]
      // 添加/编辑
      if (this.$route.query.row !== 'null') {
        await getEditGoods(this.form)
      } else {
        await getAddGoods(this.form)
      }
      // 提示 /跳转
      await this.$message.success('提交成功')
      this.active = 1
    },
    // 获取货主编号
    async getNextName() {
      const res = await getNextName('HZ')
      //   console.log(res)
      this.form.code = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
.goods {
  display: flex;
  .goods-input {
    margin-left: 20px;
    margin: 30px;
  }
}
</style>
