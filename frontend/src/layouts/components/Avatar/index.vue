<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar class="avatar" :src="avatar"></el-avatar>
      <!-- <img class="avatar" :src="avatar" alt="" /> -->

      <!-- <div class="base-repo">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div> -->
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="github">github</el-dropdown-item>
      <el-dropdown-item command="gitee" divided>gitee</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { recordRoute } from '@/config/settings'

  export default {
    name: 'Avatar',
    data() {
      return {
        avatar:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2331027602,2365508232&fm=26&gp=0.jpg',
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'github':
            window.open('https://github.com/FlameSky-S/M-SENA-frontend')
            break
          case 'gitee':
            window.open('https://gitee.com/chu1204505056/vue-admin-beautiful')
            break
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .base-repo {
      position: relative;
      margin-left: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
</style>
