<template>
  <span>
    <div class="task-btn" @click="handleOpenTaskBar">
      <i class="el-icon-s-claim" />
      <span class="hidden-xs-only">Task List</span>
    </div>
    <el-drawer
      title="Task List"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="550px"
    >
      <div slot="title" class="title">
        <i class="el-icon-s-claim" />
        <span>Task List</span>
      </div>
      <!-- <el-scrollbar style="height: 94vh "> -->
      <p class="total">
        <span>Total: {{ totalNum }}</span>
        <el-button type="text" style="font-size: 18px" @click="deleteAllTask">
          <i class="el-icon-delete" style="color: red"></i>
        </el-button>
      </p>
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :title="runTitle" name="run" :disabled="runDisabled">
          <div>
            <el-table :data="runList">
              <el-table-column
                prop="task_id"
                label="ID"
                align="center"
                width="45"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="task_type"
                label="Type"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="model_name"
                label="Model"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="dataset_name"
                label="Dataset"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="start_time"
                label="Time"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column align="center" width="40">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteTask(scope.row)">
                    <i class="el-icon-delete" style="color: red"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="errTitle" name="err" :disabled="errDisabled">
          <div>
            <el-table :data="errList">
              <el-table-column
                prop="task_id"
                label="ID"
                align="center"
                width="45"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="task_type"
                label="Type"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="model_name"
                label="Model"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="dataset_name"
                label="Dataset"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="start_time"
                label="Time"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column align="center" width="40">
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
                label="ID"
                align="center"
                width="45"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="task_type"
                label="Type"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="model_name"
                label="Model"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="dataset_name"
                label="Dataset"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="start_time"
                label="Time"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column align="center" width="40">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteTask(scope.row)">
                    <i class="el-icon-delete" style="color: red"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="finTitle" name="fin" :disabled="finDisabled">
          <div>
            <el-table :data="finList">
              <el-table-column
                prop="task_id"
                label="ID"
                align="center"
                width="45"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="task_type"
                label="Type"
                align="center"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="model_name"
                label="Model"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="dataset_name"
                label="Dataset"
                align="center"
                min-width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="start_time"
                label="Time"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column align="center" width="40">
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

      <!-- </el-scrollbar> -->
    </el-drawer>
  </span>
</template>

<script>
  // import variables from '@/styles/variables.scss'
  // import { mapActions, mapGetters } from 'vuex'
  // import { layout as defaultLayout } from '@/config/settings'
  import { getTaskList, delTask, stopTask, delAllTask } from '@/api/task'
  import * as dayjs from 'dayjs'
  export default {
    name: 'TaskBar',
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
        this.runList.forEach((item) => {
          item.start_time = dayjs(item.start_time).format('YYYY-MM-DD HH:mm:ss')
        })
        this.errList.forEach((item) => {
          item.start_time = dayjs(item.start_time).format('YYYY-MM-DD HH:mm:ss')
        })
        this.termList.forEach((item) => {
          item.start_time = dayjs(item.start_time).format('YYYY-MM-DD HH:mm:ss')
        })
        this.finList.forEach((item) => {
          item.start_time = dayjs(item.start_time).format('YYYY-MM-DD HH:mm:ss')
        })
      },
      async deleteTask(row) {
        let query = { task_id: row.task_id }
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
        if (msg == 'success')
          this.$message({
            message: 'All tasks deleted',
            type: 'success',
          })
        else
          this.$message({
            message: 'Deletion failed',
            type: 'error',
          })
        this.fetchTaskList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .total {
    font-weight: bold;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .task-btn {
    font-size: 16px;
    margin-right: 15px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    i {
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .title {
    i {
      margin-right: 5px;
    }
  }
</style>
