<template>
  <div>
    <el-container class="barDashboard">
      <el-header class="imgTitle">
        <img src="../../assets/imgs/logintitle.png" alt="" />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened
            router
          >
            <el-menu-item index="/home">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>工作台</span>
              </template>
            </el-menu-item>
          </el-menu>
          <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>基本信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manage-base-info/warehouse"
                  >仓库管理</el-menu-item
                >
                <el-menu-item index="/manage-base-info/area"
                  >库区管理</el-menu-item
                >
                <el-menu-item index="/manage-base-info/location">
                  库位管理
                </el-menu-item>
                <el-menu-item index="/manage-base-info/location-view">
                  库位视图
                </el-menu-item>
                <el-menu-item index="/manage-base-info/goods">
                  货品管理
                </el-menu-item>
                <el-menu-item index="/manage-base-info/goods-type">
                  货品类型管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

          <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manage-business/goods-owner"
                  >货主管理</el-menu-item
                >
                <el-menu-item index="/manage-business/task-picking"
                  >承运商管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.barDashboard {
  //   box-shadow: 2px 0 6px 0 rgb(144 142 142 / 13%);
}
.imgTitle {
  width: 200px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}

.work {
  background-color: #f5f1f1;
}

.el-menu-item.is-active {
  color: #ffb149;
  // background: #ffb149;
}

// .el-menu-item:focus,
// .el-menu-item:hover {
//   outline: 0;
//   background-color: #fff6e2;
// }
</style>
