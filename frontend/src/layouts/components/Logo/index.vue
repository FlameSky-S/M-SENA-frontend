<template>
  <div class="logo-container">
    <router-link to="/">
      <el-image class="logo" src="./logo.png" />
      <span class="title" :title="title">
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  // import { logo } from '@/config/settings'

  export default {
    name: 'Logo',
    data() {
      return {
        title: 'M-SENA Platform',
      }
    },
    computed: {
      // ...mapGetters({
      // logo: 'settings/logo',
      // layout: 'settings/layout',
      // }),
    },
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: $base-menu-background;
  }

  @mixin logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 5px;
    color: $base-title-color;
    vertical-align: middle;
  }

  @mixin title {
    display: inline-block;
    overflow: hidden;
    font-size: 20px;
    line-height: 55px;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container {
    @include container;

    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      @include logo;
    }

    .title {
      @include title;

      max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }
</style>
