<template>
  <div class="loginCard">
    <div class="loginLeft">
      <img src="../../assets/imgs/logintitle.png" alt="" />
      <el-form
        ref="loginFrom"
        label-width="80px"
        :model="loginFrom"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username">
            <template slot="prepend">
              <i class="el-icon-mobile"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginFrom.password">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-checkbox class="checkbox" v-model="checked">记住密码</el-checkbox>
        <el-button class="button" type="warning" @click="onSubmit"
          >立即登录</el-button
        >
      </el-form>
    </div>

    <div class="contentBg">
      <img src="../../assets/imgs/contentBg.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '手机号不能为空'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
          },
          {
            min: 6,
            max: 12,
            message: '密码填写不正确'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginFrom.validate()
      this.$router.push({
        path: '/dashboard'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginCard {
  width: 958px;
  height: 516px;
  display: flex;
  margin: 100px auto;
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  background-color: #fff;
  border-radius: 40px;
}

.loginLeft {
  float: left;
  width: 398px;
  height: 516px;
  border-radius: 34px 0 0 34px;
  margin: 0 auto;
  margin-right: 80px;
  img {
    margin-left: 90px;
    margin-top: 72px;
    margin-bottom: 20px;
    height: 100px;
  }
  .button {
    margin-left: 80px;
    width: 300px;
  }
  .checkbox {
    margin-left: 80px;
    margin-bottom: 20px;
  }
}

.contentBg {
  width: 560px;
  height: 516px;
  float: right;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
