<template>
  <div class="training-container">
    <h1>Train Model</h1>
    <p class="tips"></p>
    <el-row>
      <el-col
        v-loading="settingsLoading"
        :xs="20"
        :sm="16"
        :md="14"
        :lg="10"
        :xl="8"
      >
        <div class="train-settings">
          <el-form
            ref="trainSettings"
            :model="trainSettings"
            label-position="left"
            label-width="130px"
          >
            <el-form-item label="Train Mode:" style="font-weight: bold">
              <el-radio v-model="trainSettings.mode" label="1">
                Tune Args
              </el-radio>
              <el-radio v-model="trainSettings.mode" label="2">
                Run & Save
              </el-radio>
            </el-form-item>
            <el-form-item label="Select Model:" style="font-weight: bold">
              <el-select v-model="trainSettings.model">
                <el-option
                  v-for="item in modelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Select Dataset:" style="font-weight: bold">
              <el-select v-model="trainSettings.dataset">
                <el-option
                  v-for="item in datasetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Args:" style="font-weight: bold">
              <el-input
                v-model="trainSettings.args"
                type="textarea"
                resize="none"
                :autosize="argsAutosize"
                placehoder="JSON String"
              />
            </el-form-item>
            <el-form-item label="Description:" style="font-weight: bold">
              <el-input
                v-model="trainSettings.description"
                type="textarea"
                resize="none"
                :autosize="descAutosize"
                placehoder="Add Notes Here"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                :icon="icon"
                type="primary"
                style="font-weight: bold; font-size: 14px"
                @click="startTrain"
              >
                Start
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import VabMarkdownEditor from '@/plugins/vabMarkdownEditor'
  import { trainSettings, startTraining } from '@/api/model'
  export default {
    name: 'Training',
    components: {},
    data() {
      return {
        datasetList: [],
        modelList: [],
        trainSettings: {
          mode: '1',
          model: '001',
          dataset: '01',
          args: '',
          description: '',
        },
        argsAutosize: { minRows: 10, maxRows: 12 },
        descAutosize: { minRows: 3, maxRows: 5 },
        settingsLoading: true,
        icon: 'el-icon-check',
      }
    },
    computed: {},
    watch: {},
    created() {
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      async fetchSettings() {
        this.settingsLoading = true
        let { datasets, models } = await trainSettings()
        this.datasetList = datasets
        this.modelList = models
        this.settingsLoading = false
      },
      async startTrain() {
        this.icon = 'el-icon-loading'
        let { result } = await startTraining(this.trainSettings)
        this.icon = 'el-icon-check'
        if (result == true) {
          this.$message({
            message: 'Training Started',
            type: 'success',
          })
        } else {
          this.$message({
            message: 'Failed to start training',
            type: 'error',
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .training-container {
    margin: 0%;
    .train-settings {
      margin: 0% 10%;
    }
  }
</style>
