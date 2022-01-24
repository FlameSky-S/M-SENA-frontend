<template>
  <div>
    <el-form-item label="FPS:" style="font-weight: bold">
      <el-input-number
        v-model="openfaceSettings.fps"
        :min="0"
        :max="60"
        @change="handleChange"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="Landmark2D:" style="font-weight: bold">
      <el-tooltip
        effect="dark"
        content="Facial landmarks in 2D"
        placement="right"
      >
        <el-switch
          v-model="openfaceSettings.landmark2D"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Landmark3D:" style="font-weight: bold">
      <el-tooltip
        effect="dark"
        content="Facial landmarks in 3D"
        placement="right"
      >
        <el-switch
          v-model="openfaceSettings.landmark3D"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Head pose:" style="font-weight: bold">
      <el-switch
        v-model="openfaceSettings.pose"
        active-color="#13ce66"
        @change="handleChange"
      ></el-switch>
    </el-form-item>
    <el-form-item label="Action units:" style="font-weight: bold">
      <el-tooltip effect="dark" content="Facial action units" placement="right">
        <el-switch
          v-model="openfaceSettings.AUs"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Gaze:" style="font-weight: bold">
      <el-tooltip effect="dark" content="Gaze direction" placement="right">
        <el-switch
          v-model="openfaceSettings.gaze"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'OpenFaceSettings',
    data() {
      return {
        openfaceSettings: {
          landmark2D: true,
          landmark3D: false,
          pose: false,
          AUs: true,
          gaze: false,
          fps: 25,
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      init(data) {
        this.openfaceSettings.landmark2D = data.video.args.landmark_2D
        this.openfaceSettings.landmark3D = data.video.args.landmark_3D
        this.openfaceSettings.pose = data.video.args.head_pose
        this.openfaceSettings.AUs = data.video.args.action_units
        this.openfaceSettings.gaze = data.video.args.gaze
        this.openfaceSettings.fps = data.video.fps
      },
      handleChange() {
        this.$emit('change', this.openfaceSettings)
      },
    },
  }
</script>
