<template>
  <div class="city-view">
    <div class="container">
      <div class="top">
        <svg
        @click="$router.go(-1)"
          t="1665214983238"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2524"
          width="20"
          height="20"
        >
          <path
            d="M939.880137 487.72513l-782.215258 0 358.804922-318.92975c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.505595-42.367947-2.492774L64.602344 490.13911c-6.407943 5.693676-10.073426 13.858636-10.073426 22.430872s3.665483 16.737196 10.073426 22.430872l411.993309 366.204449c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947L169.687704 548.100196 939.880137 548.100196c16.57449 0 30.011524-13.613042 30.011524-30.187533S956.454628 487.72513 939.880137 487.72513z"
            p-id="2525"
            fill="#111111"
          ></path>
        </svg>
        <span style="padding-left: 5rem;">选择城市</span>
      </div>

      <div class="s-input">
        <div class="contain">
          <svg
            t="1663751679776"
            width="20rem"
            height="20rem"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4778"
          >
            <path
              d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"
              p-id="4779"
              fill="#c9c9c9"
            ></path>
          </svg>
          <input
            ref="input"
            type="text"
            placeholder="城市名 拼音首字母"
            v-model="inputNow"
            @focus="searching = true"
            @keyup.enter="toSearch"
          />
        </div>
      </div>
    </div>

    <div class="tmp"></div>
    <div class="main">
      <div class="now">
        <span class="cityName">{{ $store.state.cityName }}</span>
        <span class="text">当前定位城市</span>
      </div>

      <van-index-bar :index-list="indexList" v-if="!searching">
        <van-index-anchor index="热门" />
        <van-cell title="北京" @click="toSelect({nm:'北京',id: 1})" />
        <van-cell title="上海" @click="toSelect({nm:'上海',id: 10})" />
        <van-cell title="广州" @click="toSelect({nm:'广州',id: 20})" />

        <van-index-anchor index="A" />
        <van-cell
          v-for="item in getCts('a')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="B" />
        <van-cell
          v-for="item in getCts('b')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="C" />

        <van-cell
          v-for="item in getCts('c')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="D" />
        <van-cell
          v-for="item in getCts('d')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="E" />
        <van-cell
          v-for="item in getCts('e')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="F" />
        <van-cell
          v-for="item in getCts('f')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="G" />
        <van-cell
          v-for="item in getCts('g')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="H" />
        <van-cell
          v-for="item in getCts('h')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />

        <van-index-anchor index="J" />
        <van-cell
          v-for="item in getCts('j')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="K" />
        <van-cell
          v-for="item in getCts('k')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="L" />
        <van-cell
          v-for="item in getCts('l')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="M" />
        <van-cell
          v-for="item in getCts('m')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="N" />
        <van-cell
          v-for="item in getCts('n')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="P" />
        <van-cell
          v-for="item in getCts('p')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="Q" />
        <van-cell
          v-for="item in getCts('q')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="R" />
        <van-cell
          v-for="item in getCts('r')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="S" />
        <van-cell
          v-for="item in getCts('s')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />

        <van-index-anchor index="T" />
        <van-cell
          v-for="item in getCts('t')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />

        <van-index-anchor index="W" />
        <van-cell
          v-for="item in getCts('w')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="X" />
        <van-cell
          v-for="item in getCts('x')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="Y" />
        <van-cell
          v-for="item in getCts('y')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
        <van-index-anchor index="Z" />
        <van-cell
          v-for="item in getCts('z')"
          :key="item.id"
          :title="item.nm"
          @click="toSelect(item)"
        />
      </van-index-bar>

      <div class="searchRes" v-if="searching">
        <div
          class="res"
          v-for="item in res"
          :key="item.id"
          @click="toSelect(item)"
        >
          {{ item.nm }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputNow: "",
      cts: [],
      indexList: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",

        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      ctsName: [],
      res: [],
      searching: false,
    };
  },
  created() {
    // this.axios.get('/text/dianying/cities.json').then((res)=>{
    this.axios.get("./city.json").then((res) => {
      this.cts = res.data.cts;
    });
  },
  computed: {},
  methods: {
    getCts(n) {
      return this.cts.filter((o) => o.py.charAt(0) === n);
    },
    toSelect(n) {
      console.log('城市信息 --> ', n);
      this.$store.commit('changeCityId', n.id)
      this.$store.commit('changeCityName', n.nm)
      this.$router.push('/home')
    },
    toSearch() {
      this.cts.filter((o) => o.nm);
      let tmp = this.cts.filter((o) => o.nm.includes(this.inputNow));
      console.log(this.inputNow, tmp);
      this.res = tmp;
    },
  },
};
</script>

<style lang="less" >
.container {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  border-bottom: 1rem solid #8e8e8e;
  .top {
    display: flex;
    align-items: center;
    padding: 10rem;
    border-bottom: 1rem #8e8e8e solid;
    span {
      font-size: 17rem;
    }
  }
  .s-input {
    padding: 5rem 10rem;
    background: #fff;

    .contain {
      display: flex;
      align-items: center;
      position: relative;
      border: 1rem #8e8e8e solid;
      border-radius: 20rem;
      overflow: hidden;
      svg {
        position: relative;

        left: 10rem;
      }

      span {
        min-width: 50rem;
        text-align: center;

        font-size: 15rem;
      }
      input {
        width: 100%;
        height: 20rem;

        line-height: 20rem;
        border: 0;
        font-size: 14rem;
        padding: 15rem;

        &:focus {
          outline: none;
        }
      }
    }
  }
}
.tmp {
  height: 87rem;
  width: 100%;
}
.res {
  font-size: 14rem;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10rem 16rem;
  overflow: hidden;
  color: #323233;
  border-bottom: 1rem solid #8e8e8e;

  line-height: 24rem;
  background-color: #fff;
}

.now {
  padding: 8rem 10rem;
  background-color: #f0efef;
  display: flex;
  align-items: center;

  .cityName {
    font-size: 17rem;
  }
  .text {
    font-size: 15rem;
    color: #8e8e8e;
    margin-left: 20rem;
  }
}

.van-index-anchor {
  background-color: #e0dfd8 !important;
}
.van-cell{
  border-bottom: 1rem solid #8e8e8e;
}
</style>