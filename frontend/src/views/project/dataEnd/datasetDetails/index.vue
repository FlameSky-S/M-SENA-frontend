<template>
  <div class="datasetDetails-container">
    <el-row :gutter="50" class="top-info">
      <el-col :span="8">
        <!-- <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              操作按钮
            </el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card> -->
      </el-col>
      <el-divider direction="vertical" class="top-left-divider"></el-divider>
      <el-col :span="8">
        <!-- <div>
          <img
            src="https://picsum.photos/200/200?random=a9CADE4c-3141-09b9-eFf2-55DDDC4Bf7Ec"
            alt=""
          />
        </div> -->
      </el-col>
      <el-divider direction="vertical" class="top-right-divider"></el-divider>
      <el-col :span="8"></el-col>
    </el-row>
    <el-divider direction="horizontal"></el-divider>
  </div>
</template>

<script>
  export default {
    name: 'DatasetDetails',
    components: {},
    data() {
      return {}
    },
    created() {
      console.log(this.$route.query.dataset)
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .datasetDetails-container {
    .top-left-divider {
      position: absolute;
      left: 33%;
    }
    .top-right-divider {
      position: absolute;
      right: 33%;
    }
  }
</style>
