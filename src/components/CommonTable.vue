<template>
  <div
    class="common-table"
    v-loading="loading"
  >
    <header>
      <div class="header-operate">
        <slot name="header"></slot>
      </div>
      <div class="header-filter">
        <slot name="filter"></slot>
        <el-select
          class="filter-item"
          v-if="showFilter"
          v-model="filter"
          size="small"
          :placeholder="filterScope"
          :clearable="true"
          filterable
          @change="handleSelect"
        >
          <el-option
            v-for="item in filterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          class="filter-item"
          v-if="showDatePick"
          v-model="dateRange"
          size="small"
          :type="datePickType"
          align="right"
          :clearable="true"
          :start-placeholder="datePickStart"
          :end-placeholder="datePickEnd"
          :default-time="['00:00:00', '23:59:59']"
          value-format="timestamp"
          @change="handleTimerange"
        ></el-date-picker>
        <el-input
          class="table-search filter-item"
          v-if="showSearch"
          size="small"
          :placeholder="searchScope"
          v-model="search"
          @keyup.13.native="toSearch"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="toSearch"
          ></i>
        </el-input>
      </div>
    </header>
    <section class="table-area">
      <el-table
        :data="tables.tbody"
        style="width: 100%"
        @selection-change="handleSelection"
        @sort-change="handleSort"
      >
        <el-table-column
          v-if="tables.isMulti"
          type="selection"
          width="50"
        ></el-table-column>
        <template v-for="(item, index) in tables.thead">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :fixed="item.prop === 'operation' ? 'right' : false"
          >
            <template slot-scope="scope">
              <span
                class="table-operation"
                v-if="item.prop === 'operation' && scope.row.hasOwnProperty('operation')"
              >
                <template v-if="!useMoreOpt || index < useMoreIndex">
                  <span
                    class="text-btn"
                    v-for="(item, index) in scope.row.operation"
                    :class="item.type"
                    :key="index"
                    @click="eventBus(item.event, scope.row)"
                  >{{item.text}}</span>
                </template>
                <el-dropdown
                  @command="handleCommand"
                  v-if="useMoreOpt && (scope.row.operation.length > useMoreIndex)"
                  trigger="click"
                >
                  <span class="text-btn">
                    {{$t('moreOptions')}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <template v-for="(item, index) in scope.row.operation">
                      <el-dropdown-item
                        :command="{opt:item, row: scope.row}"
                        :key="index"
                        v-if="index > (useMoreIndex - 1)"
                      >{{item.text}}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
              <span
                v-else-if="item.formatType === 'link'"
                :class="item.formatClass || 'to-detail-link'"
                :title="scope.row[item.prop]"
                @click="toLink(item.linkUrl, scope.row)"
              >{{scope.row[item.prop]}}</span>
              <span
                class="default-cell"
                v-else-if="!item.formatFn || item.formatFn === ''"
                :title="scope.row[item.prop]"
              >{{scope.row[item.prop]}}</span>
              <span
                :class="item.formatFn"
                v-else-if="item.formatType === 'normal'"
                v-html="formatFunc(item.formatFn, scope.row[item.prop], scope.row)"
                :title="formatFunc(item.formatFn, scope.row[item.prop], scope.row)"
              ></span>
              <div
                v-else-if="item.formatType === 'dialog'"
                @click="eventBus('toShowDialog', scope.row)"
              >
                <span
                  class="table-show-dialog"
                  :class="item.formatFn"
                  v-html="formatFunc(item.formatFn, scope.row[item.prop], scope.row)"
                ></span>
              </div>
              <el-tooltip
                v-else-if="item.formatType === 'tip'"
                class="item"
                effect="dark"
                :content="scope.row[item.prop] + ''"
                placement="top"
              >
                <span
                  :class="item.formatFn"
                  v-html="formatFunc(item.formatFn, scope.row[item.prop], scope.row)"
                ></span>
              </el-tooltip>
              <span
                :class="item.formatFn"
                v-else
                v-html="formatFunc(item.formatFn, scope.row[item.prop], scope.row)"
              ></span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </section>
    <el-pagination
      class="table-pagination"
      v-if="tables.pageInfo.total > tables.pageInfo.size"
      @current-change="pageChange"
      :current-page.sync="tables.pageInfo.page"
      :page-size="tables.pageInfo.size * 1"
      layout="total, prev, pager, next, jumper"
      :total="tables.pageInfo.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    components: {},
    props: {
        tables: {
            type: Object,
            default: () => {
                return {
                    thead: [],
                    tbody: [],
                    isMulti: false,
                    pageInfo: { page: 1, size: 10, total: 0 }
                }
            }
        },
        useMoreOpt: { type: Boolean, default: false },
        useMoreIndex: { type: Number, default: 3 },
        datePickType: { type: String, default: 'daterange' },
        searchScope: { type: String, default: '请输入' },
        datePickStart: { type: String, default: '开始日期' },
        datePickEnd: { type: String, default: '结束日期' },
        filterScope: { type: String, default: '请选择' },
        loading: { type: Boolean, default: false },
        showSearch: { type: Boolean, default: true },
        showDatePick: { type: Boolean, default: false },
        showFilter: { type: Boolean, default: false },
        filterOptions: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            search: '',
            dateRange: [],
            filter: ''
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        eventBus (param, scope, scope2) {
            this.$emit(param, scope, scope2)
        },
        toSearch () {
            this.eventBus('turnPage', { search: this.search, page: 1 })
        },
        pageChange (val) {
            this.eventBus('turnPage', { page: val })
        },
        handleSelection (val) {
            let cluster = {
                id: [],
                status: [],
                grantee: [],
                rows: []
            }
            val.forEach(function (element) {
                cluster.id.push(element.id)
                cluster.status.push(element.status)
                cluster.rows.push(element)
                if (element.grantee) cluster.grantee.push(element.grantee)
            })
            this.eventBus('selectionChange', cluster)
        },
        handleSort (value) {
            this.eventBus('turnPage', {
                prop: value.prop,
                order: value.order
            })
        },
        handleTimerange () {
            if (this.dateRange) {
                this.eventBus('turnPage', {
                    startTime: this.dateRange[0],
                    endTime: this.dateRange[1],
                    page: 1
                })
            } else {
                this.eventBus('turnPage', {
                    startTime: '',
                    endTime: '',
                    page: 1
                })
            }
        },
        handleSelect () {
            this.eventBus('turnPage', {
                filter: this.filter,
                page: 1
            })
        },
        toLink (url, row) {
            if (url) {
                this.$router.push(`${url}/${row.id}`)
            } else {
                this.$router.push(this.$route.path + '/detail/' + row.id)
            }
        },
        handleCommand (val) {
            console.log('handleCommand', val)
            this.$emit(val.opt.event, val.row)
        }
    }
}
</script>

