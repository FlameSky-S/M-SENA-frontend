<template>
  <div class="results-container">
    <h1 style="margin-left: 2%">Model Results</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="results-table">
          <el-form ref="filter" :model="filter" :inline="true">
            <el-col :span="23">
              <el-form-item label="Model:" style="font-weight: bold">
                <el-select v-model="filter.model_name" style="width: 150px">
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Dataset:" style="font-weight: bold">
                <el-select v-model="filter.dataset_name" style="width: 150px">
                  <el-option
                    v-for="item in datasetList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Train Mode:" style="font-weight: bold">
                <el-select v-model="filter.is_tuning" style="width: 120px">
                  <el-option
                    v-for="item in modeList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  @click="applyFilter"
                >
                  Apply
                </el-button>
                <el-button
                  icon="el-icon-refresh-left"
                  type="danger"
                  plain
                  @click="resetFilter"
                >
                  Reset
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item>
                <el-tooltip
                  class="item"
                  content="Delete selected results"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    @click="deleteSelection"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-form>
          <el-table
            ref="resultTable"
            v-loading="resultLoading"
            :data="resultList"
            element-loading-text="Loading Results..."
            stripe
            @row-dblclick="toggleExpand"
            @expand-change="lazyLoading"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column type="expand" width="20">
              <template slot-scope="props">
                <el-col :span="12">
                  <el-form
                    label-position="left"
                    label-width="80px"
                    class="table-expand"
                    style="margin-left: 50px"
                  >
                    <el-form-item label="Args:">
                      <el-input
                        v-model="props.row.argDisplay"
                        type="textarea"
                        resize="none"
                        :autosize="{ minRows: 5, maxRows: 10 }"
                        readonly
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="Notes:">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <div
                    :id="'accChart' + props.row.result_id"
                    style="width: 100%; height: 250px; margin: 5%"
                  ></div>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column
              label="Id"
              prop="result_id"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              label="Model"
              prop="model_name"
              align="center"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="Dataset"
              prop="dataset_name"
              align="center"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="Train Mode"
              prop="is_tuning"
              align="center"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.is_tuning == 'Tune' ? 'primary' : 'success'"
                  disable-transitions
                >
                  {{ scope.row.is_tuning }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="Acc"
              prop="accuracy"
              align="center"
              min-width="100"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              label="F1"
              prop="f1"
              align="center"
              min-width="100"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              label="Time"
              prop="created_at"
              align="center"
              min-width="120"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              align="center"
              width="260"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  content="Show result details"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="showDetails(scope.row)">
                    Details
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Set parameters as default"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="setDefault(scope.row)">
                    Default
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Go to training page with these parameters"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="retrain(scope.row)">
                    Retrain
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  content="Delete this result"
                  placement="top"
                  :enterable="false"
                >
                  <el-button type="text" @click="delResult(scope.row)">
                    Delete
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :background="true"
            :current-page="filter.pageNo"
            :page-size="filter.pageSize"
            :hide-on-single-page="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getResults, setDefaultModel, delResult } from '@/api/analysisEnd'
  import { getAllSettings } from '@/api/getSettings'
  import * as echarts from 'echarts'
  import * as dayjs from 'dayjs'
  export default {
    name: 'ModelResults',
    data() {
      return {
        resultList: [],
        datasetList: [],
        modelList: [],
        modeList: ['Both', 'Train', 'Tune'],
        resultLoading: true,
        total: 0,
        filter: {
          model_name: 'All',
          dataset_name: 'All',
          is_tuning: 'Both',
          sortBy: '',
          order: '',
          pageNo: 1,
          pageSize: 10,
        },
        multipleSelection: [],
      }
    },
    computed: {},
    watch: {},
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    created() {
      if (this.$route.query.model) {
        this.filter.model_name = this.$route.query.model
      }
      this.fetchResults()
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      handleResize() {},
      handleSizeChange(val) {
        this.filter.pageSize = val
        this.fetchResults()
      },
      handleCurrentChange(val) {
        this.filter.pageNo = val
        this.fetchResults()
      },
      handleSortChange(column) {
        // console.log(column)
        this.filter.sortBy = column.prop
        this.filter.order = column.order
        this.fetchResults()
      },
      async fetchSettings() {
        this.resultLoading = true
        let { datasets, models } = await getAllSettings()
        this.modelList = models
        this.modelList.unshift('All')
        this.datasetList = datasets
        this.datasetList.unshift({
          name: 'All',
          sentiment: '',
        })
        this.resultLoading = false
      },
      async fetchResults() {
        this.resultLoading = true
        let { results, totalCount } = await getResults(this.filter)
        this.resultList = results
        for (let i in this.resultList) {
          this.resultList[i].accuracy = parseFloat(
            this.resultList[i].accuracy
          ).toFixed(4)
          this.resultList[i].f1 = parseFloat(this.resultList[i].f1).toFixed(4)
          let time = dayjs(this.resultList[i].created_at).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.resultList[i].created_at = time
          // this.resultList[i].argDisplay = JSON.stringify(
          //   JSON.parse(this.resultList[i].args),
          //   null,
          //   '\t'
          // )
        }
        this.total = totalCount
        this.resultLoading = false
      },
      applyFilter() {
        this.filter.pageNo = 1
        this.fetchResults()
      },
      resetFilter() {
        this.$refs.resultTable.clearFilter()
        this.$refs.resultTable.clearSort()
        this.filter.model_name = 'All'
        this.filter.dataset_name = 'All'
        this.filter.is_tuning = 'Both'
        this.filter.pageNo = 1
        this.filter.sortBy = ''
        this.filter.order = ''
        this.fetchResults()
      },
      toggleExpand(row) {
        this.$refs.resultTable.toggleRowExpansion(row)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      lazyLoading(row, expandedRows) {
        if (expandedRows.indexOf(row) == -1) {
          // folded, destroy echarts instance
          // var acc_dom = document.getElementById('accChart' + row.result_id)
          // let acc_chart = echarts.getInstanceByDom(acc_dom)
          // acc_chart.dispose()
        } else {
          // expanded
          row.argDisplay = JSON.stringify(JSON.parse(row.args), null, '\t')
          row.noteDisplay = row.description

          // this.$nextTick(() => {
          //   var acc_dom = document.getElementById('accChart' + row.result_id)

          //   let acc_chart = echarts.init(acc_dom)
          //   acc_chart.setOption({
          //     title: {
          //       text: 'Accuracy',
          //     },
          //     toolbox: {
          //       show: true,
          //       feature: {
          //         saveAsImage: {
          //           show: true,
          //         },
          //       },
          //     },
          //     legend: {},
          //     xAxis: {
          //       name: 'epoch',
          //       type: 'category',
          //       data: [1, 2, 3, 4, 5],
          //     },
          //     yAxis: {
          //       name: 'Accuracy',
          //       type: 'value',
          //     },
          //     series: [
          //       {
          //         name: 'Train',
          //         type: 'line',
          //         data: [19, 32, 13, 45, 32],
          //       },
          //     ],
          //   })
          // })
        }
      },
      showDetails(row) {
        this.$router.push({
          path: '/analysis/resultDetails',
          query: {
            result_id: row.result_id,
            train_mode: row.is_tuning,
          },
        })
      },
      async setDefault(row) {
        let { msg } = await setDefaultModel({ id: row.result_id })
        if (msg == 'success') {
          this.$message({
            message:
              'Default Params set for ' +
              row.model_name +
              ' on ' +
              row.dataset_name,
            type: 'success',
          })
          this.fetchResults()
        } else {
          this.$message({
            message: msg,
            type: 'error',
          })
        }
      },
      retrain(row) {
        this.$router.push({
          path: '/model/modelTraining',
          query: {
            model: row.model_name,
            dataset: row.dataset_name,
            args: row.args,
          },
        })
      },
      delResult(row) {
        const h = this.$createElement
        let msg = []
        msg.push(
          h('p', { style: 'text-align: center' }, [
            h('span', null, 'Deleting Result '),
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              row.result_id
            ),
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
            let { msg } = await delResult({ id: [row.result_id] })
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
      },
      deleteSelection() {
        if (this.multipleSelection.length == 0) {
          return
        }
        let postData = []
        for (let i in this.multipleSelection) {
          postData.push(this.multipleSelection[i].result_id)
        }
        console.log(postData)
        const h = this.$createElement
        // console.log(row.result_id)
        let msg = []
        msg.push(
          h('p', { style: 'text-align: center' }, [
            h('span', null, 'Deleting multiple results'),
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
            let { msg } = await delResult({ id: postData })
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
      },
    },
  }
</script>

<style lang="scss" scoped>
  .results-container {
    margin: 0%;
    .results-table {
      margin: 0% 5%;
    }
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .table-expand .el-form-item span {
    font-weight: normal;
  }
</style>
