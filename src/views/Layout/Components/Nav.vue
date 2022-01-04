<template>
  <div id="nav-wrap">
    <el-menu class="el-menu-vertical-demo"
             :collapse="isCollapse"
             text-color='#fff'
             background-color='#344a5e'
             active-text-color='#fff'
             router>
      <template v-for="(item,i) in route.children"
                :key="i">
        <el-sub-menu :index="i.toString()"
                     v-if="!item.hiddren">
          <template #title>
            <el-icon :class="['iconfont',item.meta.info ]">
            </el-icon>
            <span>{{item.meta.name}}</span>
          </template>

          <el-menu-item-group v-for="(subitem,index) in item.children"
                              :key="index">
            <el-menu-item :index="subitem.path">{{subitem.meta.name}}</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>

      </template>
    </el-menu>

  </div>
</template>

<script>
import { ref, getCurrentInstance, reactive, } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'
import { mapState } from 'vuex'
export default {
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  computed: {
    ...mapState({ isCollapse: state => state.login.isCollapse })
  },
  setup () {

    const { proxy } = getCurrentInstance()
    const routes = reactive(proxy.$router.options.routes);
    console.log(routes);

    const route = ref({})
    for (let key in routes) {
      if (routes[key].name == 'console') {
        route.value = routes[key]
      }
    }
    console.log(proxy.$store.state.login.isCollapse);



    return {

      routes,
      route
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  width: 250px;
  height: 100vh;
  background-color: #344a5e;
  @include wevkit(transition, all 0.7s ease 0s);
}
.el-menu {
  border: none;
}

.el-menu-vertical-demo {
}
.open {
  #nav-wrap {
    width: 250px;
  }
}
.close {
  #nav-wrap {
    width: 64px;
  }
}
// 深影响
/deep/ .el-menu-item-group__title {
  padding: 0;
}
</style>