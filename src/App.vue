<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>

    <van-tabbar
    
      route
      v-model="tabbar"
      active-color="#fd5a0f"
      style="z-index: 998"
      v-show="!this.$route.meta.hiddenBar"
    >
      <van-tabbar-item to="/home" icon="home-o">
        推荐
        <template #icon="props">
          <img
            :src="props.active ? homeViewIcon.active : homeViewIcon.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/movie" icon="search">
        电影
        <template #icon="props">
          <img
            :src="props.active ? MovieViewIcon.active : MovieViewIcon.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/show">
        演出
        <template #icon="props">
          <img
            :src="props.active ? showViewIcon.active : showViewIcon.inactive"
          />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/my" icon="search"> -->
      <van-tabbar-item icon="search" to="/my">
        我的
        <template #icon="props">
          <img :src="props.active ? MyViewIcon.active : MyViewIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbar: 0,
      showViewIcon: {
        active: require("./assets/icon/show-active.png"),
        inactive: require("./assets/icon/show-inactive.png"),
      },
      homeViewIcon: {
        active: require("./assets/icon/home-active.png"),
        inactive: require("./assets/icon/home-inactive.png"),
      },
      MyViewIcon: {
        active: require("./assets/icon/My-active.png"),
        inactive: require("./assets/icon/My-inactive.png"),
      },
      MovieViewIcon: {
        active: require("./assets/icon/movie-active.png"),
        inactive: require("./assets/icon/movie-inactive.png"),
      },
    };
  },
};
</script>

<style lang="less">
</style>
