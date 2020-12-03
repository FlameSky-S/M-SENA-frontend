<template>
  <div class="training-container">
    <h1 style="margin-left: 2%">Train Model</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="20" :md="18" :lg="12" :xl="10">
        <div v-loading="settingsLoading" class="train-settings">
          <el-card shadow="hover" style="padding: 20px">
            <el-form
              ref="trainSettings"
              :model="trainSettings"
              label-position="left"
              label-width="130px"
            >
              <el-form-item label="Train Mode:" style="font-weight: bold">
                <el-radio v-model="trainSettings.mode" label="Tune">
                  Tune
                </el-radio>
                <el-radio v-model="trainSettings.mode" label="Normal">
                  Normal
                </el-radio>
              </el-form-item>
              <el-form-item label="Select Model:" style="font-weight: bold">
                <el-select
                  v-model="trainSettings.model"
                  @change="onSettingsChange"
                >
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Select Dataset:" style="font-weight: bold">
                <el-select
                  v-model="trainSettings.dataset"
                  @change="onSettingsChange"
                >
                  <el-option
                    v-for="item in datasetList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Args:" style="font-weight: bold">
                <el-input
                  v-model="argsDisplay"
                  type="textarea"
                  resize="none"
                  :autosize="argsAutosize"
                  placeholder="JSON String of Args"
                />
              </el-form-item>
              <el-form-item label="Notes:" style="font-weight: bold">
                <el-input
                  v-model="trainSettings.description"
                  type="textarea"
                  resize="none"
                  :autosize="descAutosize"
                  placeholder="Add Notes Here"
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
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import VabMarkdownEditor from '@/plugins/vabMarkdownEditor'
  import { startTraining, getArgs } from '@/api/modelEnd'
  import { getAllSettings } from '@/api/getSettings'
  export default {
    name: 'Training',
    components: {},
    data() {
      return {
        datasetList: [],
        modelList: [],
        trainSettings: {
          mode: 'Tune',
          model: '',
          dataset: '',
          args: '',
          description: '',
        },
        argsDisplay: '',
        argsAutosize: { minRows: 10, maxRows: 20 },
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
        let { datasets, models } = await getAllSettings()
        this.datasetList = datasets
        this.modelList = models
        if (this.$route.query.model) {
          this.trainSettings.model = this.$route.query.model
        } else {
          this.trainSettings.model = this.modelList[0]
        }
        if (this.$route.query.dataset) {
          this.trainSettings.dataset = this.$route.query.dataset
        } else {
          this.trainSettings.dataset = this.datasetList[0].name
        }
        this.onSettingsChange()
        this.settingsLoading = false
      },
      async onSettingsChange() {
        let model = this.trainSettings.model
        let query = { model: model }
        let { args } = await getArgs(query)
        this.trainSettings.args = args
        this.argsDisplay = JSON.stringify(JSON.parse(args), null, '\t')
      },
      async startTrain() {
        this.icon = 'el-icon-loading'
        let { msg } = await startTraining(this.trainSettings)
        this.icon = 'el-icon-check'
        if (msg == 'success') {
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
      width: 500px;
    }
  }
</style>
