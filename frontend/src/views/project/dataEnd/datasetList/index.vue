<template>
  <div class="datasetList-container">
    <el-table
      ref="datasetTable"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="428"
      stripe
      @selection-change="setSelectRows"
      @row-dblclick="showDetails"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
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
  import { getDatasetList } from '@/api/datasetList'
  export default {
    name: 'DatasetList',
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
        selectRows: '',
        elementLoadingText: 'Loading Information...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    mounted() {},
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      showDetails(row, column, event) {
        alert(row.datasetName)
        this.$router.push({
          path: '/data/datasetDetail',
          query: {
            dataset: row.datasetName,
          },
        })
      },
      tableSortChange() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getDatasetList(this.queryForm)
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
