<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      style="margin-top: 5%"
    >
      <el-form-item label="Dataset Path" prop="datasetPath">
        <el-input v-model.trim="form.datasetPath" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="confirm">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // import { createDataset } from '@/api/datasetCurd'
  export default {
    name: 'CreatePage',
    data() {
      return {
        form: {
          datasetPath: '',
        },
        rules: {
          datasetPath: [
            {
              required: true,
              trigger: 'blur',
              message:
                'Your dataset path, make sure a config.json file is there.',
            },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showCreatePage() {
        this.title = 'Create New Dataset'
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      confirm() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            // console.log(this.form)
            this.dialogFormVisible = false
            const { msg } = await createDataset({
              datasetPath: this.form.datasetPath,
            })

            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()

            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
