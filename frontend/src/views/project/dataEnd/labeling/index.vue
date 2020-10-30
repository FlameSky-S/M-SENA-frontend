<template>
  <div class="labeling-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="Dataset Name" />
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
      :height="428"
      stripe
      @sort-change="tableSortChange"
    >
      <el-table-column show-overflow-tooltip label="Index" width="60">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="datasetName"
        label="Dataset Name"
        width="120"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="capacity"
        label="Sample Capacity"
        width="140"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="Language" width="120">
        <template #default="{ row }">
          <el-tooltip
            :content="row.language"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.language | statusFilter">
              {{ row.language }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="unimodalLabel"
        label="Unimodal Label"
        width="120"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="labelType"
        label="Label Type"
        width="120"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="description"
        label="Description"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="Operations" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="startLabeling(row)">
            Auto Labeling
          </el-button>
          <el-button type="text" @click="handleDelete(row)">Delete</el-button>
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
</template>

<script>
  import { getUnlockedDatasetList } from '@/api/datasetList'
  export default {
    name: 'Labeling',
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          English: 'success',
          Chinese: 'gray',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
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
      handleQuery() {},
      tableSortChange() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchUnlockedData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchUnlockedData()
      },
      startLabeling(row) {},
      handleDelete(row) {},
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
  // .labeling-container {

  // }
</style>
