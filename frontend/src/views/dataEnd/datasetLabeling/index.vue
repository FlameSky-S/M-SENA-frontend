<template>
  <div class="labeling-container">
    <h1 style="margin-left: 2%">Dataset Labeling</h1>
    <p class="tips">
      Annotate datasets that are unlocked on the 'Dataset Management' page.
    </p>
    <p class="tips">
      Double click on a row or click 'Details' to start labeling.
    </p>
    <div class="labeling-content">
      <el-table
        ref="datasetTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading..."
        stripe
        @row-dblclick="handleRowDblclick"
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
            <el-button type="text" @click="startLabeling(row)">
              Details
            </el-button>
            <el-button v-if="isAdmin" type="text" @click="handleExport(row)">
              Write-to-CSV
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getDatasetList } from '@/api/dataEnd'
  import { exportLabels } from '@/api/labeling'
  export default {
    name: 'Labeling',
    components: {},
    data() {
      return {
        list: [],
        listLoading: true,
      }
    },
    computed: {
      isAdmin() {
        return this.$store.state.auth.isAdmin
      },
    },
    created() {
      this.fetchUnlockedData()
    },
    methods: {
      async handleExport(row) {
        const { msg } = await exportLabels({
          datasetName: row.datasetName,
        })
        if (msg == 'success') {
          this.$message({
            type: 'success',
            message: '"label.csv" written!',
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Export Failed!',
          })
        }
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
      handleRowDblclick(row) {
        this.startLabeling(row)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .labeling-container {
    margin: 0%;
    .labeling-content {
      margin: 30px 3%;
    }
    .tips {
      margin: 15px 3%;
      font-size: 14px;
    }
  }
</style>
