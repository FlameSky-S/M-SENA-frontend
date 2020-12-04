<template>
  <div class="labelingProcess-container">
    <h1>Labeling Process</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
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
                        {{ labelingDetails.difficults }} / {{ totalInstance }}
                      </strong>
                    </div>
                  </li>
                  <li>
                    <div>
                      MEDIUM
                      <strong>
                        {{ labelingDetails.medium }} / {{ totalInstance }}
                      </strong>
                    </div>
                  </li>
                  <li>
                    <div>
                      EASY
                      <strong>
                        {{ labelingDetails.easy }} / {{ totalInstance }}
                      </strong>
                    </div>
                  </li>
                </ul>
                <p>
                  ALREADY LABELED
                  <strong>
                    {{ labelingDetails.labeled }} / {{ totalInstance }}
                  </strong>
                </p>
              </el-col>
            </el-row>
          </header>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
        <div class="operations">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>Operations</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <p>
                Labeling by
                <strong>ACTIVE LEARNING</strong>
                strategy
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-button
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
              <p>
                Labeling on difficult samples
                <strong>MANUALLY</strong>
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <el-button
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
          <vab-query-form>
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
              <el-form-item label="Need Human:" style="font-weight: bold">
                <el-select v-model="filter.need_human" style="width: 120px">
                  <el-option
                    v-for="item in filter.need_human_list"
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
              min-width="110px"
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
    <manually-label ref="manuallyLabel"></manually-label>
  </div>
</template>

<script>
  import { getDetails, getMetaData } from '@/api/datasetDetail'
  import { startActiveLearning } from '@/api/labeling'
  import ManuallyLabel from './components/manuallyLabel.vue'
  export default {
    name: 'LabelingProcess',
    components: { ManuallyLabel },
    data() {
      return {
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: 'Loading Elements...',
        labelingDetails: {
          difficults: 200,
          medium: 300,
          easy: 150,
          labeled: 400,
        },
        filter: {
          // model_name: 'All',
          difficulty_list: ['unlabeled', 'easy', 'medium', 'hard', 'human'],
          difficulty: 'hard',
          need_human_list: ['NO', 'YES'],
          need_human: 'YES',
          // is_tuning: 'Both',
        },
        searchForm: {
          search_sid: null,
        },
        queryForm: {
          datasetName: null,
          pageNo: 1,
          pageSize: 20,
        },
        instanceList: null,
      }
    },
    computed: {
      totalInstance() {
        return (
          this.labelingDetails.difficults +
          this.labelingDetails.medium +
          this.labelingDetails.easy
        )
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      this.fetchDetails()
      this.fetchMetadata()
    },
    mounted() {},
    methods: {
      applyFilter() {},
      handleQuery() {},
      manuallyLabel(row) {
        this.$refs['manuallyLabel'].show(row)
      },
      async onSubmit() {
        const { code, msg } = await startActiveLearning({
          datasetName: this.queryForm.datasetName,
        })
        if (code === 200 && msg == 'success') {
          this.$baseMessage('Start Active Learning Successfully', 'success')
        } else {
          this.$baseMessage('Sorry, There is currently a bug', 'error')
        }
      },
      manualLabeling() {},
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
        // const { data, totalCount } = await getDetails(this.queryForm)
        const { data, totalCount } = await getDetails({
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          datasetName: this.queryForm.datasetName,
        })
        this.instanceList = data
        data.forEach((item, index) => {
          item.need = item.difficulty === 'HARD' ? 'YES' : 'NO'
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
        })
        this.total = totalCount

        this.listLoading = false
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        this.labelingDetails.difficults = data.hard
        this.labelingDetails.medium = data.medium
        this.labelingDetails.easy = data.easy
        this.labelingDetails.labeled = data.labeledCount
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
