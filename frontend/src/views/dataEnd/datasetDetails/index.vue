<template>
  <div class="datasetDetails-container">
    <h1 style="margin-left: 2%">Dataset Details</h1>
    <p class="tips"></p>
    <el-row :gutter="80">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
          <h2>Basic Info</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
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
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <h2>Data Distribution</h2>
          <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div
                id="dataDistribution1"
                ref="dataDistribution1"
                style="width: 100%; height: 220px; margin: 0 auto"
              ></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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
          <el-form :model="queryForm" inline size="mini">
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
            <el-form-item label="Video ID:">
              <el-input
                v-model="queryForm.videoID"
                style="width: 150px"
                @keyup.enter.native="applyFilter"
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
              label="C_Label"
              prop="annotation"
              width="120px"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="tagMapper(scope.row.annotation)"
                  disable-transitions
                >
                  {{ scope.row.annotation }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="R_Label"
              prop="label_value"
              width="120px"
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
                  Play-Video
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
          videoID: '',
        },
        datasetDetails: {
          datasetName: null,
          locked: null,
          labeled: 0,
          totalCount: null,
          language: null,
          description: null,
          classCount: null, // data list for pie chart 1
          typeCount: null, // data list for pie chart 2
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
      this.fetchDetails()
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      ;(async () => {
        await this.fetchMetadata()
        var pie_dv_1 = this.$refs.dataDistribution1
        var pie_dv_2 = this.$refs.dataDistribution2
        this.myChart_1 = echarts.init(pie_dv_1)
        this.myChart_2 = echarts.init(pie_dv_2)
        var label_data = []
        for (var key in this.datasetDetails.classCount) {
          label_data.push({
            value: this.datasetDetails.classCount[key],
            name: key,
          })
        }
        var split_data = []
        for (var key in this.datasetDetails.typeCount) {
          split_data.push({
            value: this.datasetDetails.typeCount[key],
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
            type: 'scroll',
            bottom: 0,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            position: [0, 0],
            formatter: function (params) {
              var res = `${params.marker} ${params.data.name}: <b>${params.percent}%</b>`
              return res
            },
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
                  formatter: '{b}\n\n{c}',
                },
              },
            },
          ],
        })
        this.myChart_2.setOption({
          title: {
            text: 'Split',
            x: 'center',
            y: 'top',
          },
          legend: {
            type: 'scroll',
            bottom: 0,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            position: [0, 0],
            formatter: function (params) {
              var res = `${params.marker} ${params.data.name}: <b>${params.percent}%</b>`
              return res
            },
          },
          series: [
            {
              name: 'Split',
              type: 'pie',
              radius: ['40%', '75%'],
              data: split_data,
              label: { show: false, position: 'center' },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold',
                  formatter: '{b}\n\n{c}',
                },
              },
            },
          ],
        })
      })()
    },
    methods: {
      tagMapper(text) {
        switch (text) {
          case 'Positive':
            return 'success'
          case 'Neutral':
            return ''
          case 'Negative':
            return 'warning'
          case '-':
            return 'info'
          default:
            return ''
        }
      },
      handleResize() {
        this.myChart_1.resize()
        this.myChart_2.resize()
      },
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      resetFilter() {
        this.queryForm.videoID = ''
        this.queryForm.label = 'All'
        this.queryForm.dataSplit = 'All'
        this.fetchDetails()
      },
      showPreview(row) {
        // console.log(row)
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
          sentiment_filter: this.queryForm.label,
          data_mode_filter: this.queryForm.dataSplit,
          id_filter: this.queryForm.videoID,
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
        this.datasetDetails.locked = data.status

        this.datasetDetails.labeled = data.labeled

        this.datasetDetails.classCount = data.classCount
        this.datasetDetails.typeCount = data.typeCount
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
