<template>
  <div>
    <el-form-item label="n-MFCC:" style="font-weight: bold">
      <el-tooltip
        effect="dark"
        content="Mel-frequency cepstral coefficients (MFCCs)"
        placement="right"
      >
        <el-input-number
          v-model="librosaSettings.n_mfcc"
          :min="0"
          @change="handleChange"
        ></el-input-number>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="RMS:" style="font-weight: bold">
      <el-tooltip
        effect="dark"
        content="Root-Mean-Square value"
        placement="right"
      >
        <el-switch
          v-model="librosaSettings.rms"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="ZCR:" style="font-weight: bold">
      <el-tooltip effect="dark" content="Zero-Crossing Rate" placement="right">
        <el-switch
          v-model="librosaSettings.zero_crossing_rate"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="S-Centroid:" style="font-weight: bold">
      <el-tooltip effect="dark" content="Spectral Centroid" placement="right">
        <el-switch
          v-model="librosaSettings.spectral_centroid"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="S-Rolloff:" style="font-weight: bold">
      <el-tooltip effect="dark" content="Spectral Rolloff" placement="right">
        <el-switch
          v-model="librosaSettings.spectral_rolloff"
          active-color="#13ce66"
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'LibrosaSettings',
    data() {
      return {
        librosaSettings: {
          n_mfcc: 20,
          rms: true,
          zero_crossing_rate: true,
          spectral_centroid: true,
          spectral_rolloff: true,
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      handleChange() {
        this.$emit('change', this.librosaSettings)
      },
    },
  }
</script>
