<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model.trim="form.author" autocomplete="off"></el-input>
      </el-form-item>
    </el-form> -->
    <el-card shadow="hover">
      <div slot="header">Preview Video Clips</div>
      <vab-player-hls
        :config="form.videoconfig"
        @player="Player2 = $event"
      ></vab-player-hls>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <!-- <el-button type="primary" @click="save">确 定</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
  import { VabPlayerMp4, VabPlayerHls } from '@/plugins/vabPlayer.js'
  export default {
    name: 'Preview',
    components: {
      VabPlayerHls,
    },
    data() {
      return {
        form: {
          title: '',
          videoconfig: {
            id: 'mse2',
            url:
              'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.m3u8',
            volume: 1,
            autoplay: false,
          },
          translate: 'This is the original transcipt for the video',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showPreview(row) {
        this.title = 'Instance Preview'
        // if (!row) {
        //   this.title = '添加'
        // } else {
        //   this.title = '编辑'
        //   this.form = Object.assign({}, row)
        // }
        this.dialogFormVisible = true
      },
      close() {
        // this.$refs['form'].resetFields()
        // this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
    },
  }
</script>
