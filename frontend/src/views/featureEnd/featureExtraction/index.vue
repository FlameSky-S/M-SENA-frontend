<template>
  <div class="featureExtraction-container">
    <h1 style="margin-left: 2%">Feature Extraction</h1>
    <p class="tips">Extract pre-defined features for datasets.</p>
    <p class="tips">
      For end-to-end features obtained by fine-tuning pre-trained models, please
      refer to "Model Training" page.
    </p>
    <el-row v-loading="settingsLoading" class="settings">
      <el-card shadow="hover" style="padding: 20px">
        <el-form
          ref="trainSettings"
          :model="trainSettings"
          :rules="rules"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="Dataset:">
            <el-select
              v-model="trainSettings.dataset"
              placeholder="Select Dataset"
            >
              <el-option
                v-for="item in datasetList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Name:" prop="featureName">
            <el-input
              ref="featureName"
              v-model="trainSettings.featureName"
              :disabled="featureNameDisabled"
              :placeholder="
                featureNameDisabled ? 'Auto-generated' : 'Enter Feature Name'
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="Notes:">
            <el-input
              v-model="trainSettings.description"
              type="textarea"
              resize="none"
              :autosize="descAutosize"
              placeholder="Add Notes Here"
            />
          </el-form-item>
          <el-tabs v-model="activeTab" type="card" @tab-click="handleTabChange">
            <el-tab-pane label="Audio" name="audio">
              <el-form-item label="Enable:">
                <el-switch v-model="trainSettings.audio"></el-switch>
              </el-form-item>
              <el-form-item label="Audio Tool:" prop="audioTool">
                <el-select
                  ref="audioTool"
                  v-model="trainSettings.audioTool"
                  :disabled="!trainSettings.audio"
                  placeholder="Select Audio Tool"
                  @change="onToolChange"
                >
                  <el-option
                    v-for="item in audioToolList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <LibrosaSettings
                v-show="trainSettings.audioTool == 'librosa'"
                @change="librosaChange"
              ></LibrosaSettings>
              <OpenSmileSettings
                v-show="trainSettings.audioTool == 'opensmile'"
                @change="opensmileChange"
              ></OpenSmileSettings>
              <Wav2vec2Settings
                v-show="trainSettings.audioTool == 'wav2vec'"
                @change="wav2vec2Change"
              ></Wav2vec2Settings>
              <el-form-item label="Advanced:">
                <el-switch
                  v-model="audioAdvanced"
                  @change="onAdvancedChange"
                ></el-switch>
              </el-form-item>
              <el-form-item v-show="audioAdvanced" label="Audio Args:">
                <el-input
                  v-model="audioArgsDisplay"
                  type="textarea"
                  resize="none"
                  :autosize="argsAutosize"
                  placeholder="JSON String of Args"
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="Visual" name="visual">
              <el-form-item label="Enable:">
                <el-switch v-model="trainSettings.video"></el-switch>
              </el-form-item>
              <el-form-item label="Visual Tool:" prop="videoTool">
                <el-select
                  ref="videoTool"
                  v-model="trainSettings.videoTool"
                  :disabled="!trainSettings.video"
                  placeholder="Select Video Tool"
                  @change="onToolChange"
                >
                  <el-option
                    v-for="item in videoToolList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Advanced:">
                <el-switch
                  v-model="videoAdvanced"
                  @change="onAdvancedChange"
                ></el-switch>
              </el-form-item>
              <el-form-item v-show="videoAdvanced" label="Visual Args:">
                <el-input
                  v-model="videoArgsDisplay"
                  type="textarea"
                  resize="none"
                  :autosize="argsAutosize"
                  placeholder="JSON String of Args"
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="Text" name="text">
              <el-form-item label="Enable:">
                <el-switch v-model="trainSettings.text"></el-switch>
              </el-form-item>
              <el-form-item label="Text Tool:" prop="textTool">
                <el-select
                  ref="textTool"
                  v-model="trainSettings.textTool"
                  placeholder="Select Text Tool"
                  :disabled="!trainSettings.text"
                  @change="onToolChange"
                >
                  <el-option
                    v-for="item in textToolList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Advanced:">
                <el-switch
                  v-model="textAdvanced"
                  @change="onAdvancedChange"
                ></el-switch>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>

          <el-form-item>
            <el-button
              :icon="icon"
              type="primary"
              style="font-size: 14px; font-weight: bold"
              @click="handlestartExtraction"
            >
              Start Extraction
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { getFeatureArgs, startExtracting } from '@/api/featureEnd'
  import { getAllSettings, getFeatureExtractionTools } from '@/api/getSettings'
  import LibrosaSettings from './components/librosa'
  import OpenSmileSettings from './components/opensmile'
  import Wav2vec2Settings from './components/wav2vec2'
  export default {
    name: 'FeatureExtraction',
    components: {
      LibrosaSettings,
      OpenSmileSettings,
      Wav2vec2Settings,
    },
    data() {
      var validateName = (rule, value, callback) => {
        if (value == '' && !this.featureNameDisabled) {
          this.formValid = false
          this.$refs.featureName.focus()
          this.$refs.featureName.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
          callback(new Error('Please enter a name'))
        } else {
          this.formValid = this.formValid && true
          callback()
        }
      }
      var validateAudioTool = (rule, value, callback) => {
        if (value == '' && this.trainSettings.audio) {
          this.formValid = false
          this.$refs.audioTool.focus()
          this.activeTab = 'audio'
          this.$refs.audioTool.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
          callback(new Error('Please select an audio extraction tool'))
        } else {
          this.formValid = this.formValid && true
          callback()
        }
      }
      var validateVideoTool = (rule, value, callback) => {
        if (value == '' && this.trainSettings.video) {
          this.formValid = false
          this.$refs.videoTool.focus()
          this.activeTab = 'visual'
          this.$refs.videoTool.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
          callback(new Error('Please select a video extraction tool'))
        } else {
          this.formValid = this.formValid && true
          callback()
        }
      }
      var validateTextTool = (rule, value, callback) => {
        if (value == '' && this.trainSettings.text) {
          this.formValid = false
          this.$refs.textTool.focus()
          this.activeTab = 'text'
          this.$refs.textTool.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
          callback(new Error('Please select a text extraction tool'))
        } else {
          this.formValid = this.formValid && true
          callback()
        }
      }
      return {
        datasetList: [],
        audioToolList: ['librosa', 'opensmile', 'wav2vec'],
        videoToolList: ['mediapipe', 'openface2', 'vggface'],
        textToolList: ['bert', 'xlnet'],
        activeTab: 'audio',
        trainSettings: {
          // modality: 'audio',
          dataset: 'SIMS',
          featureName: '',
          advanced: false,
          audio: false,
          audioTool: '',
          video: false,
          videoTool: '',
          text: false,
          textTool: '',
          audioArgs: '',
          videoArgs: '',
          textArgs: '',
          description: '',
        },
        audioAdvanced: false,
        videoAdvanced: false,
        textAdvanced: false,
        audioArgsDisplay: '',
        videoArgsDisplay: '',
        textArgsDisplay: '',
        argsAutosize: { minRows: 10, maxRows: 20 },
        descAutosize: { minRows: 2, maxRows: 5 },
        settingsLoading: false,
        icon: 'el-icon-check',
        formValid: true,
        rules: {
          featureName: [
            {
              validator: validateName,
              trigger: 'change',
            },
          ],
          audioTool: [
            {
              validator: validateAudioTool,
              trigger: 'blur',
            },
          ],
          videoTool: [
            {
              validator: validateVideoTool,
              trigger: 'blur',
            },
          ],
          textTool: [
            {
              validator: validateTextTool,
              trigger: 'blur',
            },
          ],
        },
      }
    },
    computed: {
      featureNameDisabled() {
        return !this.audioAdvanced && !this.videoAdvanced && !this.textAdvanced
      },
    },
    watch: {},
    created() {
      this.fetchSettings()
    },
    mounted() {},
    methods: {
      handleTabChange(tab, event) {},
      librosaChange(data) {
        this.trainSettings.audioArgs.audio.args.mfcc.n_mfcc = data.n_mfcc
        if (data.rms) {
          this.trainSettings.audioArgs.audio.args.rms = {}
        } else {
          delete this.trainSettings.audioArgs.audio.args.rms
        }
        if (data.zero_crossing_rate) {
          this.trainSettings.audioArgs.audio.args.zero_crossing_rate = {}
        } else {
          delete this.trainSettings.audioArgs.audio.args.zero_crossing_rate
        }
        if (data.spectral_centroid) {
          this.trainSettings.audioArgs.audio.args.spectral_centroid = {}
        } else {
          delete this.trainSettings.audioArgs.audio.args.spectral_centroid
        }
        if (data.spectral_rolloff) {
          this.trainSettings.audioArgs.audio.args.spectral_rolloff = {}
        } else {
          delete this.trainSettings.audioArgs.audio.args.spectral_rolloff
        }
        this.audioArgsDisplay = JSON.stringify(
          this.trainSettings.audioArgs,
          null,
          4
        )
      },
      opensmileChange(data) {
        this.trainSettings.audioArgs.audio.args.feature_set = data.feature_set
        this.audioArgsDisplay = JSON.stringify(
          this.trainSettings.audioArgs,
          null,
          4
        )
      },
      wav2vec2Change(data) {
        this.trainSettings.audioArgs.audio.pretrained = data.pretrained
        this.audioArgsDisplay = JSON.stringify(
          this.trainSettings.audioArgs,
          null,
          4
        )
      },
      async onToolChange() {
        if (this.activeTab == 'audio') {
          var query = {
            modality: 'audio',
            tool: this.trainSettings.audioTool,
          }
          const { data } = await getFeatureArgs(query)
          this.trainSettings.audioArgs = data
          this.audioArgsDisplay = JSON.stringify(data, null, 4)
        } else if (this.activeTab == 'visual') {
          var query = {
            modality: 'visual',
            tool: this.trainSettings.videoTool,
          }
          const { data } = await getFeatureArgs(query)
          this.trainSettings.videoArgs = data
          this.videoArgsDisplay = JSON.stringify(data, null, 4)
        } else if (this.activeTab == 'text') {
          var query = {
            modality: 'text',
            tool: this.trainSettings.textTool,
          }
          const { data } = await getFeatureArgs(query)
          this.trainSettings.textArgs = data
          this.textArgsDisplay = JSON.stringify(data, null, 4)
        }
      },
      onAdvancedChange(val) {
        if (!val) {
          this.$refs['trainSettings'].validateField('featureName')
        }
      },
      async fetchSettings() {
        this.settingsLoading = true
        const { datasets } = await getAllSettings()
        // const { data } = await getFeatureExtractionTools()
        this.datasetList = datasets
        // this.audioToolList = data.audio
        // this.videoToolList = data.visual
        this.settingsLoading = false
      },
      async handlestartExtraction() {
        this.trainSettings.advanced = !this.featureNameDisabled
        if (
          !(
            this.trainSettings.audio ||
            this.trainSettings.video ||
            this.trainSettings.text
          )
        ) {
          this.$message({
            message: 'Please select at least one modality',
            type: 'error',
          })
          return
        }
        this.formValid = true
        this.$refs['trainSettings'].validateField('featureName')
        this.$refs['trainSettings'].validateField('audioTool')
        this.$refs['trainSettings'].validateField('videoTool')
        this.$refs['trainSettings'].validateField('textTool')

        if (this.formValid) {
          this.icon = 'el-icon-loading'
          var isExist = false
          var Id = 0
          try {
            const { exist, id } = await startExtracting(this.trainSettings)
            isExist = exist
            Id = id
          } catch (error) {
            console.log('error')
            this.icon = 'el-icon-check'
            return
          }
          this.icon = 'el-icon-check'
          if (isExist) {
            this.$message({
              message: 'Feature already exists, the feature id is ' + Id,
              type: 'warning',
            })
          } else {
            this.$message({
              message: 'Feature extraction started, task id: ' + Id,
              type: 'success',
            })
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .featureExtraction-container {
    margin: 0%;
    .settings {
      width: 600px;
      margin: 0% 3%;
    }
    .tips {
      margin: 15px 3%;
      font-size: 14px;
    }
  }
</style>
