<template>
  <div class="test-uploader">
    <chunk-uploader type="drop"></chunk-uploader>
    <el-input v-model="name"></el-input>
    <el-button @click="toAdd">测试</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import ChunkUploader from '@/components/ChunkUploader'
import { addBrand, getBrands } from '@/api/brand'
export default {
    data () {
        return {
            name: ''
        }
    },
    components: {
        ChunkUploader
    },
    created () {
        this.getList()
    },
    mounted () {

    },
    methods: {
        async toAdd () {
            const res = await addBrand({ name: this.name })
            console.log(res)
        },
        async getList () {
            const res = await getBrands({ pageNum: 1, pageSize: 10 })
            console.log(res)
        }
    }
}
</script>

<style scoped lang="scss">
</style>
