<template>
  <div>
    <div class="title">
      <router-link tag="div" to="/movie">返回</router-link>
      <div class="title-item">

        <div class="title-item-list">全部热映</div>
        <router-link tag="div" to="/comingsoon" class="title-item-item"
          >即将上映</router-link
        >
      </div>
    </div>
    <div class="Refresh"></div>
    <div class="Film-content">
      <div v-for="l in lists" :key="l.id" class="film">
        <div class="Film-img"><img :src="l.img" alt="" /></div>
        <div class="film-text">
          <div class="film-lock">
            <div class="film-name">{{ l.nm }}</div>
            <div class="Film-rating">{{ l.mk }}分</div>
          </div>
          <div class="film-lock">
            <div class="Film-Introduction">
              <div>{{ l.boxInfo }}</div>
              <div>{{ l.desc }}</div>
            </div>
          </div>
          <div class="Tickets">购票</div>
        </div>
      </div>
    </div>
    <div class="load">下拉加载更多</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.axios.get("/abc/mmdb/movie/v3/list/hot.json").then(({ data }) => {
        console.log(data.data.hot);
        this.lists = data.data.hot;
      });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}

.title-item {
  margin-left: 72rem;
  display: flex;
  background-color: #eee;
  width: 120rem;
  height: 24rem;
  text-align: center;
  line-height: 24rem;
  border-radius: 6rem;
  position: relative;
}

.title-item-list {
  position: absolute;
  text-align: center;
  line-height: 18rem;
  margin-right: 6rem;
  width: 60rem;
  height: 18rem;
  background-color: #fff;
  top: 4rem;
  left: 5rem;
  border-radius: 5rem;
}

.title-item-item {
  position: absolute;
  top: 0;
  right: 0px;
  width: 60rem;
  height: 18rem;
}

.film {
  margin-top: 24rem;
  display: flex;
  margin: 6rem;
  height: 84rem;
  position: relative;
}

.Film-img {
  width: 60rem;
  height: 84rem;
  background-color: #eee;
}

.Film-img img {
  display: block;
  width: 100%;
  height: 100%;
}

.film-name {
  width: 168rem;
  overflow: hidden;
  height: 20rem;
  text-overflow: ellipsis;
}

.film-lock {
  display: flex;
  height: 36rem;
}

.Film-rating {
  color: orange;
}

.Film-Introduction {
  margin-left: 6rem;
  font-size: 14rem;
  color: gray;
}

.Tickets {
  position: absolute;
  width: 36rem;
  height: 24rem;
  bottom: 12rem;
  right: 0;
  text-align: center;
  line-height: 24rem;
  border: 1rem solid orange;
}

.Refresh {
  width: 100%;
  height: 1.5rem;
  background-color: #ddd;
  margin-top: 1rem;
}

.load{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ddd;
    width: 100%;
    text-align: center;

}
</style>