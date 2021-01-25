<template>
  <div class="labeling-container">
    <h1 style="margin-left: 2%">Dataset Labeling</h1>
    <p class="tips"></p>
    <el-row>
      <el-col>
        <div class="unlock-dataset-table">
          <el-table
            ref="datasetTable"
            v-loading="listLoading"
            :data="list"
            :element-loading-text="elementLoadingText"
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
                <el-button type="text" @click="startLabeling(row)">
                  Label
                </el-button>
                <el-button type="text" @click="exportDataset(row)">
                  Export
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :background="background"
            :current-page="queryForm.pageNo"
            :layout="layout"
            :page-size="queryForm.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
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
        fullWidth: document.documentElement.clientWidth,
        // fullHeight: document.documentElement.clientHeight,
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        total: 0,
        elementLoadingText: 'Loading Information...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
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
      handleQuery() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchUnlockedData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchUnlockedData()
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
        const { datasetList, totalCount } = await getDatasetList({
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          unlocked: true,
        })

        this.list = datasetList
        this.total = totalCount
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .labeling-container {
    margin: 0%;
    .unlock-dataset-table {
      margin: 0% 5%;
    }
  }
</style>
