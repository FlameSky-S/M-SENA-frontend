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
      <div slot="header">Manual Labeling - {{ form.clipInfo.sampleId }}</div>
      <el-row>
        <el-col :span="16">
          <video :src="form.videoconfig.url" controls width="100%"></video>
        </el-col>
        <el-divider direction="vertical" class="preview-divider"></el-divider>
        <el-col :span="8">
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            class="detail-form"
            :model="form.clipInfo"
          >
            <el-form-item label="Transcripts">
              <el-input
                v-model="form.clipInfo.transcript"
                type="textarea"
                :rows="5"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-if="editmode" label="Prediction">
              <el-input v-model="form.clipInfo.Prediction" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="editmode" label="Difficulty">
              <el-input v-model="form.clipInfo.difficulty" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="manuallyLabel">
              <el-radio-group v-model="manuallyLabel" style="display: block">
                <el-radio :label="1">Positive</el-radio>
                <el-radio :label="0">Neutural</el-radio>
                <el-radio :label="-1">Negative</el-radio>
              </el-radio-group>
            </el-form-item> -->
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
        labelPosition: 'right',
        nextSampleId: null,
        editmode: null,
        dialogFormVisible: false,
      }
    },
    computed: {
      finished() {
        return this.nextSampleId === -1 && !this.editmode
      },
    },
    created() {},
    methods: {
      show(row) {
        alert(row)
        if (row.sampleId) {
          this.editmode = true
        } else {
          this.editmode = false
        }
        this.title = 'Manually Labeling Video Clips'

        // TODO : use getVideoInfoByID API to get the video Info.

        this.form.clipInfo.sampleId = row.sampleId
        this.form.clipInfo.belonging = row.belonging
        this.form.clipInfo.M_label = row.multimodalLabel
        this.form.clipInfo.transcript =
          'A course to build the SQL layer of a distributed database.'

        this.form.clipInfo.M_label_type = row.multimodalLabelType

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
