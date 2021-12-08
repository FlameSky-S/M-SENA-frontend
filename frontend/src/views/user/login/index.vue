<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">User Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <Vicon name="user" scale="1.1" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="icon-container">
            <Vicon name="key" scale="1.1" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <Vicon
              :name="passwordType === 'password' ? 'eye-slash' : 'eye'"
              scale="1.1"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px; font-size: 16px"
        @click.native.prevent="handleLogin"
      >
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import { login } from '@/api/user'
  import * as crypto from 'crypto'

  export default {
    name: 'Login',
    components: {},
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('Please enter username'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('Please enter password'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername },
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword },
          ],
        },
        queryForm: {
          username: '',
          password: '',
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        redirect: undefined,
      }
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            this.loading = true
            this.queryForm.username = this.loginForm.username
            var shasum = crypto.createHash('sha1')
            this.queryForm.password = shasum
              .update(this.loginForm.password)
              .digest('hex')
            this.loginForm.password = ''
            let { msg, token } = await login(this.queryForm)
            if (msg == 'success') {
              sessionStorage.setItem('token', token)
              // console.log(token)
              this.$message({
                message: 'Login Successful',
                type: 'success',
              })
              let redirect = this.$route.query.redirect
              // console.log(redirect)
              this.$router.push({ path: redirect })
            } else {
              // console.log(token)
              this.$message({
                message: 'Login Failed',
                type: 'error',
              })
            }
            this.loading = false
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .login-container {
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
      input {
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 40px;
        font-size: 15px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    .el-form-item {
      border: 1px solid $base-color-gray;
      border-radius: 4px;
    }
    .login-form {
      // position: relative;
      width: 450px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .icon-container {
      padding: 6px 0px 6px 15px;
      color: $base-color-gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      text-align: center;
    }
    .title-container {
      // position: relative;
      .title {
        font-size: 26px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
        color: $base-color-gray;
      }
    }
    .show-pwd {
      position: absolute;
      right: 15px;
      top: 6px;
      font-size: 15px;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
