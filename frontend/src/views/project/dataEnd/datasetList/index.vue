<template>
  <div class="datasetList-container">
    <h1>Dataset Management</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="dataset-table">
          <vab-query-form>
            <vab-query-form-left-panel>
              <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
                Create
              </el-button>
            </vab-query-form-left-panel>
          </vab-query-form>
          <el-table
            ref="datasetTable"
            v-loading="listLoading"
            :data="list"
            :element-loading-text="elementLoadingText"
            stripe
          >
            <el-table-column label="Id" min-width="60" align="center">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="dataset_name"
              label="Dataset"
              align="center"
              width="auto"
              min-width="80px"
            ></el-table-column>
            <el-table-column
              label="Status"
              align="center"
              width="auto"
              min-width="80px"
            >
              <template #default="{ row }">
                <el-tag :type="row.status | lockedFilter">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
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
              align="center"
              :width="tableWidth()"
              min-width="260px"
            ></el-table-column>
            <el-table-column
              label="Operations"
              :width="operationWidth()"
              align="center"
              min-width="120px"
            >
              <template #default="{ row }">
                <el-button type="text" @click="showDetails(row)">
                  Dataset Details
                </el-button>
                <el-button type="text" @click="handleDelete(row)">
                  Delete
                </el-button>
                <el-button type="text" @click="handleLock(row)">
                  {{ row.status === 'locked' ? 'unlock' : 'lock' }}
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
    <create-page ref="createPage" @fetch-data="fetchData"></create-page>
  </div>
</template>

<script>
  import { getDatasetList } from '@/api/datasetList'
  import { deleteDataset, unlockDataset, lockDataset } from '@/api/datasetCurd'
  import CreatePage from './components/CreatePage'
  export default {
    name: 'DatasetList',
    components: {
      CreatePage,
    },
    filters: {
      lockedFilter(lockedstatus) {
        const statusMap = {
          locked: 'warning',
          unlocked: 'success',
        }
        return statusMap[lockedstatus]
      },
    },
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        fullHeight: document.documentElement.clientHeight,
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        total: 0,
        selectRows: '',
        elementLoadingText: 'Loading Information...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    mounted() {},
    methods: {
      operationWidth() {
        if (this.fullWidth > 1500) {
          return 240 + 'px'
        } else if (this.fullWidth > 1200) {
          return 130 + 'px'
        } else {
          return 'auto'
        }
      },
      tableWidth() {
        if (this.fullWidth > 1500) {
          return 580 + 'px'
        } else if (this.fullWidth > 1200) {
          return 350 + 'px'
        } else {
          return 'auto'
        }
      },
      showDetails(row, column) {
        this.$router.push({
          path: '/data/datasetDetail',
          query: {
            dataset: row.dataset_name,
          },
        })
      },
      handleDelete(row) {
        ;(async () => {
          await deleteDataset({ datasetName: row.dataset_name })
          this.fetchData()
        })()
      },
      handleLock(row) {
        if (row.status === 'locked') {
          ;(async () => {
            await unlockDataset({ dataset_name: row.dataset_name })
            this.fetchData()
          })()
        } else {
          ;(async () => {
            await lockDataset({ dataset_name: row.dataset_name })
            this.fetchData()
          })()
        }
      },
      // TODO: to change here.
      handleAdd() {
        this.$refs['createPage'].showCreatePage()
        console.log(process.env.NODE_ENV)
        // TODO: this is an optional function. Which will be used in peroid 2.
        // this.$router.push({
        //   path: '/data/createDataset',
        // })
      },
      handleQuery() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { datasetList, totalCount } = await getDatasetList({
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          unlocked: false,
        })
        this.list = datasetList
        this.list.forEach((element) => {
          element.status = element.is_locked ? 'locked' : 'unlocked'
        })
        this.total = totalCount
        this.listLoading = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .datasetList-container {
    margin: 0%;
    .dataset-table {
      margin: 0% 5%;
    }
  }
</style>
