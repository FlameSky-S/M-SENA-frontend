<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <footer class="footer-copyright">
      <i class="el-icon-info"></i>
      THUIAR M-SENA Project {{ fullYear }}
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    data() {
      return {
        fullYear: new Date().getFullYear(),
      }
    },
    computed: {
      key() {
        return this.$route.path
      },
    },
  }
</script>
