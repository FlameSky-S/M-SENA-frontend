<template>
  <div class="sampleTest-container">
    <h1>Case Study</h1>
    <el-row v-loading="settingsLoading">
      <el-form :inline="true" :model="testSettings" class="test-settings">
        <el-form-item label="Model:" class="settings-item">
          <el-select v-model="testSettings.model" style="width: 180px">
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Dataset:" class="settings-item">
          <el-select v-model="testSettings.dataset" style="width: 180px">
            <el-option
              v-for="item in datasetList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Data Mode:" class="settings-item">
          <el-select v-model="testSettings.mode" style="width: 150px">
            <el-option
              v-for="item in modeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Sentiment:" class="settings-item">
          <el-select v-model="testSettings.sentiment" style="width: 150px">
            <el-option
              v-for="item in sentimentList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="settings-item">
          <el-button
            type="primary"
            style="font-weight: bold; font-size: 14px; padding: 9px 25px"
            @click="onSubmit"
          >
            Go!
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider direction="horizontal"></el-divider>
    <p
      v-if="placehoder"
      style="text-align: center; font-size: 18px; color: #dbdbdb"
    >
      Ready to analyze samples
    </p>
    <el-row
      v-if="testResult != null"
      v-loading="resultLoading"
      element-loading-text="Analyzing..."
      class="test-results"
    >
      <el-carousel
        :interval="0"
        type="card"
        trigger="click"
        height="500px"
        @change="onChange"
      >
        <el-carousel-item v-for="(item, key) in testResult" :key="key">
          <h2 style="text-align: center">Case {{ key + 1 }}</h2>
          <div style="margin: 0% 20%">
            <video
              v-if="currIdx == key"
              :src="item.v_url"
              width="100%"
              controls
            ></video>
            <el-image
              v-else
              :key="key"
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            ></el-image>
          </div>
          <div style="margin: 0% 25%">
            <el-col :span="12">
              <p>
                <strong>Video ID:</strong>
                {{ item.v_id }}
              </p>
              <p>
                <strong>Clip ID:</strong>
                {{ item.c_id }}
              </p>
              <p>
                <strong>Data Label:</strong>
                {{ item.label }}
              </p>
            </el-col>
            <el-col :span="12">
              <p><strong>Prediction:</strong></p>
              <p style="text-align: center">
                Positive: {{ item.prediction.positive }}
              </p>
              <p style="text-align: center">
                Neutural: {{ item.prediction.neutural }}
              </p>
              <p style="text-align: center">
                Negative: {{ item.prediction.negative }}
              </p>
            </el-col>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-row>
  </div>
</template>

<script>
  import { getSettings } from '@/api/sampleTest'
  import { getResults } from '@/api/sampleTest'
  import { VabPlayerMp4 } from '@/plugins/vabPlayer.js'
  export default {
    name: 'SampleTest',
    components: {
      //VabPlayerMp4,
    },
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
          model: '001',
        },
        settingsLoading: true,
        resultLoading: false,
        placehoder: true,
        testResult: null,
        currIdx: 0,
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
        let { datasets, sentiment, models } = await getSettings()
        this.datasetList = datasets
        this.sentimentList = sentiment
        this.modelList = models
        this.settingsLoading = false
      },
      async fetchResults() {
        this.resultLoading = true
        let { result } = await getResults(this.testSettings)
        this.testResult = result
        this.placehoder = false
        setTimeout(() => {
          this.resultLoading = false
        }, 1000)
      },
      onChange(activeIdx, prevIdx) {
        this.currIdx = activeIdx
      },
    },
  }

  // todo:
  //   优化幻灯片内部布局
  //   优化多分辨率适配
</script>

<style lang="scss" scoped>
  .sampleTest-container {
    margin: 0%;
    .test-settings {
      margin: 0% 1%;
      .settings-item {
        margin: 0% 1% 1% 1%;
        font-weight: bold;
      }
    }
    .test-results {
      margin: 0% 3%;
      .left-col {
        margin: 0% 5%;
      }
      .left-divider {
        position: absolute;
        left: 33%;
        height: 100%;
      }
      .mid-col {
        margin: 0% 5%;
      }
      .right-divider {
        position: absolute;
        left: 66%;
        height: 100%;
      }
      .right-col {
        margin: 0% 5%;
      }
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
