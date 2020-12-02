<template>
  <div class="results-container">
    <h1 style="margin-left: 2%">Model Results</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="results-table">
          <vab-query-form>
            <vab-query-form-left-panel>
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
            </vab-query-form-left-panel>
          </vab-query-form>
          <el-table
            v-loading="resultLoading"
            :data="resultList"
            element-loading-text="Loading Results..."
            stripe
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                  <el-form-item label="Args:">
                    <span>{{ props.row.args }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="Id"
              prop="id"
              align="center"
              min-width="60"
            ></el-table-column>
            <el-table-column
              label="Model"
              prop="model"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="Dataset"
              prop="dataset"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="Mode"
              prop="mode"
              align="center"
              min-width="60"
            ></el-table-column>
            <el-table-column
              label="Time"
              prop="date"
              align="center"
              min-width="100"
            ></el-table-column>
            <el-table-column
              label="Notes"
              prop="description"
              align="center"
              min-width="200"
            ></el-table-column>
            <el-table-column label="Operations" align="center" min-width="160">
              <template slot-scope="scope">
                <el-button type="text" @click="viewResult(scope.row)">
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
  import { getTrainResults } from '@/api/modelEnd'
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
        let { results, totalCount } = await getTrainResults(this.filter)
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
      viewResult() {},
      setDefault() {},
      retrain(row) {
        console.log(row)
        this.$router.push({
          path: '/model/modelTraining',
          query: { model: row.model, dataset: row.dataset },
        })
      },
      delResult() {},
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
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
