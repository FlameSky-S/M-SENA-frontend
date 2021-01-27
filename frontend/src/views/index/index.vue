<template>
  <div class="index-container">
    <el-card class="top" shadow="never">
      <h1 class="top-header">M-SENA System</h1>
      <p class="top-text">
        The M-SENA System is an all-in-one platform for Multimodal Sentiment
        Analysis tasks
      </p>
      <p class="top-phrases">Open source, Easy to use, Free of charge</p>
      <p class="top-buttons">
        <el-button
          type="primary"
          style="font-weight: bold"
          @click="openNewTab('https://github.com/thuiar/M-SENA')"
        >
          <Vicon name="play"></Vicon>
          Get Started
        </el-button>
        <el-button
          plain
          @click="openNewTab('https://github.com/thuiar/M-SENA')"
        >
          <Vicon name="brands/github" scale="1.1" />
          Download
        </el-button>
      </p>
    </el-card>
    <el-row :gutter="20">
      <el-col :xs="11" :sm="10" :md="10" :lg="5" :xl="5" :offset="offset1">
        <el-card
          class="mid"
          shadow="never"
          @click.native="setCarousel('manage')"
        >
          <Vicon name="manage" scale="3"></Vicon>
          <p>Easy Management</p>
        </el-card>
      </el-col>
      <el-col :xs="11" :sm="10" :md="10" :lg="5" :xl="5">
        <el-card
          class="mid"
          shadow="never"
          @click.native="setCarousel('label')"
        >
          <Vicon name="labels" scale="3"></Vicon>
          <p>Auto Labeling</p>
        </el-card>
      </el-col>
      <el-col :xs="11" :sm="10" :md="10" :lg="5" :xl="5" :offset="offset2">
        <el-card
          class="mid"
          shadow="never"
          @click.native="setCarousel('analysis')"
        >
          <Vicon name="analysis" scale="3"></Vicon>
          <p>Visual Analysis</p>
        </el-card>
      </el-col>
      <el-col :xs="11" :sm="10" :md="10" :lg="5" :xl="5">
        <el-card class="mid" shadow="never" @click.native="setCarousel('doc')">
          <Vicon name="docs" scale="3"></Vicon>
          <p>Fully Documented</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="bottom" shadow="never">
        <el-carousel
          ref="carousel"
          :interval="8000"
          :type="card"
          :autoplay="autoplay"
          height="500px"
        >
          <el-carousel-item key="manage" name="manage">
            <div align="center" style="height: 100%">
              <el-row>
                <h3>Easy Management</h3>
                <el-image :src="require('@/assets/test2.gif')"></el-image>
                <p>Manage datasets and models with our uniquely designed UI.</p>
                <p>Import your own data/model and start training!</p>
              </el-row>
            </div>
          </el-carousel-item>
          <el-carousel-item key="label" name="label">
            <div align="center" style="height: 100%">
              <el-row>
                <h3>Auto Labeling</h3>
                <el-image :src="require('@/assets/test2.gif')"></el-image>
                <p>Strugging with data-labeling?</p>
                <p>
                  Try out our auto labeling feature based on active learning
                  algrithms.
                </p>
              </el-row>
            </div>
          </el-carousel-item>
          <el-carousel-item key="analysis" name="analysis">
            <div align="center" style="height: 100%">
              <el-row>
                <h3>Visual Analysis</h3>
                <el-image :src="require('@/assets/test2.gif')"></el-image>
                <p>To help you better understand your model,</p>
                <p>
                  M-SENA provides data visualization as well as feature
                  visualization.
                </p>
              </el-row>
            </div>
          </el-carousel-item>
          <el-carousel-item key="doc" name="doc">
            <div align="center" style="height: 100%">
              <el-row>
                <h3>Fully Documented</h3>
                <el-image :src="require('@/assets/test2.gif')"></el-image>
                <p>Having problems with the system?</p>
                <p>
                  Find solutions in our support documents. Also feel free to
                  submit issues on Github
                </p>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        offset1: 2,
        offset2: 0,
        card: 'card',
        autoplay: true,
        // testImg: '@/assets/poster.jpg',
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    created() {},
    methods: {
      setCarousel(name) {
        this.$refs.carousel.setActiveItem(name)
        // Reset autoplay timer
        this.autoplay = false
        this.$nextTick(() => {
          this.autoplay = true
        })
      },
      openNewTab(url) {
        window.open(url)
      },
      handleResize() {
        let width = document.body.getBoundingClientRect().width + 13
        if (width >= 1920) {
          //xl
          this.offset1 = 2
          this.offset2 = 0
          this.card = 'card'
        } else if (width >= 1200) {
          //lg
          this.offset1 = 2
          this.offset2 = 0
          this.card = 'card'
        } else if (width >= 992) {
          //md
          this.offset1 = 2
          this.offset2 = 2
          this.card = ''
        } else if (width >= 768) {
          //sm
          this.offset1 = 2
          this.offset2 = 2
          this.card = ''
        } else {
          //xs
          this.offset1 = 1
          this.offset2 = 1
          this.card = ''
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;

    .top {
      background-color: $base-menu-background;
      color: $base-menu-color;
      margin-top: 30px;
      border: none;
      padding: 80px 0px;
      .top-header {
        text-align: center;
        font-size: 35px;
      }
      .top-text {
        text-align: center;
        font-size: 20px;
      }
      .top-phrases {
        text-align: center;
        font-size: 18px;
        color: #828386;
      }
      .top-buttons {
        text-align: center;

        .el-button {
          font-size: 16px;
          padding: 12px 16px;
          // line-height: 22px;
        }
      }
    }

    .mid {
      border: none;
      min-height: 120px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      .fa-icon {
        width: auto;
        height: 1em;
      }
    }

    .bottom {
      border: none;
      height: 550px;
    }
  }

  .el-carousel__item {
    .el-image {
      margin: 0% 8%;
      max-width: 600px;
    }
    h3 {
      margin-top: 30px;
      font-size: 20px;
      // color: #475669;
      color: $base-font-color;
    }
    p {
      margin: 1% 8%;
      font-size: 18px;
      color: $base-font-color;
    }
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #dcdfe6;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #e3e6ec;
  }
</style>
