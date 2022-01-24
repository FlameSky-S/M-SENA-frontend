<template>
  <div>
    <el-form-item label="Feature Set:" style="font-weight: bold">
      <el-select
        v-model="openSmileSettings.feature_set"
        placeholder="Please Select"
        @change="handleChange"
      >
        <el-option
          v-for="item in featureSetList"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Feature Level:" style="font-weight: bold">
      <el-select
        v-model="openSmileSettings.feature_level"
        placeholder="Please Select"
        @change="handleChange"
      >
        <el-option
          v-for="item in featureLevelList"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'OpenSmileSettings',
    data() {
      return {
        featureSetList: ['eGeMAPS', 'eGeMAPSv02', 'ComParE_2016'],
        featureLevelList: [
          'LowLevelDescriptors',
          'LowLevelDescriptors_Deltas',
          'Functionals',
        ],
        openSmileSettings: {
          feature_set: 'eGeMAPS',
          feature_level: 'LowLevelDescriptors',
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      init(data) {
        this.openSmileSettings.feature_set = data.audio.args.feature_set
        this.openSmileSettings.feature_level = data.audio.args.feature_level
      },
      handleChange() {
        this.$emit('change', this.openSmileSettings)
      },
    },
  }
</script>
