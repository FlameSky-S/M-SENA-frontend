<template>
  <div class="labelingProcess-container">
    <h1>Labeling Process</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="labelingInfo">
          <header>
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <h2>{{ queryForm.datasetName }} Dataset Details</h2>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <ul>
                  <li>
                    <div>
                      DIFFICULT
                      <strong>
                        {{ labelingDetails.Hard }} /
                        {{ labelingDetails.totalInstance }}
                      </strong>
                    </div>
                  </li>
                  <li>
                    <div>
                      MEDIUM
                      <strong>
                        {{ labelingDetails.Middle }} /
                        {{ labelingDetails.totalInstance }}
                      </strong>
                    </div>
                  </li>
                  <li>
                    <div>
                      EASY
                      <strong>
                        {{ labelingDetails.Machine }} /
                        {{ labelingDetails.totalInstance }}
                      </strong>
                    </div>
                  </li>
                </ul>
                <p>
                  ALREADY LABELED
                  <strong>
                    {{ labelingDetails.labeled }} /
                    {{ labelingDetails.totalInstance }}
                  </strong>
                </p>
              </el-col>
            </el-row>
          </header>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="operations">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>Operations</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <el-form ref="filter" :model="filter" :inline="true">
                <el-form-item
                  label="Select an Classifier"
                  style="margin-top: 9px; font-weight: bold"
                >
                  <el-select
                    v-model="activeLearningModel.classifier"
                    style="width: 100px"
                  >
                    <el-option
                      v-for="item in activeLearningModel.classifierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                  <el-button icon="el-icon-edit" @click="classifierDetails">
                    Details
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-button
                icon="el-icon-check"
                type="primary"
                class="operation-button"
                @click="onSubmit"
              >
                Start Machine Labeling!
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <el-form ref="filter" :model="filter" :inline="true">
                <el-form-item
                  label="Select an Selector"
                  style="margin-top: 9px; font-weight: bold"
                >
                  <el-select
                    v-model="activeLearningModel.selector"
                    style="width: 100px; margin-left: 4.67px"
                  >
                    <el-option
                      v-for="item in activeLearningModel.selectorList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                  <el-button icon="el-icon-edit" @click="selectorDetails">
                    Details
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-button
                icon="el-icon-check"
                type="primary"
                class="operation-button"
                @click="manuallyLabel"
              >
                Start Manually Labeling!
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 2%">
      <el-col :span="24">
        <div class="video-list">
          <el-form ref="filter" :model="filter" :inline="true">
            <el-form-item label="Difficulty:" style="font-weight: bold">
              <el-select v-model="filter.difficulty" style="width: 150px">
                <el-option
                  v-for="item in filter.difficulty_list"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
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
            :data="instanceList"
            :element-loading-text="elementLoadingText"
            style="width: 100%"
          >
            <el-table-column
              fixed
              show-overflow-tooltip
              label="SampleID"
              prop="sample_id"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Difficulty"
              prop="difficulty"
              width="auto"
              min-width="110px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Need Human"
              prop="need"
              width="auto"
              min-width="110px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Prediction"
              prop="prediction"
              width="auto"
              min-width="100px"
              align="center"
            ></el-table-column>

            <el-table-column
              label="Manually Label"
              prop="manualLabel"
              width="auto"
              min-width="120px"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              min-width="180px"
              width="auto"
              align="center"
            >
              <template #default="{ row }">
                <el-button type="text" @click="manuallyLabel(row)">
                  MANUALLY EDIT
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
        </div>
      </el-col>
    </el-row>
    <manually-label
      ref="manuallyLabel"
      @refresh-video-list="fetchAll"
    ></manually-label>
    <config-dialog ref="configSettings"></config-dialog>
  </div>
</template>

