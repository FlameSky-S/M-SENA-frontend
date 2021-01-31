<template>
  <el-dialog
    :title="dialogSettings.title"
    :visible.sync="dialogSettings.dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-row v-loading="loading" element-loading-text="Loading..." :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <video ref="player" :src="info.url" controls width="100%"></video>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="info"
        >
          <el-form-item v-if="!dialogSettings.editMode" label="Current/Total">
            <el-input v-model="info.current" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="dialogSettings.editMode" label="Video ID">
            <el-input v-model="info.videoId" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="dialogSettings.editMode" label="Difficulty">
            <el-input v-model="info.difficulty" readonly></el-input>
          </el-form-item>
          <el-form-item label="Transcript">
            <el-input
              v-model="info.transcript"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              resize="none"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="Label">
            <el-radio-group
              v-model="utils.current_selection"
              style="display: block"
            >
              <el-radio
                label="Positive"
                style="
                  width: 30%;
                  min-width: 70px;
                  margin: 0 0 0 0;
                  background: #13ce66;
                  color: #fff;
                "
                border
              >
                POS
              </el-radio>
              <el-radio
                label="Neutral"
                style="
                  width: 30%;
                  min-width: 70px;
                  margin: 0 0 0 5%;
                  background: #3f9ff8;
                  color: #fff;
                "
                border
              >
                NEU
              </el-radio>
              <el-radio
                label="Negative"
                style="
                  width: 30%;
                  min-width: 70px;
                  margin: 0 0 0 5%;
                  background: #ffba00;
                  color: #fff;
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
    <div slot="footer">
      <el-button v-if="!dialogSettings.editMode" plain @click="getPrevious">
        Previous
      </el-button>
      <el-button v-if="!dialogSettings.editMode" plain @click="getNext">
        Next
      </el-button>
      <el-button type="primary" @click="SubmitResult">Submit</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getHardSamples, submitLabelResult } from '@/api/labeling'
  export default {
    name: 'ManualLabel',
    data() {
      return {
        loading: true,
        labelPosition: 'top',
        dialogSettings: {
          datasetName: '',
          title: '',
          editMode: null, // selected rows
          dialogFormVisible: false,
        },
        hardSampleList: [],
        info: {
          sampleId: null,
          videoId: null,
          current: null,
          transcript: null,
          difficulty: null,
          url: '',
        },
        utils: {
          // finished: null,
          current_selection: -1,
          current_index: -1, // current labeling index.
        },
      }
    },
    computed: {},
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    created() {},
    methods: {
      handleResize() {
        if (document.body.getBoundingClientRect().width >= 1200) {
          this.labelPosition = 'top'
        } else this.labelPosition = 'left'
      },
      async SubmitResult() {
        if (this.dialogSettings.editMode) {
          // Single sample
          this.hardSampleList.push({
            sample_id: this.info.sampleId,
            annotation: this.utils.current_selection,
          })
        } else {
          // Multiple samples
          this.hardSampleList[
            this.utils.current_index
          ].annotation = this.utils.current_selection
          this.utils.current_selection = null
        }
        let { msg } = await submitLabelResult({
          resultList: this.hardSampleList,
        })
        if (msg == 'success') {
          this.$message({
            message: 'Label Submitted',
            type: 'success',
          })
        } else {
          this.$message({
            message: 'Submission Failed: ' + msg,
            type: 'error',
          })
        }
        this.close()
      },
      getPrevious() {
        this.hardSampleList[
          this.utils.current_index
        ].annotation = this.utils.current_selection

        if (this.utils.current_index == 0) {
          return
        } else {
          this.utils.current_index -= 1
          if (this.hardSampleList[this.utils.current_index].annotation)
            this.utils.current_selection = this.hardSampleList[
              this.utils.current_index
            ].annotation
          else this.utils.current_selection = null
          this.info.sampleId = this.hardSampleList[
            this.utils.current_index
          ].sample_id
          this.info.transcript = this.hardSampleList[
            this.utils.current_index
          ].text
          this.info.url = this.hardSampleList[
            this.utils.current_index
          ].video_url
          this.info.current =
            this.utils.current_index + 1 + '/' + this.hardSampleList.length
        }
      },
      getNext() {
        this.hardSampleList[
          this.utils.current_index
        ].annotation = this.utils.current_selection
        if (this.utils.current_index + 1 < this.hardSampleList.length) {
          this.utils.current_index += 1
          if (this.hardSampleList[this.utils.current_index].annotation)
            this.utils.current_selection = this.hardSampleList[
              this.utils.current_index
            ].annotation
          else this.utils.current_selection = null
          this.info.sampleId = this.hardSampleList[
            this.utils.current_index
          ].sample_id
          this.info.transcript = this.hardSampleList[
            this.utils.current_index
          ].text
          this.info.url = this.hardSampleList[
            this.utils.current_index
          ].video_url
          this.info.current =
            this.utils.current_index + 1 + '/' + this.hardSampleList.length
        } else {
          // Finished manual labeling
        }
      },
      async show(row, datasetName) {
        this.dialogSettings.dialogFormVisible = true
        this.loading = true
        this.dialogSettings.datasetName = datasetName
        if (row) {
          // edit single sample
          this.dialogSettings.editMode = true
          this.info.sampleId = row.sample_id
          this.info.videoId = row.video_id
          this.info.current = null
          this.utils.current_selection = row.annotation
          this.info.difficulty = row.difficulty
          this.info.transcript = row.text
          this.info.url = row.video_url
        } else {
          // label hard samples
          this.dialogSettings.editMode = false
          let { data } = await getHardSamples({
            datasetName: this.dialogSettings.datasetName,
          })
          this.hardSampleList = data
          this.utils.current_index = 0
          this.info.sampleId = this.hardSampleList[
            this.utils.current_index
          ].sample_id
          this.info.transcript = this.hardSampleList[
            this.utils.current_index
          ].text
          this.info.url = this.hardSampleList[
            this.utils.current_index
          ].video_url
          this.info.current =
            this.utils.current_index + 1 + '/' + this.hardSampleList.length
          this.info.difficulty = null
        }
        this.dialogSettings.title = datasetName + ' - ' + this.info.sampleId
        this.loading = false
      },
      close() {
        this.utils.current_selection = null
        this.dialogSettings.dialogFormVisible = false
        this.$refs['player'].currentTime = 0
        this.$refs['player'].pause()
        this.$emit('refresh-video-list')
      },
    },
  }
</script>
<style lang="scss" scoped></style>
