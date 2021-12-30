<template>
  <div>
    <el-form-item label="Model:" style="font-weight: bold">
      <el-select
        v-model="wav2vec2Settings.pretrained"
        placeholder="Please Select"
        @change="handleChange"
      >
        <el-option
          v-for="item in pretrained"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Fine-tune:" style="font-weight: bold">
      <el-tooltip
        effect="dark"
        content="Fine-tuning is avaliable in Model Training page"
        placement="right"
      >
        <el-switch
          v-model="wav2vec2Settings.fineTune"
          active-color="#13ce66"
          disabled
          @change="handleChange"
        ></el-switch>
      </el-tooltip>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'Wav2vec2Settings',
    data() {
      return {
        pretrained: [
          'facebook/wav2vec2-base-960h',
          'facebook/wav2vec2-base-10k-voxpopuli-ft-en',
        ],
        wav2vec2Settings: {
          pretrained: 'facebook/wav2vec2-base-960h',
          fineTune: false,
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      handleChange() {
        this.$emit('change', this.wav2vec2Settings)
      },
    },
  }
</script>
