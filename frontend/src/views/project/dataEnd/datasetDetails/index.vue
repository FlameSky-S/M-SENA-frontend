<template>
  <div class="datasetDetails-container">
    <el-row class="top-info">
      <el-col :span="8">
        <div class="detail-info-container">
          <h2 class="detail-info-header">Detail Info</h2>
          <div class="detail-info-item">
            <em style="font-weight: 700">Dataset Name:</em>
            {{ datasetDetails.detailInfo.datasetName }}
          </div>
          <div class="detail-info-item">
            <em style="font-weight: 700">Modalities:</em>
            {{ datasetDetails.detailInfo.modalities }}
          </div>
          <div class="detail-info-item">
            <em style="font-weight: 700">Labeled / Total Data:</em>
            {{ labeledFraction }}
          </div>
          <div class="detail-info-item">
            <em style="font-weight: 700">Label Type:</em>
            {{ datasetDetails.detailInfo.labelType }}
          </div>
          <div class="detail-info-item">
            <em style="font-weight: 700">Language:</em>
            {{ datasetDetails.detailInfo.language }}
          </div>
          <div class="detail-info-item">
            <em style="font-weight: 700">Unimodal labels:</em>
            {{ datasetDetails.detailInfo.unimodalLabel }}
          </div>
        </div>
      </el-col>
      <el-divider direction="vertical" class="top-left-divider"></el-divider>
      <el-col :span="8">
        <div class="chart-container">
          <img
            class="detail-chart"
            src="https://picsum.photos/200/200?random=a9CADE4c-3141-09b9-eFf2-55DDDC4Bf7Ec"
            alt=""
          />
        </div>
      </el-col>
      <el-divider direction="vertical" class="top-right-divider"></el-divider>
      <el-col :span="8">
        <div class="detail-info-operation">
          <h2 class="detail-info-operation-header">Operations</h2>
          <div class="operation-item">
            <el-button type="primary" class="operation-button" round>
              {{ lockOperation }}
            </el-button>
          </div>
          <div class="operation-item">
            <el-button type="success" class="operation-button" round>
              Import
            </el-button>
          </div>
          <div class="operation-item">
            <el-button type="info" class="operation-button" round>
              Rename
            </el-button>
          </div>
          <div class="operation-item">
            <el-button type="danger" class="operation-button" round>
              Delete
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider direction="horizontal"></el-divider>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="Index" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="Video ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="Clip ID"
        prop="author"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="Preface">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="row.img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="Multimodal Label"
        prop="pageViews"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="时间"
        prop="datetime"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="Operations" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="showPreview(row)">Preview</el-button>
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
    <preview ref="preview"></preview>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/table'
  import Preview from './components/Preview'
  export default {
    name: 'DatasetDetails',
    components: {
      Preview,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        datasetDetails: {
          detailInfo: {
            datasetName: null,
            locked: null,
            labeledCount: null,
            totalCount: null,
            modalities: null,
            labelType: null,
            language: null,
            unimodalLabel: null,
          },
          modelImg: null,
          instanceList: [],
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
      lockOperation() {
        return this.datasetDetails.detailInfo.locked === 'locked'
          ? 'UnLock'
          : 'Lock'
      },
      labeledFraction() {
        return (
          this.datasetDetails.detailInfo.labeledCount +
          ' / ' +
          this.datasetDetails.detailInfo.totalCount
        )
      },
    },
    created() {
      this.fetchDetails(this.$route.query.dataset)
      this.datasetDetails.detailInfo.datasetName = 'CMU_MOSI'
      this.datasetDetails.detailInfo.labeledCount = 2199
      this.datasetDetails.detailInfo.totalCount = 2199
      this.datasetDetails.detailInfo.modalities = '{T, V, A}'
      this.datasetDetails.detailInfo.labelType = 'Classification'
      this.datasetDetails.detailInfo.language = 'English'
      this.datasetDetails.detailInfo.unimodalLabel = 'No'
    },
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {},
      showPreview(row) {
        this.$refs['preview'].showPreview(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      fetchDetails(datasetName) {
        this.fetchData()
        //TODO: finish this api to get the datasetDetails attribute.
      },
    },
  }
</script>

<style lang="scss" scoped>
  .datasetDetails-container {
    .top-info {
      height: 50%;
      margin: 0%;
      .top-left-divider {
        position: absolute;
        left: 33%;
        height: 100%;
      }
      .top-right-divider {
        position: absolute;
        right: 33%;
        height: 100%;
      }
      .detail-info-container {
        display: inline;
        .detail-info-header {
          margin-left: 10%;
        }
        .detail-info-item {
          margin: 5% 15%;
        }
      }
      .chart-container {
        display: flex;
        align-items: center;
        justify-content: center;
        // display: table-cell;
        width: 100%;
        .detail-chart {
          height: 60%;
          margin-top: 10%;
        }
      }
      .detail-info-operation {
        display: inline;
        .detail-info-operation-header {
          margin-left: 10%;
        }
        .operation-item {
          margin: 5% 15%;
          .operation-button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
