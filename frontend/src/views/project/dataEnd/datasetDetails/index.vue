<template>
  <div class="datasetDetails-container">
    <h1>Dataset Details</h1>
    <p class="tips"></p>
    <el-row :gutter="120">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="14">
          <h2>{{ queryForm.datasetName }} Dataset</h2>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="12">
              <el-form
                ref="form"
                :model="datasetDetails.detailInfo"
                label-width="120px"
              >
                <el-form-item label="Dataset:">
                  <el-input
                    v-model="datasetDetails.detailInfo.datasetName"
                    style="min-width: 120px"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="Labeled / Total:">
                  <el-input
                    v-model="labeledFraction"
                    style="min-width: 120px"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="12">
              <el-form
                ref="form"
                :model="datasetDetails.detailInfo"
                label-width="120px"
              >
                <el-form-item label="Status:">
                  <el-input
                    v-model="datasetDetails.detailInfo.locked"
                    style="min-width: 120px"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="Language:">
                  <el-input
                    v-model="datasetDetails.detailInfo.language"
                    style="min-width: 120px"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form label-width="120px">
                <el-form-item label="Description:">
                  <el-input
                    v-model="datasetDetails.detailInfo.description"
                    style="min-width: 120px"
                    type="textarea"
                    :rows="3"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="10">
          <h2>Data Distribution</h2>
          <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div
                id="dataDistribution"
                ref="dataDistribution2"
                style="width: 340px; height: 220px; margin: 0 auto"
              ></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div
                id="dataDistribution"
                ref="dataDistribution1"
                style="width: 340px; height: 220px; margin: 0 auto"
              ></div>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>
    <el-row style="margin-top: 3%">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form ref="filter" :model="filter" :inline="true">
            <el-form-item label="Sentiment:" style="font-weight: bold">
              <el-select v-model="filter.sentiment" style="width: 150px">
                <el-option
                  v-for="item in filter.sentiment_list"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Type of Dataset:" style="font-weight: bold">
              <el-select v-model="filter.data_mode" style="width: 120px">
                <el-option
                  v-for="item in filter.data_mode_list"
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
          <el-table
            ref="tableSort"
            v-loading="listLoading"
            :data="datasetDetails.instanceList"
            :element-loading-text="elementLoadingText"
            style="width: 100%"
          >
            <el-table-column
              fixed
              show-overflow-tooltip
              label="Sample ID"
              prop="sample_id"
              min-width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed
              show-overflow-tooltip
              label="Video ID"
              prop="video_id"
              min-width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed
              show-overflow-tooltip
              label="Clip ID"
              prop="clip_id"
              min-width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="M-Label"
              prop="label_value"
              width="auto"
              min-width="100px"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="Text"
              prop="text"
              width="auto"
              min-width="240px"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="Type of Dataset"
              prop="data_mode"
              width="auto"
              min-width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed="right"
              show-overflow-tooltip
              label="Operations"
              width="auto"
              min-width="160px"
              align="center"
            >
              <template #default="{ row }">
                <el-button type="text" @click="showPreview(row)">
                  Preview Instance
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
        </el-col>
      </div>
    </el-row>
    <preview ref="preview"></preview>
  </div>
</template>

