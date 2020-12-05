<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-card v-if="finished" shadow="hover">
      <h2 slot="header" class="finished-header">
        Congrats! You've finished all manual labeling for now.
      </h2>
      <div class="last-page-container">
        <p>
          Do you wish to start auto-labeling for the next round now? You can
          also manually start it later in the menu. If you want to do more
          labeling wor manually, you can go to the
          <strong>Dataset Management Page</strong>
          .
        </p>
      </div>
    </el-card>
    <el-card v-else shadow="hover">
      <div slot="header">
        <span>Manual Labeling - {{ form.clipInfo.sampleId }}</span>

        <el-button
          v-if="!editmode"
          style="float: right; padding: 3px 0; margin-left: 10px"
          type="text"
        >
          Next
        </el-button>
        <el-button style="float: right; padding: 3px 0" type="text">
          Submit
        </el-button>
        <el-button
          v-if="!editmode"
          style="float: right; padding: 3px 0"
          type="text"
        >
          Previous
        </el-button>
      </div>

      <el-row>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <video :src="form.videoconfig.url" controls width="100%"></video>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            class="detail-form"
            :model="form.clipInfo"
          >
            <el-form-item label="Transcripts">
              <el-input
                v-model="form.clipInfo.transcript"
                type="textarea"
                :rows="2"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-if="editmode" label="Prediction">
              <el-input v-model="form.clipInfo.Prediction" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="editmode" label="Difficulty">
              <el-input v-model="form.clipInfo.difficulty" disabled></el-input>
            </el-form-item>
            <el-form-item label="Sentiment">
              <el-radio-group
                v-model="current_selection"
                size="mini"
                style="display: block"
              >
                <el-radio
                  label="Positive"
                  style="
                    width: 30%;
                    min-width: 70px;
                    margin-right: 2.5%;
                    margin-left: 0%;
                  "
                  border
                >
                  POS
                </el-radio>
                <el-radio
                  label="Neutral"
                  style="width: 30%; min-width: 70px; margin: 0 2.5%"
                  border
                >
                  NEU
                </el-radio>
                <el-radio
                  label="Negative"
                  style="
                    width: 30%;
                    min-width: 70px;
                    margin-right: 0%;
                    margin-left: 2.5%;
                  "
                  border
                >
                  NEG
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </el-dialog>
</template>

<script>
  import { getNextSampleId, getVideoLabelInfoById } from '@/api/labeling'
  export default {
    name: 'Preview',
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        fullHeight: document.documentElement.clientHeight,
        current_selection: null,
        form: {
          clipInfo: {
            sampleId: null,
            transcript: null,
            manuallyLabel: null,
          },
          videoconfig: {
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
          },
          translate: 'This is the original transcipt for the video',
        },
        title: '',
        nextSampleId: null,
        editmode: null,
        dialogFormVisible: false,
      }
    },
    computed: {
      finished() {
        return this.nextSampleId === -1 && !this.editmode
      },
      labelPosition() {
        if (this.fullWidth >= 992) {
          return 'top'
        } else {
          return 'right'
        }
      },
    },
    created() {},
    methods: {
      show(row) {
        if (row.sample_id) {
          this.editmode = true
        } else {
          this.editmode = false
        }
        this.title = 'Manually Labeling Video Clips'

        // TODO : use getVideoInfoByID API to get the video Info.
        console.log(row)
        this.form.clipInfo.sampleId = row.sample_id
        this.form.clipInfo.Prediction = row.prediction
        this.form.clipInfo.difficulty = row.difficulty
        this.form.clipInfo.transcript = row.text

        // this.form.clipInfo.M_label_type = row.multimodalLabelType

        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .finished-header {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .last-page-container {
    width: 80%;
    height: 100%;
    padding: 3% 0;
    margin: 0 auto;
    font-size: 18px;
  }
  .preview-divider {
    position: absolute;
    left: 70%;
    height: 100%;
  }
  .detail-form {
    margin-left: 10%;
  }
</style>
