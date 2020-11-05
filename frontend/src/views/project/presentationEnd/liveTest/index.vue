<template>
  <div ref="container" class="liveTest-container">
    <el-alert
      v-for="alert in alertList"
      :key="alert.id"
      :title="alert.msg"
      type="error"
      center
      show-icon
      @close="alertClose"
    ></el-alert>
    <h1 class="LiveTest-header">Live Demo</h1>
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
                <vab-icon :icon="['fas', 'check']"></vab-icon>
                Confirm
              </el-button>
              <el-button
                type="danger"
                plain
                style="width: 40%; padding-left: 0; padding-right: 0"
                :disabled="!streaming"
                @click="stopCam"
              >
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
          </el-form>
          <el-divider
            class="hidden-md-and-down"
            direction="horizontal"
          ></el-divider>
          <h3>Transcript:</h3>
          <el-input
            v-model="textArea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            resize="none"
            :disabled="transcriptDisabled"
          ></el-input>
          <p style="text-align: right">
            <el-button
              type="primary"
              :disabled="transcriptDisabled"
              @click="transcriptConfirm"
            >
              <vab-icon :icon="['fas', 'check']"></vab-icon>
              Confirm
            </el-button>
            <el-button :disabled="transcriptDisabled" @click="transcriptReset">
              Reset
            </el-button>
          </p>
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
              <vab-icon
                v-if="!recording"
                :icon="['fas', 'dot-circle']"
              ></vab-icon>
              <vab-icon v-else :icon="['fas', 'stop']"></vab-icon>
              {{ recording == false ? 'Record' : 'Stop' }}
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
              <vab-icon v-if="!playing" :icon="['fas', 'play']"></vab-icon>
              <vab-icon v-else :icon="['fas', 'stop']"></vab-icon>
              {{ playing == false ? 'Playback' : 'Stop' }}
            </el-button>
            <el-button
              type="primary"
              class="cam-button"
              style="padding-left: 0; padding-right: 0"
              :disabled="streaming || recording || blob == null"
              @click="onSubmit"
            >
              <vab-icon :icon="['fas', 'check']"></vab-icon>
              Analyze
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
        <div v-loading="resultLoading" class="test-results">
          <h3>Results:</h3>
          <h3 style="text-align: center">{{ resultHeader }}</h3>
          <el-table
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
              prop="positive"
              label="Positive"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="neutural"
              prop="neutural"
              label="Neutural"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="resultShow"
              key="negative"
              prop="negative"
              label="Negative"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getSettings } from '@/api/liveTest'
  import { getResults } from '@/api/liveTest'
  import { getTranscript } from '@/api/liveTest'
  export default {
    name: 'LiveTest',
    components: {},
    data() {
      return {
        deviceList: [],
        modelList: [],
        camSettings: {
          cam: '',
          mic: '',
        },
        testSettings: {
          primary: '001',
          other: [],
          v_url: '',
          transcript: '',
        },
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
        rec_url: '',
        alertList: [],
        errId: 0,
        resultHeader: '',
        resultShow: false,
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
      otherList: function () {
        let options = this.modelList.filter(
          (model) => model.value !== this.testSettings.primary
        )
        return options
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
      alertList: function (newValue) {
        if (newValue.length > 2) {
          newValue.shift()
          this.alertList = newValue
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
          this.col1Offset = 6
        } else if (newValue >= 768) {
          //sm
          this.col1Offset = 6
        } else {
          //xs
          this.col1Offset = 6
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
      alertClose() {
        // delete from alertList
      },
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
              this.$refs.container
              this.alertList.push({
                id: ++this.errId,
                msg: 'Video: ' + err.message,
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
              this.stream.getTracks().forEach((track) => track.stop())
            } catch (err) {
              this.alertList.push({
                id: ++this.errId,
                msg: 'Audio: ' + err.message,
              })
            }
          }
          this.deviceList = await navigator.mediaDevices.enumerateDevices() // check for devices again
          // console.log(this.deviceList)
        } else {
          this.alertList.push({
            id: ++this.errId,
            msg: 'MediaDevices unavailable, make sure you have https enabled',
          })
        }
        let { models } = await getSettings()

        this.modelList = models
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
            this.alertList.push({
              id: ++this.errId,
              msg: 'MediaDevices unavailable, make sure you have https enabled',
            })
          }
        } else {
        }
      },
      async startStream(constraints) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        } catch (err) {
          this.alertList.push({
            id: ++this.errId,
            msg: err.message,
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
          this.alertList.push({
            id: ++this.errId,
            msg: 'Stream not active',
          })
        }
      },
      RecordBtn() {
        this.playing = false
        this.startRecording().then((recordedChunks) => {
          this.blob = new Blob(this.recData, { type: 'video/mp4' })
          this.recData = []
          this.recorder = null
          this.rec_url = URL.createObjectURL(this.blob)
          this.fetchTranscript()
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
        let { result } = await getResults(this.testSettings)
        this.testResults = result
        this.resultHeader =
          'Test ' +
          this.getLabel(this.modelList, this.testSettings.primary) +
          ' on Recorded Video'
        this.resultShow = true
        this.resultLoading = false
      },
      async fetchTranscript() {
        let { transcript } = await getTranscript(this.rec_url)
        this.testSettings.transcript = transcript
        this.textArea = this.testSettings.transcript
        this.transcriptDisabled = false
      },
      transcriptConfirm() {
        this.testSettings.transcript = this.textArea
      },
      transcriptReset() {
        this.textArea = this.testSettings.transcript
      },
      addStyle({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 0) {
          return 'background: #FAFAFA; font-weight: bold'
        }
      },
      onPrimaryChange() {
        this.testSettings.other = []
      },
      getLabel(list, value) {
        for (let i in list) {
          if (list[i].value === value) {
            return list[i].label
          }
        }
      },
    },
  }
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
  // todo:
  // 最大值加粗
  // primary model放最后一行
  // 添加delta行
  // 增加el-alert显示错误信息  Done!
  // 分辨率适配，设置max-width和overflow: auto    Done!
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
