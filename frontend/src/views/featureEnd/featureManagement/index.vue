<template>
  <div class="featureManagement-container">
    <h1 style="margin-left: 2%">Feature Management</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="feature-table">
          <el-form inline size="mini" class="toolbar">
            <span>
              <el-form-item>
                <el-select
                  v-model="filter.datasetName"
                  placeholder="Dataset Name"
                  clearable
                >
                  <el-option
                    v-for="item in datasetList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="filter.featureName"
                  placeholder="Feature Name"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Apply filter"
                  placement="top"
                >
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    @click="handleFilter"
                  >
                    Filter
                  </el-button>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Reset filter"
                  placement="top"
                >
                  <el-button
                    icon="el-icon-refresh-right"
                    type="primary"
                    @click="resetFilter"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
              <el-form-item v-if="isAdmin">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Scan default feature sets for exsisting datasets"
                  placement="top"
                >
                  <el-button type="primary" plain @click="handleScanDefault">
                    Scan Default
                  </el-button>
                </el-tooltip>
              </el-form-item>
            </span>
            <span>
              <el-form-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Remove non-existant features"
                  placement="top"
                >
                  <el-button type="danger" plain @click="handleRemoveInvalid">
                    Remove Invalid
                  </el-button>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Remove selected features"
                  placement="top"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleRemoveSelected"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
            </span>
          </el-form>
          <el-table
            ref="featureTable"
            v-loading="listLoading"
            :data="featureList"
            element-loading-text="Loading..."
            stripe
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="100"
              align="center"
              fixed
            ></el-table-column>
            <el-table-column
              prop="feature_name"
              label="Name"
              width="150"
              align="center"
              show-overflow-tooltip
              fixed
            ></el-table-column>
            <el-table-column
              prop="dataset_name"
              label="Dataset"
              width="100px"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="feature_T"
              label="Feature T"
              width="150px"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="feature_A"
              label="Feature A"
              width="150px"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="feature_V"
              label="Feature V"
              width="150px"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              align="center"
              min-width="150px"
              show-overflow-tooltip
            ></el-table-column>
            <!-- <el-table-column
              fixed="right"
              label="Operations"
              align="center"
              width="200px"
            >
              <template #default="{ row }">
                <el-tooltip
                  class="item"
                  content="Show feature details"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="showDetails(row)">
                    Details
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Go to training page"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="showTraining(row)">
                    Train
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column> -->
          </el-table>
          <el-pagination
            :background="true"
            :current-page="filter.pageNo"
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="filter.pageSize"
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
  import {
    getFeatureList,
    scanDefaultFeatures,
    removeInvalidFeatures,
    removeFeatures,
  } from '@/api/featureEnd'
  import { getAllSettings } from '@/api/getSettings'
  export default {
    name: 'FeatureManagement',
    components: {},
    data() {
      return {
        datasetList: [],
        filter: {
          datasetName: '',
          featureName: '',
          featureT: '',
          featureA: '',
          featureV: '',
          pageNo: 1,
          pageSize: 10,
        },
        featureList: [],
        total: 0,
        listLoading: true,
        multipleSelection: [],
      }
    },
    computed: {
      isAdmin() {
        return this.$store.state.auth.isAdmin
      },
    },
    watch: {},
    created() {
      this.fetchAllSettings()
      this.fetchFeatureList()
    },
    mounted() {},
    methods: {
      handleSizeChange(val) {
        this.filter.pageSize = val
        this.fetchFeatureList()
      },
      handleCurrentChange(val) {
        this.filter.pageNo = val
        this.fetchFeatureList()
      },
      handleFilter() {
        this.filter.pageNo = 1
        this.fetchFeatureList()
      },
      resetFilter() {
        this.filter.datasetName = ''
        this.filter.featureName = ''
        this.filter.featureT = ''
        this.filter.featureA = ''
        this.filter.featureV = ''
        this.filter.datasetName = ''
      },
      handleRowClick(row) {
        this.$refs.featureTable.toggleRowSelection(row)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      async fetchAllSettings() {
        const { datasets } = await getAllSettings()
        this.datasetList = datasets.map((item) => {
          return {
            label: item.name,
            value: item.name,
          }
        })
      },
      async fetchFeatureList() {
        this.listLoading = true
        var { data, total } = await getFeatureList(this.filter)
        this.featureList = data
        for (var row in this.featureList) {
          this.featureList[row].feature_T = this.featureList[row].feature_T
            ? this.featureList[row].feature_T
            : 'Unknown'
          this.featureList[row].feature_A = this.featureList[row].feature_A
            ? this.featureList[row].feature_A
            : 'Unknown'
          this.featureList[row].feature_V = this.featureList[row].feature_V
            ? this.featureList[row].feature_V
            : 'Unknown'
          this.featureList[row].description = this.featureList[row].description
            ? this.featureList[row].description
            : '-'
        }
        this.total = total
        this.listLoading = false
      },
      async handleScanDefault() {
        this.listLoading = true
        await scanDefaultFeatures({
          token: window.sessionStorage.getItem('token'),
        })
        this.resetFilter()
        this.fetchFeatureList()
        this.listLoading = false
      },
      async handleRemoveInvalid() {
        this.listLoading = true
        await removeInvalidFeatures()
        this.resetFilter()
        this.fetchFeatureList()
        this.listLoading = false
      },
      handleRemoveSelected() {
        if (this.multipleSelection.length == 0) {
          return
        }
        let postData = []
        for (let i in this.multipleSelection) {
          postData.push(this.multipleSelection[i].id)
        }
        const h = this.$createElement
        let msg = []
        msg.push(
          h('p', { style: 'text-align: center' }, [
            h('span', null, 'Deleting ' + postData.length + ' result(s)'),
          ])
        )
        msg.push(h('p', null, 'Are you sure?'))

        this.$msgbox({
          title: 'Warning',
          message: h('div', null, msg),
          confirmButtonText: 'DELETE',
          showCancelButton: true,
          type: 'warning',
          center: true,
          confirmButtonClass: 'el-button--danger',
        })
          .then(async () => {
            this.listLoading = true

            let { msg } = await removeFeatures({ id: postData })
            if (msg == 'success') {
              this.$message({
                message: 'Result Deleted',
                type: 'success',
              })
              this.fetchResults()
            } else {
              this.$message({
                message: msg,
                type: 'error',
              })
            }
          })
          .catch(() => {
            // cancel button action
          })
          .finally(() => {
            this.fetchFeatureList()
            this.listLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .featureManagement-container {
    margin: 0%;
    .feature-table {
      margin: 0% 3%;
    }
  }
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
