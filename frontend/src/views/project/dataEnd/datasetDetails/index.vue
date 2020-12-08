<template>
  <div class="datasetDetails-container">
    <h1>Dataset Details</h1>
    <p class="tips"></p>
    <el-row :gutter="120">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="14">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
          <h2>Data Distribution</h2>
          <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div
                id="dataDistribution"
                ref="dataDistribution1"
                style="width: 300px; height: 200px; margin: 0 auto"
              ></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div
                id="dataDistribution"
                ref="dataDistribution2"
                style="width: 300px; height: 200px; margin: 0 auto"
              ></div>
            </el-col>
          </el-row>
          <!-- <div
            id="dataDistribution"
            ref="dataDistribution"
            style="width: 300px; height: 200px; margin: 0 auto"
          ></div> -->
        </el-col>
      </div>
    </el-row>
    <!-- <el-divider direction="horizontal"></el-divider> -->
    <el-row style="margin-top: 3%">
      <div class="top-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <vab-query-form>
            <el-form ref="filter" :model="filter" :inline="true">
              <!-- <el-form-item label="Model:" style="font-weight: bold">
                <el-select v-model="filter.model_name" style="width: 150px">
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item> -->
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
          </vab-query-form>
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
          // model_name: 'All',
          sentiment_list: ['All', 'Positive', 'Neutral', 'Negative'],
          sentiment: 'All',
          data_mode_list: ['All', 'Train', 'Valid', 'Test'],
          data_mode: 'All',
          // is_tuning: 'Both',
        },
        datasetDetails: {
          detailInfo: {
            datasetName: null,
            locked: null,
            human: null,
            easy: null,
            medium: null,
            hard: null,
            unlabeled: null,
            labeledCount: null,
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
      lockOperation() {
        return this.datasetDetails.detailInfo.locked === 'locked'
          ? 'UnLock'
          : 'Lock'
      },
      disabledButton() {
        return this.datasetDetails.detailInfo.locked === 'locked' ? true : false
      },
      labeledFraction() {
        return (
          this.datasetDetails.detailInfo.labeledCount +
          ' / ' +
          this.datasetDetails.detailInfo.totalCount
        )
      },
      showUnimodalColumn() {
        if (this.datasetDetails.instanceList)
          return this.datasetDetails.instanceList[0].T_label_type ? true : false
        return false
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      ;(async () => {
        await this.fetchDetails()
        await this.fetchMetadata()
      })()
    },
    mounted() {
      ;(async () => {
        await this.fetchDetails()
        await this.fetchMetadata()
        var echarts = require('echarts')
        // 基于准备好的dom，初始化echarts实例
        var pie_dv_1 = this.$refs.dataDistribution1
        var pie_dv_2 = this.$refs.dataDistribution2
        let myChart_1 = echarts.init(pie_dv_1)
        let myChart_2 = echarts.init(pie_dv_2)
        myChart_1.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie', // 设置图表类型为饼图
              radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              data: [
                // 数据数组，name 为数据项名称，value 为数据项值
                { value: this.datasetDetails.detailInfo.human, name: 'Human' },
                {
                  value: this.datasetDetails.detailInfo.unlabeled,
                  name: 'Unlabeled',
                },
                { value: this.datasetDetails.detailInfo.easy, name: 'Easy' },
                {
                  value: this.datasetDetails.detailInfo.medium,
                  name: 'Medium',
                },
                { value: this.datasetDetails.detailInfo.hard, name: 'Hard' },
              ],
            },
          ],
        })

        myChart_2.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie', // 设置图表类型为饼图
              radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              data: [
                // 数据数组，name 为数据项名称，value 为数据项值
                { value: 235, name: 'Positive' },
                { value: 274, name: 'Neutral' },
                { value: 310, name: 'Negative' },
              ],
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
      flexColumnWidth(str, tableData, flag = 'max') {
        // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
        // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
        // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
        str = str + ''
        let columnContent = ''
        if (
          !tableData ||
          !tableData.length ||
          tableData.length === 0 ||
          tableData === undefined
        ) {
          return
        }
        if (!str || !str.length || str.length === 0 || str === undefined) {
          return
        }
        if (flag === 'equal') {
          // 获取该列中第一个不为空的数据(内容)
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str].length > 0) {
              // console.log('该列数据[0]:', tableData[0][str])
              columnContent = tableData[i][str]
              break
            }
          }
        } else {
          // 获取该列中最长的数据(内容)
          let index = 0
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str] === null) {
              return
            }
            const now_temp = tableData[i][str] + ''
            const max_temp = tableData[index][str] + ''
            if (now_temp.length > max_temp.length) {
              index = i
            }
          }
          columnContent = tableData[index][str]
        }
        // console.log('该列数据[i]:', columnContent)
        // 以下分配的单位长度可根据实际需求进行调整
        let flexWidth = 0
        for (const char of columnContent) {
          if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            // 如果是英文字符，为字符分配8个单位宽度
            flexWidth += 8
          } else if (char >= '\u4e00' && char <= '\u9fa5') {
            // 如果是中文字符，为字符分配15个单位宽度
            flexWidth += 15
          } else {
            // 其他种类字符，为字符分配8个单位宽度
            flexWidth += 8
          }
        }
        if (flexWidth < 80) {
          // 设置最小宽度
          flexWidth = 80
        }
        return flexWidth + 'px'
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
          prediction: 'All',
          difficulty: 'All',
          sentiment_filter: this.filter.sentiment,
          data_mode_filter: this.filter.data_mode,
          pageNo: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
        })
        this.datasetDetails.instanceList = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        this.datasetDetails.detailInfo.datasetName = data.dataset_name
        this.datasetDetails.detailInfo.locked = data.is_locked
          ? 'locked'
          : 'unlocked'
        this.datasetDetails.detailInfo.easy = data.easy
        this.datasetDetails.detailInfo.medium = data.medium
        this.datasetDetails.detailInfo.hard = data.hard
        this.datasetDetails.detailInfo.unlabeled = data.unlabelled
        this.datasetDetails.detailInfo.human = data.human
        this.datasetDetails.detailInfo.labeledCount = data.human
        this.datasetDetails.detailInfo.totalCount = data.totalCount
        this.datasetDetails.detailInfo.language = data.language
        this.datasetDetails.detailInfo.description = data.description
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
