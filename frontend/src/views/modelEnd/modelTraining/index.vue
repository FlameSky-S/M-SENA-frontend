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
              label-width="100px"
            >
              <el-form-item label="Train Mode:" style="font-weight: bold">
                <el-radio v-model="trainSettings.mode" label="Tune">
                  Tune
                </el-radio>
                <el-radio v-model="trainSettings.mode" label="Train">
                  Train
                </el-radio>
              </el-form-item>
              <el-form-item label="Model:" style="font-weight: bold">
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
              <el-form-item label="Dataset:" style="font-weight: bold">
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
              <el-form-item
                v-show="trainSettings.mode == 'Tune'"
                label="Tune Times:"
                style="font-weight: bold"
              >
                <el-input
                  v-model="trainSettings.tuneTimes"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  style="width: 80px"
                ></el-input>
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
                  style="font-size: 14px; font-weight: bold"
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
          tuneTimes: '10',
        },
        argsDisplay: '',
        argsAutosize: { minRows: 10, maxRows: 20 },
        descAutosize: { minRows: 3, maxRows: 5 },
        settingsLoading: true,
        icon: 'el-icon-check',
      }
    },
    computed: {
      tuneTimesEnabled: function () {
        console.log('test')
        return this.trainSettings.mode == 'Tune' ? true : false
      },
    },
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
        if (this.datasetList == '') {
          this.datasetList = [{ name: 'None', sentiment: 'N/A' }]
        }
        if (this.modelList == '') {
          this.modelList = ['None']
        }
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
        let dataset = this.trainSettings.dataset
        let query = { model: model, dataset: dataset }
        let arg = ''
        if (this.$route.query.args) {
          arg = this.$route.query.args
        } else {
          let { args } = await getArgs(query)
          arg = args
        }
        // this.trainSettings.args = args
        if (arg != '')
          this.argsDisplay = JSON.stringify(JSON.parse(arg), null, '\t')
      },
      async startTrain() {
        this.icon = 'el-icon-loading'
        this.trainSettings.args = this.argsDisplay.replace(/(\r\n|\n|\r)/gm, '')
        if (!this.IsJsonString(this.trainSettings.args)) {
          this.icon = 'el-icon-check'
          this.$message({
            message: 'Invalid Args! Please check your syntax',
            type: 'error',
          })
          return
        }
        // console.log(this.trainSettings.args)
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
      IsJsonString(str) {
        try {
          JSON.parse(str)
        } catch (e) {
          return false
        }
        return true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .training-container {
    margin: 0%;
    .train-settings {
      width: 600px;
      margin: 0% 10%;
    }
  }
</style>
