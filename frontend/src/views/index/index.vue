<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>M-SENA</el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="16"
        :lg="16"
        :xl="16"
        style="margin-top: 3%"
      >
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <div style="text-align: center">
            <vab-colorful-icon style="font-size: 140px" icon-class="vab" />
            <h1 style="font-size: 30px">vue-admin-beautiful</h1>
          </div>
          <div v-for="(item, index) in noticeList" :key="index">
            <el-alert
              v-if="index !== 0"
              :title="item.title"
              :type="item.type"
              :closable="item.closable"
            ></el-alert>
            <br />
          </div>
          <el-alert :closable="false" :title="userAgent" type="info"></el-alert>
          <br />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="margin-top: 3%">
        <el-card shadow="never">
          <div slot="header">
            <span>更新日志</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="16"
        :lg="16"
        :xl="16"
        style="margin-top: 3%"
      >
        <el-card shadow="never">
          <div slot="header">
            <span>关于开发者</span>
          </div>
          <img
            src="https://github-readme-stats.vercel.app/api?username=chuzhixin"
            alt=""
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>依赖信息</span>
            <div style="float: right">部署时间:{{ updateTime }}</div>
          </div>
          <table class="table">
            <tr>
              <td>@vue/cli版本</td>
              <td>{{ devDependencies['@vue/cli-service'] }}</td>
              <td>vue版本</td>
              <td>{{ dependencies['vue'] }}</td>
            </tr>
            <tr>
              <td>vuex版本</td>
              <td>{{ dependencies['vuex'] }}</td>
              <td>vue-router版本</td>
              <td>{{ dependencies['vue-router'] }}</td>
            </tr>
            <tr>
              <td>element-ui版本</td>
              <td>{{ dependencies['element-ui'] }}</td>
              <td>axios版本</td>
              <td>{{ dependencies['axios'] }}</td>
            </tr>
            <tr>
              <td>eslint版本</td>
              <td>{{ devDependencies['eslint'] }}</td>
              <td>prettier版本</td>
              <td>{{ devDependencies['prettier'] }}</td>
            </tr>
            <tr>
              <td>sass版本</td>
              <td>{{ devDependencies['sass'] }}</td>
              <td>mockjs版本</td>
              <td>{{ dependencies['mockjs'] }}</td>
            </tr>
            <tr>
              <td>zx-layouts版本</td>
              <td>{{ dependencies['zx-layouts'] }}</td>
              <td>lodash版本</td>
              <td>{{ dependencies['lodash'] }}</td>
            </tr>
          </table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { dependencies, devDependencies } from '../../../package.json'
  export default {
    name: 'Index',
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        fullHeight: document.documentElement.clientHeight,
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        //更新日志
        reverse: true,
        activities: [
          {
            content:
              '在github上获得了第一个star，感恩一位名叫Bequiet2014的github用户',
            timestamp: '2020-03-23',
          },
          {
            content: '增加更换主题功能',
            timestamp: '2020-04-10',
          },
          {
            content: '大幅精简代码',
            timestamp: '2020-04-14',
          },
        ],
        noticeList: [
          {
            title:
              '温馨提示：集成版虽功能丰富，但冗余依赖过多，建议开发时使用基础版进行开发。',
            closable: false,
            type: 'success',
          },
          {
            title:
              '作者寄语：感谢Star，感恩相遇，愿世间美好与我们环环相扣，加油！',
            closable: false,
            type: 'warning',
          },
          {
            title:
              '随笔：我一直在寻找开源的真谛，我一直再想什么是开源，我一开始觉得免费就是开源，好像又不是。我理解的开源是：你也开源，我也开源，大家一起贡献，相互帮助。',
            closable: false,
            type: 'success',
          },
        ],
        //其他信息
        userAgent: navigator.userAgent,
      }
    },
    created() {
      // console.log(this.fullWidth)
      // console.log(this.fullHeight)
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    .card {
      min-height: 400px;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
</style>
