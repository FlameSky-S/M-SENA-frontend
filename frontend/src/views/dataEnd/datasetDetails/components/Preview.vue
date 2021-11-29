<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :width="dialogWidth"
    @close="close"
    ref="dialog"
    top="5vh"
  >
    <el-row>
      <video ref="player" :src="info.url" controls width="100%"></video>
    </el-row>
    <el-row style="margin-top: 2%">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="25">
          <el-col :span="12">
            <el-form-item label="C_Label:">
              <el-input v-model="info.C_Label" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="R_Label:">
              <el-input v-model="info.R_Label" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="T_Label:">
              <el-input v-model="info.T_Label" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="A_Label:">
              <el-input v-model="info.A_Label" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="V_Label:">
              <el-input v-model="info.V_Label" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="Data Split:">
            <el-input v-model="info.dataSplit" readonly></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Transcript:">
            <el-input
              v-model="info.transcript"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 3, maxRows: 8 }"
              readonly
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
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
          dataSplit: null,
          C_Label: null,
          R_Label: null,
          T_Label: null,
          A_Label: null,
          V_Label: null,
          url: null,
          transcript: null,
        },
        title: '',
        dialogFormVisible: false,
        dialogWidth: '50%',
      }
    },
    computed: {},
    created() {},
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        if (document.body.getBoundingClientRect().width <= 1200) {
          this.dialogWidth = '600px'
        } else this.dialogWidth = '50%'
      },
      showPreview(row) {
        this.title = row.dataset_name + ': ' + row.video_id + '_' + row.clip_id
        this.info.url = row.video_url
        this.info.dataSplit = row.data_mode
        this.info.transcript = row.text
        this.info.C_Label = row.annotation
        this.info.R_Label = row.label_value
        this.info.T_Label = row.label_T == null ? 'N/A' : row.label_T
        this.info.A_Label = row.label_A == null ? 'N/A' : row.label_A
        this.info.V_Label = row.label_V == null ? 'N/A' : row.label_V
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.$refs['player'].currentTime = 0
        this.$refs['player'].pause()
      },
    },
  }
</script>