<style lang="scss">
.common-table {
  background: #ffffff;
  header {
    height: 36px;
    margin-bottom: 18px;
    overflow: hidden;
    .header-operate {
      float: left;
    }
    .header-filter {
      float: right;
      .el-cascader {
        line-height: 36px;
      }
      .table-search {
        width: 200px;
        .el-icon-search {
          cursor: pointer;
        }
      }
      .el-select {
        width: 150px;
      }
      .filter-item {
        float: left;
        margin-left: 10px;
      }
      .el-date-editor--timerange,
      .el-date-editor--daterange {
        &.el-input__inner {
          width: 220px;
          .el-range-input {
            width: 70px;
          }
          .el-range__close-icon {
            width: 14px;
          }
        }
      }
    }
    .el-input__inner {
      height: 36px;
      border-radius: 4px;
      border: 1px solid #dcdee6;
      &:hover,
      &:focus {
        border-color: #1c92ff;
      }
    }
  }
  .table-area {
    // background: #ffffff;
    border: 1px solid #dcdee6;
    border-radius: 4px;
    padding: 0 24px;
    .el-table {
      &::before {
        height: 0;
      }
      .el-table__row {
        .cell {
          font-size: 12px;
          color: #48494d;
          white-space: nowrap;
        }
      }
      .el-table__body {
        tr:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      td,
      th.is-leaf {
        border-bottom: 1px solid #dcdee6;
      }
      th {
        .cell {
          font-size: 12px;
          color: #909199;
          font-weight: normal;
        }
      }
      .el-table__empty-text {
        color: #c0c1cc;
      }
    }
  }
  .table-pagination {
    margin-top: 20px;
    text-align: center;
    color: #48494d;
    .el-pagination__total {
      font-size: 14px;
      color: #48494d;
    }
    .btn-next,
    .btn-prev {
      border: 0;
      color: #48494d;
      &:hover {
        color: #1c92ff;
      }
    }
    .el-pager {
      .number {
        border: 0;
        font-weight: bold;
        margin: 0 8px;
        &.active {
          background: #ffffff;
          color: #1c92ff;
        }
      }
      .more {
        border: 0;
      }
    }
    .el-pagination__editor {
      width: 55px;
    }
  }
  .level-icon {
    overflow: hidden;
    float: left;
    &.higeLevel {
      i {
        &.active {
          color: #ff6001;
        }
      }
    }
    i {
      font-size: 12px;
      color: #ffd7a6;
      &.active {
        color: #ff9901;
      }
    }
  }
  .level-tip {
    display: flex;
    width: 150px;
    justify-content: space-between;
    padding-top: 12px;
    .level-tip-item {
      width: 14px;
      height: 8px;
      border-radius: 2px;
      background-color: #ffd7a6;
      &.active {
        background-color: #ff9901;
      }
    }
    &.higeLevel {
      .level-tip-item {
        &.active {
          background-color: #ff6001;
        }
      }
    }
    &.lowLevel {
      .level-tip-item {
        background-color: #d1dbe5;
      }
    }
  }
  .table-show-dialog {
    color: #1c92ff;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
