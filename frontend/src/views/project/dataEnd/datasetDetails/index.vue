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
          <el-image
            class="detail-chart"
            :preview-src-list="datasetDetails.modelImg"
            src="https://i.picsum.photos/id/703/200/200.jpg?hmac=6zWxIBRmIf2e0jZTqvKBIwrc7wm-dPkvGky4go6Yyvg"
          ></el-image>
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
            <el-button
              type="success"
              class="operation-button"
              round
              :disabled="disabledButton"
            >
              Import
            </el-button>
          </div>
          <div class="operation-item">
            <el-button
              type="info"
              class="operation-button"
              round
              :disabled="disabledButton"
            >
              Rename
            </el-button>
          </div>
          <div class="operation-item">
            <el-button
              type="danger"
              class="operation-button"
              round
              :disabled="disabledButton"
            >
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
      :data="datasetDetails.instanceList"
      :element-loading-text="elementLoadingText"
      style="width: 100%"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        fixed
        show-overflow-tooltip
        type="selection"
        width="80"
      ></el-table-column>
      <el-table-column
        fixed
        show-overflow-tooltip
        label="Video ID"
        prop="videoID"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        show-overflow-tooltip
        label="Clip ID"
        prop="clipID"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="Preface"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-image
            :preview-src-list="prefaceList"
            :src="row.preface"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="M-Label"
        prop="multimodalLabel"
        width="auto"
        align="center"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="M-label-Type"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.multimodalLabelType"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.multimodalLabelType | statusFilter">
              {{ row.multimodalLabelType }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="T-Label"
        prop="textLabel"
        width="auto"
        align="center"
      ></el-table-column>

      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="T-label-Type"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.textLabelType"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.textLabelType | statusFilter">
              {{ row.textLabelType }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="A-Label"
        prop="audioLabel"
        width="auto"
        align="center"
      ></el-table-column>

      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="A-label-Type"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.audioLabelType"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.audioLabelType | statusFilter">
              {{ row.audioLabelType }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="V-Label"
        prop="visionLabel"
        width="auto"
        align="center"
      ></el-table-column>

      <el-table-column
        v-if="showUnimodalColumn"
        show-overflow-tooltip
        label="V-label-Type"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.visionLabelType"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.visionLabelType | statusFilter">
              {{ row.visionLabelType }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="Belonging"
        prop="belonging"
        width="auto"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed="right"
        show-overflow-tooltip
        label="Operations"
        width="auto"
        align="center"
      >
        <template #default="{ row }">
          <el-button type="text" @click="showPreview(row)">Preview</el-button>
          <el-button
            type="text"
            :disabled="disabledButton"
            @click="handleEdit(row)"
          >
            Edit
          </el-button>
          <el-button
            type="text"
            :disabled="disabledButton"
            @click="handleDelete(row)"
          >
            Delete
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
    <preview ref="preview" class="video-preview-dialogue"></preview>
  </div>
</template>

<script>
  import { getDetails, getMetaData } from '@/api/datasetDetail'
  import Preview from './components/Preview'
  export default {
    name: 'DatasetDetails',
    components: {
      Preview,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'gray',
          2: 'danger',
          3: 'info',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        prefaceList: [],
        elementLoadingText: '正在加载...',
        queryForm: {
          datasetName: null,
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
          modelImg: [
            'https://i.picsum.photos/id/703/200/200.jpg?hmac=6zWxIBRmIf2e0jZTqvKBIwrc7wm-dPkvGky4go6Yyvg',
          ],
          instanceList: null,
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
      disabledButton() {
        return this.datasetDetails.detailInfo.locked === 'locked' ? true : false
      },
      labeledFraction() {
        return (
          this.datasetDetails.detailInfo.labeledCount +
          ' / ' +
          this.datasetDetails.detailInfo.totalCount
        )
      },
      showUnimodalColumn() {
        if (this.datasetDetails.instanceList)
          return this.datasetDetails.instanceList[0].T_label_type ? true : false
        return false
      },
    },
    created() {
      this.queryForm.datasetName = this.$route.query.dataset
      // console.log(this.queryForm.datasetName)
      this.fetchDetails()
      this.fetchMetadata()
    },
    mounted() {},
    methods: {
      flexColumnWidth(str, tableData, flag = 'max') {
        // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
        // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
        // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
        str = str + ''
        let columnContent = ''
        if (
          !tableData ||
          !tableData.length ||
          tableData.length === 0 ||
          tableData === undefined
        ) {
          return
        }
        if (!str || !str.length || str.length === 0 || str === undefined) {
          return
        }
        if (flag === 'equal') {
          // 获取该列中第一个不为空的数据(内容)
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str].length > 0) {
              // console.log('该列数据[0]:', tableData[0][str])
              columnContent = tableData[i][str]
              break
            }
          }
        } else {
          // 获取该列中最长的数据(内容)
          let index = 0
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i][str] === null) {
              return
            }
            const now_temp = tableData[i][str] + ''
            const max_temp = tableData[index][str] + ''
            if (now_temp.length > max_temp.length) {
              index = i
            }
          }
          columnContent = tableData[index][str]
        }
        // console.log('该列数据[i]:', columnContent)
        // 以下分配的单位长度可根据实际需求进行调整
        let flexWidth = 0
        for (const char of columnContent) {
          if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            // 如果是英文字符，为字符分配8个单位宽度
            flexWidth += 8
          } else if (char >= '\u4e00' && char <= '\u9fa5') {
            // 如果是中文字符，为字符分配15个单位宽度
            flexWidth += 15
          } else {
            // 其他种类字符，为字符分配8个单位宽度
            flexWidth += 8
          }
        }
        if (flexWidth < 80) {
          // 设置最小宽度
          flexWidth = 80
        }
        // if (flexWidth > 250) {
        //   // 设置最大宽度
        //   flexWidth = 250
        // }
        return flexWidth + 'px'
      },
      tableSortChange() {
        const prefaceList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          prefaceList.push(item.img)
        })
        this.prefaceList = prefaceList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit() {},
      showPreview(row) {
        this.$refs['preview'].showPreview(row)
      },
      handleDelete(row) {
        // if (row.id) {
        //   this.$baseConfirm('你确定要删除当前项吗', null, async () => {
        //     const { msg } = await doDelete({ ids: row.id })
        //     this.$baseMessage(msg, 'success')
        //     this.fetchData()
        //   })
        // } else {
        //   if (this.selectRows.length > 0) {
        //     const ids = this.selectRows.map((item) => item.id).join()
        //     this.$baseConfirm('你确定要删除选中项吗', null, async () => {
        //       const { msg } = await doDelete({ ids: ids })
        //       this.$baseMessage(msg, 'success')
        //       this.fetchData()
        //     })
        //   } else {
        //     this.$baseMessage('未选中任何行', 'error')
        //     return false
        //   }
        // }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchDetails()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchDetails()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchDetails()
      },
      async fetchDetails() {
        this.listLoading = true
        // console.log(this.queryForm)
        const { data, totalCount } = await getDetails(this.queryForm)
        this.datasetDetails.instanceList = data
        const prefaceList = []
        data.forEach((item, index) => {
          prefaceList.push(item.img)
        })
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      async fetchMetadata() {
        const { data } = await getMetaData({
          datasetName: this.queryForm.datasetName,
        })
        this.datasetDetails.detailInfo.datasetName = data.datasetName
        this.datasetDetails.detailInfo.locked = data.locked
          ? 'locked'
          : 'unlocked'
        this.datasetDetails.detailInfo.labeledCount = data.labeledCount
        this.datasetDetails.detailInfo.totalCount = data.totalCount
        this.datasetDetails.detailInfo.modalities = data.modalities
        this.datasetDetails.detailInfo.labelType = data.labelType
        this.datasetDetails.detailInfo.language = data.language
        this.datasetDetails.detailInfo.unimodalLabel = data.unimodalLabel
          ? 'Yes'
          : 'No'
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
