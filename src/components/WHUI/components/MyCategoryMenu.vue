<template>
  <div
    class="my-category-menu"
    @mouseenter="father"
    @mouseleave="showMenu = false"
  >
    <div class="left-menu">
      <ul :style="`border-right: ${showMenu ? 1 : 0}px solid #fff;`">
        <li
          v-for="(firstItem, firstIndex) in menuList"
          :key="firstIndex"
          @mouseenter="setRight(firstItem)"
          class="left-category-item"
        >
          <i
            v-if="firstItem.icon"
            :class="firstItem.icon"
          ></i>&nbsp;
          <span>{{firstItem.name}}</span>
        </li>
      </ul>
    </div>
    <div
      class="right-menu"
      v-if="showMenu"
    >
      <slot
        name="rightMenu"
        :data="rightList"
      >
        <ul>
          <li
            class="right-menu-item"
            v-for="(secondItem, secondIndex) in rightList.children"
            :key="secondIndex"
          >
            <div style="word-break:keep-all;">{{secondItem.name}}：</div>
            <div style="word-break:break-all;">
              <span
                v-for="(thirdItem, thirdIndex) in secondItem.children"
                :key="thirdIndex"
              ><span class="category-item">{{thirdItem.name}}</span><template v-if="thirdIndex !== secondItem.children.length - 1 ">&nbsp;|&nbsp;</template></span>
            </div>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'MyCategoryMenu',
    props: {
        width: { type: String, default: '150px' },
        height: { type: String, default: '' }
    },
    data () {
        return {
            rightList: [],
            showMenu: false,
            menuList: [
                {
                    name: 'aa',
                    value: '2222',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            name: '法拉利',
                            value: '2222',
                            icon: '',
                            children: [
                                {
                                    name: '类型1',
                                    value: '类型1',
                                    icon: ''
                                },
                                {
                                    name: 'ccc',
                                    value: '2222',
                                    icon: ''
                                },
                                {
                                    name: '类型2',
                                    value: '类型2',
                                    icon: ''
                                },
                                {
                                    name: '类型3',
                                    value: '类型3',
                                    icon: ''
                                },
                                {
                                    name: '类型4',
                                    value: '类型4',
                                    icon: ''
                                },
                                {
                                    name: '类型5',
                                    value: '类型5',
                                    icon: ''
                                },
                                {
                                    name: '类型6',
                                    value: '类型6',
                                    icon: ''
                                },
                                {
                                    name: '类型7',
                                    value: '类型7',
                                    icon: ''
                                }
                            ]
                        },
                        {
                            name: '兰博基尼',
                            value: '2222',
                            icon: '',
                            children: [
                                {
                                    name: '类型1',
                                    value: '类型1',
                                    icon: ''
                                },
                                {
                                    name: 'ccc',
                                    value: '2222',
                                    icon: ''
                                },
                                {
                                    name: '类型2',
                                    value: '类型2',
                                    icon: ''
                                },
                                {
                                    name: '类型3',
                                    value: '类型3',
                                    icon: ''
                                },
                                {
                                    name: '类型4',
                                    value: '类型4',
                                    icon: ''
                                },
                                {
                                    name: '类型5',
                                    value: '类型5',
                                    icon: ''
                                },
                                {
                                    name: '类型6',
                                    value: '类型6',
                                    icon: ''
                                },
                                {
                                    name: '类型7',
                                    value: '类型7',
                                    icon: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'aa11',
                    value: '333',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            name: 'bbb222',
                            value: '2222',
                            icon: '',
                            children: [
                                {
                                    name: 'ccc222',
                                    value: '2222',
                                    icon: ''
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    components: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
        father () {
            this.showMenu = true
            console.log('father')
        },
        children () {
            this.showMenu = true
            console.log('children')
        },
        setRight (data) {
            console.log('data', data)
            console.log('children')
            this.rightList = data
            this.showMenu = true
        }
    }
}
</script>

<style scoped lang="scss">
.my-category-menu {
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border-radius: 2px;
  width: fit-content;
  .left-menu {
    padding: 10px;
    box-sizing: border-box;
    min-height: 150px;
    width: 150px;
    font-size: 14px;
    .left-category-item {
      cursor: pointer;
      &:hover {
        color: #1c92ff;
      }
    }
  }
  ul {
    text-align: left;
    padding: 0;
    margin: 0;
    height: 100%;
    font-size: 14px;
    li {
      list-style-type: none;
    }
  }
  .right-menu {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    .right-menu-item {
      display: flex;
      font-size: 12px;
      .category-item {
        cursor: pointer;
        &:hover {
          color: #1c92ff;
        }
      }
    }
  }
}
</style>
