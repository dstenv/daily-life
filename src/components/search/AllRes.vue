<template>
  <div class="all">
    <div class="top" v-if="Num === 0">
      <svg
      @click="$emit('close-all')"
        t="1665151406432"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5575"
        width="25"
        height="25"
      >
        <path
          d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
          p-id="5576"
          fill="#e98f36"
        ></path>
      </svg>
      <p>相关电影/电视剧/综艺</p>
    </div>
    <div class="top" v-if="Num === 1">
      <svg
       @click="$emit('close-all')"
        t="1665151406432"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5575"
        width="25"
        height="25"
      >
        <path
          d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
          p-id="5576"
          fill="#e98f36"
        ></path>
      </svg>
      <p>相关艺人</p>
    </div>
    <div class="top" v-if="Num === 6">
      <svg
       @click="$emit('close-all')"
        t="1665151406432"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5575"
        width="25"
        height="25"
      >
        <path
          d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
          p-id="5576"
          fill="#e98f36"
        ></path>
      </svg>
      <p>相关演出</p>
    </div>
    <h3 class="head" v-if="Num === 0">{{ total }}部相关电影</h3>
    <h3 class="head" v-if="Num === 1">{{ total }}位相关艺人</h3>
    <h3 class="head" v-if="Num === 6">{{ total }}部相关演出</h3>
    <div class="main" v-if="Num === 0">
      <about-movie-item
        v-for="(movie, index) in aboutAll"
        :item="movie"
        :keyword="keyword"
        :key="index"
      ></about-movie-item>
    </div>

    <div class="main" v-if="Num === 1">
      <about-people-item
        v-for="(movie, index) in aboutAll"
        :item="movie"
        :keyword="keyword"
        :key="index"
      ></about-people-item>
    </div>

    <div class="main" v-if="Num === 6">
      <about-show-item
        v-for="(movie, index) in aboutAll"
        :item="movie"
        :keyword="keyword"
        :key="index"
      ></about-show-item>
    </div>
  </div>
</template>

<script>
import AboutMovieItem from "./AboutMovieItem.vue";
import AboutPeopleItem from "./AboutPeopleItem.vue";
import AboutShowItem from "./AboutShowItem.vue";

export default {
  components: { AboutMovieItem, AboutPeopleItem, AboutShowItem },
  props: {
    Num: Number,
    keyword: String,
  },
  data() {
    return {
      aboutAll: [],
      total: Number,
    };
  },
  created() {
    this.axios
      .get("https://m.dianping.com/gwapp/api/search/integrated/list.json", {
        params: {
          keyword: this.keyword,
          stype: this.Num,
        },
      })
      .then((res) => {
        this.aboutAll = res.data.data[0].list;
        this.total = res.data.data[0].total;
      });
  },
};
</script>

<style lang="less" scoped>
.all{
    background-color: #fafafa;
}
h3 {
  margin: 20rem 0 10rem 15rem;
  color: #c4c3c3;
}
.top{
    display: flex;
    padding: 10rem 0;
    background: #fff;
    border-bottom: 1rem #8e8e8e solid;
    svg{
        margin: 0 10rem;
        position: relative;
        z-index: 5;
    }
    p{
        flex:1;
        font-size: 18rem;
        font-weight: 600;
        margin-left: -30rem;
        text-align: center;
    }
}
</style>