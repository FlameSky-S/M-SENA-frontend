<template>
  <span>
    <vab-icon
      title="Tasks"
      :icon="['fas', 'calendar-check']"
      @click="handleOpenTaskBar"
    />
    <el-drawer
      title="Task List"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="550px"
    >
      <!-- <el-scrollbar style="height: 94vh; overflow: hidden"> -->
      <div class="el-drawer__body">
        <p>
          <span>Total: {{ totalNum }}</span>
          <el-button type="text" @click="deleteAllTask">
            <i class="el-icon-delete" style="color: red"></i>
          </el-button>
        </p>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item
            :title="runTitle"
            name="run"
            :disabled="runDisabled"
          >
            <div>
              <el-table :data="runList">
                <el-table-column
                  prop="task_id"
                  label="id"
                  align="center"
                  min-width="10"
                ></el-table-column>
                <el-table-column
                  prop="task_type"
                  label="type"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="model_name"
                  label="model"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column
                  prop="dataset_name"
                  label="dataset"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  label="time used"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column align="center" min-width="10">
                  <template slot-scope="scope">
                    <el-button type="text" @click="terminateTask(scope.row)">
                      <i class="el-icon-switch-button" style="color: red"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="errTitle"
            name="err"
            :disabled="errDisabled"
          >
            <div>
              <el-table :data="errList">
                <el-table-column
                  prop="task_id"
                  label="id"
                  align="center"
                  min-width="10"
                ></el-table-column>
                <el-table-column
                  prop="task_type"
                  label="type"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="model_name"
                  label="model"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column
                  prop="dataset_name"
                  label="dataset"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  label="time used"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column align="center" min-width="10">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteTask(scope.row)">
                      <i class="el-icon-delete" style="color: red"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="termTitle"
            name="term"
            :disabled="termDisabled"
          >
            <div>
              <el-table :data="termList">
                <el-table-column
                  prop="task_id"
                  label="id"
                  align="center"
                  min-width="10"
                ></el-table-column>
                <el-table-column
                  prop="task_type"
                  label="type"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="model_name"
                  label="model"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column
                  prop="dataset_name"
                  label="dataset"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  label="time used"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column align="center" min-width="10">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteTask(scope.row)">
                      <i class="el-icon-delete" style="color: red"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="finTitle"
            name="fin"
            :disabled="finDisabled"
          >
            <div>
              <el-table :data="finList">
                <el-table-column
                  prop="task_id"
                  label="id"
                  align="center"
                  min-width="10"
                ></el-table-column>
                <el-table-column
                  prop="task_type"
                  label="type"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="model_name"
                  label="model"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column
                  prop="dataset_name"
                  label="dataset"
                  align="center"
                  min-width="25"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  label="time used"
                  align="center"
                  min-width="20"
                ></el-table-column>
                <el-table-column align="center" min-width="10">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteTask(scope.row)">
                      <i class="el-icon-delete" style="color: red"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- </el-scrollbar> -->
    </el-drawer>
  </span>
</template>

<script>
  // import variables from '@/styles/variables.scss'
  // import { mapActions, mapGetters } from 'vuex'
  // import { layout as defaultLayout } from '@/config/settings'
  import { getTaskList, delTask, stopTask, delAllTask } from '@/api/task'
  export default {
    name: 'ThemeBar',
    data() {
      return {
        drawerVisible: false,
        activeNames: [],
        runList: [],
        errList: [],
        termList: [],
        finList: [],
        totalNum: 0,
        runningNum: 0,
        errorNum: 0,
        terminatedNum: 0,
        finishedNum: 0,
      }
    },
    computed: {
      runTitle: function () {
        let title = 'Running (' + this.runningNum + ')'
        return title
      },
      errTitle: function () {
        let title = 'Error (' + this.errorNum + ')'
        return title
      },
      termTitle: function () {
        let title = 'Terminated (' + this.terminatedNum + ')'
        return title
      },
      finTitle: function () {
        let title = 'Finished (' + this.finishedNum + ')'
        return title
      },
      runDisabled: function () {
        let disabled = false
        if (this.runningNum == 0) disabled = true
        return disabled
      },
      errDisabled: function () {
        let disabled = false
        if (this.errorNum == 0) disabled = true
        return disabled
      },
      termDisabled: function () {
        let disabled = false
        if (this.terminatedNum == 0) disabled = true
        return disabled
      },
      finDisabled: function () {
        let disabled = false
        if (this.finishedNum == 0) disabled = true
        return disabled
      },
    },
    watch: {
      drawerVisible: function (newValue) {
        if (newValue == true) this.fetchTaskList()
      },
    },
    created() {
      this.fetchTaskList()
      // this.$baseEventBus.$on('theme', () => {
      //   this.handleOpenTaskBar()
      // })
    },
    methods: {
      handleOpenTaskBar() {
        this.drawerVisible = true
      },
      async fetchTaskList() {
        let { data } = await getTaskList()
        this.runList = data.runList
        this.errList = data.errList
        this.termList = data.termList
        this.finList = data.finList
        this.totalNum = data.totalNum
        this.runningNum = data.runList.length
        this.errorNum = data.errList.length
        this.terminatedNum = data.termList.length
        this.finishedNum = data.finList.length
      },
      async deleteTask(row) {
        let query = { task_id: row.task_id }
        // console.log(row)
        let { msg } = await delTask(query)
        if (msg == 'success')
          this.$message({
            message: 'Task ' + row.task_id + ' deleted',
            type: 'success',
          })
        else
          this.$message({
            message: 'Deletion failed',
            type: 'error',
          })
        this.fetchTaskList()
      },
      async terminateTask(row) {
        let query = { task_id: row.task_id }
        let { msg } = await stopTask(query)
        if (msg == 'success')
          this.$message({
            message: 'Task ' + row.task_id + ' stopped',
            type: 'success',
          })
        else
          this.$message({
            message: msg,
            type: 'error',
          })
        this.fetchTaskList()
      },
      getTimeDelta(time1, time2 = '') {
        let result = 0
        let unit = 's'
        if (time2 != '') {
          let now = new Date()
          let start = Date.parse(time1)
          result = (now - start) / 1000
          if (result > 60) {
            result = result / 60
            unit = 'min'
            if (result > 60) {
              result = result / 60
              unit = 'h'
            }
          }
          return result
        }
      },
      async deleteAllTask() {
        let { msg } = await delAllTask()
        this.fetchTaskList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin right-bar {
    position: fixed;
    right: 0;
    z-index: $base-z-index;
    width: 60px;
    min-height: 60px;
    text-align: center;
    cursor: pointer;
    background: $base-color-blue;
    border-radius: $base-border-radius;

    > div {
      padding-top: 10px;
      border-bottom: 0 !important;

      &:hover {
        opacity: 0.9;
      }

      & + div {
        border-top: 1px solid $base-color-white;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: $base-font-size-small;
        line-height: 30px;
        color: $base-color-white;
      }
    }
  }

  .theme-bar-setting {
    @include right-bar;

    top: calc((100vh - 110px) / 2);

    ::v-deep {
      svg:not(:root).svg-inline--fa {
        display: block;
        margin-right: auto;
        margin-left: auto;
        color: $base-color-white;
      }

      .svg-icon {
        display: block;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        color: $base-color-white;
        fill: $base-color-white;
      }
    }
  }

  .el-drawer__body {
    padding: 20px;
  }
</style>
<style lang="scss">
  .el-drawer__wrapper {
    outline: none !important;

    * {
      outline: none !important;
    }
  }

  .vab-color-picker {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
</style>
