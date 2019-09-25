<template>
  <div class="login-page">
    <div class="main-content">
      <div class="title animated fadeInDown">Summary屮Platform</div>
      <div
        class="login-box animated slideInRight"
        v-loading="loading"
        element-loading-spinner="custom-loading-round"
        element-loading-background="rgba(0, 0, 0, 0.6)"
      >
        <el-form
          ref="loginBox"
          :model="form"
          :rules="rules"
        >
          <p class="title"><i class="el-icon-headset"></i></p>
          <el-form-item
            class="account"
            prop="name"
          >
            <p class="label">账号</p>
            <el-input
              :disabled="isEdit"
              v-model="form.name"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="pwd"
            prop="pws"
          >
            <p class="label">密码</p>
            <el-input
              :disabled="isEdit"
              v-model="form.pws"
              placeholder="请输入密码"
              type="password"
              @keyup.enter.native="toSignIn"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="to-sign-in"
              @click="toSignIn"
            >
              登录&nbsp;<i class="el-icon-s-promotion"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer style="text-align:center;">
      <span class=" animated fadeInUp">Designed By HenryWu.</span>
    </footer>
  </div>
</template>

<script>
import { login } from '../../api/login'

export default {
    name: 'index',
    data () {
        return {
            loading: false,
            isEdit: false,
            form: {
                name: '',
                pws: ''
            },
            rules: {}
        }
    },
    components: {},
    created () {
    },
    methods: {
        async toSignIn () {
            console.log(this.form)
            this.loading = true
            let that = this
            this.$nextTick(async function () {
                const res = await login({ ...this.form })
                if (res.code && res.code === '00000') {
                    that.$router.push('/entrances')
                } else {
                    that.loading = false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.login-page {
  background-color: #1f2444;
  background-image: url("../../static/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: auto;
  .main-content {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // min-height: 688px;
    height: calc(100% - 42px);
    box-sizing: border-box;
    .title {
      width: 650px;
      text-align: center;
      margin: 0 auto;
      padding-bottom: 64px;
      color: #ffffff;
      font-size: 28px;
    }
    .login-box {
      z-index: 1;
      width: 380px;
      height: 448px;
      margin: 0 auto;
      background: rgba(56, 66, 91, 0.4);
      box-shadow: 0 0 20px 0 rgba(96, 98, 107, 0.12);
      border-radius: 4px;
      background-position: center top;
      background-size: cover;
      overflow: hidden;
      .title {
        width: 100%;
        padding-bottom: 30px;
      }
    }
    .login-box:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-image: url("../../static/login_bg.jpg");
      background-size: cover;
      background-attachment: fixed;
      -webkit-filter: blur(5px);
      filter: blur(5px);
    }
    .to-sign-in {
      width: 150px;
      float: right;
    }
    .el-form {
      padding: 20px;
    }
    .el-form-item {
      .label {
        float: left;
        margin-bottom: 8px;
        font-size: 16px;
        color: #ffffff;
        line-height: 16px;
      }
    }
  }
  footer {
    span {
      color: #ffffff;
      font-size: 12px;
    }
  }
}
</style>
