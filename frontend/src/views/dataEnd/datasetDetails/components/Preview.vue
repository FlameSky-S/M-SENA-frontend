<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <video ref="player" :src="info.url" controls width="100%"></video>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
        <el-form :label-position="labelPosition" label-width="100px">
          <el-form-item label="Data Split">
            <el-input v-model="info.dataSplit" readonly></el-input>
          </el-form-item>
          <el-form-item label="Label">
            <el-input v-model="info.label" readonly></el-input>
          </el-form-item>
          <el-form-item label="Transcripts">
            <el-input
              v-model="info.transcript"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 3, maxRows: 8 }"
              readonly
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer"></div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Preview',
    data() {
      return {
        labelPosition: 'top',
        info: {
          clipID: null,
          dataSplit: null,
          label: null,
          url: null,
          transcript: null,
        },
        title: '',
        dialogFormVisible: false,
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
        if (document.body.getBoundingClientRect().width >= 1200) {
          this.labelPosition = 'top'
        } else this.labelPosition = 'left'
      },
      showPreview(row) {
        this.title = 'Sample ' + row.sample_id
        this.info.url = row.video_url
        this.info.dataSplit = row.data_mode
        this.info.transcript = row.text
        this.info.label = row.annotation
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
