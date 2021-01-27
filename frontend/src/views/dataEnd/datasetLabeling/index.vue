<template>
  <div class="labeling-container">
    <h1 style="margin-left: 2%">Dataset Labeling</h1>
    <p class="tips"></p>
    <div class="unlock-dataset-table">
      <el-table
        ref="datasetTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading..."
        stripe
      >
        <el-table-column fixed label="Id" align="center" width="80px">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="datasetName"
          label="Dataset"
          min-width="100px"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="capacity"
          label="Capacity"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="language"
          label="Language"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          min-width="250px"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          align="center"
          width="200px"
        >
          <template #default="{ row }">
            <el-button type="text" @click="startLabeling(row)">Label</el-button>
            <el-button type="text" @click="exportDataset(row)">
              Export
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getDatasetList } from '@/api/dataEnd'
  import { exportDataset } from '@/api/labeling'
  export default {
    name: 'Labeling',
    components: {},
    data() {
      return {
        list: [],
        listLoading: true,
      }
    },
    computed: {},
    created() {
      this.fetchUnlockedData()
    },
    methods: {
      exportDataset(row) {
        exportDataset({
          datasetName: row.datasetName,
        })
      },
      startLabeling(row) {
        this.$router.push({
          path: '/data/labelingDetail',
          query: {
            dataset: row.datasetName,
          },
        })
      },
      async fetchUnlockedData() {
        this.listLoading = true
        const { datasetList } = await getDatasetList({ unlocked: true })
        this.list = datasetList
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .labeling-container {
    margin: 0%;
    .unlock-dataset-table {
      margin: 40px 5%;
    }
  }
</style>
