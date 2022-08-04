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
        <!--  -->
        <div class="details-top">
          <div class="storage">
            <el-form-item label="库区" prop="warehouseId">
              <el-cascader
                :options="selectWarehouseId"
                clearable
                v-model="form.warehouseId"
                :props="{
                  label: 'warehouseName',
                  value: 'warehouseId',
                  emitPath: false,
                  checkStrictly: true
                }"
              ></el-cascader>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="仓库编号" prop="code">
              <el-input
                v-model="form.code"
                placeholder="请输入"
                style="width: 300px"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库区名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="form.temperatureType" placeholder="请选择">
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

        <!--  -->
        <div class="details-areas">
          <div class="storage">
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

          <div class="storage">
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

          <div class="storage">
            <el-form-item label="停用状态" prop="status">
              <template>
                <el-radio v-model="form.status" label="0">启用</el-radio>
                <el-radio v-model="form.status" label="1">使用</el-radio>
              </template>
            </el-form-item>
          </div>
        </div>

        <!--  -->
        <div class="details-detailed">
          <div class="storage">
            <el-form-item label="承载体积" prop="maxVolume">
              <el-input
                placeholder="请输入"
                style="width: 300px"
                v-model="form.maxVolume"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="承载上限" prop="maxNum">
              <el-input
                placeholder="请输入"
                style="width: 300px"
                v-model="form.maxNum"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="承载重量" prop="maxWeight">
              <el-input
                placeholder="请输入"
                style="width: 300px"
                v-model="form.maxWeight"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!--  -->
        <div class="details-size">
          <div class="storage">
            <el-form-item label="库位排/列/层" prop="locationColumn">
              <el-input
                placeholder="请输入"
                style="width: 200px"
                v-model="form.locationColumn"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库位排/列/层" prop="locationHigh">
              <el-input
                v-model="form.locationHigh"
                placeholder="请输入"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库位排/列/层" prop="locationLayer">
              <el-input
                placeholder="请输入"
                style="width: 200px"
                v-model="form.locationLayer"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库位长/宽/高" prop="locationLength">
              <el-input
                placeholder="请输入"
                style="width: 150px"
                v-model="form.locationLength"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库位长/宽/高" prop="locationRow">
              <el-input
                placeholder="请输入"
                style="width: 150px"
                v-model="form.locationRow"
              ></el-input>
            </el-form-item>
          </div>

          <div class="storage">
            <el-form-item label="库位长/宽/高" prop="locationWidth">
              <el-input
                placeholder="请输入"
                style="width: 150px"
                v-model="form.locationWidth"
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
import { getNextName } from '../../../api/warehouse'
import {
  getLocationList,
  getIdLocation,
  getAddLocation,
  getEditLocation
} from '../../../api/location'
export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        areaId: '',
        warehouseId: '',
        code: '',
        name: '', // 名称
        temperatureType: '', // 温度类型
        bearingType: '', // 承重类型
        useType: '', // 用途类型
        status: '', // 停用状态
        maxVolume: '',
        maxNum: '',
        maxWeight: '',
        locationColumn: '',
        locationHigh: '',
        locationLayer: '',
        locationLength: '',
        locationRow: '',
        locationWidth: ''
      },
      rules: {
        warehouseId: [
          { required: true, message: '请输入库区', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        temperatureType: [
          { required: true, message: '请输入温度类型', trigger: 'blur' }
        ],
        bearingType: [
          { required: true, message: '请输入承重类型', trigger: 'blur' }
        ],
        useType: [
          { required: true, message: '请输入用途属性', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入停用状态', trigger: 'blur' }
        ],
        maxVolume: [
          { required: true, message: '请输入承载体积', trigger: 'blur' }
        ]
      },
      selectWarehouseId: [
        {
          children: []
        }
      ],
      selectKeys: [
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
      ],
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
      ],
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
      ]
    }
  },
  created() {
    this.getNextName()
    this.getLocationList()
    this.getIdLocation()
  },
  methods: {
    // 判断是 新增/编辑 ---路由传参 row
    async getIdLocation() {
      if (this.$route.query.row !== 'null') {
        const res = await getIdLocation(this.$route.query.row)
        this.form = res.data.data
      }
    },
    // 提交
    async submit() {
      try {
        this.$refs.form.validate()
        // 新增/编辑
        this.form.location = [this.form.warehouseId, this.form.areaId]
        if (this.$route.query.row !== 'null') {
          await getEditLocation(this.form)
        } else {
          await getAddLocation(this.form)
        }
        // 提示 / 跳转
        await this.$message.success('恭喜你，提交成功')
        this.$router.push({
          path: '/manage-base-info/location'
        })
      } catch (e) {
        console.log(e)
      }
    },

    // 库区内容
    async getLocationList() {
      const res = await getLocationList()
      // console.log(res, 'res')
      this.selectWarehouseId = res.data.data.records
    },

    // 库区编号
    async getNextName() {
      const res = await getNextName('KW')
      // console.log(res)
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
