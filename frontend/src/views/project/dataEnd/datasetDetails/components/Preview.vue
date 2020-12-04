<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <el-card shadow="hover">
      <div slot="header">{{ form.clipInfo.clipID }}</div>
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
            <el-form-item label="Belonging">
              <el-input v-model="form.clipInfo.belonging" disabled></el-input>
            </el-form-item>
            <el-form-item label="M Label">
              <el-input v-model="form.clipInfo.M_label" disabled></el-input>
            </el-form-item>
            <el-form-item label="M Label Type">
              <el-input
                v-model="form.clipInfo.M_label_type"
                disabled
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </el-dialog>
</template>

<script>
  import { getVideoInfoByID } from '@/api/preview'
  export default {
    name: 'Preview',
    data() {
      return {
        form: {
          clipInfo: {
            clipID: null,
            belonging: null,
            M_label: null,

            M_label_type: null,
          },
          videoconfig: {
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
          },
          translate: 'This is the original transcipt for the video',
        },
        title: '',
        labelPosition: 'right',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showPreview(row) {
        this.title = 'Preview Video Clips'

        this.fetchVideoUrl(row.sample_id)

        this.form.clipInfo.clipID = row.clipID
        this.form.clipInfo.belonging = row.data_mode
        this.form.clipInfo.transcript = row.text

        this.form.clipInfo.M_label_type = row.label_value

        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      async fetchVideoUrl(sample_id) {
        const { data } = await getVideoInfoByID({ sample_id: sample_id })
        this.form.videoconfig.url = data.video_url
        // console.log(this.form.videoconfig.url)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .preview-divider {
    position: absolute;
    left: 70%;
    height: 100%;
  }
  .detail-form {
    margin-left: 10%;
  }
</style>
