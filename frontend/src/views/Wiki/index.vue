<template>
  <div class="index-container">
    <center style="font-size: 38px; line-height: 60px; text-align: center">
      M-SENA: All-in-One Platform for Multimodal Sentiment Analysis
    </center>
    <center style="font-size: 20px; line-height: 30px">
      Developed by
      <a href="https://thuiar.github.io" target="_blank">THUIAR</a>
      Team
      <a href="https://github.com/iyuge2" target="_blank">@iyuge2</a>
      ,
      <a href="https://github.com/FlameSky-S" target="_blank">@FlameSky-S</a>
      ,
      <a href="https://github.com/Columbine21" target="_blank">@Columbine21</a>
      , Directed by
      <a href="https://thuiar.github.io/author/hua-xu/" target="_blank">
        Professor Xu Hua
      </a>
    </center>
    <el-row style="margin: 2% 2%">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="functionality">
        <h2 class="header2">System Functionalities</h2>
        <el-carousel
          indicator-position="outside"
          :autoplay="false"
          height="400px"
        >
          <el-carousel-item>
            <h3 class="header3">
              <em>Section A</em>
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
              <em>Section B</em>
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
              <em>Section C</em>
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
          src="@/assets/structure.png"
          width="92%"
          style="margin-left: 4%"
        />
      </el-col>
    </el-row>
    <el-row style="margin: 2% 2%">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="12">
        <div class="news">
          <h2 class="header2">Updates</h2>
          <p>
            [01/15/2021]
            <el-tag type="primary">NEW VERSION</el-tag>
            : v0.9.0: Deleted unnecessary dependencies.
          </p>
          <p>
            [01/08/2021]
            <el-tag type="success">NEW FEATURE</el-tag>
            : Modalities Fusion Interpretation
          </p>
          <p>
            [01/04/2021]
            <el-tag type="danger">BUG FIX</el-tag>
            : Fixed an issue where time is not displayed correctly.
          </p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="12">
        <div class="contributor">
          <h2 class="header2">Collaboration</h2>
          <p style="font-size: 16px; line-height: 30px">
            For commercial collaborations (model customization, data
            customization, end-to-end function development, etc.), please
            contact THUIAR Team at
            <a href="mailto://xuhua@tsinghua.edu.cn">xuhua@tsinghua.edu.cn</a>
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
      return {}
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
    // background-image: url('../../assets/border_h2.gif');
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
      margin-left: 5%;
      font-size: 20px;
      line-height: 1em;
    }
    .description {
      margin: 3% 10%;
      font-size: 16px;
      line-height: 1.6em;
    }
  }
  // .index-container {
  //   padding: 0 !important;
  //   margin: 0 !important;
  //   background: #f5f7f8 !important;
  // }
</style>
