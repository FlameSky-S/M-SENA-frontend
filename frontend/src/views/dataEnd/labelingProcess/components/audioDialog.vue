<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogSettings.dialogFormVisible"
    :width="dialogSettings.width"
    @close="close"
  >
    <el-row v-loading="loading" element-loading-text="Loading...">
      <el-form
        :label-position="dialogSettings.labelPosition"
        label-width="60px"
        :model="info"
      >
        <el-row>
          <el-form-item label="Audio:">
            <audio
              ref="player"
              :src="info.url"
              controls
              autoplay
              style="width: 100%"
            ></audio>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
            <el-form-item label="Label:">
              <el-slider
                v-model="info.label"
                :min="-3"
                :max="3"
                :step="1"
                show-input
                show-stops
              ></el-slider>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
            <el-button
              type="primary"
              icon="el-icon-check"
              style="width: 100%"
              @click="submitResult"
            >
              Submit
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <div slot="footer">
      <el-button type="danger" plain @click="handleSubmitQuestionale">
        Submit Questionale Sample
      </el-button>
      <el-button plain icon="el-icon-arrow-left" @click="getPrevNext('prev')">
        Prev
      </el-button>
      <el-button plain @click="getPrevNext('next')">
        Next
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
      <el-button type="primary" plain @click="getUnlabeled()">
        Go to Unlabeled
        <i class="el-icon-d-arrow-right el-icon--right"></i>
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getAudioSample,
    getAudioSampleNext,
    submitAudioLabel,
    submitQuestionableSample,
  } from '@/api/labeling'
  export default {
    name: 'AudioLabel',
    data() {
      return {
        loading: true,

        label: 0,
        dialogSettings: {
          datasetName: '',
          labelPosition: '',
          width: '60%',
          dialogFormVisible: false,
        },
        info: {
          videoID: null,
          clipID: null,
          url: '',
          label: 0,
        },
      }
    },
    computed: {
      title() {
        return (
          this.dialogSettings.datasetName +
          ': ' +
          this.info.videoID +
          '_' +
          this.info.clipID
        )
      },
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    created() {
      this.dialogSettings.datasetName = this.$route.query.dataset
      this.handleResize()
    },
    mounted() {},
    methods: {
      handleResize() {
        if (document.body.getBoundingClientRect().width < 992) {
          this.dialogSettings.labelPosition = 'top'
          this.dialogSettings.width = '550px'
        } else {
          this.dialogSettings.labelPosition = 'left'
          this.dialogSettings.width = '60%'
        }
      },
      async submitResult() {
        let { msg } = await submitAudioLabel({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.dialogSettings.datasetName,
          currentVideoID: this.info.videoID,
          currentClipID: this.info.clipID,
          label: this.info.label,
        })
        if (msg == 'success') {
          this.getUnlabeled()
        } else {
          this.$message({
            message: 'Submission Failed',
            type: 'error',
          })
        }
      },
      async getPrevNext(mode) {
        let { msg, data } = await getAudioSampleNext({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.dialogSettings.datasetName,
          currentVideoID: this.info.videoID,
          currentClipID: this.info.clipID,
          mode: mode,
        })
        if (msg == 'success') {
          this.info.videoID = data.video_id
          this.info.clipID = data.clip_id
          this.info.url = data.audio_url
          this.info.label = data.label_A == null ? 0 : data.label_A
        } else {
          this.$message({
            message: 'Already the first/last one',
            type: 'warning',
          })
        }
      },
      async getUnlabeled() {
        let { msg, data } = await getAudioSample({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.dialogSettings.datasetName,
          currentVideoID: this.info.videoID,
          currentClipID: this.info.clipID,
        })
        if (msg == 'success') {
          this.info.videoID = data.video_id
          this.info.clipID = data.clip_id
          this.info.url = data.audio_url
          this.info.label = 0
        } else {
          this.$message({
            message: 'No more unlabeled data',
            type: 'info',
          })
        }
      },
      async handleSubmitQuestionale() {
        let { msg } = await submitQuestionableSample({
          datasetName: this.dialogSettings.datasetName,
          sample: this.title,
        })
        if (msg == 'success') {
          this.$message({
            message: 'Submission Success',
            type: 'success',
          })
        } else {
          this.$message({
            message: 'Submission Failed',
            type: 'error',
          })
        }
      },
      async show() {
        this.dialogSettings.dialogFormVisible = true
        this.loading = true
        this.getUnlabeled()
        this.loading = false
      },
      close() {
        this.dialogSettings.dialogFormVisible = false
        this.$refs['player'].currentTime = 0
        this.$refs['player'].pause()
        this.$emit('refresh')
      },
    },
  }
</script>
<style lang="scss" scoped></style>
