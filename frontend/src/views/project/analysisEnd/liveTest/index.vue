<template>
  <div ref="container" class="liveTest-container">
    <h1>Live Demo</h1>
    <el-row v-loading="settingsLoading">
      <el-col :offset="col1Offset" :xs="14" :sm="11" :md="9" :lg="6" :xl="6">
        <div class="test-settings">
          <h3>Camera Settings:</h3>
          <el-form
            ref="cam-settings"
            :model="camSettings"
            label-width="120px"
            label-position="left"
            style="margin: 5%"
          >
            <el-form-item label="Video Device:" style="font-weight: bold">
              <el-select
                v-model="camSettings.cam"
                no-data-text="No device found"
              >
                <el-option
                  v-for="item in camList"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Audio Device:" style="font-weight: bold">
              <el-select
                v-model="camSettings.mic"
                no-data-text="No device found"
              >
                <el-option
                  v-for="item in micList"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="
                  font-weight: 700;
                  width: 50%;
                  padding-left: 0;
                  padding-right: 0;
                "
                :disabled="streaming"
                @click="initCam"
              >
                <i class="el-icon-circle-check"></i>
                Confirm
              </el-button>
              <el-button
                type="danger"
                plain
                style="width: 40%; padding-left: 0; padding-right: 0"
                :disabled="!streaming"
                @click="stopCam"
              >
                <i class="el-icon-remove-outline"></i>
                Shutdown
              </el-button>
            </el-form-item>
          </el-form>
          <el-divider
            class="hidden-md-and-down"
            direction="horizontal"
          ></el-divider>
          <h3>Test Settings:</h3>
          <el-form
            ref="test-settings"
            :model="testSettings"
            label-width="120px"
            label-position="left"
            style="margin: 5%"
          >
            <el-form-item label="Primary Model:" style="font-weight: bold">
              <el-select v-model="testSettings.model" multiple collapse-tags>
                <el-option
                  v-for="item in modelList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Language:" style="font-weight: bold">
              <el-select v-model="testSettings.language">
                <el-option
                  v-for="item in langList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Transcript:" style="font-weight: bold">
              <el-input
                v-model="testSettings.transcript"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                resize="none"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-divider
        direction="vertical"
        class="left-divider hidden-md-and-down"
      ></el-divider>
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <div class="cam-view">
          <h3>Camera View:</h3>
          <video
            ref="cameraView"
            width="100%"
            poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604575385384&di=fc0d7111bbc20e2212e7b7745ee88168&imgtype=0&src=http%3A%2F%2Fdl.ppt123.net%2Fpptbj%2F201603%2F2016030410313030.jpg"
            autoplay
            controls
          ></video>
          <p class="cam-buttons">
            <el-button
              ref="recordBtn"
              type="primary"
              style="padding-left: 0; padding-right: 0"
              plain
              class="cam-button"
              :disabled="!streaming"
              @click="recording == false ? RecordBtn() : stopCam()"
            >
              <i v-if="!recording" class="el-icon-video-camera"></i>
              <i v-else class="el-icon-check"></i>
              {{ recording == false ? 'Record' : 'Finish' }}
            </el-button>
            <el-button
              ref="playbackBtn"
              type="primary"
              style="padding-left: 0; padding-right: 0"
              plain
              class="cam-button"
              :disabled="streaming || recording || blob == null"
              @click="playing == false ? startPlayback() : stopPlayback()"
            >
              <i v-if="!playing" class="el-icon-video-play"></i>
              <i v-else class="el-icon-video-pause"></i>
              {{ playing == false ? 'Playback' : 'Stop' }}
            </el-button>
            <el-button
              type="primary"
              class="cam-button"
              style="padding-left: 0; padding-right: 0"
              :disabled="streaming || recording || blob == null"
              @click="onSubmit"
            >
              <i class="el-icon-data-analysis"></i>
              Go
            </el-button>
          </p>
          <!-- <a ref="downloadButton" class="button">download</a> -->
        </div>
      </el-col>
      <el-divider
        direction="vertical"
        class="right-divider hidden-md-and-down"
      ></el-divider>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="test-results">
          <h3>Results:</h3>
          <!-- <el-table
            v-loading="resultLoading"
            :data="testResults"
            :cell-style="addStyle"
            element-loading-text="Analyzing..."
            border
          >
            <el-table-column
              v-if="resultShow"
              key="model"
              prop="model"
              label="Model"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="predict"
              prop="predict"
              label="Predict"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="positive"
              prop="probs.Positive"
              label="Positive"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="neutral"
              prop="probs.Neutral"
              label="neutral"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="negative"
              prop="probs.Negative"
              label="Negative"
              align="center"
            ></el-table-column>
          </el-table> -->
          <div
            id="resultChart"
            ref="resultChart"
            v-loading="resultLoading"
            style="width: 100%; height: 400px"
            element-loading-text="Processing..."
          ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getAllSettings } from '@/api/getSettings'
  import { runLive } from '@/api/analysisEnd'
  import * as echarts from 'echarts'
  export default {
    name: 'LiveTest',
    components: {},
    data() {
      return {
        deviceList: [],
        modelList: [],
        langList: ['Chinese', 'English'],
        camSettings: {
          cam: '',
          mic: '',
        },
        testSettings: {
          model: [],
          transcript: '',
          language: 'Chinese',
        },
        query: null,
        textArea: '',
        testResults: [],
        settingsLoading: false,
        resultLoading: false,
        streaming: false,
        recording: false,
        playing: false,
        constraints: {
          video: {
            deviceId: {
              exact: '',
            },
            width: {
              min: 800,
              ideal: 1280,
              max: 1920,
            },
            height: {
              min: 600,
              ideal: 720,
              max: 1080,
            },
            facingMode: 'user',
          },
          audio: {
            deviceId: {
              exact: '',
            },
          },
        },
        stream: null,
        transcriptDisabled: true,
        recorder: null,
        recData: [],
        blob: null,
        file: null,
        rec_url: '',
        resultShow: true,
        resultChart: null,
        screenWidth: 0,
        col1Offset: 0,
      }
    },
    computed: {
      camList: function () {
        let cams = this.deviceList.filter(
          (device) => device.kind === 'videoinput'
        )
        return cams
      },
      micList: function () {
        let mics = this.deviceList.filter(
          (device) => device.kind === 'audioinput'
        )
        return mics
      },
    },
    watch: {
      camList: function (newValue) {
        if (newValue != []) {
          this.camSettings.cam = newValue[0].deviceId
        }
      },
      micList: function (newValue) {
        if (newValue != [] && newValue != null) {
          this.camSettings.mic = newValue[0].deviceId
        }
      },
      screenWidth: function (newValue) {
        if (newValue >= 1920) {
          //xl
          this.col1Offset = 0
        } else if (newValue >= 1200) {
          //lg
          this.col1Offset = 0
        } else if (newValue >= 992) {
          //md
          this.col1Offset = 1
        } else if (newValue >= 768) {
          //sm
          this.col1Offset = 1
        } else {
          //xs
          this.col1Offset = 1
        }
      },
    },
    created() {
      this.fetchSettings()
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      window.onresize = () => {
        let that = this
        that.screenWidth = document.body.clientWidth
        // console.log(that.screenWidth)
      }
    },
    methods: {
      async fetchSettings() {
        this.settingsLoading = true
        if (
          'mediaDevices' in navigator &&
          'getUserMedia' in navigator.mediaDevices
        ) {
          this.deviceList = await navigator.mediaDevices.enumerateDevices() // check for devices
          if (this.camList.length == 0 || this.camList[0].deviceId == '') {
            // no device found or no permission
            try {
              let test = await navigator.mediaDevices.getUserMedia({
                // ask for permission
                video: true,
              })
              test.getTracks().forEach((track) => track.stop())
            } catch (err) {
              this.$message({
                message: 'Video: ' + err.message,
                type: 'error',
              })
            }
          }
          if (this.micList.length == 0 || this.micList[0].deviceId == '') {
            // no device found or no permission
            try {
              let test = await navigator.mediaDevices.getUserMedia({
                // ask for permission
                audio: true,
              })
              test.getTracks().forEach((track) => track.stop())
            } catch (err) {
              this.$message({
                message: 'Audio: ' + err.message,
                type: 'error',
              })
            }
          }
          this.deviceList = await navigator.mediaDevices.enumerateDevices() // check for devices again
          // console.log(this.deviceList)
        } else {
          this.$message({
            message:
              'MediaDevices unavailable, make sure you have https enabled',
            type: 'error',
          })
        }
        let { pretrained } = await getAllSettings()
        this.modelList = pretrained
        if (this.modelList == '') this.modelList = ['None']
        this.testSettings.model.push(this.modelList[0])
        this.settingsLoading = false
      },
      initCam() {
        if (this.camSettings.cam !== '' && this.camSettings.mic !== '') {
          if (
            'mediaDevices' in navigator &&
            navigator.mediaDevices.getUserMedia
          ) {
            this.constraints.video.deviceId.exact = this.camSettings.cam
            this.constraints.audio.deviceId.exact = this.camSettings.mic
            this.startStream(this.constraints)
          } else {
            this.$message({
              message:
                'MediaDevices unavailable, make sure you have https enabled',
              type: 'error',
            })
          }
        } else {
        }
      },
      async startStream(constraints) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        } catch (err) {
          this.$message({
            message: err.message,
            type: 'error',
          })
          return
        }
        this.$refs['cameraView'].srcObject = this.stream
        this.$refs['cameraView'].controls = false
        this.$refs['cameraView'].volume = 0
        this.streaming = true
      },
      stopCam() {
        this.stream.getTracks().forEach((track) => track.stop())
        this.$refs['cameraView'].srcObject = null
        this.$refs['cameraView'].src = this.rec_url
        this.$refs['cameraView'].onended = () => (this.playing = false)
        this.playing = true
        this.$refs['cameraView'].controls = true
        this.$refs['cameraView'].volume = 1
        this.streaming = false
        this.recording = false
      },
      // wait(delayInMS) {
      //   return new Promise((resolve) => setTimeout(resolve, delayInMS))
      // },
      startRecording() {
        if (this.streaming == true && this.stream.active) {
          if (this.recorder == null) {
            this.blob = null
            this.file = null
            this.recorder = new MediaRecorder(this.stream)
            this.recorder.ondataavailable = (event) =>
              this.recData.push(event.data)
            this.recorder.start()
            this.recording = true
            let stopped = new Promise((resolve, reject) => {
              this.recorder.onstop = resolve
              this.recorder.onerror = (event) => reject(event.name)
            })
            // let recorded = this.wait(20000).then(
            //   () => this.recorder.state == 'recording' && this.recorder.stop()
            // )
            return Promise.all([stopped])
          }
        } else {
          this.$message({
            message: 'Stream not active',
            type: 'error',
          })
        }
      },
      RecordBtn() {
        this.playing = false
        this.startRecording().then((recordedChunks) => {
          this.blob = new Blob(this.recData, { type: 'video/mp4' })
          this.file = new File(
            this.recData,
            'Live-' + new Date().toISOString().replace(/:|\./g, '-') + '.mp4',
            {
              type: 'video/mp4',
            }
          )
          this.recData = []
          this.recorder = null
          this.rec_url = URL.createObjectURL(this.blob)
          // this.fetchTranscript()
          // this.$refs.downloadButton.href = this.rec_url
          // this.$refs.downloadButton.download = 'RecordedVideo.mp4'
          this.stopCam()
        })
      },
      startPlayback() {
        this.$refs['cameraView'].play()
        this.$refs['cameraView'].onended = () => (this.playing = false)
        this.playing = true
      },
      stopPlayback() {
        this.$refs['cameraView'].currentTime = 0
        this.$refs['cameraView'].pause()
        this.playing = false
      },
      async onSubmit() {
        this.resultLoading = true
        this.query = new FormData()
        this.query.append('recorded', this.file)
        this.query.append('model', this.testSettings.model)
        this.query.append('transcript', this.testSettings.transcript)
        this.query.append('language', this.testSettings.language)
        let { result } = await runLive(this.query)
        this.testResults = result
        for (let i in this.testResults) {
          for (let key in this.testResults[i].probs) {
            this.testResults[i].probs[key] = parseFloat(
              this.testResults[i].probs[key]
            ).toFixed(4)
          }
        }
        this.resultShow = true

        let data = [['Model']]
        for (let key in this.testResults[0].probs) {
          data[0].push(key)
        }
        for (let i in this.testResults) {
          let y = []
          y.push(this.testResults[i].model)
          for (let key in this.testResults[i].probs) {
            y.push(this.testResults[i].probs[key])
          }
          data.push(y)
        }
        if (this.$refs.resultChart.hasAttribute('_echarts_instance_')) {
          this.resultChart.dispose()
        }
        this.resultChart = echarts.init(this.$refs.resultChart)
        this.plotResult(this.resultChart, data)
        this.resultLoading = false
      },
      plotResult(instance, data) {
        let series = []
        for (let i in data[0]) {
          series.push({ type: 'bar' })
        }
        series.pop()
        instance.setOption({
          legend: {},
          tooltip: {},
          toolbox: {
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
          dataset: {
            source: data,
          },
          grid: {},
          xAxis: {
            // name: 'Model',
            type: 'category',
          },
          yAxis: {
            // name: 'Prob',
            axisPointer: {
              show: true,
              type: 'line',
              snap: true,
              triggerTooltip: false,
            },
          },
          series: series,
        })
      },
      // async fetchTranscript() {
      //   let { transcript } = await getTranscript(this.rec_url)
      //   this.testSettings.transcript = transcript
      //   this.textArea = this.testSettings.transcript
      //   this.transcriptDisabled = false
      // },
      addStyle({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 0) {
          return 'background: #FAFAFA; font-weight: bold'
        }
      },
    },
  }
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
</script>

<style lang="scss" scoped>
  .liveTest-container {
    margin: 0%;
    .test-settings {
      margin: 0% 3%;
    }
    .left-divider {
      position: absolute;
      left: 25%;
      height: 100%;
    }
    .cam-view {
      margin: 0% 5%;
      .cam-buttons {
        text-align: center;
        .cam-button {
          font-weight: 700;
          font-size: 14px;
          margin: 0% 5%;
          width: 22%;
        }
      }
    }
    .right-divider {
      position: absolute;
      left: 66%;
      height: 100%;
    }
    .test-results {
      margin: 0% 8%;
    }
  }
</style>
