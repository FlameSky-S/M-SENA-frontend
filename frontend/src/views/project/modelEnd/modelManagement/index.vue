<template>
  <div class="modelManagement-container">
    <h1 style="margin-left: 2%">Model Management</h1>
    <div class="tips">
      <p></p>
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="model-table">
          <vab-query-form>
            <!-- <vab-query-form-left-panel> -->
            <el-form ref="form" :model="queryForm" :inline="true">
              <el-form-item>
                <el-button
                  icon="el-icon-refresh-left"
                  type="primary"
                  @click="scanModel"
                >
                  Rescan
                </el-button>
              </el-form-item>
            </el-form>
            <!-- </vab-query-form-left-panel> -->
          </vab-query-form>

          <el-table
            v-loading="modelLoading"
            :data="modelList"
            element-loading-text="Loading Model Info..."
            stripe
          >
            <el-table-column
              type="index"
              align="center"
              min-width="50"
            ></el-table-column>
            <el-table-column
              label="Model Name"
              prop="model_name"
              align="center"
              min-width="120"
            ></el-table-column>
            <el-table-column
              label="Related Paper"
              align="center"
              min-width="250"
            >
              <template slot-scope="scope">
                <a
                  :href="scope.row.paper_url"
                  class="paper-title"
                  target="_blank"
                >
                  {{ scope.row.paper_name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label="Description"
              prop="description"
              align="center"
              min-width="250"
            ></el-table-column>
            <el-table-column label="Operations" align="center" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="viewResults(scope.row)">
                  Results
                </el-button>
                <el-button type="text" @click="trainModel(scope.row)">
                  Train
                </el-button>
                <el-button type="text" @click="delModel(scope.row)">
                  Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :background="true"
            :current-page="queryForm.pageNo"
            :page-size="queryForm.pageSize"
            :hide-on-single-page="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getModelList, delModel, scanModel } from '@/api/modelEnd'
  export default {
    name: 'ModelManagement',
    components: {},
    data() {
      return {
        modelList: [],
        modelLoading: true,
        total: 0,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    computed: {},
    watch: {},
    created() {
      this.fetchModelList()
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      window.onresize = () => {
        let that = this
        that.screenWidth = document.body.clientWidth
        // console.log(that.screenWidth)
      }
    },
    methods: {
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchModelList()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchModelList()
      },
      async fetchModelList() {
        this.modelLoading = true
        let { modelList, totalCount } = await getModelList(this.queryForm)
        // let testForm = 'pageNo=1&pageSize=10'
        // let { modelList, totalCount } = await getModelList(this.testForm)
        // console.log(modelList)
        this.modelList = modelList
        this.total = totalCount
        this.modelLoading = false
      },
      async scanModel() {
        let { msg } = await scanModel()
        if (msg == 'success') {
          this.$message({
            message: 'Model dir rescanned',
            type: 'success',
          })
          this.fetchModelList()
        }
      },
      viewResults(row) {
        this.$router.push({
          path: '/model/modelResults',
          query: { model: row.model_name },
        })
      },
      trainModel(row) {
        this.$router.push({
          path: '/model/modelTraining',
          query: { model: row.model_name },
        })
      },
      // editModel(row) {},
      delModel(row) {
        const h = this.$createElement
        // console.log(row)
        let msg = []
        msg.push(
          h('p', { style: 'text-align: center' }, [
            h('span', null, 'Deleting Model '),
            h(
              'span',
              { style: 'color: teal; font-weight: 700' },
              row.model_name
            ),
          ])
        )
        msg.push(h('p', null, 'Are you sure?'))
        this.$msgbox({
          title: 'Warning',
          message: h('div', null, msg),
          confirmButtonText: 'DELETE',
          showCancelButton: true,
          type: 'warning',
          center: true,
          confirmButtonClass: 'el-button--danger',
        })
          .then(async () => {
            let { msg } = await delModel({ model: row.model_name })
            if (msg == 'success') {
              this.$message({
                message: 'Successfully Deleted Model',
                type: 'success',
              })
              this.fetchModelList()
            } else {
              this.$message({
                message: msg,
                type: 'error',
              })
            }
          })
          .catch(() => {
            // cancel button action
          })
      },
      searchModel() {
        this.queryForm.pageNo = 1
        this.fetchModelList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .modelManagement-container {
    margin: 0%;
    .model-table {
      margin: 0% 5%;
    }
  }
  .paper-title {
    text-decoration: none;
    color: #606266;
  }
  .paper-title:hover {
    color: #1890ff;
  }
  .tips {
    margin: 0% 2% 1% 2%;
  }
</style>
