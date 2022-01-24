<template>
  <div>
    <el-form-item label="Model:" style="font-weight: bold">
      <el-select
        v-model="bertSettings.pretrained"
        placeholder="Please Select"
        filterable
        allow-create
        default-first-option
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
          v-model="bertSettings.fineTune"
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
    name: 'BERTSettings',
    data() {
      return {
        pretrained: ['bert-base-uncased', 'bert-base-chinese'],
        bertSettings: {
          pretrained: 'bert-base-uncased',
          fineTune: false,
        },
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      init(data) {
        this.bertSettings.pretrained = data.text.pretrained
      },
      handleChange() {
        this.$emit('change', this.bertSettings)
      },
    },
  }
</script>
