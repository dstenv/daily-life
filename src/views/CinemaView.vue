<template>
  <div class="cinema">
    <!-- 这里加个container是因为滚动后,点击购票,弹出购票页面时,不会回到顶部,并且购票页面长度100% 但只有视图高度100% -->
    <div class="container" v-if="!buying">
      <div class="top">
        <div class="left" @click="$router.go(-1)">
          <svg
            t="1665487757732"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3127"
            width="21"
            height="21"
          >
            <path
              d="M929.70745 487.72513 167.942967 487.72513l358.793666-318.918493c12.390191-11.012821 13.505595-29.982872 2.493797-42.37204-11.010775-12.388145-29.979802-13.506619-42.369993-2.492774L74.839499 490.168786c-6.407943 5.695722-10.073426 13.859659-10.073426 22.432918 0 8.573259 3.665483 16.737196 10.073426 22.432918l412.019914 366.227985c5.717212 5.082762 12.83533 7.581676 19.926842 7.581676 8.275477-0.002047 16.515139-3.403516 22.443152-10.07445 11.012821-12.389168 9.897418-31.359218-2.493797-42.37204L179.893136 548.100196l749.814314 0c16.575514 0 30.013571-13.612019 30.013571-30.187533S946.283987 487.72513 929.70745 487.72513z"
              p-id="3128"
              fill="#8e8e8e"
            ></path>
          </svg>
        </div>
        <div class="center">影院</div>
        <div class="right">
          <svg
            t="1665487913334"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4418"
            width="25"
            height="25"
          >
            <path
              d="M886.569466 242.750743c-8.213056-10.284227-28.167526-30.750351-30.825053-32.767288-2.052752-1.556449-4.179183-4.64581-7.450692-7.832386-18.47784-17.995863-61.873186-51.460022-126.468366-51.460022-66.850547 0-139.318022 35.724643-210.416314 105.994056-71.098291-70.26839-143.565766-105.994056-210.416314-105.994056-64.596204 0-107.990526 33.464159-126.468366 51.460022-3.27151 3.186576-5.398964 6.274914-7.450692 7.832386-2.657526 2.016937-22.611997 22.48306-30.826076 32.767288C88.247368 302.856679 65.914734 365.368408 75.656609 433.852152c33.679054 236.367359 405.314189 440.549691 421.846724 448.989921l13.905708 7.103792 13.905708-7.103792c16.532535-8.44023 388.168694-212.621539 421.846724-448.989921C956.902324 365.368408 934.570713 302.856679 886.569466 242.750743zM892.996852 426.133354c-26.287713 184.551226-310.75558 362.010941-381.587811 400.890436-70.833255-38.879496-355.300099-216.33921-381.588835-400.890436-8.893554-62.389956 14.68956-118.984928 75.210959-176.460967 0.346901-0.453325 34.05256-44.281529 95.962585-44.281529 57.610092 0 121.148198 37.096896 188.799994 110.223381l21.615297 23.353894 21.615297-23.353894c67.651796-73.126484 131.189901-110.223381 188.801017-110.223381 61.909002 0 95.615685 43.828204 95.961562 44.281529C878.308315 307.148425 901.89143 363.743398 892.996852 426.133354z"
              p-id="4419"
              fill="#8e8e8e"
            ></path>
          </svg>
          <svg
            v-if="false"
            t="1665487968713"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4968"
            width="25"
            height="25"
          >
            <path
              d="M511.512906 887.046838a33.441647 33.441647 0 0 1-13.183254-2.706645c-16.395412-7.030114-401.51977-175.810145-401.519769-494.309082 0-139.547243 113.532753-253.077949 253.077949-253.077949 59.418274 0 116.882034 21.10262 162.110121 58.778708 45.228087-37.675064 102.691847-58.778708 162.110122-58.778708 139.550313 0 253.083066 113.530706 253.083065 253.077949 0 318.52145-386.088312 487.293295-402.521586 494.320339a33.467229 33.467229 0 0 1-13.156648 2.695388z"
              p-id="4969"
              fill="#d81e06"
            ></path>
          </svg>
        </div>
      </div>
      <div class="info">
        <div class="left">
          <p class="nm">{{ nm }}</p>
          <p class="addr">{{ addr }}</p>
        </div>
        <div class="right">
          <span>&gt;</span>
          <span>
            <svg
              t="1665625538920"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4158"
              width="30"
              height="30"
            >
              <path
                d="M503.466667 870.4l-196.266667-196.266667-4.266667-4.266666-4.266666-4.266667c-51.2-55.466667-85.333333-132.266667-85.333334-217.6C213.333333 273.066667 358.4 128 533.333333 128S853.333333 273.066667 853.333333 448c0 85.333333-34.133333 162.133333-85.333333 217.6l-204.8 204.8-29.866667 29.866667-29.866666-29.866667z m29.866666-29.866667l196.266667-196.266666c51.2-51.2 81.066667-119.466667 81.066667-196.266667C810.666667 294.4 686.933333 170.666667 533.333333 170.666667S256 294.4 256 448c0 76.8 29.866667 145.066667 76.8 192l200.533333 200.533333z m0-243.2C452.266667 597.333333 384 529.066667 384 448S452.266667 298.666667 533.333333 298.666667 682.666667 366.933333 682.666667 448 614.4 597.333333 533.333333 597.333333z m0-42.666666c59.733333 0 106.666667-46.933333 106.666667-106.666667S593.066667 341.333333 533.333333 341.333333 426.666667 388.266667 426.666667 448s46.933333 106.666667 106.666666 106.666667z"
                fill="#1296db"
                p-id="4159"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div class="vip-card">
        <p class="head">折扣卡</p>
        <p class="text">开卡享优惠</p>
      </div>
      <div class="movies">
        <div class="model">
          <svg
            t="1665632814590"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5168"
            width="23"
            height="23"
          >
            <path
              d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
              fill="#ffffff"
              p-id="5169"
            ></path>
            <path
              d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
              fill="#ffffff"
              p-id="5170"
            ></path>
            <path
              d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
              fill="#ffffff"
              p-id="5171"
            ></path>
            <path
              d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
              fill="#ffffff"
              p-id="5172"
            ></path>
          </svg>
        </div>
        <div class="select-svg">
          <svg
            t="1665632953866"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6185"
            width="20"
            height="20"
          >
            <path
              d="M71.675 893.33l440.325-762.683 440.325 762.683z"
              p-id="6186"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <ul
          class="list"
          @touchstart="startX = $event.touches[0].clientX"
          @touchend="move($event)"
          :style="{
            left: -movieIndex * 110 + 55 + 65 + 'rem',
            width: movies.length * 140 + 100 + 'rem',
          }"
        >
          <li
            v-for="(item, index) in movies"
            :key="index"
            :class="{ active: index === movieIndex }"
            @click="movieIndex = index"
          >
            <img :src="item.img" alt="" />
          </li>
        </ul>
      </div>
      <div class="movie-info">
        <p class="head">
          <span class="name" v-if="movies[movieIndex]">{{
            movies[movieIndex].nm
          }}</span>
          <span class="score" v-if="movies[movieIndex]">{{
            movies[movieIndex].sc
          }}</span>
          <span class="text">分</span>
        </p>
        <p class="bottom" v-if="movies[movieIndex]">
          {{ movies[movieIndex].desc }}
        </p>
      </div>

      <div class="dates" v-if="movies.length > 0">
        <div
          class="date"
          v-for="(item, index) in movies[movieIndex].shows"
          :key="index"
          :class="{ active: showIndex === index }"
          @click="showIndex = index"
        >
          <span>{{ item.showDate.split("-")[1] }}月</span>
          <span>{{ item.showDate.split("-")[2] }}日</span>
        </div>
      </div>

      <ul class="plist" v-if="movies.length > 0">
        <li
        class="session"
          v-for="(item, index) in movies[movieIndex].shows[showIndex].plist"
          :key="index"
        >
          <div class="left">
            <div class="time">
              <p class="in">
                {{ item.tm }}
              </p>
              <p class="out">20:20散场</p>
            </div>
            <div class="p-info">
              <p class="p-top">{{ item.lang + item.tp }}</p>
              <p class="p-bottom">{{ item.th }}</p>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <div class="base">￥{{ item.baseSellPrice }}</div>
              <div class="vip">
                <div class="text">折扣卡</div>
                <div class="v-price">￥{{ item.vipPrice }}</div>
              </div>
            </div>
            <div
              class="tobuy"
              @click="
                buying = true;
                pIndex = index;
              "
            >
              购票
            </div>
          </div>
        </li>
         <li class="no-movie" v-if="movies[movieIndex].shows[showIndex].plist.length == 0">
        暂无场次
      </li>
      </ul>
     
    </div>

    <select-view
      v-if="buying"
      :cinema="nm"
      :movie="movies[movieIndex].nm"
      :showInfo="date"
      :th="
        this.movies[this.movieIndex].shows[this.showIndex].plist[this.pIndex].th
      "
      @close-select="buying = false"
    ></select-view>
  </div>
