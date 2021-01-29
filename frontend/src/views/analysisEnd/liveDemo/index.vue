<template>
  <div ref="container" class="liveTest-container">
    <h1 style="margin-left: 2%">Live Demo</h1>
    <div class="top-row">
      <el-row v-loading="settingsLoading" :gutter="30">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="test-settings">
            <h2>Camera Settings:</h2>
            <el-form
              :model="camSettings"
              label-width="120px"
              label-position="left"
              style="margin: 5%"
            >
              <el-form-item label="Video Device:">
                <el-select
                  v-model="camSettings.cam"
                  no-data-text="No device found"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in camList"
                    :key="item.deviceId"
                    :label="item.label"
                    :value="item.deviceId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Audio Device:">
                <el-select
                  v-model="camSettings.mic"
                  no-data-text="No device found"
                  style="width: 100%"
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
                  :type="streaming ? 'danger' : 'primary'"
                  :plain="streaming ? true : false"
                  @click="streaming ? stopCam() : initCam()"
                >
                  <Vicon v-if="!streaming" name="video"></Vicon>
                  <Vicon v-else name="video-slash"></Vicon>
                  {{ streaming ? 'Shutdown' : 'Init Cam' }}
                </el-button>
                <!-- <el-button
                  type="danger"
                  plain
                  style="width: 40%; padding-left: 0; padding-right: 0"
                  :disabled="!streaming"
                  @click="stopCam"
                >
                  <i class="el-icon-remove-outline"></i>
                  Shutdown
                </el-button> -->
              </el-form-item>
            </el-form>
            <h2>Test Settings:</h2>
            <el-form
              :model="testSettings"
              label-width="120px"
              label-position="left"
              style="margin: 5%"
            >
              <el-form-item label="Models:">
                <el-select
                  v-model="testSettings.model"
                  multiple
                  collapse-tags
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Language:">
                <el-select v-model="testSettings.language" style="width: 100%">
                  <el-option
                    v-for="item in langList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Transcript:">
                <el-input
                  v-model="testSettings.transcript"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 5 }"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <div class="cam-view">
            <h2>Camera View:</h2>
            <video
              ref="cameraView"
              width="100%"
              poster="@/assets/poster.jpg"
              style="margin: 0% 2%"
              autoplay
              controls
            ></video>
            <div align="center" class="cam-buttons">
              <el-button
                type="primary"
                plain
                :disabled="!streaming"
                @click="recording == false ? RecordBtn() : stopCam()"
              >
                <Vicon v-if="!recording" name="dot-circle"></Vicon>
                <Vicon v-else name="stop"></Vicon>
                {{ recording == false ? 'Record' : 'Finish' }}
              </el-button>
              <el-button
                type="primary"
                plain
                :disabled="streaming || recording || blob == null"
                @click="playing == false ? startPlayback() : stopPlayback()"
              >
                <Vicon v-if="!playing" name="play"></Vicon>
                <Vicon v-else name="stop"></Vicon>
                {{ playing == false ? 'Playback' : 'Stop' }}
              </el-button>
              <el-button
                type="primary"
                style="padding: 9px 30px !important"
                :disabled="streaming || recording || blob == null"
                @click="onSubmit"
              >
                <Vicon name="child"></Vicon>
                Go
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider v-if="resultsShow"></el-divider>
    <el-row v-if="resultsShow" class="bottom-row">
      <h2>Results:</h2>
      <el-row
        v-loading="resultLoading"
        element-loading-text="Processing..."
        :gutter="20"
        style="margin: 0% 1%"
      >
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div ref="featureT" style="width: 100%; height: 300px"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div ref="featureA" style="width: 100%; height: 300px"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div ref="featureV" style="width: 100%; height: 300px"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <el-card shadow="hover">
            <div ref="featureM" style="width: 100%; height: 300px"></div>
          </el-card>
        </el-col>
      </el-row>
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
        streaming: false, // camera & mic enabled
        recording: false, // recording
        playing: false, // playback ongoing
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
        stream: null, // stream object
        // transcriptDisabled: true,
        recorder: null, // recorder object
        recData: [], // recorded data array
        blob: null, // used for playback
        file: null, // used for submission
        rec_url: '', // url of the blob
        resultsShow: false,
        charts: {
          featureM: null,
          featureT: null,
          featureA: null,
          featureV: null,
        },
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
    },
    created() {
      this.fetchSettings()
    },
    mounted() {},
    beforeDestroy() {
      if (this.streaming || this.recording) {
        this.stopCam()
      }
      for (let key in this.charts) {
        if (this.charts[key] != null) {
          this.charts[key].dispose()
        }
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
        } else {
          this.$message({
            message: 'MediaDevices unavailable, make sure you have SSL enabled',
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
                'MediaDevices unavailable, make sure you have SSL enabled',
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
        this.resultsShow = true
        this.resultLoading = true
        this.query = new FormData()
        this.query.append('recorded', this.file)
        this.query.append('model', this.testSettings.model)
        this.query.append('transcript', this.testSettings.transcript)
        this.query.append('language', this.testSettings.language)
        let { result } = await runLive(this.query)
        this.testResults = result
        for (let key in this.testResults) {
          this.testResults[key].forEach((model) => {
            for (let label in model.probs) {
              model.probs[label] = parseFloat(model.probs[label]).toFixed(4)
            }
          })
        }
        for (let key in this.testResults) {
          let data = [['Model']]
          for (let key in this.testResults['M'][0].probs) {
            data[0].push(key)
          }
          this.testResults[key].forEach((model) => {
            let y = []
            y.push(model.model)
            for (let label in model.probs) {
              y.push(model.probs[label])
            }
            data.push(y)
          })
          // var instance
          // switch (key) {
          //   case 'M':
          //     instance = this.charts.featureM
          //     console.log(instance)
          //     break
          //   case 'T':
          //     instance = this.charts.featureT
          //     break
          //   case 'A':
          //     instance = this.charts.featureA
          //     break
          //   case 'V':
          //     instance = this.charts.featureV
          //     break
          // }
          let name = 'feature' + key
          // let instance = eval('this.charts.' + name)
          if (this.$refs[name].hasAttribute('_echarts_instance_')) {
            echarts.getInstanceByDom(this.$refs[name]).dispose()
            // console.log(instance)
            // instance.dispose()
          }
          let instance = echarts.init(this.$refs[name])
          // console.log(instance)
          this.plotResult(instance, data)
        }

        // for (let i in this.testResults) {
        //   for (let key in this.testResults[i].probs) {
        //     this.testResults[i].probs[key] = parseFloat(
        //       this.testResults[i].probs[key]
        //     ).toFixed(4)
        //   }
        // }
        // let data = [['Model']]
        // for (let key in this.testResults[0].probs) {
        //   data[0].push(key)
        // }
        // for (let i in this.testResults) {
        //   let y = []
        //   y.push(this.testResults[i].model)
        //   for (let key in this.testResults[i].probs) {
        //     y.push(this.testResults[i].probs[key])
        //   }
        //   data.push(y)
        // }
        // if (this.$refs.resultChart.hasAttribute('_echarts_instance_')) {
        //   this.resultChart.dispose()
        // }
        // this.resultChart = echarts.init(this.$refs.resultChart)
        // this.plotResult(this.resultChart, data)
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
    },
  }
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
</script>

<style lang="scss" scoped>
  .liveTest-container {
    margin: 0%;
    .top-row {
      margin: 0% 5%;
      .cam-buttons {
        margin: 15px 0px;
        .el-button + .el-button {
          margin-left: 30px !important;
        }
        .el-button {
          padding: 9px 20px !important;
        }
      }
    }
    .bottom-row {
      margin: 0% 5%;
    }
  }
</style>
