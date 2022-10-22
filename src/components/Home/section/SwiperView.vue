<template>
  <div class="bosiing">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in swiper" :key="image.adId">
        <img v-lazy="image.image" />
      </van-swipe-item>
    </van-swipe>
    <div class="search">
      <div class="search-one" @click="$router.push('/city')">
        {{ $store.state.cityName }}<van-icon name="arrow-down" />
      </div>
      <div class="inp" v-if="!this.$route.meta.hiddenTop">
        <van-icon name="search" class="searchicon" />
        <input
          class="inptext"
          type="text"
          placeholder="搜索电影、演出、艺人、影院"
          @focus="$router.push('/search')"
        />
      </div>

        <div class="rili" @click="timeroter" >
          <div class="timeDate">{{ time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiper: [],
    };
  },
  computed: {
    time() {
      return new Date().getDate();
    },
    cityId() {
      return this.$store.state.cityId;
    },
  },
  watch: {
    cityId() {
      this.created();
    },
  },
  created() {
    this.axios
      .get("/iswu/api/position/detail", {
        params: {
          positionIds: 1042,
          clientType: "android",
          channelId: 80001,
          ci: this.cityId,
        },
      })
      .then((res) => {
        this.swiper = res.data.data[0].config;
      });
  },
  methods: {
    timeroter() {
      this.$router.push("/CalendarView");
    },
  },
};
</script>

<style lang="less" scoped>
.bosiing {
  position: relative;

  .search {
    display: flex;
    position: fixed;
    padding: 13rem 15rem;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(171, 171, 171, 0.8);
    z-index: 2;
    font-size: 14rem;

    .inp {
      width: 250rem;
      height: 35rem;
      border-radius: 35rem;
      background-color: rgb(255, 255, 255);
      margin: -7rem 10rem;

      .searchicon {
        font-size: 16rem;
        margin: 10rem 10rem;
      }

      .inptext {
        width: 200rem;
      }
    }
    
       .rili {
      width: 30rem;
      height: 30rem;
      background-image: url(@/assets/icon/2.png);
      background-size: 100% 100%;
      background-color: white;
      border-radius: 7rem;
      margin: -4rem 0 0 0;

      .timeDate {
        text-align: center;
        margin: 10rem 0 0 0;
        color: red;
      }
    } 
    
    
  }
}
input {
  padding: 0;
  margin: 0;
  /* 内边距 */
  border: none;
  /* 内部颜色 */
  background-color: transparent;
  /* 外边距 */
  outline: none;
}
</style>