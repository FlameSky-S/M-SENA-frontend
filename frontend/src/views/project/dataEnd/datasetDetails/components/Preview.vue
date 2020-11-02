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
          <vab-player-mp4
            :config="form.videoconfig"
            @player="Player1 = $event"
          />
        </el-col>
        <el-divider direction="vertical" class="preview-divider"></el-divider>
        <el-col :span="8">
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            class="detail-form"
            :model="form.clipInfo"
          >
            <el-form-item label="M Label">
              <el-input v-model="form.clipInfo.M_label" disabled></el-input>
            </el-form-item>
            <el-form-item label="M Label Type">
              <el-input
                v-model="form.clipInfo.M_label_type"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-if="form.clipInfo.T_label" label="T Label">
              <el-input v-model="form.clipInfo.T_label" disabled></el-input>
            </el-form-item>
            <el-form-item
              v-if="form.clipInfo.T_label_type"
              label="T Label Type"
            >
              <el-input
                v-model="form.clipInfo.T_label_type"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-if="form.clipInfo.V_label" label="V Label">
              <el-input v-model="form.clipInfo.V_label" disabled></el-input>
            </el-form-item>
            <el-form-item
              v-if="form.clipInfo.V_label_type"
              label="V Label Type"
            >
              <el-input
                v-model="form.clipInfo.V_label_type"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item v-if="form.clipInfo.A_label" label="A Label">
              <el-input v-model="form.clipInfo.A_label" disabled></el-input>
            </el-form-item>
            <el-form-item
              v-if="form.clipInfo.A_label_type"
              label="A Label Type"
            >
              <el-input
                v-model="form.clipInfo.A_label_type"
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
  import { VabPlayerMp4 } from '@/plugins/vabPlayer.js'
  export default {
    name: 'Preview',
    components: {
      // VabPlayerHls,
      VabPlayerMp4,
    },
    data() {
      return {
        form: {
          clipInfo: {
            clipID: null,
            belonging: null,
            M_label: null,
            T_label: null,
            V_label: null,
            A_label: null,
            M_label_type: null,
            T_label_type: null,
            A_label_type: null,
            V_label_type: null,
          },
          // videoconfig: {
          //   id: 'mse2',
          //   url:
          //     'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.m3u8',
          //   volume: 1,
          //   // autostart: false,
          // },
          videoconfig: {
            id: 'mse1',
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
            volume: 1,
            autoplay: false,
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
        console.log(row)
        this.form.clipInfo.clipID = row.clipID
        this.form.clipInfo.belonging = row.belonging
        this.form.clipInfo.M_label = row.multimodalLabel
        this.form.clipInfo.T_label = row.textLabel
        this.form.clipInfo.A_label = row.audioLabel
        this.form.clipInfo.V_label = row.videoLabel

        this.form.clipInfo.M_label_type = row.multimodalLabelType
        this.form.clipInfo.T_label_type = row.textLabelType
        this.form.clipInfo.A_label_type = row.audioLabelType
        this.form.clipInfo.V_label_type = row.videoLabelType

        this.dialogFormVisible = true
      },
      close() {
        // this.$refs['form'].resetFields()
        // this.form = this.$options.data().form
        // console.log($event)
        this.dialogFormVisible = false
        this.$emit('fetch-data')
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
