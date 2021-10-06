<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            :title="collapse ? 'Expand' : 'Collapse'"
            class="fold-unfold"
            @click="handleCollapse"
          ></i>
          <breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <task-bar class="hidden-xs-only"></task-bar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Breadcrumb, TaskBar } from '@/layouts/components'
  export default {
    name: 'NavBar',
    components: {
      Breadcrumb,
      TaskBar,
    },
    data() {
      return {
        // pulse: false,
      }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        // visitedRoutes: 'tabsBar/visitedRoutes',
        // device: 'settings/device',
        // routes: 'routes/routes',
      }),
    },
    methods: {
      ...mapActions({
        changeCollapse: 'settings/changeCollapse',
      }),
      handleCollapse() {
        this.changeCollapse()
      },
      // async refreshRoute() {
      //   this.$baseEventBus.$emit('reload-routerview')
      //   this.pulse = true
      //   setTimeout(() => {
      //     this.pulse = false
      //   }, 1000)
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    position: relative;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-bar-height;

      .fold-unfold {
        color: $base-color-gray;
        cursor: pointer;
        font-size: 20px;
      }

      ::v-deep {
        .breadcrumb-container {
          margin-left: 15px;
        }
      }
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-bar-height;

      // ::v-deep {
      //   svg {
      //     width: 20px;
      //     height: 20px;
      //     margin-right: 15px;
      //     font-size: $base-font-size-small;
      //     color: $base-color-gray;
      //     cursor: pointer;
      //     fill: $base-color-gray;
      //   }

      //   button {
      //     svg {
      //       margin-right: 0;
      //       color: $base-color-white;
      //       cursor: pointer;
      //       fill: $base-color-white;
      //     }
      //   }

      //   .el-badge {
      //     margin-right: 15px;
      //   }
      // }
    }
  }
</style>
