<template>
  <div class="user-management-container">
    <h1 style="margin-left: 2%">User Management</h1>
    <p class="tips"></p>
    <el-row class="buttons">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form inline>
          <!-- <el-form-item label="Username:">
            <el-input v-model="userInfo.name" placeholder="Username"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="Password:">
            <el-input
              v-model="addUser.pass"
              placeholder="Password"
              show-password
            ></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="showDialog('add')"
            >
              Add User
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-table
        ref="userTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading..."
        stripe
      >
        <el-table-column
          prop="user_id"
          label="User ID"
          align="center"
          min-width="80px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="user_name"
          label="Username"
          align="center"
          min-width="200px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="is_admin"
          label="Is Admin"
          align="center"
          min-width="100px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag :type="tagMapper(scope.row.is_admin)" disable-transitions>
              {{ scope.row.is_admin }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          align="center"
          min-width="200px"
        >
          <template #default="{ row }">
            <el-button type="text" @click="showDialog('edit', row)">
              Change Password
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form
        ref="userInfo"
        :model="userInfo"
        label-position="top"
        :rules="rules"
        style="margin-bottom: 30px"
        status-icon
      >
        <el-form-item v-show="dialogShowUsername" label="Username" prop="name">
          <el-input v-model="userInfo.name" placeholder="Username:"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="pass1">
          <el-input
            v-model="userInfo.pass1"
            placeholder="New Password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password:" prop="pass2">
          <el-input
            v-model="userInfo.pass2"
            placeholder="Confirm Password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="Is Admin:" prop="isAdmin">
          <el-switch v-model="userInfo.isAdmin"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          :loading="dialogLoading"
          type="primary"
          icon="el-icon-check"
          @click="handleConfirmClicked"
        >
          Confirm
        </el-button>
        <el-button icon="el-icon-reset" @click="resetForm">Reset</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addUser, getUserList } from '@/api/user'
  import * as crypto from 'crypto'

  export default {
    name: 'UserManagement',
    data() {
      return {
        list: [],
        listLoading: true,
        userInfo: {
          name: '',
          pass1: '',
          pass2: '',
          isAdmin: false,
        },
        queryForm: {
          username: null,
          password: null,
          isAdmin: null,
        },
        dialogTitle: 'Add User',
        dialogShowUsername: true,
        dialogVisible: false,
        dialogLoading: false,
        rules: {
          name: [
            {
              validator: this.validateName,
              trigger: 'blur',
            },
          ],
          pass1: [
            {
              validator: this.validatePass,
              trigger: 'blur',
            },
          ],
          pass2: [
            {
              validator: this.validatePass2,
              trigger: 'blur',
            },
          ],
        },
      }
    },
    computed: {},
    created() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        this.listLoading = true
        let { data } = await getUserList({
          token: window.sessionStorage.getItem('token'),
        })
        this.list = data
        this.listLoading = false
      },
      tagMapper(b) {
        if (b) {
          return 'success'
        } else {
          return 'warning'
        }
      },
      validateName(rule, value, callback) {
        var usernameRegex = /^[a-zA-Z0-9]+$/
        if (value === '') {
          callback(new Error('Please enter username'))
        } else if (value.match(usernameRegex)) {
          callback()
        } else {
          callback(new Error('Inavlid username'))
        }
      },
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please enter password'))
        } else {
          if (this.userInfo.pass2 !== '') {
            this.$refs.userInfo.validateField('pass2')
          }
          callback()
        }
      },
      validatePass2(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please enter password again'))
        } else if (value !== this.userInfo.pass1) {
          callback(new Error('Inconsistent password'))
        } else {
          callback()
        }
      },
      resetForm() {
        this.$refs['userInfo'].resetFields()
      },
      showDialog(mode, row) {
        if (mode === 'add') {
          this.dialogTitle = 'Add User'
          this.dialogShowUsername = true
          this.dialogVisible = true
          if (this.$refs['userInfo']) {
            this.resetForm()
          }
        } else {
          this.dialogTitle = 'Change Password'
          this.dialogShowUsername = false
          this.dialogVisible = true
          if (this.$refs['userInfo']) {
            this.resetForm()
          }
          this.userInfo.name = row.user_name
        }
      },
      async handleConfirmClicked() {
        this.$refs.userInfo.validate(async (valid) => {
          this.dialogLoading = true
          if (valid) {
            var shasum = crypto.createHash('sha1')
            this.queryForm.username = this.userInfo.name
            this.queryForm.password = shasum
              .update(this.userInfo.pass1)
              .digest('hex')
            this.queryForm.isAdmin = this.userInfo.isAdmin
            this.userInfo.pass1 = ''
            this.userInfo.pass2 = ''

            let { msg } = await addUser({
              token: window.sessionStorage.getItem('token'),
              username: this.queryForm.username,
              password: this.queryForm.password,
              isAdmin: this.queryForm.isAdmin,
            })
            if (msg === 'success') {
              this.$message({
                message: 'User Updated',
                type: 'success',
              })
              this.dialogVisible = false
              this.resetForm()
              this.fetchUsers()
            }
          } else {
            return false
          }
          this.dialogLoading = false
        })
      },
      async handleAddUser() {},
    },
  }
</script>

<style lang="scss" scoped>
  .user-management-container {
    margin: 0%;
    .buttons {
      margin: 0% 5%;
    }
    .table {
      margin: 0% 5%;
    }
  }
</style>
