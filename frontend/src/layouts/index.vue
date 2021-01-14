<template>
  <div class="m-sena-system-wrapper" :class="classObj">
    <!-- <div
      v-if="'horizontal' === layout"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <top-bar></top-bar>
        <div
          v-if="tabsBar === 'true' || tabsBar === true"
          :class="{ 'tag-view-show': tabsBar }"
        >
          <div class="vab-main">
            <tabs-bar></tabs-bar>
          </div>
        </div>
      </div>
      <div class="vab-main main-padding">
        <app-main></app-main>
      </div>
    </div> -->
    <div class="layout-container-vertical fixed">
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <side-bar></side-bar>
      <div class="m-sena-main" :class="collapse ? 'is-collapse-main' : ''">
        <div class="fixed-header">
          <nav-bar></nav-bar>
        </div>

        <app-main></app-main>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
  import { AppMain, NavBar, SideBar } from './components'
  import { mapActions, mapGetters } from 'vuex'
  // import { tokenName } from '@/config/settings'
  export default {
    name: 'Layout',
    components: {
      NavBar,
      SideBar,
      AppMain,
    },
    data() {
      return { oldLayout: '' }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        device: 'settings/device',
      }),
      classObj() {
        return {
          mobile: this.device === 'mobile',
        }
      },
    },
    created() {},
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      // this.oldLayout = this.layout

      const isMobile = this.handleIsMobile()
      if (isMobile) {
        this.$store.dispatch('settings/toggleDevice', 'mobile')
        setTimeout(() => {
          this.$store.dispatch('settings/foldSideBar')
        }, 2000)
      } else {
        this.$store.dispatch('settings/openSideBar')
      }
      // this.$nextTick(() => {
      //   window.addEventListener(
      //     'storage',
      //     (e) => {
      //       if (e.key === tokenName || e.key === null) window.location.reload()
      //       if (e.key === tokenName && e.value === null)
      //         window.location.reload()
      //     },
      //     false
      //   )
      // })
    },
    methods: {
      ...mapActions({
        handleFoldSideBar: 'settings/foldSideBar',
      }),
      handleIsMobile() {
        return document.body.getBoundingClientRect().width - 1 < 992
      },
      handleResize() {
        if (!document.hidden) {
          const isMobile = this.handleIsMobile()
          this.$store.dispatch(
            'settings/toggleDevice',
            isMobile ? 'mobile' : 'desktop'
          )
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 2;
    width: 100%;
    overflow: hidden;
  }

  .m-sena-system-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .layout-container-vertical {
      position: relative;

      .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
      }

      &.fixed {
        padding-top: $base-nav-bar-height;
      }

      .m-sena-main {
        position: relative;
        min-height: 100%;
        margin-left: $base-left-menu-width;
        background: #f6f8f9;
        transition: $base-transition;

        ::v-deep {
          .fixed-header {
            @include fix-header;

            left: $base-left-menu-width;
            width: $base-right-content-width;
            box-shadow: $base-box-shadow;
            transition: $base-transition;
          }

          .nav-bar-container {
            position: relative;
            box-sizing: border-box;
          }

          .tabs-bar-container {
            box-sizing: border-box;
          }

          .app-main-container {
            width: calc(100% - #{$base-padding} - #{$base-padding});
            margin: $base-padding auto;
            background: $base-color-white;
            border-radius: $base-border-radius;
          }
        }

        &.is-collapse-main {
          margin-left: $base-left-menu-width-min;

          ::v-deep {
            .fixed-header {
              left: $base-left-menu-width-min;
              width: calc(100% - 65px);
            }
          }
        }
      }
    }

    /* 手机端开始 */
    &.mobile {
      ::v-deep {
        .el-pager,
        .el-pagination__jump {
          display: none;
        }

        .layout-container-vertical {
          .el-scrollbar.side-bar-container.is-collapse {
            width: 0;
          }

          .m-sena-main {
            width: 100%;
            margin-left: 0;
          }
        }

        .m-sena-main {
          .fixed-header {
            left: 0 !important;
            width: 100% !important;
          }
        }
      }
    }

    /* 手机端结束 */
  }
</style>
