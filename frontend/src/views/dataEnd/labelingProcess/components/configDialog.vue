<template>
  <el-dialog
    :title="dialogSettings.title + ' Settings'"
    :visible.sync="dialogSettings.dialogFormVisible"
    width="550px"
    @close="close"
  >
    <el-card shadow="never">
      <div slot="header">
        <h2 class="header">{{ dialogSettings.modelName }}</h2>
      </div>
      <el-form :model="settings" label-position="left" label-width="60px">
        <el-form-item label="Args:" style="font-weight: bold">
          <el-input
            v-model="settings.argsDisplay"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 12, maxRows: 24 }"
            placeholder="JSON String of Args"
          />
        </el-form-item>
      </el-form>
      <div align="right" style="margin-right: 40px">
        <el-button icon="el-icon-check" type="primary" @click="saveConfig">
          Save
        </el-button>
        <el-button @click="cancelAction">Cancel</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
  import {
    getSelectorConfig,
    getClassifierConfig,
    saveClassifierConfig,
    saveSelectorConfig,
  } from '@/api/labeling'
  export default {
    name: 'ConfigDialog',
    data() {
      return {
        settings: {
          args: '',
          argsDisplay: '',
        },
        dialogSettings: {
          title: '',
          modelName: null,
          dialogFormVisible: false,
        },
      }
    },
    computed: {},
    created() {},
    methods: {
      async saveConfig() {
        this.settings.args = this.settings.argsDisplay.replace(
          /(\r\n|\n|\r)/gm,
          ''
        )
        if (!this.IsJsonString(this.settings.args)) {
          this.$message({
            message: 'Invalid Args! Please check your syntax',
            type: 'error',
          })
          return
        } else {
          if (this.dialogSettings.title === 'Classifier') {
            let { msg } = await saveClassifierConfig({
              classifier: this.dialogSettings.modelName,
              args: this.settings.argsDisplay,
            })
            if (msg === 'success') {
              this.$emit('save-success')
            } else {
              this.$emit('save-failed')
            }
          } else {
            let { msg } = await saveSelectorConfig({
              selector: this.dialogSettings.modelName,
              args: this.settings.argsDisplay,
            })
            if (msg === 'success') {
              this.$emit('save-success')
            } else {
              this.$emit('save-failed')
            }
          }
          this.close()
        }
      },
      cancelAction() {
        this.close()
      },
      IsJsonString(str) {
        try {
          JSON.parse(str)
        } catch (e) {
          return false
        }
        return true
      },
      show(configTitle, modelName) {
        if (configTitle === 'Classifier') {
          ;(async () => {
            let { args } = await getClassifierConfig({ classifier: modelName })
            this.settings.args = args
            if (args != '')
              this.settings.argsDisplay = JSON.stringify(
                JSON.parse(args),
                null,
                '\t'
              )
          })()
          this.dialogSettings.title = 'Classifier'
        } else {
          ;(async () => {
            let { args } = await getSelectorConfig({ selector: modelName })
            this.settings.args = args
            if (args != '')
              this.settings.argsDisplay = JSON.stringify(
                JSON.parse(args),
                null,
                '\t'
              )
          })()
          this.dialogSettings.title = 'Selector'
        }
        this.dialogSettings.modelName = modelName
        this.dialogSettings.dialogFormVisible = true
      },
      close() {
        this.dialogSettings.dialogFormVisible = false
        this.settings.argsDisplay = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  .header {
    margin-block-start: 0;
    margin-block-end: 0;
  }
</style>
