<template>
  <div>
    <el-card>
      <el-form
        ref="form"
        :label-position="labelPosition"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <!-- 仓库编码 -->
        <div class="details-top">
          <div class="storage">
            <el-form-item label="仓库编码">
              <el-input
                placeholder="请输入"
                style="width: 380px"
                v-model="form.code"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="仓库名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入"
                style="width: 380px"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="仓库类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
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
        </div>

        <!-- 省市区 -->
        <div class="details-areas">
          <div class="storage">
            <el-form-item label="省/市/区" prop="location">
              <el-cascader
                size="large"
                :options="options"
                clearable
                style="width: 790px"
                v-model="form.location"
              ></el-cascader>
            </el-form-item>
          </div>
        </div>

        <!-- 详细地址 -->
        <div class="details-detailed">
          <div class="storage">
            <el-form-item label="详细地址">
              <el-input
                placeholder="请输入"
                style="width: 790px"
                v-model="form.address"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="仓库状态" prop="status">
              <template>
                <el-radio v-model="form.status" label="0">启用</el-radio>
                <el-radio v-model="form.status" label="1">使用</el-radio>
              </template>
            </el-form-item>
          </div>
        </div>

        <!-- 仓库面积 -->
        <div class="details-size">
          <div class="storage">
            <el-form-item label="仓库面积">
              <el-input
                placeholder="请输入"
                style="width: 380px"
                v-model="form.surface"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="负责人" prop="personName">
              <el-input
                v-model="form.personName"
                placeholder="请输入"
                style="width: 380px"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                placeholder="请输入"
                style="width: 380px"
                v-model="form.phone"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <el-row type="flex" justify="center" style="margin-top: 50px">
          <template>
            <el-button round>返回</el-button>
            <el-button type="warning" round @click="submit">提交</el-button>
          </template>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionDataPlus,
  CodeToText
} from 'element-china-area-data'
import {
  getAddWarehouse,
  getNextName,
  getWarehouseId,
  getEditWarehouse
} from '../../../api/warehouse'
export default {
  name: 'Details',
  data() {
    return {
      // 省市区
      addressData: provinceAndCityData,
      options: regionDataPlus,
      selectedOptions: [],
      labelPosition: 'top',
      selectKeys: [
        {
          label: '中转仓',
          value: 'ZZ'
        },
        {
          label: '加工仓',
          value: 'JG'
        },
        {
          label: '储备仓',
          value: 'CB'
        },
        {
          label: '冷藏仓',
          value: 'LC'
        }
      ],
      //   表单效验规则
      form: {
        name: '',
        type: '',
        location: [],
        status: '',
        personName: '',
        code: '',
        address: '',
        surface: '',
        phone: '',
        area: '',
        city: '',
        province: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
          {
            min: '2',
            max: '8',
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        type: [{ required: true, trigger: 'blur' }],
        location: [{ required: true, trigger: 'blur' }],
        status: [{ required: true, trigger: 'blur' }],
        personName: [
          { required: true, message: '请输入负责人', trigger: 'blur' },
          {
            min: '2',
            max: '8',
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: 'blur',
            message: '手机号输入不正确'
          }
        ]
      }
    }
  },
  created() {
    this.getNextName()
    this.getWarehouseId()
  },
  methods: {
    // 判断编辑还是添加
    async getWarehouseId() {
      // console.log(this.$route.query.row)
      if (this.$route.query.row !== 'null') {
        const res = await getWarehouseId(this.$route.query.row)
        // 赋值
        this.form = res.data.data
      }
    },

    async submit() {
      // console.log(this.$parent)
      try {
        // 效验表单
        await this.$refs.form.validate()
        // 拿到所选的城市
        // this.form.location = []
        // value是长度为2的装有被选择省、市代码的数组;CodeToText是个对象，键名为代码，键值为省和城市
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
          await getEditWarehouse(this.form)
        } else {
          await getAddWarehouse(this.form)
        }
        // 提示
        this.$message.success('提交成功')
        // 跳转 重新渲染页面
        this.$router.push({
          path: '/manage-base-info/warehouse'
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 仓库编号
    async getNextName() {
      const res = await getNextName('CK')
      this.form.code = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
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

.details-areas {
  display: flex;
  margin-top: 50px;
  .storage {
    margin-right: 30px;
    .storage-text {
      color: #887e7e;
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
}

.details-detailed {
  display: flex;
  margin-top: 50px;
  .storage {
    margin-right: 30px;
    .storage-text {
      color: #887e7e;
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
}

.details-size {
  display: flex;
  margin-top: 50px;
  .storage {
    margin-right: 30px;
    .storage-text {
      color: #887e7e;
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
}
</style>
