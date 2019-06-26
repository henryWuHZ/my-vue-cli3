<template>
  <el-form-item>
    <template slot="label">
      <span v-if="isRequired">*</span>
      <span>端口：</span>
    </template>
    <div class="ports-content">
      <div class="port-item" v-for="(domain, index) in form[portKey]" :key="index">
        <p class="port-label">
          <i v-if="index > 0" class="el-icon el-icon-remove" @click="splicePort(index)"></i>
          {{'端口' + (index + 1)}}
        </p>
        <div class="port-content">
          <el-form-item :prop="portKey + '.' + index + '.type'"
            label="端口类型" :rules="[{validator: portTypeValidator, trigger: 'change'}]">
            <el-select v-model="domain.type" placeholder="请选择端口类型" filterable clearable>
              <el-option v-for="(port, subIndex) in portOptions" :key="subIndex" :label="port.label"
                         :value="port.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :prop="portKey + '.' + index + '.port'"
            label="端口号：" :rules="[{validator: portValidator, trigger: 'blur'}]">
            <el-input v-model="domain.port" placeholder="请输入端口号"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-button type="light" @click="addPort"><i class="el-icon-circle-plus"></i>添加端口</el-button>
    </div>
  </el-form-item>
</template>

<script>
  export default {
    name: 'PortsFormSet',
    props: {
      portKey: { type: String, default: 'ports' },
      form: { type: Object, required: true },
      isRequired: { type: Boolean, default: true }
    },
    data () {
      let portTypeValidator = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请选择端口类型'))
        } else {
          return callback()
        }
      }
      let portValidator = (rule, value, callback) => {
        let exp = /^(\d)+$/g
        if (exp.test(value) && parseInt(value) > 0) {
          return callback()
        } else {
          return callback(new Error('请输入端口号'))
        }
      }
      return {
        portTypeValidator: portTypeValidator,
        portValidator: portValidator,
        portOptions: [
          {
            label: 'http',
            value: 'http'
          },
          {
            label: 'https',
            value: 'https'
          },
          {
            label: 'ftp',
            value: 'ftp'
          }
        ]
      }
    },
    components: {},
    created () {
    },
    methods: {
      splicePort (index) {
        this.form[this.portKey].splice(index, 1)
      },
      addPort () {
        this.form[this.portKey].push({ type: '', port: '' })
      }
    }
  }
</script>

<style scoped>

</style>
