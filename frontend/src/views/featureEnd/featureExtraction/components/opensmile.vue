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
  </div>
</template>

<script>
  export default {
    name: 'OpenSmileSettings',
    data() {
      return {
        featureSetList: ['eGeMAPS', 'eGeMAPSv02', 'ComParE_2016'],
        openSmileSettings: {
          feature_set: 'eGeMAPS',
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      handleChange() {
        this.$emit('change', this.openSmileSettings)
      },
    },
  }
</script>
