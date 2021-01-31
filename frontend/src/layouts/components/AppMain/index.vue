<template>
  <section class="app-main-container">
    <transition mode="out-in" name="fade-transform">
      <!-- <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum"> -->
      <router-view :key="key" class="app-main-height" />
      <!-- </keep-alive> -->
    </transition>
    <footer class="footer-copyright">
      <i class="el-icon-info"></i>
      THUIAR M-SENA Project 2021
    </footer>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  // import {
  // copyright,
  // footerCopyright,
  // keepAliveMaxNum,
  // title,
  // } from '@/config/settings'

  export default {
    name: 'AppMain',
    data() {
      return {
        // show: false,
        // fullYear: new Date().getFullYear(),
        // copyright,
        // title,
        // keepAliveMaxNum,
        // routerView: true,
        // footerCopyright,
      }
    },
    computed: {
      ...mapGetters({
        // visitedRoutes: 'tabsBar/visitedRoutes',
        device: 'settings/device',
      }),
      // cachedRoutes() {
      //   const cachedRoutesArr = []
      //   this.visitedRoutes.forEach((item) => {
      //     if (!item.meta.noKeepAlive) {
      //       cachedRoutesArr.push(item.name)
      //     }
      //   })
      //   return cachedRoutesArr
      // },
      key() {
        return this.$route.path
      },
    },
    watch: {
      $route: {
        handler(route) {
          if ('mobile' === this.device) this.foldSideBar()
        },
        immediate: true,
      },
    },
    created() {
      //重载所有路由
      // this.$baseEventBus.$on('reload-routerview', () => {
      //   this.routerView = false
      //   this.$nextTick(() => {
      //     this.routerView = true
      //   })
      // })
    },
    mounted() {},
    methods: {
      ...mapActions({
        foldSideBar: 'settings/foldSideBar',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    .app-main-height {
      min-height: $base-app-main-height;
    }

    .footer-copyright {
      min-height: 55px;
      line-height: 55px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      border-top: 1px dashed $base-border-color;
    }
  }
</style>
