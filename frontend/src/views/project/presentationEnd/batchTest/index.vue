<template>
  <div class="batchTest-container">
    <h1 style="margin-left: 1%">Batch Test</h1>
    <el-row v-loading="settingsLoading" :gutter="15">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="test-settings">
          <h2 class="test-settings-header">Test Settings</h2>
          <el-form
            ref="testSettings"
            :model="testSettings"
            label-width="150px"
            label-position="left"
            style="margin: 5%"
          >
            <el-form-item label="Dataset:" style="font-weight: bold">
              <el-select v-model="testSettings.dataset">
                <el-option
                  v-for="item in datasetList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Data Mode:" style="font-weight: bold">
              <el-select v-model="testSettings.mode">
                <el-option
                  v-for="item in modeList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Primary Model:" style="font-weight: bold">
              <el-select
                v-model="testSettings.primary"
                @change="onPrimaryChange"
              >
                <el-option
                  v-for="item in modelList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Other Models:" style="font-weight: bold">
              <el-select v-model="testSettings.other" multiple collapse-tags>
                <el-option
                  v-for="item in otherList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="Use Stored Results:" style="font-weight: bold">
              <el-radio-group v-model="testSettings.useStored">
                <el-radio-button label="True"></el-radio-button>
                <el-radio-button label="False"></el-radio-button>
              </el-radio-group>
            </el-form-item> -->
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
        </div>
      </el-col>
      <el-divider
        direction="vertical"
        class="divider hidden-md-and-down"
      ></el-divider>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="test-results">
          <h2 class="test-results-header">Test Results</h2>
          <h3 class="test-info-header" style="text-align: center">
            {{ header }}
          </h3>
          <el-table
            v-loading="resultLoading"
            :data="testResults"
            :cell-style="addStyle"
            element-loading-text="Testing..."
            border
          >
            <el-table-column
              label="Model"
              prop="model"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="Acc"
              prop="acc2Final"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="F1"
              prop="f1Final"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="MAE"
              prop="maeFinal"
              align="center"
              min-width="80"
            ></el-table-column>
            <el-table-column
              label="Corr"
              prop="corrFinal"
              align="center"
              min-width="80"
            ></el-table-column>
          </el-table>
          <!-- <p class="test-info-footer" style="text-align: right">{{ footer }}</p> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getAllSettings } from '@/api/getSettings'
  import { batchResults } from '@/api/testEnd'
  export default {
    name: 'BatchTest',
    components: {},
    data() {
      return {
        datasetList: [],
        modeList: ['Train', 'Valid', 'Test'],
        modelList: [],
        testSettings: {
          dataset: '',
          mode: 'Test',
          primary: '',
          other: [],
          // useStored: 'True',
        },
        testResults: [],
        testHeader: [],
        header: '',
        // footer: '',
        settingsLoading: true,
        resultLoading: false,
      }
    },
    computed: {
      otherList: function () {
        let options = this.modelList.filter(
          (model) => model !== this.testSettings.primary
        )
        return options
      },
    },
    created() {
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      // getLabel(list, value) {
      //   for (let i in list) {
      //     if (list[i].value === value) {
      //       return list[i].label
      //     }
      //   }
      // },
      // getLabels(list, values) {
      //   let labels = []
      //   for (let i in values) {
      //     for (let j in list) {
      //       if (list[j].value === values[i]) {
      //         labels.push(list[j].label)
      //       }
      //     }
      //   }
      //   return labels.toString()
      // },
      onSubmit() {
        const h = this.$createElement
        let confirm = []
        confirm.push(
          h(
            'p',
            { style: 'font-size: 18px; margin: 1% 0% 3% 0%' },
            'Proceed with following settings?'
          )
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h('span', { style: 'color: teal; font-weight: 700' }, 'Dataset = '),
            h('span', this.testSettings.dataset),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Data Mode = '
            ),
            h('span', this.testSettings.mode),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Primary Model = '
            ),
            h('span', this.testSettings.primary),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Other Models = '
            ),
            h('span', this.testSettings.other.join(', ')),
          ])
        )
        // confirm.push(
        //   h('p', { style: 'text-align: center' }, [
        //     h(
        //       'span',
        //       { style: 'color: teal; font-weight: 700' },
        //       'Use Stored Results = '
        //     ),
        //     h('span', this.testSettings.useStored),
        //   ])
        // )
        this.$msgbox({
          // title: 'Confirm',
          message: h('div', { style: 'text-align: center' }, confirm),
          confirmButtonText: 'Start Training',
          showCancelButton: true,
          // type: 'info',
          // center: true,
        }).then(() => {
          this.fetchResults()
        })
      },
      async fetchSettings() {
        this.settingsLoading = true
        let { datasets, pretrained } = await getAllSettings()
        this.datasetList = datasets
        this.modelList = pretrained
        if (this.datasetList == '')
          this.datasetList = [{ name: 'None', sentiment: 'N/A' }]
        if (this.modelList == '') this.modelList = ['None']
        this.testSettings.dataset = this.datasetList[0].name
        this.testSettings.primary = this.modelList[0]
        this.settingsLoading = false
      },
      async fetchResults() {
        this.resultLoading = true
        let { result } = await batchResults(this.testSettings)
        for (let i in result) {
          result[i].acc2Final =
            result[i].acc2.toFixed(4).toString() +
            ' [' +
            (result[i].acc2Delta < 0 ? '' : '+') +
            result[i].acc2Delta.toFixed(4).toString() +
            ']'

          result[i].maeFinal =
            result[i].mae.toFixed(4).toString() +
            ' [' +
            (result[i].maeDelta < 0 ? '' : '+') +
            result[i].maeDelta.toFixed(4).toString() +
            ']'
          result[i].f1Final =
            result[i].f1.toFixed(4).toString() +
            ' [' +
            (result[i].f1Delta < 0 ? '' : '+') +
            result[i].f1Delta.toFixed(4).toString() +
            ']'
          result[i].corrFinal =
            result[i].corr.toFixed(4).toString() +
            ' [' +
            (result[i].corrDelta < 0 ? '' : '+') +
            result[i].corrDelta.toFixed(4).toString() +
            ']'
        }
        this.testResults = result
        this.header =
          'Test ' +
          this.testSettings.primary +
          ' on ' +
          this.testSettings.dataset +
          ' ' +
          this.testSettings.mode +
          ' set'
        // if (this.testSettings.useStored === 'True') {
        //   this.footer = 'Note: Used history results when possible. '
        // } else {
        //   this.footer = ''
        // }
        this.resultLoading = false
      },
      onPrimaryChange() {
        this.testSettings.other = []
      },
      addStyle({ row, column, rowIndex, columnIndex }) {
        let better = 'color: green'
        let worse = 'color: red'
        if (columnIndex == 0) {
          return 'background: #FAFAFA; font-weight: bold'
        } else if (columnIndex == 1) {
          if (row.acc2Delta > 0) return better
          else if (row.acc2Delta < 0) return worse
        } else if (columnIndex == 2) {
          if (row.f1Delta > 0) return better
          else if (row.f1Delta < 0) return worse
        } else if (columnIndex == 3) {
          if (row.maeDelta > 0) return worse
          else if (row.maeDelta < 0) return better
        } else if (columnIndex == 4) {
          if (row.corrDelta > 0) return better
          else if (row.corrDelta < 0) return worse
        }
      },
    },
  }
  // todo:
  // 响应式布局 Done!
  // 最大值加粗
  // primary model放最后一行
  // 添加delta行
</script>

<style lang="scss" scoped>
  .batchTest-container {
    margin: 0%;
    .test-settings {
      margin: 0% 5%;
    }
    .divider {
      position: absolute;
      left: 32%;
      height: 100%;
    }
    .test-results {
      margin: 0% 5%;
    }
  }
</style>
