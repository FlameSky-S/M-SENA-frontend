<template>
  <div class="modelManagement-container">
    <h1 style="margin-left: 2%">Model Management</h1>
    <p class="tips"></p>
    <div class="model-table">
      <el-table
        v-loading="modelLoading"
        :data="modelList"
        element-loading-text="Loading..."
        stripe
      >
        <el-table-column
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="Model Name"
          prop="model_name"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="Related Paper" align="center" min-width="250">
          <template slot-scope="scope">
            <a :href="scope.row.paper_url" class="paper-title" target="_blank">
              {{ scope.row.paper_name }}
              <i class="el-icon-document"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          label="Description"
          prop="description"
          align="center"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="Operations" align="center" width="200">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              content="Go to result analysis page"
              placement="top"
              :enterable="false"
            >
              <el-button type="text" @click="viewResults(scope.row)">
                Results
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              content="Go to model training page"
              placement="top"
              :enterable="false"
            >
              <el-button type="text" @click="trainModel(scope.row)">
                Train
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getModelList } from '@/api/modelEnd'
  export default {
    name: 'ModelManagement',
    components: {},
    data() {
      return {
        modelList: [],
        modelLoading: true,
      }
    },
    computed: {},
    watch: {},
    created() {
      this.fetchModelList()
    },
    mounted() {},
    methods: {
      async fetchModelList() {
        this.modelLoading = true
        let { modelList } = await getModelList()
        this.modelList = modelList
        this.modelLoading = false
      },
      viewResults(row) {
        this.$router.push({
          path: '/analysis/results',
          query: { model: row.model_name },
        })
      },
      trainModel(row) {
        this.$router.push({
          path: '/model/modelTraining',
          query: { model: row.model_name },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .modelManagement-container {
    margin: 0%;
    .model-table {
      margin: 30px 3%;
    }
  }
  .paper-title {
    text-decoration: none;
    color: $base-font-color;
  }
  .paper-title:hover {
    color: $base-color-default;
  }
</style>
