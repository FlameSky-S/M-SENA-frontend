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
                <el-radio v-model="trainSettings.mode" label="tune">
                  Tune Args
                </el-radio>
                <el-radio v-model="trainSettings.mode" label="run">
                  Run & Save
                </el-radio>
              </el-form-item>
              <el-form-item label="Select Model:" style="font-weight: bold">
                <el-select v-model="trainSettings.model">
                  <el-option
                    v-for="item in modelList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Select Dataset:" style="font-weight: bold">
                <el-select v-model="trainSettings.dataset">
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
                  v-model="trainSettings.args"
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
  import { startTraining } from '@/api/modelEnd'
  import { getAllSettings } from '@/api/getSettings'
  export default {
    name: 'Training',
    components: {},
    data() {
      return {
        datasetList: [],
        modelList: [],
        trainSettings: {
          mode: 'tune',
          model: '',
          dataset: '',
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
      width: 500px;
    }
  }
</style>
