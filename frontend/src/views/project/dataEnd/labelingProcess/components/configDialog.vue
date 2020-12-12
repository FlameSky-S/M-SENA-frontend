<template>
  <el-dialog
    :title="dialogSettings.title + ' Settings'"
    :visible.sync="dialogSettings.dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-card shadow="hover">
      <div slot="header">
        <h2 class="header">{{ dialogSettings.modelName }}</h2>
      </div>
      <el-form :model="settings" label-position="left" label-width="60px">
        <el-form-item label="Args:" style="font-weight: bold">
          <el-input
            v-model="settings.argsDisplay"
            type="textarea"
            resize="none"
            :autosize="argsAutosize"
            placeholder="JSON String of Args"
          />
        </el-form-item>
      </el-form>
      <el-button
        icon="el-icon-check"
        type="primary"
        style="width: 60%; margin-left: 20%; font-size: 14px; font-weight: bold"
        @click="saveConfig"
      >
        Save
      </el-button>
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
        argsAutosize: { minRows: 12, maxRows: 24 },
        descAutosize: { minRows: 3, maxRows: 5 },
        settings: {
          argsDisplay: '',
        },
        dialogSettings: {
          title: '', // dialog titile.
          modelName: null, // selected modelName.
          dialogFormVisible: false, // whether to show.
        },
      }
    },
    computed: {},
    created() {},
    methods: {
      saveConfig() {
        this.settings.argsDisplay = this.settings.argsDisplay.replace(
          /(\r\n|\n|\r)/gm,
          ''
        )
        if (!this.IsJsonString(this.settings.argsDisplay)) {
          this.$message({
            message: 'Invalid Args! Please check your syntax',
            type: 'error',
          })
          return
        } else {
          console.log(this.settings.argsDisplay)
          if (this.dialogSettings.title === 'Classifier') {
            console.log('modifyClassifierConfig')
            saveClassifierConfig({
              classifier: this.dialogSettings.modelName,
              args: this.settings.argsDisplay,
            })
          } else {
            console.log('modifySelectorConfig')
            saveSelectorConfig({
              classifier: this.dialogSettings.modelName,
              args: this.settings.argsDisplay,
            })
          }
          this.close()
        }
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
            const { args, code } = await getClassifierConfig({
              classifier: modelName,
            })
            console.log(args)
            if (args != '')
              this.settings.argsDisplay = JSON.stringify(
                JSON.parse(args),
                null,
                '\t'
              )
          })()
        } else {
          ;(async () => {
            const { args } = await getSelectorConfig({ selector: modelName })
            if (args != '')
              this.settings.argsDisplay = JSON.stringify(
                JSON.parse(args),
                null,
                '\t'
              )
          })()
        }
        this.dialogSettings.dialogFormVisible = true
        this.dialogSettings.modelName = modelName
      },
      close() {
        this.settings.argsDisplay = ''
        this.dialogSettings.dialogFormVisible = false
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
