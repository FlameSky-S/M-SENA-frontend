<template>
  <div class="modelManagement-container">
    <h1>Model Management</h1>
    <p class="tips">Click model name to view model-related results.</p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="18" :offset="offset">
        <div class="model-table">
          <vab-query-form>
            <vab-query-form-left-panel>
              <el-button icon="el-icon-plus" type="primary" @click="addModel">
                Create
              </el-button>
            </vab-query-form-left-panel>
            <vab-query-form-right-panel>
              <el-form ref="form" :model="queryForm" :inline="true">
                <el-form-item>
                  <el-input
                    v-model="queryForm.title"
                    placeholder="Model Name"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    @click="searchModel"
                  >
                    Search
                  </el-button>
                </el-form-item>
              </el-form>
            </vab-query-form-right-panel>
          </vab-query-form>

          <el-table
            v-loading="modelLoading"
            :data="modelList"
            element-loading-text="Loading Model Info..."
            stripe
          >
            <el-table-column
              label="Id"
              prop="id"
              align="center"
              min-width="100"
            ></el-table-column>
            <el-table-column
              label="Model Name"
              prop="modelName"
              align="center"
              min-width="150"
            ></el-table-column>
            <el-table-column
              label="Description"
              prop="description"
              align="center"
              min-width="400"
            ></el-table-column>
            <el-table-column label="Operations" align="center" min-width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="viewModel(scope.row)">
                  View
                </el-button>
                <el-button type="text" @click="trainModel(scope.row)">
                  Train
                </el-button>
                <el-button type="text" @click="editModel(scope.row)">
                  Edit
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
  import { getModelList, delModel } from '@/api/model'
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
          title: '',
        },
        screenWidth: 0,
        offset: 0,
      }
    },
    computed: {},
    watch: {
      screenWidth: function (newValue) {
        if (newValue >= 1920) {
          //xl
          this.offset = 3
        } else if (newValue >= 1200) {
          //lg
          this.offset = 2
        } else if (newValue >= 992) {
          //md
          this.offset = 0
        } else if (newValue >= 768) {
          //sm
          this.offset = 0
        } else {
          //xs
          this.offset = 0
        }
      },
    },
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
        // console.log(modelList)
        this.modelList = modelList
        this.total = totalCount
        this.modelLoading = false
      },
      addModel() {},
      viewModel(row) {},
      editModel(row) {},
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
              row.modelName
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
            let modelID = row.id
            console.log(modelID)
            let { msg } = await delModel(row.id)
            if (msg == 'success') {
              this.$message({
                message: 'Successfully Deleted Model',
                type: 'success',
              })
              this.fetchModelList()
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
    .train-settings {
      margin: 0% 5%;
    }
  }
</style>