<script>
  import { getDetails, getMetaData } from '@/api/datasetDetail'
  import { startActiveLearning, getALModels } from '@/api/labeling'
  import ManuallyLabel from './components/manuallyLabel.vue'
  import ConfigDialog from './components/configDialog.vue'
  export default {
    name: 'LabelingProcess',
    components: { ManuallyLabel, ConfigDialog },
    data() {
      return {
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: 'Loading Elements...',
        labelingDetails: {},
        activeLearningModel: {
          classifierList: [],
          classifier: '',
          selectorList: [],
          selector: '',
        },
        filter: {
          difficulty_list: ['All'],
          difficulty: '',
          sentiment_list: ['All'],
          sentiment: '',
        },
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
        },
        instanceList: null,
      }
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      this.fetchAll()
    },
    mounted() {},
    methods: {
      fetchAll() {
        this.fetchActiveModel()
        ;(async () => {
          await this.fetchMetadata()
          await this.fetchDetails()
        })()
      },
      classifierDetails() {
        this.$refs['configSettings'].show(
          'Classifier',
          this.activeLearningModel.classifier
        )
      },
      selectorDetails() {
        this.$refs['configSettings'].show(
          'Selector',
          this.activeLearningModel.selector
        )
      },
      applyFilter() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      handleQuery() {},
      manuallyLabel(row) {
        this.$refs['manuallyLabel'].show(row, this.queryForm.datasetName)
      },
      async onSubmit() {
        if (
          this.labelingDetails.labeled === this.labelingDetails.totalInstance
        ) {
          this.$baseMessage(
            'This Dataset no longer needs to be labeled',
            'error'
          )
        } else {
          const { code, msg } = await startActiveLearning({
            datasetName: this.queryForm.datasetName,
            selector: this.activeLearningModel.selector,
            classifier: this.activeLearningModel.classifier,
          })
          if (code === 200 && msg == 'success') {
            this.$baseMessage('Start Active Learning Successfully', 'success')
          } else {
            this.$baseMessage('Sorry, There is currently a bug', 'error')
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

        this.activeLearningModel.classifierList = classifierList
        this.activeLearningModel.classifier = classifierList[0]
        this.activeLearningModel.selectorList = selectorList
        this.activeLearningModel.selector = selectorList[0]
      },
      async fetchDetails() {
        this.listLoading = true
        const { data, totalCount } = await getDetails({
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          data_mode_filter: 'All',
          difficulty_filter: this.filter.difficulty,
          sentiment_filter: this.filter.sentiment,
          datasetName: this.queryForm.datasetName,
        })
        this.instanceList = data
        data.forEach((item, index) => {
          item.prediction = item.prediction ? item.prediction : '-'
          switch (item.label_by) {
            case -1:
              item.difficulty = 'unlabeled'
              break
            case 0:
              item.difficulty = 'human'
              break
            case 1:
              item.difficulty = 'easy'
              break
            case 2:
              item.difficulty = 'medium'
              break
            case 3:
              item.difficulty = 'hard'
              break
          }
          item.need = item.difficulty === 'hard' ? 'YES' : 'NO'
        })

        this.total = totalCount

        this.listLoading = false
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        this.labelingDetails = data.difficultyCount
        // console.log(this.labelingDetails)
        this.labelingDetails.Middle = this.labelingDetails.Middle
          ? this.labelingDetails.Middle
          : 0
        this.labelingDetails.Machine = this.labelingDetails.Machine
          ? this.labelingDetails.Machine
          : 0
        // console.log(this.labelingDetails)
        this.labelingDetails.Hard = this.labelingDetails.Hard
          ? this.labelingDetails.Hard
          : 0
        for (var key in this.labelingDetails) {
          if (
            this.labelingDetails[key] != 'labeled' &&
            this.labelingDetails[key] != 'totalInstance' &&
            this.labelingDetails[key] &&
            !this.filter.difficulty_list.includes(key)
          ) {
            this.filter.difficulty_list.push(key)
          }
        }
        this.filter.difficulty = this.filter.difficulty_list[0]

        for (var key in data.classCount) {
          if (!this.filter.sentiment_list.includes(key))
            this.filter.sentiment_list.push(key)
        }
        this.filter.sentiment = this.filter.sentiment_list[0]

        this.labelingDetails.labeled =
          this.labelingDetails.Human + this.labelingDetails.Machine

        this.labelingDetails.totalInstance = data.totalCount
      },
    },
  }
</script>

<style lang="scss" scoped>
  .labelingProcess-container {
    margin: 0%;
    .labelingInfo {
      margin: 0% 10%;

      header ul {
        width: 90%;
        height: 40px;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        list-style: none;
        background: #f4f4f4;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
      }

      header li {
        float: left;
        width: 33%;
        height: 40px;
        border-right: 1px solid #e0e0e0;
      }
      header ul div {
        display: block;
        height: 34px;
        padding-top: 6px;
        font-size: 11px;
        line-height: 1;
        color: #999;
        text-align: center;
      }

      header ul div:hover {
        color: #999;
      }

      header ul div:active {
        background-color: #f0f0f0;
      }

      header ul li + li + li {
        border-right: none;
      }

      header ul div strong {
        display: block;
        margin-top: 4px;
        font-size: 14px;
        color: #000;
      }

      header p {
        width: 90%;
        height: 26px;
        padding-top: 14px;
        margin-top: 0px;
        color: #999;
        text-align: center;
        background: #9c34;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        strong {
          margin-left: 2px;
          color: #000;
        }
      }
    }
    .operations {
      margin: 0% 10%;
      p:first-of-type {
        min-width: 260px;
        padding-top: 4px;
        font-size: 14px;
      }
      .operation-button {
        width: 90%;
        min-width: 180px;
        font-size: 14px;
        font-weight: bold;
        font-weight: 700;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
      }
    }
    .video-list {
      margin: 0% 5%;
    }
  }
</style>
