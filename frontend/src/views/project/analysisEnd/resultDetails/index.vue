<template>
  <div class="ResultDetails-container">
    <h1 style="margin-left: 2%">Result Details</h1>
    <p class="tips"></p>
    <el-row id="top-row" :gutter="30" style="margin: 0% 3%">
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <h2>Overall</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form :model="overall" label-width="85px" label-position="left">
              <el-form-item label="Result ID: " style="font-weight: bold">
                <el-input
                  v-model="overall.id"
                  style="min-width: 120px"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="Model: " style="font-weight: bold">
                <el-input
                  v-model="overall.model"
                  style="min-width: 120px"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="Dataset: " style="font-weight: bold">
                <el-input
                  v-model="overall.dataset"
                  style="min-width: 120px"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="Notes: " style="font-weight: bold">
                <el-input
                  v-model="overall.description"
                  type="textarea"
                  resize="none"
                  :autosize="{ minRows: 2, maxRows: 2 }"
                  readonly
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form :model="overall" label-width="50px" label-position="left">
              <el-form-item label="Args: " style="font-weight: bold">
                <el-input
                  v-model="overall.argDisplay"
                  type="textarea"
                  resize="none"
                  :autosize="{ minRows: 10, maxRows: 10 }"
                  readonly
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <h2>Line Charts</h2>
        <el-row>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div
              id="lossChart"
              ref="lossChart"
              style="width: 100%; height: 220px; margin: 0 auto"
            ></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div
              id="accChart"
              ref="accChart"
              style="width: 100%; height: 220px; margin: 0 auto"
            ></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div
              id="f1Chart"
              ref="f1Chart"
              style="width: 100%; height: 220px; margin: 0 auto"
            ></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="showFeatureMap" id="mid-row" style="margin: 0% 3%">
      <h2>Feature Map</h2>
      <el-form :model="query2" label-position="left" inline>
        <el-form-item label="Select Data Types: " style="font-weight: bold">
          <el-checkbox-group v-model="query2.select_modes">
            <el-checkbox label="train"></el-checkbox>
            <el-checkbox label="valid"></el-checkbox>
            <el-checkbox label="test"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="2D/3D: "
          style="font-weight: bold; margin-left: 20px"
        >
          <el-select v-model="query2.feature_mode" style="width: 80px">
            <el-option
              v-for="item in feature_mode_list"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-check"
            type="primary"
            plain
            @click="genFeatureMaps"
          >
            Generate
          </el-button>
        </el-form-item>
      </el-form>
      <el-row
        v-loading="featureLoading"
        :gutter="20"
        :element-loading-text="loadingText"
      >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div
              id="featureT"
              ref="featureT"
              style="width: 100%; height: 300px"
            ></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div
              id="featureA"
              ref="featureA"
              style="width: 100%; height: 300px"
            ></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div
              id="featureV"
              ref="featureV"
              style="width: 100%; height: 300px"
            ></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div
              id="featureM"
              ref="featureM"
              style="width: 100%; height: 300px"
            ></div>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <el-row id="bottom-row" style="margin: 1% 3%">
      <h2>Samples</h2>
      <el-form ref="query3" :model="query3" :inline="true">
        <el-form-item label="Type of Dataset:" style="font-weight: bold">
          <el-select v-model="query3.data_mode" style="width: 120px">
            <el-option
              v-for="item in data_mode_list"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Correctness:" style="font-weight: bold">
          <el-select v-model="query3.result_mode" style="width: 120px">
            <el-option
              v-for="item in result_mode_list"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="applyFilter">
            Apply
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="sampleLoading"
        :data="sampleList"
        :element-loading-text="loadingText"
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
          label="Label"
          prop="label_value"
          width="auto"
          min-width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.label_value == 'Negative'
                  ? 'warning'
                  : scope.row.label_value == 'Neutral'
                  ? 'primary'
                  : 'success'
              "
              disable-transitions
            >
              {{ scope.row.label_value }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="Predict"
          prop="predict_value"
          width="auto"
          min-width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.predict_value == 'Negative'
                  ? 'warning'
                  : scope.row.predict_value == 'Neutral'
                  ? 'primary'
                  : 'success'
              "
              disable-transitions
            >
              {{ scope.row.predict_value }}
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
          label="Data Type"
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
          <template slot-scope="scope">
            <el-button type="text" @click="showPreview(scope.row)">
              Play Video
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :current-page="query3.pageNo"
        :layout="layout"
        :page-size="query3.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-row>
    <preview ref="preview"></preview>
  </div>
</template>

<script>
  import {
    getResultDetails,
    getSampleDetails,
    getFeatureDetails,
  } from '@/api/analysisEnd'
  import Preview from './components/Preview'
  import * as echarts from 'echarts'
  import 'echarts-gl'
  export default {
    name: 'DatasetDetails',
    components: {
      Preview,
    },
    data() {
      return {
        featureLoading: false,
        sampleLoading: false,
        showFeatureMap: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        loadingText: 'Loading...',
        result_mode_list: ['All', 'Right', 'Wrong'],
        data_mode_list: ['All', 'Train', 'Valid', 'Test'],
        feature_mode_list: ['2D', '3D'],
        query1: { id: null },
        query2: {
          id: null,
          select_modes: ['train', 'valid', 'test'],
          feature_mode: '2D',
        },
        query3: {
          id: null,
          pageNo: 1,
          pageSize: 20,
          result_mode: 'All',
          data_mode: 'All',
        },
        overall: {
          id: null,
          model: null,
          dataset: null,
          description: null,
          train_final: {
            loss_value: 0,
            accuracy: 0,
            f1: 0,
          },
          valid_final: {
            loss_value: 0,
            accuracy: 0,
            f1: 0,
          },
          test_final: {
            loss_value: 0,
            accuracy: 0,
            f1: 0,
          },
          x: [],
          train_history: {
            loss_value: [],
            accuracy: [],
            f1: [],
          },
          valid_history: {
            loss_value: [],
            accuracy: [],
            f1: [],
          },
          test_history: {
            loss_value: [],
            accuracy: [],
            f1: [],
          },
          argDisplay: null,
        },
        // charts: {
        //   loss: null,
        //   acc: null,
        //   f1: null,
        //   feature_M: null,
        //   feature_T: null,
        //   feature_A: null,
        //   feature_V: null,
        // },
        sampleList: [],
      }
    },
    computed: {},
    created() {
      this.query1.id = this.$route.query.result_id
      this.query2.id = this.$route.query.result_id
      this.query3.id = this.$route.query.result_id
      if (this.$route.query.train_mode == 'Train') {
        this.showFeatureMap = true
        this.genFeatureMaps()
      }
      this.fetchOverall()

      this.fetchSample()
    },
    mounted() {},
    methods: {
      applyFilter() {
        this.query3.pageNo = 1
        this.fetchSample()
        console.log(this.query3)
      },
      showPreview(row) {
        this.$refs['preview'].showPreview(row)
      },
      handleSizeChange(val) {
        this.query3.pageSize = val
        this.fetchSample()
      },
      handleCurrentChange(val) {
        this.query3.pageNo = val
        this.fetchSample()
      },
      async fetchOverall() {
        let { results } = await getResultDetails(this.query1)
        this.overall.id = results.id
        this.overall.model = results.model
        this.overall.dataset = results.dataset
        this.overall.description = results.description
        this.overall.train_final.loss_value = results.train.loss_value.shift()
        this.overall.train_history.loss_value = results.train.loss_value
        this.overall.valid_final.loss_value = results.valid.loss_value.shift()
        this.overall.valid_history.loss_value = results.valid.loss_value
        this.overall.test_final.loss_value = results.test.loss_value.shift()
        this.overall.test_history.loss_value = results.test.loss_value
        this.overall.train_final.accuracy = results.train.accuracy.shift()
        this.overall.train_history.accuracy = results.train.accuracy
        this.overall.valid_final.accuracy = results.valid.accuracy.shift()
        this.overall.valid_history.accuracy = results.valid.accuracy
        this.overall.test_final.accuracy = results.test.accuracy.shift()
        this.overall.test_history.accuracy = results.test.accuracy
        this.overall.train_final.f1 = results.train.f1.shift()
        this.overall.train_history.f1 = results.train.f1
        this.overall.valid_final.f1 = results.valid.f1.shift()
        this.overall.valid_history.f1 = results.valid.f1
        this.overall.test_final.f1 = results.test.f1.shift()
        this.overall.test_history.f1 = results.test.f1
        for (let i in results.test.f1) {
          this.overall.x.push(i)
        }
        this.overall.argDisplay = JSON.stringify(
          JSON.parse(results.args),
          null,
          '\t'
        )
        this.plotEpoch(
          this.$refs.lossChart,
          'Loss',
          this.overall.x,
          this.overall.train_history.loss_value,
          this.overall.valid_history.loss_value,
          this.overall.test_history.loss_value
        )
        this.plotEpoch(
          this.$refs.accChart,
          'Acc',
          this.overall.x,
          this.overall.train_history.accuracy,
          this.overall.valid_history.accuracy,
          this.overall.test_history.accuracy
        )
        this.plotEpoch(
          this.$refs.f1Chart,
          'F1',
          this.overall.x,
          this.overall.train_history.f1,
          this.overall.valid_history.f1,
          this.overall.test_history.f1
        )
      },
      plotEpoch(dom, title, x, y_train, y_valid, y_test) {
        let loss_chart = echarts.init(dom)
        loss_chart.setOption({
          title: {
            text: title,
            x: 'center',
            y: 'bottom',
            // textAlign: 'center',
            // textVerticalAlign: 'bottom',
          },
          legend: {
            x: 'center',
            y: 'top',
          },
          tooltip: {
            trigger: 'axis',
          },
          dataZoom: {
            type: 'inside',
          },
          grid: {
            x: '10%',
            y: '10%',
            x2: '10%',
            y2: '20%',
          },
          xAxis: {
            type: 'category',
            data: x,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Train',
              type: 'line',
              data: y_train,
            },
            {
              name: 'Valid',
              type: 'line',
              data: y_valid,
            },
            {
              name: 'Test',
              type: 'line',
              data: y_test,
            },
          ],
        })
      },
      async genFeatureMaps() {
        this.featureLoading = true
        let { features } = await getFeatureDetails(this.query2)
        if (this.query2.feature_mode == '2D') {
          this.plotFeature2D(
            this.$refs.featureM,
            'Feature_M',
            features.Feature_M
          )
          this.plotFeature2D(
            this.$refs.featureT,
            'Feature_T',
            features.Feature_T
          )
          this.plotFeature2D(
            this.$refs.featureA,
            'Feature_A',
            features.Feature_A
          )
          this.plotFeature2D(
            this.$refs.featureV,
            'Feature_V',
            features.Feature_V
          )
        } else {
          this.plotFeature3D(
            this.$refs.featureM,
            'Feature_M',
            features.Feature_M
          )
          this.plotFeature3D(
            this.$refs.featureT,
            'Feature_T',
            features.Feature_T
          )
          this.plotFeature3D(
            this.$refs.featureA,
            'Feature_A',
            features.Feature_A
          )
          this.plotFeature3D(
            this.$refs.featureV,
            'Feature_V',
            features.Feature_V
          )
        }
        this.featureLoading = false
      },
      plotFeature2D(dom, title, data) {
        if (dom.hasAttribute('_echarts_instance_')) {
          // console.log('removing old canvas')
          dom.removeAttribute('_echarts_instance_')
        }
        let featureChart = echarts.init(dom)
        let new_data = []
        for (let key in data) {
          new_data.push({ name: key, type: 'scatter', data: data[key] })
        }
        featureChart.setOption({
          title: {
            text: title,
          },
          legend: {
            x: 'center',
            y: '10%',
          },
          dataZoom: [
            {
              type: 'inside',
              yAxisIndex: 0,
            },
            {
              type: 'inside',
              xAxisIndex: 0,
            },
          ],
          tooltip: {
            // trigger: 'axis',
            formatter: '{a}',
          },
          toolbox: {
            feature: {
              dataZoom: {
                show: true,
                title: 'zoom',
              },
              saveAsImage: {
                show: true,
                title: 'save',
              },

              restore: {
                show: true,
                title: 'reset',
              },
            },
          },
          grid: {
            x: '10%',
            y: '20%',
            x2: '10%',
            y2: '10%',
          },
          xAxis: {},
          yAxis: {},
          series: new_data,
        })
      },
      plotFeature3D(dom, title, data) {
        if (dom.hasAttribute('_echarts_instance_')) {
          console.log('removing old canvas')
          dom.removeAttribute('_echarts_instance_')
        }
        let featureChart = echarts.init(dom)
        let new_data = []
        for (let key in data) {
          new_data.push({ name: key, type: 'scatter3D', data: data[key] })
        }
        featureChart.setOption({
          title: {
            text: title,
          },
          tooltip: {
            // trigger: 'axis',
            formatter: '{a}',
          },
          legend: {
            x: 'right',
            y: 'top',
            orient: 'vertical',
          },
          zAxis3D: {
            axisPointer: {
              label: {
                show: false,
              },
            },
          },
          grid3D: {},
          xAxis3D: {},
          yAxis3D: {},
          zAxis3D: {},
          series: new_data,
        })
      },
      async fetchSample() {
        this.sampleLoading = true
        let { results, totalCount } = await getSampleDetails(this.query3)
        this.total = totalCount
        this.sampleList = results
        this.sampleLoading = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .resultDetails-container {
    margin: 0%;
  }
</style>
