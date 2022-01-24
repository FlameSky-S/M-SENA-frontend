<template>
  <div class="training-container">
    <h1 style="margin-left: 2%">Train Model</h1>
    <!-- <p class="tips">
      Train models using pre-defined features or learnable features.
    </p> -->
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
              <!-- <el-form-item label="Train Mode:" style="font-weight: bold">
                <el-radio
                  v-model="trainSettings.featureMode"
                  label="Pre-Defined"
                >
                  Pre-Defined
                </el-radio>
                <el-radio
                  v-model="trainSettings.featureMode"
                  label="End-to-End"
                >
                  End-to-End
                </el-radio>
              </el-form-item> -->

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
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Is Tune:" style="font-weight: bold">
                <el-radio-group
                  v-model="trainSettings.isTune"
                  @change="onSettingsChange"
                >
                  <el-radio-button :label="true">True</el-radio-button>
                  <el-radio-button :label="false">False</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-show="trainSettings.isTune"
                label="Tune Times:"
                style="font-weight: bold"
              >
                <el-input-number
                  v-model="trainSettings.tuneTimes"
                  :min="1"
                  :max="1000"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Seed:" style="font-weight: bold">
                <el-input-number
                  v-model="trainSettings.seed"
                  :min="0"
                  :max="65536"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Features:" style="font-weight: bold">
                <el-tooltip
                  effect="dark"
                  content="Use custom features"
                  placement="right"
                >
                  <el-switch
                    v-model="trainSettings.featureSelection"
                  ></el-switch>
                </el-tooltip>
              </el-form-item>
              <el-form-item
                v-show="trainSettings.featureSelection"
                label="Feature A"
                style="font-weight: bold"
              >
                <el-select v-model="trainSettings.featureA">
                  <el-option
                    v-for="item in featureLists.A"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="trainSettings.featureSelection"
                label="Feature V"
                style="font-weight: bold"
              >
                <el-select v-model="trainSettings.featureV">
                  <el-option
                    v-for="item in featureLists.V"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="trainSettings.featureSelection"
                label="Feature T"
                style="font-weight: bold"
              >
                <el-select v-model="trainSettings.featureT">
                  <el-option
                    v-for="item in featureLists.T"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
              <el-form-item label="Advanced:">
                <el-switch v-model="trainSettings.advanced"></el-switch>
              </el-form-item>
              <el-form-item
                v-show="trainSettings.advanced"
                label="Args:"
                style="font-weight: bold"
              >
                <el-input
                  v-model="argsDisplay"
                  type="textarea"
                  resize="none"
                  :autosize="argsAutosize"
                  placeholder="JSON String of Args"
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
  import { getFeatureListforTraining } from '@/api/featureEnd'
  import { IsJsonString } from '@/utils/validate'
  export default {
    name: 'Training',
    components: {},
    data() {
      return {
        datasetList: [],
        modelList: [],
        featureLists: {
          A: [],
          V: [],
          T: [],
        },
        trainSettings: {
          isTune: false,
          tuneTimes: 50,
          seed: 1111,
          // featureMode: 'Pre-Defined',
          model: '',
          dataset: '',
          args: '',
          featureT: '',
          featureA: '',
          featureV: '',
          description: '',
          advanced: false,
          featureSelection: false,
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
        if (this.datasetList == '') {
          this.datasetList = ['None']
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
          this.trainSettings.dataset = this.datasetList[0]
        }
        this.onSettingsChange()

        this.settingsLoading = false
      },
      async fetchFeatures(modality) {
        let { data } = await getFeatureListforTraining({
          dataset: this.trainSettings.dataset,
          model: this.trainSettings.model,
          modality: modality,
        })
        this.featureLists[modality] = data
      },
      async onSettingsChange() {
        let model = this.trainSettings.model
        let dataset = this.trainSettings.dataset
        let isTune = this.trainSettings.isTune
        let query = { model: model, dataset: dataset, isTune: isTune }
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
        let list = ['A', 'V', 'T']
        for (let i in list) {
          this.fetchFeatures(list[i])
          this.trainSettings['feature' + list[i]] = ''
        }
      },
      async startTrain() {
        this.icon = 'el-icon-loading'
        this.trainSettings.args = this.argsDisplay.replace(/(\r\n|\n|\r)/gm, '')
        if (!IsJsonString(this.trainSettings.args)) {
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
    },
  }
</script>

<style lang="scss" scoped>
  .training-container {
    margin: 0%;
    .train-settings {
      width: 600px;
      margin: 0% 3%;
    }
    .tips {
      margin: 15px 3%;
      font-size: 14px;
    }
  }
</style>
