<template>
  <div class="datasetDetails-container">
    <h1 style="margin-left: 2%">Dataset Details</h1>
    <p class="tips"></p>
    <el-row :gutter="80">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="14">
          <h2>{{ queryForm.datasetName }} Dataset</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="12">
              <el-form label-width="120px" label-position="left">
                <el-form-item label="Dataset:">
                  <el-input
                    v-model="datasetDetails.datasetName"
                    readonly
                  ></el-input>
                </el-form-item>
                <el-form-item label="Labeled / Total:">
                  <el-input v-model="labeledFraction" readonly></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="12">
              <el-form label-width="120px" label-position="left">
                <el-form-item label="Status:">
                  <el-input v-model="datasetDetails.locked" readonly></el-input>
                </el-form-item>
                <el-form-item label="Language:">
                  <el-input
                    v-model="datasetDetails.language"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form label-width="120px" label-position="left">
                <el-form-item label="Description:">
                  <el-input
                    v-model="datasetDetails.description"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 5 }"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="10">
          <h2>Data Distribution</h2>
          <el-row>
            <el-col :span="12">
              <div
                id="dataDistribution1"
                ref="dataDistribution1"
                style="width: 100%; height: 220px; margin: 0 auto"
              ></div>
            </el-col>
            <el-col :span="12">
              <div
                id="dataDistribution2"
                ref="dataDistribution2"
                style="width: 100%; height: 220px; margin: 0 auto"
              ></div>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>
    <el-row style="margin-top: 2%">
      <div class="top-row">
        <el-col>
          <el-form :model="queryForm" inline>
            <el-form-item label="Label:">
              <el-select v-model="queryForm.label" style="width: 150px">
                <el-option
                  v-for="item in labelList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Data Split:">
              <el-select v-model="queryForm.dataSplit" style="width: 120px">
                <el-option
                  v-for="item in dataSplitList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Sample ID:">
              <el-input
                v-model="queryForm.sampleID"
                style="width: 150px"
              ></el-input>
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
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="datasetDetails.instanceList"
            element-loading-text="Loading..."
            style="width: 100%"
          >
            <el-table-column
              fixed
              label="Sample ID"
              prop="sample_id"
              width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="Video ID"
              prop="video_id"
              width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="Clip ID"
              prop="clip_id"
              width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Label"
              prop="annotation"
              width="120px"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="
                    scope.row.annotation == 'Negative'
                      ? 'warning'
                      : scope.row.annotation == 'Neutral'
                      ? 'primary'
                      : 'success'
                  "
                  disable-transitions
                >
                  {{ scope.row.annotation }}
                </el-tag>
              </template>
            </el-table-column>
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
              label="Data Split"
              prop="data_mode"
              width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              width="160px"
              align="center"
            >
              <template #default="{ row }">
                <el-button type="text" @click="showPreview(row)">
                  Play Video
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :background="true"
            :current-page="queryForm.pageNo"
            layout="total, sizes, prev, pager, next, jumper"
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
  import { getDetails, getMetaData } from '@/api/dataEnd'
  import Preview from './components/Preview'
  import * as echarts from 'echarts'
  export default {
    name: 'DatasetDetails',
    components: {
      Preview,
    },
    data() {
      return {
        listLoading: true,
        total: 0,
        labelList: ['All', 'Positive', 'Neutral', 'Negative'],
        dataSplitList: ['All', 'Train', 'Valid', 'Test'],
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
          label: 'All',
          dataSplit: 'All',
          sampleID: '',
        },
        datasetDetails: {
          datasetName: null,
          locked: null,
          labeled: 0,
          totalCount: null,
          language: null,
          description: null,
          difficultyCount: null, // a list for pie chart 2
          classCount: null, // a list for pie chart 1
          instanceList: null, // a copy of response data
        },
        myChart_1: null,
        myChart_2: null,
      }
    },
    computed: {
      labeledFraction() {
        return (
          this.datasetDetails.labeled + ' / ' + this.datasetDetails.totalCount
        )
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      // Fetch Video List Info && Data Meta Data -> Excharts Dom.
      ;(async () => {
        await this.fetchMetadata()
        await this.fetchDetails()
        // Construct Excharts Dom.
        var pie_dv_1 = this.$refs.dataDistribution1
        var pie_dv_2 = this.$refs.dataDistribution2
        this.myChart_1 = echarts.init(pie_dv_1)
        this.myChart_2 = echarts.init(pie_dv_2)
        var difficulty_data = []
        for (var key in this.datasetDetails.difficultyCount) {
          difficulty_data.push({
            value: this.datasetDetails.difficultyCount[key],
            name: key,
          })
        }
        var label_data = []
        for (var key in this.datasetDetails.classCount) {
          label_data.push({
            value: this.datasetDetails.classCount[key],
            name: key,
          })
        }

        this.myChart_1.setOption({
          title: {
            text: 'Sentiment',
            x: 'center',
            y: 'top',
          },
          legend: {
            bottom: 0,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            position: [0, 0],
          },
          series: [
            {
              name: 'Sentiment',
              type: 'pie',
              radius: ['40%', '75%'],
              data: label_data,
              label: { show: false, position: 'center' },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold',
                },
              },
            },
          ],
        })

        this.myChart_2.setOption({
          title: {
            text: 'Difficulty',
            x: 'center',
            y: 'top',
          },
          legend: {
            bottom: 0,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            position: [0, 0],
          },
          series: [
            {
              name: 'Difficulty',
              type: 'pie',
              radius: ['40%', '75%'],
              data: difficulty_data,
              label: { show: false, position: 'center' },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold',
                },
              },
            },
          ],
        })
      })()
    },
    methods: {
      handleResize() {
        this.myChart_1.resize()
        this.myChart_2.resize()
      },
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      resetFilter() {
        this.queryForm.sampleID = ''
        this.queryForm.label = 'All'
        this.queryForm.dataSplit = 'All'
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
          sentiment_filter: this.queryForm.label,
          data_mode_filter: this.queryForm.dataSplit,
          id_filter: this.queryForm.sampleID,
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
        this.datasetDetails.datasetName = data.datasetName
        this.datasetDetails.totalCount = data.totalCount
        this.datasetDetails.language = data.language
        this.datasetDetails.description = data.description
        this.datasetDetails.locked = data.is_locked ? 'locked' : 'unlocked'
        let machine = data.difficultyCount['Machine']
          ? data.difficultyCount['Machine']
          : 0
        let human = data.difficultyCount['Human']
          ? data.difficultyCount['Human']
          : 0
        this.datasetDetails.labeled = machine + human

        this.datasetDetails.classCount = data.classCount
        this.datasetDetails.difficultyCount = data.difficultyCount
      },
    },
  }
</script>

<style lang="scss" scoped>
  .datasetDetails-container {
    margin: 0%;
    .top-row {
      margin: 0% 5%;
    }
  }
</style>