</template>

<script>
import SelectView from "./SelectView.vue";
export default {
  components: {
    SelectView,
  },
  
  data() {
    return {
      buying: false,
      pIndex: 0, //场次

      cinemaId: this.$route.params.id,
      nm: "",
      addr: "",
      movies: [],
      movieIndex: 0, //电影
      startX: 0,
      movex: 0,
      showIndex: 0, //日期
    };
  },
  computed: {
    movieId() {
      return this.movies.length > 0
        ? this.movies.find((o, index) => index === this.movieIndex).id
        : this.$route.query.movieId;
    },
    date() {
      return (
        this.movies[this.movieIndex].shows[this.showIndex].showDate.split(
          "-"
        )[1] +
        "月" +
        this.movies[this.movieIndex].shows[this.showIndex].showDate.split(
          "-"
        )[2] +
        "日" +
        " " +
        this.movies[this.movieIndex].shows[this.showIndex].plist[this.pIndex]
          .tm +
        " " +
        this.movies[this.movieIndex].shows[this.showIndex].plist[this.pIndex]
          .lang +
        this.movies[this.movieIndex].shows[this.showIndex].plist[this.pIndex].tp
      );
    },
  },
  created() {
    Promise.all([
      this.axios.get("https://apis.netstart.cn/maoyan/cinema/detail", {
        params: {
          cinemaId: this.cinemaId,
        },
      }),
      this.axios.get("https://apis.netstart.cn/maoyan/cinema/shows", {
        params: {
          cinemaId: this.cinemaId,
        },
      }),
    ]).then(([m, n]) => {
      this.nm = m.data.data.nm;
      this.addr = m.data.data.addr;
      this.movies = n.data.data.movies;
      this.movieIndex = this.movies
        .map((o) => o.id)
        .findIndex((i) => 
          i == this.$route.query.mId
        );
        console.log('111',this.movies
        .filter((o) => o.id))
      if (this.movieIndex === -1) this.movieIndex = 0;
    });
  },
  methods: {
    move(e) {
      this.movex = e.changedTouches[0].clientX - this.startX;
      console.log("移动了", this.movex);

      if (this.movex > 0) {
        // 应该滑到上一张

        if (this.movieIndex > 0) {
          this.movieIndex--;
        }
      } else if (this.movex === 0) {
        this.movex = 0;
        return;
      } else {
        // 应该滑到下一张
        if (this.movieIndex < this.movies.length - 1) {
          this.movieIndex++;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cinema {
  overflow: hidden;
}
.top {
  display: flex;
  padding: 10rem;
  background: #fafafa;
  align-items: center;
  .left {
  }
  .center {
    padding-left: 3rem;
    flex-grow: 1;
    font-size: 20rem;
  }
  .right {
  }
}

.info {
  padding: 10rem 0;
  display: flex;
  justify-content: space-between;
  .left {
    padding-left: 15rem;
    p.nm {
      font-weight: 600;
      font-size: 17rem;
    }
    p.addr {
      padding: 5rem 0;
      font-size: 14rem;
      color: #8e8e8e;
    }
  }
  .right {
    display: flex;
    align-items: center;
    span {
      font-size: 20rem;
      padding: 0 10rem;
    }
  }
}
.vip-card {
  background-color: #fff7ec;
  margin: 0 15rem;
  padding: 8rem 20rem;
  color: #f69a0e;
  border-radius: 10rem;
  p.head {
    font-size: 15rem;
    font-weight: 700;
  }
  p.text {
    font-size: 12rem;
  }
}
.movies {
  background-color: #212821;
  padding: 10rem 0 13rem;
  margin: 15rem 0;
  position: relative;

  .model {
    position: absolute;
    top: 10rem;
    left: 10rem;
  }
  .select-svg {
    position: absolute;
    bottom: -8rem;
    left: calc(50% - 10px);
  }
  .list {
    overflow: auto;
    display: flex;
    align-items: flex-end;
    position: relative;
    transition: 0.3s all;
    li {
      padding-top: 30rem;
      position: relative;
      flex-basis: 90rem;
      flex-shrink: 0;
      margin: 0 10rem;
      img {
        width: 90rem;
      }
    }
    li.active {
      padding-top: 0;
      border: 2rem solid #fff;
      flex-basis: 120rem;
      img {
        width: 120rem;
      }
    }
  }
}
.movie-info {
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .head {
    padding-bottom: 5rem;
    .name {
      font-size: 15rem;
      padding-right: 5rem;
      font-weight: 700;
    }
    .score {
      font-size: 15rem;
      color: #eb9c25;
    }
    .text {
      color: #eb9c25;
      font-size: 12rem;
    }
  }
  .bottom {
    color: #9a9696;
  }
}
.dates {
  padding-left: 10rem;
  display: flex;
  border-top: solid 2rem #fafafa;
  border-bottom: solid 2rem #fafafa;
  .date {
    padding: 10rem;
    font-size: 15rem;
    &.active {
      border-bottom: #ec6627 2rem solid;
      color: #ec6627;
    }
  }
}

ul.plist {
  li.session {
    border-top: solid 2rem #fafafa;
    padding: 10rem;
    padding-top: 15rem;
    padding-left: 0;
    margin-left: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .time {
        .in {
          font-size: 20rem;
          padding-bottom: 10rem;
        }
        .out {
          color: #8e8e8e;
        }
        padding-right: 15rem;
      }
      .p-info {
        .p-top {
          font-size: 14rem;
          color: #2b2d2b;
          padding-bottom: 10rem;
        }
        .p-bottom {
          color: #8e8e8e;
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .base {
          font-size: 18rem;
          color: #fe5200;
          margin-bottom: 5rem;
        }
        .vip {
          border-radius: 5rem;
          display: flex;
          .text {
            padding: 2rem;
            color: #fff;
            background: #ff9000;
            border-top-left-radius: 3rem;
            border-bottom-left-radius: 3rem;
          }
          .v-price {
            padding: 1rem;
            padding-left: 0;
            padding-right: 2rem;
            border: 1rem solid #fe5200;
            border-left: none;
            border-top-right-radius: 3rem;
            border-bottom-right-radius: 3rem;
            color: #ff9000;
          }
        }
      }
      .tobuy {
        margin-left: 30rem;
        padding: 5rem 15rem;
        border: #ec6627 2rem solid;
        border-radius: 4rem;
        color: #ec6627;
        font-size: 15rem;
      }
    }
  }
  .no-movie{
  padding: 50rem 0;
  text-align: center;
  font-size: 17rem;
}
}


</style>