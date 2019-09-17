<template>
  <div class="brand-list-page">
    <default-layout>
      <template #header>
        <p>型号列表</p>
      </template>
      <template #main>
        <common-table
          :tables="tables"
          @toEdit="toEdit"
          @toDel="toDel"
          @turnPage="getList"
        >
          <template #header>
            <el-button
              type="success"
              size="small"
              @click="showAdd"
            >新增</el-button>
          </template>
        </common-table>
      </template>
    </default-layout>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        v-if="type !== 'delete'"
        :model="addForm"
        ref="addForm"
        label-width="100px"
        inline
      >
        <el-form-item
          label="品牌"
          prop="brand_id"
          :rules="[{required: true, message: '请选择', trigger: 'change'}]"
        >
          <el-select
            style="width:200px"
            v-model="addForm.brand_id"
            placeholder="请选择"
            size="small"
            clearable
            filterable
          >
            <el-option
              v-for="item in opts"
              :key="item.brand_id"
              :label="item.brand_name"
              :value="item.brand_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{required: true, message: '名称不能为空', trigger: 'blur'}]"
        >
          <el-input
            style="width:200px"
            placeholder="请输入名称"
            v-model="addForm.name"
            size="small"
            :maxlength="20"
          ></el-input>
        </el-form-item>
      </el-form>
      <template v-else>
        <p>确定要删除吗？</p>
      </template>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="toConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import DefaultLayout from '@/components/layout/CommonTableList'
import CommonTable from '@/components/CommonTable'
import TableMixins from '@/components/tableMixins'
import { addModel, getModels, updateModel, deleteModel, getBrands } from '@/api/model'

export default {
    data () {
        return {
            opts: [],
            activeRow: '',
            dialogTitle: '',
            addForm: {
                brand_id: '',
                name: ''
            },
            dialogVisible: false,
            operateConfig: {
                optType: {
                    toEdit: {
                        event: 'toEdit',
                        text: '编辑',
                        type: 'primary'
                    },
                    toDel: {
                        event: 'toDel',
                        text: '删除',
                        type: 'danger'
                    }
                },
                optFunc: function (row, userInfo) {
                    return ['toEdit', 'toDel']
                }
            }
        }
    },
    mixins: [TableMixins],
    components: {
        DefaultLayout,
        CommonTable
    },
    created () {
        this.setHead()
    },
    mounted () {
        this.getList()
        this.getOptList()
    },
    methods: {
        async getOptList () {
            const res = await getBrands({ ...this.searchCondition })
            console.log(res)
            if (res.code === '00000') {
                this.opts = res.data
            }
        },
        toDel (row) {
            this.activeRow = row
            this.dialogTitle = '删除型号'
            this.type = 'delete'
            this.dialogVisible = true
        },
        toEdit (row) {
            this.activeRow = row
            this.dialogTitle = '编辑型号'
            this.addForm.name = row.model_name
            this.addForm.brand_id = row.brand_id
            this.type = 'edit'
            this.dialogVisible = true
        },
        showAdd () {
            this.type = 'add'
            this.dialogTitle = '添加型号'
            this.dialogVisible = true
        },
        setHead () {
            this.tables.thead = [
                {
                    prop: 'model_name',
                    label: '型号',
                    sortable: 'custom'
                },
                {
                    prop: 'brand_name',
                    label: '品牌名称',
                    sortable: 'custom'
                }, {
                    prop: 'operation',
                    label: '操作',
                    width: '200px'
                }
            ]
        },
        handleClose () {
            this.dialogVisible = false
            this.$refs.addForm.resetFields()
        },
        async toAdd () {
            const res = await addModel({ name: this.addForm.name, brand_id: this.addForm.brand_id })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
                this.$refs.addForm.resetFields()
            }
        },
        async toUpdate () {
            const res = await updateModel({ name: this.addForm.name, brand_id: this.activeRow.brand_id, id: this.activeRow.model_id })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
                this.$refs.addForm.resetFields()
            }
        },
        async toDelete () {
            const res = await deleteModel({ id: this.activeRow.model_id })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
            }
        },
        async getList (val) {
            this.searchCondition = { page: this.tables.pageInfo.page, pageSize: this.tables.pageInfo.size, ...this.searchCondition, ...val }
            const res = await getModels({ ...this.searchCondition })
            console.log(res)
            if (res.code === '00000') {
                let formatData = this.setOperation(res)
                this.afterListSet(formatData)
                console.log(this.tables)
            }
        },
        toConfirm () {
            if (this.type === 'delete') {
                this.toDelete()
            } else {
                this.$refs.addForm.validate((validate) => {
                    if (validate) {
                        if (this.type === 'add') this.toAdd()
                        else if (this.type === 'edit') this.toUpdate()
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
</style>
