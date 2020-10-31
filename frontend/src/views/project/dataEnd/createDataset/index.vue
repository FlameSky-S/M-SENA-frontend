<template>
  <div class="createDataset-container">
    <el-steps :active="currentStep" simple class="step-bar">
      <el-step title="Basic Info" icon="el-icon-edit"></el-step>
      <el-step title="Upload" icon="el-icon-upload"></el-step>
    </el-steps>
    <el-card v-if="showBasicInfoForm" class="basic-info-card card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px; font-weight: 700">
          Dataset Basic Info
        </span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="handleNext"
        >
          Next
        </el-button>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="basicInfo" label-width="20%">
            <el-form-item label="Dataset Name">
              <el-input
                v-model="basicInfo.datasetName"
                class="text-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="Total Count">
              <el-input
                v-model="basicInfo.totalCount"
                class="text-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="modalities">
              <el-radio-group v-model="basicInfo.modalities" class="text-input">
                <el-radio label="Text, Audio, Visual"></el-radio>
                <el-radio label="Text only"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Label Type">
              <el-radio-group v-model="basicInfo.labelType" class="text-input">
                <el-radio label="Classification" border></el-radio>
                <el-radio label="Regression" border></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Language">
              <el-radio-group v-model="basicInfo.language" class="text-input">
                <el-radio label="English"></el-radio>
                <el-radio label="Chinese"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Unimodal Label">
              <el-radio-group
                v-model="basicInfo.unimodalLabel"
                class="text-input"
              >
                <el-radio label="Yes"></el-radio>
                <el-radio label="No"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="chart-upload">
            <h2 class="header">Chart</h2>
            <el-upload
              class="chart"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Drag the file here, or
                <em>click</em>
                upload
              </div>
              <div slot="tip" class="el-upload__tip">
                Charts for dataset. Support jpg/ png files (No more than 500kb).
              </div>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <div class="description-input">
        <h2 class="header">Description</h2>
        <el-input
          v-model="basicInfo.description"
          class="input"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </el-card>
    <el-card v-if="showUploadForm" class="upload-card card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px; font-weight: 700">Upload Dataset</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="handleNext"
        >
          Next
        </el-button>
        <el-button
          style="float: right; padding: 3px 3px"
          type="text"
          @click="handleBack"
        >
          Back
        </el-button>
      </div>
      <div class="video-upload-container">
        <el-upload
          class="video-upload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drag the file here, or
            <em>click</em>
            upload
          </div>
          <div slot="tip" class="el-upload__tip">
            Charts for dataset. Support jpg/ png files (No more than 500kb).
          </div>
        </el-upload>
      </div>
      <div class="translate-verify">
        <h2 class="header">Translates</h2>
        <el-input
          v-model="basicInfo.description"
          class="input"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'CreateDataset',
    components: {},
    data() {
      return {
        currentStep: 1,
        basicInfo: {
          datasetName: null,
          labeledCount: null,
          totalCount: null,
          modalities: null,
          labelType: null,
          language: null,
          unimodalLabel: null,
          description: null,
        },
        basicInfoRules: {}, //TODO:
      }
    },
    computed: {
      showBasicInfoForm() {
        return this.currentStep == 1
      },
      showUploadForm() {
        return this.currentStep == 2
      },
    },
    created() {},
    mounted() {},
    methods: {
      handleNext() {
        this.currentStep += 1
      },
      handleBack() {
        this.currentStep -= 1
      },
    },
  }
</script>
<style lang="scss" scoped>
  .text-input {
    width: 90%;
    margin-left: 3%;
  }
  .createDataset-container {
    .step-bar {
      margin: 0 3%;
    }
    .card {
      margin: 3%;
    }
    .basic-info-card {
      .chart-upload {
        display: inline;
        align-items: center;
        justify-content: center;
        .header {
          margin-left: 10%;
          margin-block-start: 0;
        }
        .chart {
          .el-upload-dragger {
            width: 90%;
          }
          margin-right: 5%;
          margin-left: 5%;
        }
      }
      .description-input {
        display: inline;
        align-items: center;
        justify-content: center;
        .header {
          margin-left: 4%;
        }
        .input {
          width: 80%;
          // margin-right: 20%;
          margin-left: 10%;
        }
      }
    }
    .upload-card {
      .video-upload-container {
        // display: inline;
        align-items: center;
        justify-content: center;
        margin: 0 25%;
        .video-upload >>> .el-upload {
          width: 100%;
        }
      }
    }
  }
</style>
