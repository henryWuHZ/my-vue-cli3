<template>
  <div class="brand-list-page">
    <default-layout>
      <template #header>
        <p>品牌管理</p>
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
          label="名称"
          prop="name"
          :rules="[{required: true, message: '名称不能为空', trigger: 'blur'}]"
        >
          <el-input
            placeholder="请输入名称"
            v-model="addForm.name"
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
import { addBrand, getBrands, updateBrand, deleteBrand } from '@/api/brand'

export default {
    data () {
        return {
            activeRow: '',
            dialogTitle: '',
            addForm: {
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
    },
    methods: {
        toDel (row) {
            this.activeRow = row
            this.dialogTitle = '删除品牌'
            this.type = 'delete'
            this.dialogVisible = true
        },
        toEdit (row) {
            this.activeRow = row
            this.dialogTitle = '编辑品牌'
            this.addForm.name = row.brand_name
            this.type = 'edit'
            this.dialogVisible = true
        },
        showAdd () {
            this.type = 'add'
            this.dialogTitle = '添加品牌'
            this.dialogVisible = true
        },
        setHead () {
            this.tables.thead = [
                {
                    prop: 'brand_name',
                    label: '品牌名称'
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
            const res = await addBrand({ name: this.addForm.name })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
            }
        },
        async toUpdate () {
            const res = await updateBrand({ name: this.addForm.name, id: this.activeRow.brand_id })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
            }
        },
        async toDelete () {
            const res = await deleteBrand({ id: this.activeRow.brand_id })
            console.log(res)
            if (res.code === '00000') {
                this.getList()
                this.dialogVisible = false
            }
        },
        async getList (val) {
            this.searchCondition = { page: this.tables.pageInfo.page, pageSize: this.tables.pageInfo.size, ...this.searchCondition, ...val }
            const res = await getBrands({ ...this.searchCondition })
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
