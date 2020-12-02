<template>
  <div class="labeling-container">
    <h1>Model Results</h1>
    <p class="tips"></p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="unlock-dataset-table">
          <vab-query-form>
            <vab-query-form-left-panel>
              <el-form
                ref="form"
                :model="queryForm"
                :inline="true"
                @submit.native.prevent
              >
                <el-form-item>
                  <el-input
                    v-model="queryForm.title"
                    placeholder="Dataset Name"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    native-type="submit"
                    @click="handleQuery"
                  >
                    Search
                  </el-button>
                </el-form-item>
              </el-form>
            </vab-query-form-left-panel>
            <vab-query-form-right-panel></vab-query-form-right-panel>
          </vab-query-form>
          <el-table
            ref="datasetTable"
            v-loading="listLoading"
            :data="list"
            :element-loading-text="elementLoadingText"
            stripe
          >
            <el-table-column
              label="Id"
              width="auto"
              align="center"
              min-width="60px"
            >
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="datasetName"
              label="Dataset"
              width="auto"
              min-width="80px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="capacity"
              label="Capacity"
              width="auto"
              min-width="80px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="language"
              label="Language"
              width="auto"
              min-width="90px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="unimodalLabel"
              label="Uni-Label"
              width="auto"
              min-width="100px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="labelType"
              label="Label Type"
              width="auto"
              min-width="110px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              :width="descriptionWidth()"
              min-width="260px"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Operations"
              :width="operationWidth()"
              align="center"
              min-width="140px"
            >
              <template #default="{ row }">
                <el-button type="text" @click="startLabeling(row)">
                  Auto Labeling
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :background="background"
            :current-page="queryForm.pageNo"
            :layout="layout"
            :page-size="queryForm.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getUnlockedDatasetList } from '@/api/datasetList'
  export default {
    name: 'Labeling',
    components: {},
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        // fullHeight: document.documentElement.clientHeight,
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        total: 0,
        elementLoadingText: 'Loading Information...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
      }
    },
    computed: {},
    created() {
      this.fetchUnlockedData()
    },
    methods: {
      operationWidth() {
        if (this.fullWidth > 1500) {
          return 240 + 'px'
        } else if (this.fullWidth > 1200) {
          return 150 + 'px'
        } else {
          return 'auto'
        }
      },
      descriptionWidth() {
        if (this.fullWidth > 1500) {
          return 640 + 'px'
        } else if (this.fullWidth > 1200) {
          return 380 + 'px'
        } else {
          return 'auto'
        }
      },
      handleQuery() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchUnlockedData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchUnlockedData()
      },
      startLabeling(row) {},
      async fetchUnlockedData() {
        this.listLoading = true
        const { data, totalCount } = await getUnlockedDatasetList(
          this.queryForm
        )
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .labeling-container {
    margin: 0%;
    .unlock-dataset-table {
      margin: 0% 5%;
    }
  }
</style>
