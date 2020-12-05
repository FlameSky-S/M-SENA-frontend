<template>
  <div class="labeling-container">
    <h1>Dataset Labeling</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="unlock-dataset-table">
          <el-table
            ref="datasetTable"
            v-loading="listLoading"
            :data="list"
            :element-loading-text="elementLoadingText"
            stripe
          >
            <el-table-column
              label="Id"
              width="auto"
              align="center"
              min-width="60px"
            >
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="dataset_name"
              label="Dataset"
              width="auto"
              min-width="80px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="capacity"
              label="Capacity"
              width="auto"
              min-width="80px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="language"
              label="Language"
              width="auto"
              min-width="90px"
              align="center"
            ></el-table-column>

            <el-table-column
              prop="description"
              label="Description"
              :width="descriptionWidth()"
              min-width="260px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Operations"
              :width="operationWidth()"
              align="center"
              min-width="140px"
            >
              <template #default="{ row }">
                <el-button type="text" @click="startLabeling(row)">
                  Auto Labeling
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
  import { getDatasetList } from '@/api/datasetList'
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
      operationWidth() {
        if (this.fullWidth > 1500) {
          return 260 + 'px'
        } else if (this.fullWidth > 1200) {
          return 160 + 'px'
        } else {
          return 'auto'
        }
      },
      descriptionWidth() {
        if (this.fullWidth > 1500) {
          return 700 + 'px'
        } else if (this.fullWidth > 1200) {
          return 400 + 'px'
        } else {
          return 'auto'
        }
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
            dataset: row.dataset_name,
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
