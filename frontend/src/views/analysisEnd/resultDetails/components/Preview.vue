<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-row style="margin: 0% 2%">
      <h3 style="margin-top: 0%">SampleID : {{ form.clipInfo.sampleID }}</h3>
    </el-row>
    <el-row :gutter="20" style="margin: 0% 2%">
      <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
        <video :src="form.videoconfig.url" controls width="100%"></video>
      </el-col>

      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-form
          :label-position="labelPosition"
          label-width="120px"
          style="margin: 0% 2%; padding: 0"
          :model="form.clipInfo"
        >
          <el-form-item label="Label" style="font-weight: bold">
            <el-input v-model="form.clipInfo.label" readonly></el-input>
          </el-form-item>
          <el-form-item label="Predict" style="font-weight: bold">
            <el-input v-model="form.clipInfo.predict" readonly></el-input>
          </el-form-item>
          <el-form-item label="Data Type" style="font-weight: bold">
            <el-input v-model="form.clipInfo.belonging" readonly></el-input>
          </el-form-item>
          <el-form-item label="Transcript" style="font-weight: bold">
            <el-input
              v-model="form.clipInfo.transcript"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 1, maxRows: 2 }"
              readonly
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Preview',
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        fullHeight: document.documentElement.clientHeight,
        form: {
          clipInfo: {
            clipID: null,
            belonging: null,
            label: null,
            predict: null,
          },
          videoconfig: {
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
          },
          translate: 'This is the original transcipt for the video',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    computed: {
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
      showPreview(row) {
        this.title = 'Preview Video Clips'
        this.form.videoconfig.url = row.video_url
        this.form.clipInfo.sampleID = row.sample_id
        this.form.clipInfo.belonging = row.data_mode
        this.form.clipInfo.transcript = row.text
        this.form.clipInfo.label = row.label_value
        this.form.clipInfo.predict = row.predict_value
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
    },
  }
</script>
<style lang="scss" scoped></style>
