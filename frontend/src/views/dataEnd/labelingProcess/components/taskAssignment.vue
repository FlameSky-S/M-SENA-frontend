<template>
  <el-dialog
    :title="dialogSettings.title"
    :visible.sync="dialogSettings.dialogFormVisible"
    width="70%"
    @close="handleClose"
  >
    <div class="task-assignment-container">
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="Username"
          min-width="160px"
          show-overflow-tooltip
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="Already Assigned"
          show-overflow-tooltip
          min-width="160px"
          prop="assigned"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="handleAssign">Assign</el-button>
      <el-button @click="handleClose">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { assignTasks, getUsersForAssignment } from '@/api/labeling'
  export default {
    name: 'TaskAssignment',
    data() {
      return {
        loading: true,
        dialogSettings: {
          datasetName: '',
          title: '',
          dialogFormVisible: false,
          dialogWidth: '50%',
        },
        userList: [],
        checkedUsers: [],
        queryUsers: [],
      }
    },
    computed: {},
    beforeMount() {
      // window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      // window.removeEventListener('resize', this.handleResize)
    },
    created() {
      this.dialogSettings.datasetName = this.$route.query.dataset
      this.dialogSettings.title =
        'Task Assignment - ' + this.dialogSettings.datasetName
    },
    methods: {
      // handleResize() {
      //   if (document.body.getBoundingClientRect().width <= 1200) {
      //     this.dialogSettings.dialogWidth = '500px'
      //   } else this.dialogSettings.dialogWidth = '50%'
      // },
      handleSelectionChange(value) {
        this.checkedUsers = value
        // console.log(this.checkedUsers)
      },
      async handleAssign() {
        this.queryUsers = this.checkedUsers.map(function (item, index) {
          return item.username
        })
        // console.log(this.queryUsers)
        let { msg } = await assignTasks({
          users: this.queryUsers,
          dataset_name: this.dialogSettings.datasetName,
          token: window.sessionStorage.getItem('token'),
        })
        if (msg === 'success') {
          this.$message({
            message: 'Task Assigned Successfully',
            type: 'success',
          })
        } else {
          this.$message({
            message: 'Task Assignment Failed',
            type: 'error',
          })
        }
        this.handleClose()
      },
      async show() {
        this.dialogSettings.dialogFormVisible = true

        // label samples
        this.loading = true
        let { data } = await getUsersForAssignment({
          token: window.sessionStorage.getItem('token'),
          datasetName: this.dialogSettings.datasetName,
        })
        this.userList = data
        this.loading = false
      },
      handleClose() {
        this.dialogSettings.dialogFormVisible = false
        this.$emit('refresh')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .task-assignment-container {
    margin-left: 2%;
    margin-bottom: 10px;
  }
  .el-checkbox-user {
    width: 100px;
    height: 25px;
  }
</style>
