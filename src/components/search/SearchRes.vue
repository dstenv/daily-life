<template>
  <div>
    <h3 class="head">{{ aboutMoives?.total }}部相关电影/电视剧/综艺</h3>
    <about-movie-item
   
      :item="aboutMoives.list[0]"
      :keyword="keyword"
    ></about-movie-item>
    <about-movie-item
   
      :item="aboutMoives?.list[1]"
      :keyword="keyword"
    ></about-movie-item>
    <about-movie-item

      :item="aboutMoives?.list[2]"
      :keyword="keyword"
    ></about-movie-item>

    <h3 class="all" @click="$emit('show-all',0)">查看全部相关电影/电视剧/综艺&gt;</h3>


    <h3 class="head" v-if="aboutPeople?.total">{{ aboutPeople?.total }}位相关艺人</h3>
    <about-people-item
    
      :item="aboutPeople?.list[0]"
      :keyword="keyword"
    ></about-people-item>

    <h3 class="all" v-if="aboutPeople?.total" @click="$emit('show-all',1)">查看全部相关艺人&gt;</h3>
    <h3 class="head"  v-if="aboutCinema">{{ aboutCinema?.total }}个相关影院</h3>
    <about-cinema-item
          v-if="aboutCinema"
      :item="aboutCinema?.list[0]"
      :keyword="keyword"
    ></about-cinema-item>
    <about-cinema-item
      v-if="aboutCinema"
      :item="aboutCinema?.list[1]"
      :keyword="keyword"
    ></about-cinema-item>

    <h3 class="head"  v-if="aboutShow?.total">{{ aboutShow?.total }}场相关演出</h3>
    <about-show-item  v-if="aboutShow" :item="aboutShow?.list[0]">
    </about-show-item>

    <about-show-item   v-if="aboutShow" :item="aboutShow?.list[1]">
    </about-show-item>

    <about-show-item   v-if="aboutShow" :item="aboutShow?.list[2]">

    </about-show-item>

      <h3 class="all"  v-if="aboutShow?.total" @click="$emit('show-all',6)">查看全部相关演出&gt;</h3>
  </div>
</template>

<script>
import AboutCinemaItem from "./AboutCinemaItem.vue";
import AboutMovieItem from "./AboutMovieItem.vue";
import AboutPeopleItem from "./AboutPeopleItem.vue";
import AboutShowItem from "./AboutShowItem.vue";
export default {
  components: {
    AboutMovieItem,
    AboutPeopleItem,
    AboutShowItem,
    AboutCinemaItem,
  },
  props: {
    keyword: String,
  },
  methods: {
    async getData(){
      let {data} = await this.axios
      .get("https://m.dianping.com/gwapp/api/search/integrated/list.json", {
        params: {
          keyword: this.keyword,
          stype: -1,
        },
      })
      this.aboutMoives = data.data.filter((o) => o.type === 0)[0];
      this.aboutPeople = data.data.filter((o) => o.type === 1)[0];
      this.aboutShow = data.data.filter((o) => o.type === 6)[0];
      this.aboutCinema = data.data.filter((o) => o.type === 2)[0];
    }
  },
  data() {
    return {
      aboutMoives: {},
      aboutPeople: {},
      aboutShow: {},
      aboutCinema: {},
    };
  },
  created() {
    this.getData()
    // this.axios
    //   .get("https://m.dianping.com/gwapp/api/search/integrated/list.json", {
    //     params: {
    //       keyword: this.keyword,
    //       stype: -1,
    //     },
    //   })
    //   .then((res) => {

    //     this.aboutMoives = res.data.data.filter((o) => o.type === 0)[0];
    //     this.aboutPeople = res.data.data.filter((o) => o.type === 1)[0];
    //     this.aboutShow = res.data.data.filter((o) => o.type === 6)[0];
    //     this.aboutCinema = res.data.data.filter((o) => o.type === 2)[0];
       
    //   });
    
  },
};
</script>

<style lang="less" scoped>
h3 {
  margin: 20rem 0 10rem 15rem;
}
.head {
  color: #8e8e8e;
}
.all {
  color: rgb(125, 125, 125);
  margin-top: 15rem;
}
</style>