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
              prop="datasetName"
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
              prop="unimodalLabel"
              label="Uni-Label"
              width="auto"
              align="center"
              min-width="100px"
            ></el-table-column>
            <el-table-column
              prop="labelType"
              label="Label Type"
              width="auto"
              align="center"
              min-width="110px"
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
    <create-page ref="createPage"></create-page>
  </div>
</template>

<script>
  import { getDatasetList, deleteDataset } from '@/api/datasetList'
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
          // title: '',
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
          return 640 + 'px'
        } else if (this.fullWidth > 1200) {
          return 350 + 'px'
        } else {
          return 'auto'
        }
      },
      showDetails(row, column) {
        // alert(row.datasetName)
        this.$router.push({
          path: '/data/datasetDetail',
          query: {
            dataset: row.datasetName,
          },
        })
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
        const { data, totalCount } = await getDatasetList(this.queryForm)
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
