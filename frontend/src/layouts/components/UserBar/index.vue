<template>
  <div class="user-bar-container">
    <el-popover
      v-model="showPopover"
      placement="bottom"
      width="200"
      trigger="click"
      style="cursor: pointer"
    >
      <div class="user-bar-content">
        <el-row style="font-size: 16px">
          <span>
            <b>User:</b>
            {{ username }}
          </span>
        </el-row>
        <el-row v-if="isAdmin" style="margin-top: 5%">
          <el-button type="primary" plain @click="showManage">
            User Management
          </el-button>
        </el-row>
        <el-row style="margin-top: 5%">
          <el-button :type="btnType" plain @click="handleAuth">
            {{ btnText }}
          </el-button>
        </el-row>
      </div>
      <div slot="reference" class="user-btn">
        <i class="el-icon-user-solid" />
        <span class="hidden-xs-only">{{ username }}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: 'UserBar',
    data() {
      return {
        showPopover: false,
      }
    },
    computed: {
      username: function () {
        let user = this.$store.state.auth.user
        if (user == null) {
          user = 'Not Logged In'
        }
        return user
      },
      btnText: function () {
        if (this.username == 'Not Logged In') {
          return 'Login'
        } else {
          return 'Logout'
        }
      },
      btnType: function () {
        if (this.username == 'Not Logged In') {
          return 'primary'
        } else {
          return 'danger'
        }
      },
      isAdmin: function () {
        return this.$store.state.auth.isAdmin
      },
    },
    methods: {
      handleAuth() {
        let user = this.$store.state.auth.user
        if (user == null) {
          this.handleLogin()
        } else {
          this.handleLogout()
        }
        this.showPopover = false
      },
      handleLogin() {
        let redirect =
          this.$route.path === '/user/login' ? '/' : this.$route.path
        this.$router.push({
          path: '/user/login',
          query: { redirect: redirect },
        })
      },
      handleLogout() {
        let token = window.sessionStorage.getItem('token')
        if (token) {
          window.sessionStorage.removeItem('token')
        }
        this.$router.go()
      },
      showManage() {
        this.showPopover = false
        this.$router.push({ path: '/user/userManagement' })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .user-bar-container {
    el-popover {
      cursor: pointer;
    }
  }
  .user-bar-content {
    text-align: center;
  }
  .user-btn {
    font-size: 16px;
    margin-right: 15px;
    color: rgba(0, 0, 0, 0.65);
    i {
      font-size: 18px;
      margin-right: 5px;
    }
  }
</style>
