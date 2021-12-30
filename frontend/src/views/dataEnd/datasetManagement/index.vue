<template>
  <div class="datasetList-container">
    <h1 style="margin-left: 2%">Dataset Management</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="dataset-table">
          <el-form v-if="isAdmin" inline size="mini">
            <el-form-item>
              <el-input
                v-model="addDataset"
                placeholder="Dataset Name"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :icon="rescanIcon"
                type="primary"
                @click="handleRescan"
              >
                Rescan
              </el-button>
            </el-form-item>
          </el-form>
          <el-table
            ref="datasetTable"
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading..."
            stripe
          >
            <el-table-column label="Id" width="80" align="center" fixed>
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="datasetName"
              label="Dataset"
              align="center"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="Status" align="center" width="100px">
              <template #default="{ row }">
                <el-tag :type="row.status | lockedFilter">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
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
              align="center"
              min-width="250px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              align="center"
              width="200px"
            >
              <template #default="{ row }">
                <el-tooltip
                  class="item"
                  content="Show dataset details"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="showDetails(row)">
                    Details
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Toggle lock status"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    v-if="isAdmin"
                    type="text"
                    @click="handleLock(row)"
                  >
                    {{ row.status === 'locked' ? 'Unlock' : 'Lock' }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- <create-page ref="createPage" @fetch-data="fetchData"></create-page> -->
  </div>
</template>

<script>
  import {
    getDatasetList,
    scanDatasets,
    updateDataset,
    unlockDataset,
    lockDataset,
  } from '@/api/dataEnd'
  export default {
    name: 'DatasetList',
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
        list: [],
        listLoading: true,
        addDataset: '',
        rescanIcon: 'el-icon-refresh-left',
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
      isAdmin() {
        return this.$store.state.auth.isAdmin
      },
    },
    created() {
      this.fetchData()
    },
    mounted() {},
    methods: {
      showDetails(row) {
        this.$router.push({
          path: '/data/datasetDetail',
          query: {
            dataset: row.datasetName,
          },
        })
      },
      handleLock(row) {
        if (row.status === 'locked') {
          ;(async () => {
            await unlockDataset({
              datasetName: row.datasetName,
              token: window.sessionStorage.getItem('token'),
            })
            this.fetchData()
          })()
        } else {
          ;(async () => {
            await lockDataset({
              datasetName: row.datasetName,
              token: window.sessionStorage.getItem('token'),
            })
            this.fetchData()
          })()
        }
      },
      async handleRescan() {
        if (this.addDataset === '') {
          this.rescanIcon = 'el-icon-loading'
          let { msg } = await scanDatasets({
            token: window.sessionStorage.getItem('token'),
          })
          if (msg == 'success') {
            this.$message({
              message: 'Dataset Scan Complete',
              type: 'success',
            })
            this.fetchData()
          } else {
            this.$message({
              message: msg,
              type: 'error',
            })
          }
          this.rescanIcon = 'el-icon-refresh-left'
        } else {
          this.rescanIcon = 'el-icon-loading'
          let { msg } = await updateDataset({
            datasetName: this.addDataset,
            token: window.sessionStorage.getItem('token'),
          })
          if (msg == 'success') {
            this.$message({
              message: 'Dataset Updated',
              type: 'success',
            })
            this.fetchData()
          } else {
            this.$message({
              message: msg,
              type: 'error',
            })
          }
          this.rescanIcon = 'el-icon-refresh-left'
        }
      },
      async fetchData() {
        this.listLoading = true
        let { datasetList } = await getDatasetList({ unlocked: false })
        this.list = datasetList
        this.list.forEach((element) => {
          element.status = element.status
        })
        this.listLoading = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .datasetList-container {
    margin: 0%;
    .dataset-table {
      margin: 0% 3%;
    }
  }
</style>
