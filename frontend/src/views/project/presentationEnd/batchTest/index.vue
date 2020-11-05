<template>
  <div class="batchTest-container">
    <h1 class="batchTest-header">Batch Test</h1>
    <el-row v-loading="settingsLoading">
      <el-col :span="8">
        <div class="test-settings">
          <h2 class="test-settings-header">Test Settings</h2>
          <el-form
            ref="testSettings"
            :model="testSettings"
            label-width="160px"
            label-position="left"
            style="margin: 5%"
          >
            <el-form-item label="Dataset:" style="font-weight: bold">
              <el-select v-model="testSettings.dataset">
                <el-option
                  v-for="item in datasetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Data Mode:" style="font-weight: bold">
              <el-select v-model="testSettings.mode">
                <el-option
                  v-for="item in modeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Sentiment:" style="font-weight: bold">
              <el-select v-model="testSettings.sentiment">
                <el-option
                  v-for="item in sentimentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Other Models:" style="font-weight: bold">
              <el-select v-model="testSettings.other" multiple collapse-tags>
                <el-option
                  v-for="item in otherList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Use Stored Results:" style="font-weight: bold">
              <el-radio-group v-model="testSettings.useStored">
                <el-radio-button label="True"></el-radio-button>
                <el-radio-button label="False"></el-radio-button>
              </el-radio-group>
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
        </div>
      </el-col>
      <el-divider direction="vertical" class="divider"></el-divider>
      <el-col :span="16">
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
              v-for="(item, index) in testHeader"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              align="center"
            ></el-table-column>
          </el-table>
          <p class="test-info-footer" style="text-align: right">{{ footer }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getSettings } from '@/api/batchTest'
  import { getResults } from '@/api/batchTest'
  export default {
    name: 'BatchTest',
    components: {},
    data() {
      return {
        datasetList: [],
        modeList: [
          {
            value: 'train',
            label: 'Training set',
          },
          {
            value: 'dev',
            label: 'Dev set',
          },
          {
            value: 'test',
            label: 'Test set',
          },
        ],
        sentimentList: [],
        modelList: [],
        testSettings: {
          dataset: '01',
          mode: 'test',
          sentiment: '0',
          primary: '001',
          other: [],
          useStored: 'True',
        },
        testResults: [],
        testHeader: [],
        header: '',
        footer: '',
        settingsLoading: true,
        resultLoading: false,
      }
    },
    computed: {
      otherList: function () {
        let options = this.modelList.filter(
          (model) => model.value !== this.testSettings.primary
        )
        return options
      },
    },
    created() {
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      getLabel(list, value) {
        for (let i in list) {
          if (list[i].value === value) {
            return list[i].label
          }
        }
      },
      getLabels(list, values) {
        let labels = []
        for (let i in values) {
          for (let j in list) {
            if (list[j].value === values[i]) {
              labels.push(list[j].label)
            }
          }
        }
        return labels.toString()
      },
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
            h(
              'span',
              this.getLabel(this.datasetList, this.testSettings.dataset)
            ),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Data Mode = '
            ),
            h('span', this.getLabel(this.modeList, this.testSettings.mode)),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Sentiment = '
            ),
            h(
              'span',
              this.getLabel(this.sentimentList, this.testSettings.sentiment)
            ),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Primary Model = '
            ),
            h('span', this.getLabel(this.modelList, this.testSettings.primary)),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Other Models = '
            ),
            h('span', this.getLabels(this.modelList, this.testSettings.other)),
          ])
        )
        confirm.push(
          h('p', { style: 'text-align: center' }, [
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              'Use Stored Results = '
            ),
            h('span', this.testSettings.useStored),
          ])
        )
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
        let { datasets, sentiment, models } = await getSettings()
        this.datasetList = datasets
        this.sentimentList = sentiment
        this.modelList = models
        this.settingsLoading = false
      },
      async fetchResults() {
        this.resultLoading = true
        let { header, result } = await getResults(this.testSettings)
        this.testHeader = header
        this.testResults = result
        this.header =
          'Test ' +
          this.getLabel(this.modelList, this.testSettings.primary) +
          ' on ' +
          this.getLabel(this.datasetList, this.testSettings.dataset) +
          ' ' +
          this.getLabel(this.modeList, this.testSettings.mode)
        if (this.testSettings.useStored === 'True') {
          this.footer =
            'Note: Used history results except for ' +
            this.getLabel(this.modelList, this.testSettings.primary) +
            '. '
        } else {
          this.footer = ''
        }
        setTimeout(() => {
          this.resultLoading = false
        }, 1000)
      },
      onPrimaryChange() {
        this.testSettings.other = []
      },
      addStyle({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 0) {
          return 'background: #FAFAFA; font-weight: bold'
        }
      },
    },
  }
  // todo:
  // 最大值加粗
  // primary model放最后一行
  // 添加delta行
  // note:
  // 每当改变dataset时，应向服务器请求sentiment
</script>

<style lang="scss" scoped>
  .batchTest-container {
    margin: 0%;
    .test-settings {
      margin: 0% 5%;
    }
    .divider {
      position: absolute;
      left: 33%;
      height: 100%;
    }
    .test-results {
      margin: 0% 5%;
    }
  }
</style>
