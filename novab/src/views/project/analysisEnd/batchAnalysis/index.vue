<template>
  <div class="batchTest-container">
    <h1 style="margin-left: 2%">Batch Analysis</h1>
    <el-row style="margin: 0% 5%">
      <el-form ref="testSettings" :model="testSettings" inline>
        <el-form-item label="Models:" style="font-weight: bold">
          <el-select
            v-model="testSettings.model"
            multiple
            collapse-tags
            style="width: 240px"
          >
            <el-option
              v-for="item in modelList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Data Split:" style="font-weight: bold">
          <el-select v-model="testSettings.mode" style="width: 100px">
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
            type="primary"
            style="font-weight: 700; font-size: 14px"
            @click="onSubmit"
          >
            Start Test
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="30" style="margin: 0% 3%">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div
          id="accChart"
          ref="accChart"
          style="width: 100%; height: 300px"
        ></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div
          id="f1Chart"
          ref="f1Chart"
          style="width: 100%; height: 300px"
        ></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div
          id="lossChart"
          ref="lossChart"
          style="width: 100%; height: 300px"
        ></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getAllSettings } from '@/api/getSettings'
  import { batchResults } from '@/api/analysisEnd'
  import echarts from 'echarts'
  export default {
    name: 'BatchTest',
    components: {},
    data() {
      return {
        modeList: ['Train', 'Valid', 'Test'],
        modelList: [],
        testSettings: {
          mode: 'Test',
          model: [],
        },
        testResults: [],
        settingsLoading: true,
        resultLoading: false,
        charts: {
          lossChart: null,
          accChart: null,
          f1Chart: null,
        },
      }
    },
    computed: {},
    created() {
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      onSubmit() {
        this.fetchResults()
      },
      async fetchSettings() {
        this.settingsLoading = true
        let { pretrained } = await getAllSettings()
        this.modelList = pretrained
        if (this.modelList == '') this.modelList = ['None']
        this.testSettings.model.push(this.modelList[0])
        this.settingsLoading = false
      },
      async fetchResults() {
        this.resultLoading = true
        let { result } = await batchResults(this.testSettings)
        // Deal with final results
        for (let i in result) {
          let tmpData = new Object()
          tmpData.model = result[i].model
          tmpData.loss_value = result[i].loss_value.shift()
          tmpData.accuracy = result[i].accuracy.shift()
          tmpData.f1 = result[i].f1.shift()
          this.testResults.push(tmpData)
        }
        // console.log(this.testResults)
        // Max Epoch
        let max_epoch = 0
        for (let i in result) {
          if (result[i].loss_value.length > max_epoch) {
            max_epoch = result[i].loss_value.length
          }
        }
        // Loss
        let data_loss = [['Model']]
        data_loss[0] = data_loss[0].concat([...Array(max_epoch).keys()])
        for (let i in result) {
          // if (result[i].loss_value.length < max_epoch) {
          //   let tmpData = result[i].loss_value[result[i].loss_value.length - 1]
          //   let num = max_epoch - result[i].loss_value.length
          //   for (let j = 0; j < num; j++) {
          //     result[i].loss_value.push(tmpData)
          //   }
          // }
          let y = [result[i].model].concat(result[i].loss_value)
          data_loss.push(y)
        }
        if (this.$refs.lossChart.hasAttribute('_echarts_instance_')) {
          this.lossChart.dispose()
        }
        this.lossChart = echarts.init(this.$refs.lossChart)
        this.plotResult(this.lossChart, 'Loss', data_loss)
        // Accuracy
        let data_acc = [['Model']]
        data_acc[0] = data_acc[0].concat([...Array(max_epoch).keys()])
        for (let i in result) {
          let y = [result[i].model].concat(result[i].accuracy)
          data_acc.push(y)
        }
        if (this.$refs.accChart.hasAttribute('_echarts_instance_')) {
          this.accChart.dispose()
        }
        this.accChart = echarts.init(this.$refs.accChart)
        this.plotResult(this.accChart, 'Accuracy', data_acc)
        // F1
        let data_f1 = [['Model']]
        data_f1[0] = data_f1[0].concat([...Array(max_epoch).keys()])
        for (let i in result) {
          let y = [result[i].model].concat(result[i].f1)
          data_f1.push(y)
        }
        if (this.$refs.f1Chart.hasAttribute('_echarts_instance_')) {
          this.f1Chart.dispose()
        }
        this.f1Chart = echarts.init(this.$refs.f1Chart)
        this.plotResult(this.f1Chart, 'F1 Score', data_f1)

        this.resultLoading = false
      },
      plotResult(instance, title, data) {
        let series = []
        for (let i in data) {
          series.push({ type: 'line', seriesLayoutBy: 'row' })
        }
        series.pop()
        instance.setOption({
          title: {
            text: title,
            x: 'center',
            y: 'bottom',
          },
          legend: {
            type: 'scroll',
            x: '10%',
            y: 'top',
          },
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            x: 'right',
            y: 'bottom',
            feature: {
              dataView: {
                show: true,
                title: 'Show Table',
                readOnly: true,
                lang: [' ', 'Close', ''],
                optionToContent: function (opt) {
                  var data = opt.dataset[0].source
                  var table =
                    '<table style="width:100%;text-align:center"><tbody>'
                  for (let i in data) {
                    table += '<th>'
                    for (let j in data[i]) {
                      if (i == 0) table += '<th>' + data[i][j] + '</th>'
                      else table += '<td>' + data[i][j] + '</td>'
                    }
                    table += '</tr>'
                  }
                  table += '</tbody></table>'
                  return table
                },
              },
            },
          },
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: 0,
            },
          ],
          dataset: {
            source: data,
          },
          grid: {
            x: '8%',
            y: '10%',
            x2: '0%',
            y2: '18%',
          },
          xAxis: {
            // name: 'Model',
            type: 'category',
          },
          yAxis: {
            // name: 'Prob',
          },
          series: series,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .batchTest-container {
    margin: 0%;
    .test-settings {
      margin: 0% 5%;
    }
  }
</style>
