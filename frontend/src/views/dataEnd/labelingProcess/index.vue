<template>
  <div class="labelingProcess-container">
    <h1 style="margin-left: 2%">Dataset Labeling</h1>
    <p class="tips"></p>
    <div class="top-row">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <h2>Basic Info</h2>
          <el-form
            label-width="120px"
            label-position="left"
            style="margin: 0% 15px"
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
                :autosize="{ minRows: 3, maxRows: 5 }"
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <h2>Distribution</h2>
          <div
            id="distribution"
            ref="distribution"
            style="width: 100%; height: 220px; margin: 0 auto"
          ></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <h2>Operations</h2>
          <el-form
            :model="queryForm"
            label-width="80px"
            label-position="left"
            style="margin: 0% 15px"
          >
            <el-form-item label="Classifier: ">
              <el-select v-model="queryForm.classifier" style="width: 50%">
                <el-option
                  v-for="item in classifierList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-tooltip
                class="item"
                content="Classifier Settings"
                placement="top"
                :enterable="false"
              >
                <el-button
                  icon="el-icon-edit-outline"
                  style="margin-left: 15px"
                  type="info"
                  plain
                  @click="classifierDetails"
                ></el-button>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="Selector:">
              <el-select v-model="queryForm.selector" style="width: 50%">
                <el-option
                  v-for="item in selectorList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-tooltip
                class="item"
                content="Selector Settings"
                placement="top"
                :enterable="false"
              >
                <el-button
                  icon="el-icon-edit-outline"
                  style="margin-left: 15px"
                  type="info"
                  plain
                  @click="selectorDetails"
                ></el-button>
              </el-tooltip>
            </el-form-item>
            <div align="center">
              <el-button type="primary" @click="autoLabel">
                <Vicon name="play" scale="0.75"></Vicon>
                Auto Label
              </el-button>
              <el-button type="primary" plain @click="manualLabel">
                <Vicon name="user" scale="0.75"></Vicon>
                Manual
              </el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-row">
      <el-row style="margin-top: 2%">
        <h2>Samples</h2>
        <el-form :model="queryForm" :inline="true">
          <el-form-item label="Difficulty:">
            <el-select v-model="queryForm.difficulty" style="width: 150px">
              <el-option
                v-for="item in difficultyList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
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
            label="SampleID"
            prop="sample_id"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column label="Difficulty" width="120px" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="tagMapper(scope.row.difficulty)"
                disable-transitions
              >
                {{ scope.row.difficulty }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="Require Human"
            prop="need_human"
            width="130px"
            align="center"
          ></el-table-column>
          <el-table-column label="Prediction" width="120px" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="tagMapper(scope.row.prediction)"
                disable-transitions
              >
                {{ scope.row.prediction }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Label" width="120px" align="center">
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
            label="Text"
            min-width="200"
            prop="text"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="Operations"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">Edit</el-button>
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
      </el-row>
    </div>
    <manually-label
      ref="manuallyLabel"
      @refresh-video-list="refresh"
    ></manually-label>
    <config-dialog
      ref="configSettings"
      @save-success="saveSuccess"
      @save-failed="saveFailed"
    ></config-dialog>
  </div>
</template>

<script>
  import { getDetails, getMetaData } from '@/api/dataEnd'
  import { startActiveLearning, getALModels } from '@/api/labeling'
  import ManuallyLabel from './components/manuallyLabel.vue'
  import ConfigDialog from './components/configDialog.vue'
  import * as echarts from 'echarts'
  export default {
    name: 'LabelingProcess',
    components: { ManuallyLabel, ConfigDialog },
    data() {
      return {
        listLoading: true,
        total: 0,
        difficultyList: [
          'All',
          'Unlabeled',
          'Human',
          'Machine',
          'Middle',
          'Hard',
        ],
        labelList: ['All', 'Positive', 'Neutral', 'Negative'],
        classifierList: [],
        selectorList: [],
        datasetDetails: {
          language: null,
          description: null,
          totalCount: null,
          labeled: null,
          difficultyCount: null,
        },
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
          classifier: '',
          selector: '',
          difficulty: 'All',
          label: 'All',
        },
        myChart: null,
        instanceList: null,
      }
    },
    computed: {
      labeledFraction() {
        return (
          this.datasetDetails.labeled + ' / ' + this.datasetDetails.totalCount
        )
      },
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      this.fetchActiveModel()
      this.fetchDetails()
    },
    mounted() {
      ;(async () => {
        await this.fetchMetadata()
        let dom = this.$refs.distribution
        this.myChart = echarts.init(dom)
        let difficulty_data = []
        for (let key in this.datasetDetails.difficultyCount) {
          difficulty_data.push({
            value: this.datasetDetails.difficultyCount[key],
            name: key,
          })
        }
        this.myChart.setOption({
          legend: {
            type: 'scroll',
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
              center: ['50%', '45%'],
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
        this.myChart.resize()
      },
      refresh() {
        this.fetchMetadata()
        this.fetchDetails()
      },
      classifierDetails() {
        this.$refs['configSettings'].show(
          'Classifier',
          this.queryForm.classifier
        )
      },
      selectorDetails() {
        this.$refs['configSettings'].show('Selector', this.queryForm.selector)
      },
      saveSuccess() {
        this.$message({
          message: 'Config Saved.',
          type: 'success',
        })
      },
      saveFailed() {
        this.$message({
          message: 'Save Failed',
          type: 'danger',
        })
      },
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      resetFilter() {
        this.queryForm.pageNo = 1
        this.queryForm.difficulty = 'All'
        this.queryForm.label = 'All'
        this.fetchDetails()
      },
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
          case 'Human':
            return 'success'
          case 'Machine':
            return ''
          case 'Unlabeled':
            return 'info'
          case 'Medium':
            return 'warning'
          case 'Hard':
            return 'danger'
          default:
            return ''
        }
      },
      edit(row) {
        this.$refs['manuallyLabel'].show(row, this.queryForm.datasetName)
      },
      manualLabel(row) {
        if (this.datasetDetails.labeled === this.datasetDetails.totalCount) {
          this.$message({
            message: 'The dataset needs no further labeling',
            type: 'warning',
          })
        } else {
          this.edit(row)
        }
      },
      async autoLabel() {
        if (this.datasetDetails.labeled === this.datasetDetails.totalCount) {
          this.$message({
            message: 'The dataset needs no further labeling',
            type: 'warning',
          })
        } else {
          let { code, msg } = await startActiveLearning({
            datasetName: this.queryForm.datasetName,
            selector: this.queryForm.selector,
            classifier: this.queryForm.classifier,
          })
          if (code === 200 && msg == 'success') {
            this.$message({
              message: 'Auto Labeling Started',
              type: 'success',
            })
          } else {
            this.$message({
              message: 'Error: ' + msg,
              type: 'error',
            })
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchDetails()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchDetails()
      },
      async fetchActiveModel() {
        const { classifierList, selectorList } = await getALModels()

        this.classifierList = classifierList
        this.queryForm.classifier = classifierList[0]
        this.selectorList = selectorList
        this.queryForm.selector = selectorList[0]
      },
      async fetchDetails() {
        this.listLoading = true
        const { data, totalCount } = await getDetails({
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          data_mode_filter: 'All',
          difficulty_filter: this.queryForm.difficulty,
          sentiment_filter: this.queryForm.label,
          datasetName: this.queryForm.datasetName,
        })
        this.instanceList = data
        this.instanceList.forEach((item) => {
          item.need_human = item.need_human ? 'Yes' : 'No'
        })
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
        let machine = data.difficultyCount['Machine']
          ? data.difficultyCount['Machine']
          : 0
        let human = data.difficultyCount['Human']
          ? data.difficultyCount['Human']
          : 0
        this.datasetDetails.labeled = machine + human
        this.datasetDetails.difficultyCount = data.difficultyCount
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
    .bottom-row {
      margin: 0% 5%;
    }
  }
</style>
