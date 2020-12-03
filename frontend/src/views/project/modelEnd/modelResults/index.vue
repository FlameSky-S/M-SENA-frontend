<template>
  <div class="results-container">
    <h1 style="margin-left: 2%">Model Results</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="results-table">
          <vab-query-form>
            <!-- <vab-query-form-left-panel> -->
            <el-form ref="filter" :model="filter" :inline="true">
              <el-form-item label="Model:" style="font-weight: bold">
                <el-select v-model="filter.model" style="width: 150px">
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Dataset:" style="font-weight: bold">
                <el-select v-model="filter.dataset" style="width: 150px">
                  <el-option
                    v-for="item in datasetList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Mode:" style="font-weight: bold">
                <el-select v-model="filter.mode" style="width: 120px">
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
            <!-- </vab-query-form-left-panel> -->
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
              prop="id"
              align="center"
              min-width="60"
              sortable
            ></el-table-column>
            <el-table-column
              label="Model"
              prop="model"
              align="center"
              min-width="90"
              sortable
            ></el-table-column>
            <el-table-column
              label="Dataset"
              prop="dataset"
              align="center"
              min-width="100"
              sortable
            ></el-table-column>
            <el-table-column
              label="Mode"
              prop="mode"
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
              prop="loss"
              align="center"
              min-width="80"
              sortable
            ></el-table-column>
            <el-table-column
              label="Time"
              prop="date"
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
        modeList: ['Both', 'Tune', 'Run'],
        resultLoading: true,
        total: 0,
        filter: {
          model: 'All',
          dataset: 'All',
          mode: 'Both',
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    computed: {},
    watch: {},
    created() {
      if (this.$route.query.model) {
        this.filter.model = this.$route.query.model
      }
      this.fetchResults()
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
      async fetchResults() {
        this.resultLoading = true
        let { results, totalCount } = await getResults(this.filter)
        this.resultList = results
        this.total = totalCount
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
      applyFilter() {
        this.filter.pageNo = 1
        this.fetchResults()
      },
      toggleExpand(row) {
        this.$refs.table.toggleRowExpansion(row)
      },
      async setDefault(row) {
        let { msg } = await setDefaultParams(row.id)
        if (msg == 'success') {
          this.$message({
            message:
              'Default Params set for ' + row.model + ' on ' + row.dataset,
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
          query: { model: row.model, dataset: row.dataset },
        })
      },
      delResult(row) {
        const h = this.$createElement
        // console.log(row.id)
        let msg = []
        msg.push(
          h('p', { style: 'text-align: center' }, [
            h('span', null, 'Deleting Result '),
            h('span', { style: 'color: teal; font-weight: 700' }, row.id),
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
            let { msg } = await delResult({ id: row.id })
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
