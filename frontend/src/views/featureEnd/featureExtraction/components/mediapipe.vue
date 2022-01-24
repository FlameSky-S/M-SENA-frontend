<template>
  <div>
    <el-form-item label="FPS:" style="font-weight: bold">
      <el-input-number
        v-model="mediapipeSettings.fps"
        :min="0"
        :max="60"
        @change="handleChange"
      ></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'MediaPipeSettings',
    data() {
      return {
        mediapipeSettings: {
          fps: 25,
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      init(data) {
        this.mediapipeSettings.fps = data.video.fps
      },
      handleChange() {
        this.$emit('change', this.mediapipeSettings)
      },
    },
  }
</script>
