<template>
  <div class="labelingProcess-container">
    <h1 style="margin-left: 2%">Dataset Labeling</h1>
    <p class="tips"></p>
    <div class="top-row">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <h2>Basic Info</h2>
          <el-form
            label-width="120px"
            label-position="left"
            style="margin: 0 15px"
          >
            <el-form-item label="Dataset:">
              <el-input v-model="queryForm.datasetName" readonly></el-input>
            </el-form-item>
            <el-form-item label="Language:">
              <el-input v-model="datasetDetails.language" readonly></el-input>
            </el-form-item>
            <el-form-item label="Labeled / Total:">
              <el-input v-model="labeledFraction" readonly></el-input>
            </el-form-item>
            <el-form-item label="Description:">
              <el-input
                v-model="datasetDetails.description"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 2, maxRows: 5 }"
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="10" :xl="10">
          <h2>My Progress</h2>
          <el-form label-width="100px" label-position="left">
            <el-form-item label="Audio:">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="myProgress.audioP"
                :format="formatPercentage(myProgress, 'audio')"
                color="#91cc75"
                style="display: contents"
              ></el-progress>
            </el-form-item>
            <el-form-item label="Text:">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="myProgress.textP"
                :format="formatPercentage(myProgress, 'text')"
                color="#5470c6"
                style="display: contents"
              ></el-progress>
            </el-form-item>
            <el-form-item label="Video:">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="myProgress.videoP"
                :format="formatPercentage(myProgress, 'video')"
                color="#fac858"
                style="display: contents"
              ></el-progress>
            </el-form-item>
            <el-form-item label="Multimodal:">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="myProgress.multiP"
                :format="formatPercentage(myProgress, 'multi')"
                color="#ee6666"
                style="display: contents"
              ></el-progress>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
          <h2>Operations</h2>
          <el-form>
            <el-form-item>
              <el-button style="width: 150px" type="blue" @click="labelAudio">
                Audio Label
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 150px" type="green" @click="labelText">
                Text Label
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 150px" type="yellow" @click="labelVideo">
                Video Label
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 150px" type="red" @click="labelMulti">
                Multimodal Label
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="mid-row">
      <h2>Overall Progress</h2>
      <el-row class="progress-all">
        <div
          id="progressChart"
          ref="progressChart"
          style="width: 100%; height: 250px; margin: 0 auto"
        ></div>
      </el-row>
    </div>
    <div v-if="isAdmin" class="mid-row">
      <h2>Admin Operations</h2>
      <div class="admin-buttons">
        <el-button type="primary" plain @click="taskAssign">
          Task Assignment
        </el-button>
        <el-button
          slot="reference"
          type="primary"
          plain
          @click="handleCalculateLabelClicked"
        >
          Calculate Labels
        </el-button>
        <el-button type="primary" plain>Export User Label Data</el-button>
        <!-- <el-button type="danger" plain>Close Labeling Task</el-button> -->
      </div>
    </div>
    <div v-if="isAdmin" class="bottom-row">
      <el-row style="margin-top: 2%">
        <h2>Sample Status</h2>
        <el-form :model="queryForm" :inline="true">
          <el-form-item label="Video ID:">
            <el-input
              v-model="queryForm.videoID"
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
          :data="instanceList"
          element-loading-text="Loading..."
          style="width: 100%"
        >
          <el-table-column
            fixed
            show-overflow-tooltip
            label="Video ID"
            prop="video_id"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            label="Clip ID"
            prop="clip_id"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Status"
            prop="status"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag :type="tagMapper(scope.row.status)" disable-transitions>
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Assigned To"
            prop="assigned"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Labeled_M"
            prop="label_M"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Labeled_T"
            prop="label_T"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Labeled_A"
            prop="label_A"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="Labeled_V"
            prop="label_V"
            min-width="120px"
            align="center"
          ></el-table-column>
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
      </el-row>
    </div>
    <task-assignment ref="TaskAssignment" @refresh="refresh"></task-assignment>
    <text-label ref="TextLabel" @refresh="refresh"></text-label>
    <audio-label ref="AudioLabel" @refresh="refresh"></audio-label>
    <video-label ref="VideoLabel" @refresh="refresh"></video-label>
    <multi-label ref="MultiLabel" @refresh="refresh"></multi-label>
    <el-dialog
      title="Number of Annotators"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <div style="margin-left: 20px">
        <el-input-number
          v-model="threshold"
          :min="1"
          :max="10"
          style="margin-bottom: 20px"
        ></el-input-number>
        <el-tooltip
          content="Label of a sample won't be calculated if number of 
          already-labeled annotators hasn't reach this number."
          placement="top"
        >
          <i class="el-icon-question" style="margin-left: 30px"></i>
        </el-tooltip>
      </div>
      <div slot="footer">
        <el-button
          :loading="loading"
          type="primary"
          @click="handleCalculateClicked"
        >
          Calculate
        </el-button>
        <el-button @click="handleCancelClicked">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getMetaData } from '@/api/dataEnd'
  import { getLabelingDetails } from '@/api/labeling'
  import {
    getMyProgress,
    getAllProgress,
    calculateLables,
  } from '@/api/labeling'
  import TaskAssignment from './components/taskAssignment.vue'
  import TextLabel from './components/textDialog.vue'
  import AudioLabel from './components/audioDialog.vue'
  import VideoLabel from './components/videoDialog.vue'
  import MultiLabel from './components/multiDialog.vue'
  import * as echarts from 'echarts'
  export default {
    name: 'LabelingProcess',
    components: {
      TaskAssignment,
      TextLabel,
      AudioLabel,
      VideoLabel,
      MultiLabel,
    },
    data() {
      return {
        listLoading: true,
        total: 0,
        datasetDetails: {
          language: null,
          description: null,
          totalCount: null,
          labeled: null,
          classCount: null,
        },
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
          videoID: '',
        },
        myProgress: {
          text: 0,
          audio: 0,
          video: 0,
          multi: 0,
          all: 0,
          textP: 0,
          audioP: 0,
          videoP: 0,
          multiP: 0,
        },
        charts: {
          progressChart: null,
        },
        chart_1_height: '250px',
        dialogVisible: false,
        threshold: 5,
        loading: false,
        instanceList: null,
      }
    },
    computed: {
      labeledFraction() {
        return (
          this.datasetDetails.labeled + ' / ' + this.datasetDetails.totalCount
        )
      },
      isAdmin() {
        return this.$store.state.auth.isAdmin
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      this.fetchMetadata()
      this.fetchProgress()
      if (this.isAdmin) {
      }
    },
    mounted() {
      ;(async () => {
        for (let key in this.charts) {
          let dom = this.$refs[key]
          this.charts[key] = echarts.init(dom)
        }
        await this.fetchAllProgress()
        this.handleResize()
      })()
      if (this.isAdmin) {
        this.fetchDetails()
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      tagMapper(text) {
        switch (text) {
          case 'Finished':
            return 'success'
          case 'Labeling':
            return 'warning'
          default:
            return ''
        }
      },
      refresh() {
        this.fetchMetadata()
        this.fetchProgress()
        this.fetchAllProgress()
        if (this.isAdmin) {
          this.fetchDetails()
        }
      },
      handleResize() {
        this.charts.progressChart.resize()
        // this.myChart_2.resize()
      },
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      resetFilter() {
        this.queryForm.pageNo = 1
        this.queryForm.label = 'All'
        this.queryForm.videoID = ''
        this.fetchDetails()
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchDetails()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchDetails()
      },
      formatPercentage(dict, modality) {
        return () => {
          return `${dict[`${modality}P`]}% (${dict[modality]} / ${dict['all']})`
        }
      },
      async fetchProgress() {
        let { data } = await getMyProgress({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.queryForm.datasetName,
        })
        this.myProgress = data
        if (data.all != 0) {
          this.myProgress.textP = Math.ceil((data.text * 100) / data.all)
          this.myProgress.audioP = Math.ceil((data.audio * 100) / data.all)
          this.myProgress.videoP = Math.ceil((data.video * 100) / data.all)
          this.myProgress.multiP = Math.ceil((data.multi * 100) / data.all)
        } else {
          this.myProgress.textP = 0
          this.myProgress.audioP = 0
          this.myProgress.videoP = 0
          this.myProgress.multiP = 0
        }
      },
      async fetchAllProgress() {
        let { data } = await getAllProgress({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.queryForm.datasetName,
        })
        var chart_dv_1 = this.$refs.progressChart
        var chart_1_height = data.users.length * 40 + 50
        chart_1_height = chart_1_height + 'px'
        chart_dv_1.style.height = chart_1_height
        this.charts.progressChart.clear()
        this.charts.progressChart.setOption({
          legend: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '25',
            bottom: '3%',
            containLabel: true,
          },
          yAxis: {
            type: 'category',
            data: data['users'],
          },
          xAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Audio',
              type: 'bar',
              barMaxWidth: '50',
              data: data['label_A'],
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: 'Text',
              type: 'bar',
              barMaxWidth: '50',
              data: data['label_T'],
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: 'Video',
              type: 'bar',
              barMaxWidth: '50',
              data: data['label_V'],
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: 'Multi',
              type: 'bar',
              barMaxWidth: '50',
              data: data['label_M'],
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
            },
          ],
        })
      },
      async fetchDetails() {
        this.listLoading = true
        const { data, totalCount } = await getLabelingDetails({
          token: window.sessionStorage.getItem('token'),
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          idFilter: this.queryForm.videoID,
          statusFilter: this.queryForm.status,
          datasetName: this.queryForm.datasetName,
        })
        this.instanceList = data
        this.total = totalCount
        this.listLoading = false
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        this.datasetDetails.totalCount = data.totalCount
        this.datasetDetails.language = data.language
        this.datasetDetails.description = data.description
        this.datasetDetails.labeled = data.labeled
        this.datasetDetails.classCount = data.classCount
      },
      handleCalculateLabelClicked() {
        this.dialogVisible = true
      },
      async handleCalculateClicked() {
        this.loading = true
        let { msg } = await calculateLables({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.queryForm.datasetName,
          threshold: this.threshold,
        })
        if (msg == 'success') {
          this.$message({
            message: 'Labels Calculated',
            type: 'success',
          })
        } else {
          this.$message({
            message: 'Label Calculation Failed',
            type: 'error',
          })
        }
      },
      handleCancelClicked() {
        this.dialogVisible = false
      },
      taskAssign() {
        this.$refs['TaskAssignment'].show()
      },
      labelText() {
        this.$refs['TextLabel'].show()
      },
      labelAudio() {
        this.$refs['AudioLabel'].show()
      },
      labelVideo() {
        this.$refs['VideoLabel'].show()
      },
      labelMulti() {
        this.$refs['MultiLabel'].show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .labelingProcess-container {
    margin: 0%;
    .top-row {
      margin: 0% 5%;
    }
    .mid-row {
      margin: 0% 5%;
    }
    .bottom-row {
      margin: 0% 5%;
    }
  }
</style>

<style lang="scss">
  .el-progress-bar__outer {
    background-color: #c7c7c7;
  }

  .el-button--blue.is-active,
  .el-button--blue:active {
    background: #5470c6;
    border-color: #5470c6;
    color: #fff;
  }
  .el-button--blue:focus,
  .el-button--blue:hover {
    background: #6c87da;
    border-color: #6c87da;
    color: #fff;
  }
  .el-button--blue {
    background: #5470c6;
    border-color: #5470c6;
    color: #fff;
  }

  .el-button--green.is-active,
  .el-button--green:active {
    background: #91cc75;
    border-color: #91cc75;
    color: #fff;
  }
  .el-button--green:focus,
  .el-button--green:hover {
    background: #a0d388;
    border-color: #a0d388;
    color: #fff;
  }
  .el-button--green {
    background: #91cc75;
    border-color: #91cc75;
    color: #fff;
  }

  .el-button--yellow.is-active,
  .el-button--yellow:active {
    background: #fac858;
    border-color: #fac858;
    color: #fff;
  }
  .el-button--yellow:focus,
  .el-button--yellow:hover {
    background: #fcd176;
    border-color: #fcd176;
    color: #fff;
  }
  .el-button--yellow {
    background: #fac858;
    border-color: #fac858;
    color: #fff;
  }

  .el-button--red.is-active,
  .el-button--red:active {
    background: #ee6666;
    border-color: #ee6666;
    color: #fff;
  }
  .el-button--red:focus,
  .el-button--red:hover {
    background: #f58484;
    border-color: #f58484;
    color: #fff;
  }
  .el-button--red {
    background: #ee6666;
    border-color: #ee6666;
    color: #fff;
  }
</style>