<script>
  import { getDetails, getMetaData } from '@/api/datasetDetail'
  import {
    renameDataset,
    unlockDataset,
    lockDataset,
    deleteDataset,
  } from '@/api/datasetCurd'
  import Preview from './components/Preview'
  export default {
    name: 'DatasetDetails',
    components: {
      Preview,
    },
    data() {
      return {
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: 'Loading Elements...',
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
        },
        filter: {
          sentiment_list: ['All'],
          sentiment: '',
          data_mode_list: ['All'],
          data_mode: '',
        },
        datasetDetails: {
          detailInfo: {
            datasetName: null,
            locked: null,
            human: 0,
            machine: 0,
            medium: 0,
            hard: 0,
            unlabeled: 0,
            labeled: 0,
            totalCount: null,
            language: null,
            unimodalLabel: null,
            description: null,
          },
          modelImg: [
            'https://i.picsum.photos/id/703/200/200.jpg?hmac=6zWxIBRmIf2e0jZTqvKBIwrc7wm-dPkvGky4go6Yyvg',
          ],
          instanceList: null,
        },
      }
    },
    computed: {
      labeledFraction() {
        return (
          this.datasetDetails.detailInfo.labeled +
          ' / ' +
          this.datasetDetails.detailInfo.totalCount
        )
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
    },
    mounted() {
      // Fetch Video List Info && Data Meta Data -> Excharts Dom.
      ;(async () => {
        await this.fetchMetadata()
        await this.fetchDetails()
        // Construct Excharts Dom.
        var echarts = require('echarts')
        var pie_dv_1 = this.$refs.dataDistribution1
        var pie_dv_2 = this.$refs.dataDistribution2
        let myChart_1 = echarts.init(pie_dv_1)
        let myChart_2 = echarts.init(pie_dv_2)
        var difficulty_data = []
        for (var key in this.datasetDetails.detailInfo.difficultyCount) {
          difficulty_data.push({
            value: this.datasetDetails.detailInfo.difficultyCount[key],
            name: key,
          })
        }
        myChart_1.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data: difficulty_data,
            },
          ],
        })
        var sentiment_data = []
        for (var key in this.datasetDetails.detailInfo.classCount) {
          sentiment_data.push({
            value: this.datasetDetails.detailInfo.classCount[key],
            name: key,
          })
        }
        myChart_2.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data: sentiment_data,
            },
          ],
        })
      })()
    },
    methods: {
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      showPreview(row) {
        this.$refs['preview'].showPreview(row)
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchDetails()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchDetails()
      },
      async fetchDetails() {
        this.listLoading = true
        const { data, totalCount } = await getDetails({
          datasetName: this.queryForm.datasetName,
          difficulty_filter: 'All',
          sentiment_filter: this.filter.sentiment,
          data_mode_filter: this.filter.data_mode,
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
        })
        this.datasetDetails.instanceList = data
        this.total = totalCount
        this.listLoading = false
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        // Table List DOM.
        this.datasetDetails.detailInfo.datasetName = data.datasetName
        this.datasetDetails.detailInfo.totalCount = data.totalCount
        this.datasetDetails.detailInfo.language = data.language
        this.datasetDetails.detailInfo.description = data.description

        // Echarts DOM.
        this.datasetDetails.detailInfo.locked = data.is_locked
          ? 'locked'
          : 'unlocked'
        this.datasetDetails.detailInfo.machine = data.difficultyCount['Machine']
          ? data.difficultyCount['Machine']
          : 0
        this.datasetDetails.detailInfo.human = data.difficultyCount['Human']
          ? data.difficultyCount['Human']
          : 0
        this.datasetDetails.detailInfo.labeled =
          this.datasetDetails.detailInfo.human +
          this.datasetDetails.detailInfo.machine
        // Search Bar DOM.
        this.datasetDetails.detailInfo.classCount = data.classCount
        this.datasetDetails.detailInfo.difficultyCount = data.difficultyCount
        for (var key in data.classCount) {
          this.filter.sentiment_list.push(key)
        }
        this.filter.sentiment = this.filter.sentiment_list[0]
        for (var key in data.typeCount) {
          this.filter.data_mode_list.push(key)
        }
        this.filter.data_mode = this.filter.data_mode_list[0]
      },
    },
  }
</script>

<style lang="scss" scoped>
  .datasetDetails-container {
    margin: 0%;
    .top-row {
      margin: 0% 5%;
      .detail-info-operation {
        display: inline;
        .detail-info-operation-header {
          margin-left: 10%;
        }
        .operation-item {
          margin: 5% 15%;
          .operation-button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
