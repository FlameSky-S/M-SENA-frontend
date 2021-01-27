<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <video :src="info.url" controls width="100%"></video>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          style="margin-left: 5%"
        >
          <el-form-item label="Label">
            <el-input v-model="info.label" readonly></el-input>
          </el-form-item>
          <el-form-item label="Predict">
            <el-input v-model="info.predict" readonly></el-input>
          </el-form-item>
          <el-form-item label="Data Type">
            <el-input v-model="info.belonging" readonly></el-input>
          </el-form-item>
          <el-form-item label="Transcript">
            <el-input
              v-model="info.transcript"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 3, maxRows: 5 }"
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
        info: {
          clipID: null,
          belonging: null,
          label: null,
          predict: null,
          url: '',
          translate: 'This is the original transcipt for the video',
        },
        title: '',
        dialogFormVisible: false,
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
      showPreview(row) {
        this.title = 'Sample ' + row.sample_id
        this.info.url = row.video_url
        this.info.sampleID = row.sample_id
        this.info.belonging = row.data_mode
        this.info.transcript = row.text
        this.info.label = row.label_value
        this.info.predict = row.predict_value
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
