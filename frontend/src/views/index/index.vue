<template>
  <div class="index-container">
    <center style="font-size: 38px; line-height: 60px; text-align: center">
      M-SENA: All-in-One Platform for Multimodal Sentiment Analysis
    </center>
    <center style="font-size: 20px; line-height: 30px">
      Developed by
      <a ref="thuiar.github.io">THUIAR</a>
      Team
      <a ref="">@iyuge</a>
      ,
      <a ref="">@FlameSky-S</a>
      ,
      <a ref="">@Columbine21</a>
      , Directed by
      <a ref="">Professor Xu</a>
    </center>
    <el-row style="margin: 2% 2%">
      <h2 class="header2">System Functionality</h2>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="functionality">
        <el-carousel
          indicator-position="outside"
          :autoplay="false"
          height="400px"
        >
          <el-carousel-item>
            <h3 class="header3">
              <em>Section one</em>
              : Data-End
            </h3>
            <div>
              <div>
                <a class="function_link" @click="handleClick">
                  Dataset Management
                </a>
              </div>
              <p class="description">
                This section contains
                <b>introduction and statistics about well-known datasets</b>
                as well as
                <b>raw instance (video) demonstration.</b>
              </p>
              <div style="margin: 3% 0%">
                <a class="function_link" @click="handleClick">
                  Dataset Annotation
                </a>
              </div>
              <p class="description">
                This section includes
                <b>data annotation strategy</b>
                based on both active learning and human labeling.
              </p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h3 class="header3">
              <em>Section two</em>
              : Model-End
            </h3>
            <div>
              <div>
                <a class="function_link" @click="handleClick">
                  Model Management & Training
                </a>
              </div>
              <p class="description">
                This section provides a rich set of tools and recipes to test
                existing sentiment analysis frameworks of different types,
                enabling researchers to compare widely different approaches
                under the same condition.
              </p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <h3 class="header3">
              <em>Section three</em>
              : Analysis-End
            </h3>
            <div>
              <div>
                <a class="function_link" @click="handleClick">
                  Result Analysis
                </a>
              </div>
              <p class="description">
                This section consists
                <b>detailed model training results</b>
              </p>
              <div style="margin: 3% 0%">
                <a class="function_link" @click="handleClick">Batch Test</a>
              </div>
              <p class="description">
                This section provides
                <b>
                  fair comparison of the results of each model in the same
                  experimental environment.
                </b>
              </p>
              <div>
                <a class="function_link" @click="handleClick">
                  Real Time Presentation
                </a>
              </div>
              <p class="description">
                This section gives us
                <b>an intuitive end to end evaluation means</b>
                to assess existing model.
              </p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <img
          loading="lazy"
          src="@/assets/image.png"
          width="92%"
          style="margin-left: 4%"
        />
      </el-col>
    </el-row>
    <el-row style="margin: 2% 2%">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="12">
        <div class="news">
          <h2 class="header2">News</h2>
          <p>[mm/dd/yyyy] TEMPLATE: New Features Completed for M-SENA</p>
          <p>
            [12/31/2020]
            <span style="color: #ff0000">BREAKTHROUGH</span>
            : M-SENA SYSTEM Verison one FINISHED.
          </p>
          <p>
            [01/08/2021]
            <span style="color: #00ff00">NEW FEATURES</span>
            : Modalities Fusion Interpretation IS FINISHED.
          </p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="12">
        <div class="contributor">
          <h2 class="header2">Contributors</h2>
          <p style="font-size: 20px; line-height: 30px">
            Developed by
            <a ref="thuiar.github.io">THUIAR</a>
            Team
            <a ref="">@iyuge</a>
            ,
            <a ref="">@FlameSky-S</a>
            ,
            <a ref="">@Columbine21</a>
          </p>
          <p style="font-size: 20px; line-height: 30px">
            Directed by
            <a ref="">Professor Xu</a>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
      }
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .carousel-title {
    margin-left: 5%;
  }
  .news p {
    margin: 0 0 20px 0;
    font-size: 16px;
  }
  .news h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
  }
  .contributor h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
  }
  .header2 {
    font-size: 24px;
    line-height: 1.5em;
    letter-spacing: 1px;
    background-image: url('../../assets/border_h2.gif');
    background-repeat: no-repeat;
    background-position: bottom left;
    background-size: 250px;
  }
  .functionality {
    .header3 {
      font-size: 20px;
      line-height: 1em;
      letter-spacing: 0.5px;
    }
    .function_link {
      margin-left: 10%;
      font-size: 20px;
      line-height: 1em;
    }
    .description {
      margin: 3% 15%;
      font-size: 16px;
      line-height: 1.6em;
    }
  }

  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;
  }
</style>
