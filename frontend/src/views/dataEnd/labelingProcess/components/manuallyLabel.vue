<template>
  <el-dialog
    :title="dialogSettings.title"
    :visible.sync="dialogSettings.dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-card v-if="utils.finished" shadow="hover">
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
          v-if="!dialogSettings.editmode"
          style="float: right; padding: 3px 0; margin-left: 10px"
          type="text"
          @click="getNext"
        >
          Next
        </el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="SubmitResult"
        >
          Submit
        </el-button>
        <el-button
          v-if="!dialogSettings.editmode"
          style="float: right; padding: 3px 0"
          type="text"
          @click="getPrevious"
        >
          Previous
        </el-button>
      </div>

      <el-row>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <video
            :src="form.videoconfig.url"
            controls
            width="95%"
            class="videoPlayer"
          ></video>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
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
            <el-form-item v-if="dialogSettings.editmode" label="Prediction">
              <el-input v-model="form.clipInfo.Prediction" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="dialogSettings.editmode" label="Difficulty">
              <el-input v-model="form.clipInfo.difficulty" disabled></el-input>
            </el-form-item>
            <el-form-item label="Sentiment">
              <el-radio-group
                v-model="utils.current_selection"
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
  import { getHardSamples, submitLabelResult } from '@/api/labeling'
  export default {
    name: 'Preview',
    data() {
      return {
        dialogSettings: {
          datasetName: '',
          title: '', // dialog titile.
          editmode: null, // selected rows.
          dialogFormVisible: false, // whether to show.
        },

        form: {
          // thing to show in the dialog.
          hardSampleList: [],
          clipInfo: {
            // right side info.
            sampleId: null,
            transcript: null,
            prediction: null,
            difficulty: null,
          },
          videoconfig: {
            // left sied video info.
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
          },
        },
        results: [],
        utils: {
          finished: null,
          current_selection: -1,
          current_index: -1, // current labeling index.
        },
      }
    },
    computed: {
      labelPosition() {
        if (document.body.getBoundingClientRect().width >= 992) {
          return 'top'
        } else {
          return 'right'
        }
      },
    },
    created() {},
    methods: {
      SubmitResult() {
        if (this.dialogSettings.editmode) {
          this.form.hardSampleList[0] = {
            sample_id: this.form.clipInfo.sampleId,
            annotation: this.utils.current_selection,
          }
        } else {
          this.form.hardSampleList[
            this.utils.current_index
          ].annotation = this.utils.current_selection
          this.utils.current_selection = null
        }
        ;(async () => {
          const { code, msg } = await submitLabelResult({
            resultList: this.form.hardSampleList,
          })
          if (code === 200) {
            this.$baseMessage(msg, 'success')
            this.close()
          } else {
            this.$$baseMessage(msg, 'error')
          }
        })()
        // this.close()
      },
      getPrevious() {
        this.form.hardSampleList[
          this.utils.current_index
        ].annotation = this.utils.current_selection

        if (this.utils.current_index == 0) {
          return
        } else {
          this.utils.current_index -= 1
          if (this.form.hardSampleList[this.utils.current_index].annotation)
            this.utils.current_selection = this.form.hardSampleList[
              this.utils.current_index
            ].annotation
          else this.utils.current_selection = null
          // this.utils.current_index += 1
          this.form.clipInfo.sampleId = this.form.hardSampleList[
            this.utils.current_index
          ].sample_id
          this.form.clipInfo.transcript = this.form.hardSampleList[
            this.utils.current_index
          ].text
          this.form.videoconfig.url = this.form.hardSampleList[
            this.utils.current_index
          ].video_url
        }
      },
      getNext() {
        this.form.hardSampleList[
          this.utils.current_index
        ].annotation = this.utils.current_selection
        if (this.utils.current_index + 1 < this.form.hardSampleList.length) {
          this.utils.current_index += 1
          if (this.form.hardSampleList[this.utils.current_index].annotation)
            this.utils.current_selection = this.form.hardSampleList[
              this.utils.current_index
            ].annotation
          else this.utils.current_selection = null
          // this.utils.current_index += 1
          this.form.clipInfo.sampleId = this.form.hardSampleList[
            this.utils.current_index
          ].sample_id
          this.form.clipInfo.transcript = this.form.hardSampleList[
            this.utils.current_index
          ].text
          this.form.videoconfig.url = this.form.hardSampleList[
            this.utils.current_index
          ].video_url
        } else {
        }
      },
      show(row, datasetName) {
        this.dialogSettings.datasetName = datasetName
        if (row.sample_id) {
          this.dialogSettings.editmode = true

          this.form.clipInfo.sampleId = row.sample_id
          this.form.clipInfo.Prediction = row.prediction
          this.form.clipInfo.difficulty = row.difficulty
          this.form.clipInfo.transcript = row.text
          this.form.videoconfig.url = row.video_url
        } else {
          this.dialogSettings.editmode = false

          // get the video sampleId to label.
          ;(async () => {
            this.utils.current_index = 0
            const { data } = await getHardSamples({
              datasetName: this.dialogSettings.datasetName,
            })

            // console.log(data)
            if (data) {
              this.form.hardSampleList = data
              this.form.clipInfo.sampleId = this.form.hardSampleList[
                this.utils.current_index
              ].sample_id
              this.form.clipInfo.transcript = this.form.hardSampleList[
                this.utils.current_index
              ].text
              this.form.videoconfig.url = this.form.hardSampleList[
                this.utils.current_index
              ].video_url
              //   console.log(this.form.hardSampleList)
            } else {
              this.utils.finished = true
            }
          })()
        }

        this.dialogSettings.title = 'Manually Labeling Video Clips'
        this.dialogSettings.dialogFormVisible = true
      },
      close() {
        this.utils.current_selection = null
        this.dialogSettings.dialogFormVisible = false
        this.$emit('refresh-video-list')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .finished-header {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .videoPlayer {
    margin-top: 4%;
    margin-right: 5%;
    margin-bottom: 4%;
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
</style>
