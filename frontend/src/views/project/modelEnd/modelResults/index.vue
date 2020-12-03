<template>
  <div class="results-container">
    <h1 style="margin-left: 2%">Model Results</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="results-table">
          <vab-query-form>
            <el-form ref="filter" :model="filter" :inline="true">
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
              </el-form-item>
            </el-form>
          </vab-query-form>
          <el-table
            ref="table"
            v-loading="resultLoading"
            :data="resultList"
            element-loading-text="Loading Results..."
            stripe
            @row-dblclick="toggleExpand"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  label-width="80px"
                  class="table-expand"
                  style="margin-left: 50px"
                >
                  <el-form-item label="F1:">
                    <span>{{ props.row.f1 }}</span>
                  </el-form-item>
                  <el-form-item label="MAE:">
                    <span>{{ props.row.mae }}</span>
                  </el-form-item>
                  <el-form-item label="Corr:">
                    <span>{{ props.row.corr }}</span>
                  </el-form-item>
                  <el-form-item label="Notes:">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                  <el-form-item label="Args:">
                    <p>{{ props.row.args }}</p>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="Id"
              prop="result_id"
              align="center"
              min-width="60"
              sortable
            ></el-table-column>
            <el-table-column
              label="Model"
              prop="model_name"
              align="center"
              min-width="90"
              sortable
            ></el-table-column>
            <el-table-column
              label="Dataset"
              prop="dataset_name"
              align="center"
              min-width="100"
              sortable
            ></el-table-column>
            <el-table-column
              label="Data Mode"
              prop="data_mode"
              align="center"
              min-width="100"
              sortable
            ></el-table-column>
            <el-table-column
              label="Train Mode"
              prop="is_tuning"
              align="center"
              min-width="90"
              sortable
            ></el-table-column>
            <el-table-column
              label="Acc"
              prop="accuracy"
              align="center"
              min-width="80"
              sortable
            ></el-table-column>
            <el-table-column
              label="Loss"
              prop="loss_value"
              align="center"
              min-width="80"
              sortable
            ></el-table-column>
            <el-table-column
              label="Time"
              prop="created_at"
              align="center"
              min-width="100"
              sortable
            ></el-table-column>
            <el-table-column label="Operations" align="center" min-width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="toggleExpand(scope.row)">
                  More
                </el-button>
                <el-button type="text" @click="setDefault(scope.row)">
                  Default
                </el-button>
                <el-button type="text" @click="retrain(scope.row)">
                  Retrain
                </el-button>
                <el-button type="text" @click="delResult(scope.row)">
                  Delete
                </el-button>
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
  import { getResults, setDefaultParams, delResult } from '@/api/modelEnd'
  import { getAllSettings } from '@/api/getSettings'
  export default {
    name: 'ModelResults',
    data() {
      return {
        resultList: [],
        datasetList: [],
        modelList: [],
        modeList: ['Both', 'Normal', 'Tune'],
        resultLoading: true,
        total: 0,
        filter: {
          model_name: 'All',
          dataset_name: 'All',
          is_tuning: 'Both',
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    computed: {},
    watch: {},
    created() {
      if (this.$route.query.model) {
        this.filter.model_name = this.$route.query.model
      }
      this.fetchResults()
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      handleSizeChange(val) {
        this.filter.pageSize = val
        this.fetchResults()
      },
      handleCurrentChange(val) {
        this.filter.pageNo = val
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
          this.resultList[i].mae = parseFloat(this.resultList[i].mae).toFixed(4)
          this.resultList[i].corr = parseFloat(this.resultList[i].corr).toFixed(
            4
          )
          this.resultList[i].loss_value = parseFloat(
            this.resultList[i].loss_value
          ).toFixed(4)
        }
        this.total = totalCount
        this.resultLoading = false
      },
      applyFilter() {
        this.filter.pageNo = 1
        this.fetchResults()
      },
      toggleExpand(row) {
        this.$refs.table.toggleRowExpansion(row)
      },
      async setDefault(row) {
        let { msg } = await setDefaultParams(row.result_id)
        if (msg == 'success') {
          this.$message({
            message:
              'Default Params set for ' +
              row.model_name +
              ' on ' +
              row.dataset_name,
            type: 'success',
          })
        } else {
          this.$message({
            message: msg,
            type: 'error',
          })
        }
      },
      retrain(row) {
        // console.log(row)
        this.$router.push({
          path: '/model/modelTraining',
          query: { model: row.model_name, dataset: row.dataset_name },
        })
      },
      delResult(row) {
        const h = this.$createElement
        // console.log(row.result_id)
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
            let { msg } = await delResult({ id: row.result_id })
            if (msg == 'success') {
              this.$message({
                message: 'Successfully Deleted Result',
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
    margin-bottom: 0;
    font-weight: bold;
  }
  .table-expand .el-form-item span {
    font-weight: normal;
  }
  .table-expand .el-form-item p {
    margin: 0%;
    font-weight: normal;
  }
</style>
