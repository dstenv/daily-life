<template>
  <div class="main">
    <div class="top" v-if="type == true">{{ th }}银幕</div>
    <div class="top show" v-if="type == false">舞台中央</div>
    <div class="select">
      <ul class="seats">
        <li
          class="row-seats"
          v-for="(seat, index) in seats"
          :key="index"
          @click="ClickSeat(index)"
        >
          <!-- 未被购买 且 未选中 -->
          <svg
            v-if="!haveBuy.includes(index) && !seat"
            t="1665666448529"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6701"
            width="22"
            height="22"
          >
            <path
              d="M861.090909 442.181818h-46.545454V209.454545H209.454545v232.727273H162.909091V162.909091h698.181818z"
              fill="#17abe3"
              p-id="6702"
            ></path>
            <path
              d="M954.181818 907.636364H721.454545v-69.818182H302.545455v69.818182H69.818182V395.636364h232.727273v186.181818h418.90909v-186.181818h232.727273v512z m-186.181818-46.545455h139.636364V442.181818h-139.636364v186.181818H256v-186.181818H116.363636v418.909091h139.636364v-69.818182h512v69.818182z"
              fill="#17abe3"
              p-id="6703"
            ></path>
          </svg>
          <svg
            v-if="seat && !haveBuy.includes(index)"
            t="1665735205631"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8159"
            width="22"
            height="22"
          >
            <path
              d="M861.090909 418.909091h-46.545454V186.181818H209.454545v232.727273H162.909091V139.636364h698.181818z"
              fill="#d81e06"
              p-id="8160"
            ></path>
            <path
              d="M954.181818 884.363636H721.454545v-69.818181H302.545455v69.818181H69.818182V372.363636h232.727273v186.181819h418.90909v-186.181819h232.727273v512z m-186.181818-46.545454h139.636364V418.909091h-139.636364v186.181818H256v-186.181818H116.363636v418.909091h139.636364v-69.818182h512v69.818182z"
              fill="#d81e06"
              p-id="8161"
            ></path>
            <path
              d="M505.018182 505.018182l-118.690909-79.127273 25.6-39.563636 79.127272 53.527272 130.327273-193.163636 39.563637 25.6z"
              fill="#d81e06"
              p-id="8162"
            ></path>
          </svg>
          <!-- 已被购买 -->
          <svg
            v-if="haveBuy.includes(index)"
            t="1665735804494"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8646"
            width="22"
            height="22"
          >
            <path
              d="M861.090909 442.181818h-46.545454V209.454545H209.454545v232.727273H162.909091V162.909091h698.181818z"
              fill="#111111"
              p-id="8647"
            ></path>
            <path
              d="M954.181818 907.636364H721.454545v-69.818182H302.545455v69.818182H69.818182V395.636364h232.727273v186.181818h418.90909v-186.181818h232.727273v512z m-186.181818-46.545455h139.636364V442.181818h-139.636364v186.181818H256v-186.181818H116.363636v418.909091h139.636364v-69.818182h512v69.818182z"
              fill="#111111"
              p-id="8648"
            ></path>
          </svg>
        </li>
        <li class="rows">
          <div class="row" v-for="(o, index) in rows" :key="index">
            {{ index + 1 }}
          </div>
        </li>
      </ul>
      <div class="example">
        <div class="no-buy">
          <svg
            t="1665666448529"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6701"
            width="22"
            height="22"
          >
            <path
              d="M861.090909 442.181818h-46.545454V209.454545H209.454545v232.727273H162.909091V162.909091h698.181818z"
              fill="#17abe3"
              p-id="6702"
            ></path>
            <path
              d="M954.181818 907.636364H721.454545v-69.818182H302.545455v69.818182H69.818182V395.636364h232.727273v186.181818h418.90909v-186.181818h232.727273v512z m-186.181818-46.545455h139.636364V442.181818h-139.636364v186.181818H256v-186.181818H116.363636v418.909091h139.636364v-69.818182h512v69.818182z"
              fill="#17abe3"
              p-id="6703"
            ></path>
          </svg>
          <span> 可选 </span>
        </div>
        <div class="have-buy">
          <svg
            t="1665735804494"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8646"
            width="22"
            height="22"
          >
            <path
              d="M861.090909 442.181818h-46.545454V209.454545H209.454545v232.727273H162.909091V162.909091h698.181818z"
              fill="#111111"
              p-id="8647"
            ></path>
            <path
              d="M954.181818 907.636364H721.454545v-69.818182H302.545455v69.818182H69.818182V395.636364h232.727273v186.181818h418.90909v-186.181818h232.727273v512z m-186.181818-46.545455h139.636364V442.181818h-139.636364v186.181818H256v-186.181818H116.363636v418.909091h139.636364v-69.818182h512v69.818182z"
              fill="#111111"
              p-id="8648"
            ></path>
          </svg>
          <span> 不可选 </span>
        </div>
      </div>
    </div>
    <div class="please-buy" v-if="buying.length === 0">
      <div class="text">请先选座</div>
    </div>
    <div class="buying" v-if="buying.length > 0">
      <div class="b-top">已选座位</div>
      <ul class="center">
        <li v-for="item in buying" :key="'a' + item">
          <div class="seat">{{ SeatText(item) }}</div>
          <div class="price">￥42</div>
          <div class="semicircle"></div>
          <div class="cancel" @click="ChcelSeat(item)">
            <svg
              t="1665739802939"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9691"
              width="10"
              height="10"
            >
              <path
                d="M556.736893 512.149956L1014.402812 54.184126c12.396368-12.396368 12.396368-32.490481 0-44.88685-12.396368-12.396368-32.490481-12.396368-44.88685 0L511.850044 467.263107 54.184126 9.597188C41.787757-2.79918 21.693644-2.79918 9.297276 9.597188c-12.396368 12.396368-12.396368 32.490481 0 44.88685l457.665918 457.665918L9.297276 969.815874c-12.396368 12.396368-12.396368 32.490481 0 44.88685 6.198184 6.198184 14.295812 9.297276 22.39344 9.297276s16.195255-3.099092 22.393439-9.297276L511.850044 557.036806l457.665918 457.665918c6.198184 6.198184 14.295812 9.297276 22.39344 9.297276 8.097628 0 16.195255-3.099092 22.393439-9.297276 12.396368-12.396368 12.396368-32.490481 0-44.88685L556.736893 512.149956z"
                fill="#8e8e8e"
                p-id="9692"
              ></path>
            </svg>
          </div>
        </li>
      </ul>
      <div class="sure" @click="SureBuy">
        ￥{{ 42 * buying.length + " " }}确认选座
      </div>
    </div>
  </div>
</template>

import { Toast } from 'vant';
<script>
export default {
  props: {
    // 是电影true还是演出false
    type: Boolean,
    th: String,
  },
  data() {
    return {
      seats: [],
      rows: [],

      row: 0,
      column: 0,

      buying: [],
    };
  },
  computed: {
    rowNum() {
      if (this.type == true) return 8;
      else return 12;
    },
    haveBuy() {
      return this.$store.state.haveBuy;
    },
  },
  created() {
    this.seats = new Array(this.rowNum * this.rowNum).fill(false);
    this.rows = new Array(this.rowNum);
  },
  methods: {
    SureBuy() {
      this.$store.commit("changeHaveBuy", [...this.haveBuy, ...this.buying]);
      localStorage.setItem('haveBuy',JSON.stringify(this.haveBuy))
      this.$toast('成功购买')
      this.$emit('close-select')
    },
    SeatText(index) {
      let row, column;
      if ((index + 1) % this.rowNum === 0) {
        row = (index + 1) / this.rowNum;
      } else {
        row = Math.floor((index + 1) / this.rowNum) + 1;
      }
      column = (index % this.rowNum) + 1;

      return row + "排" + column + "座";
    },
    ChcelSeat(index) {
      this.seats[index] = false;
      //   如果是取消购买
      this.buying = [
        ...this.buying.filter(
          (b, i) => i !== this.buying.findIndex((o) => o === index)
        ),
      ];

      this.seats = [...this.seats];
    },
    ClickSeat(index) {
      // 是已购买的座位
      if (this.haveBuy.includes(index)) return;

      if ((index + 1) % this.rowNum === 0) {
        this.row = (index + 1) / this.rowNum;
      } else {
        this.row = Math.floor((index + 1) / this.rowNum) + 1;
      }
      this.column = (index % this.rowNum) + 1;

      console.log(this.row + "行" + this.column + "列");

      this.seats[index] = !this.seats[index];
      //   如果是选择购买
      if (this.seats[index] === true) this.buying.push(index);
      //   如果是取消购买
      else {
        this.buying = [
          ...this.buying.filter(
            (b, i) => i !== this.buying.findIndex((o) => o === index)
          ),
        ];
      }
      this.seats = [...this.seats];
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    background-color: #dcdcdc;
    color: #8e8e8e;
    padding: 5rem;
    width: 200rem;
    text-align: center;
    border-bottom-left-radius: 20rem;
    border-bottom-right-radius: 20rem;
    &.show {
      width: 250rem;
    }
  }
  .select {
    width: 100%;
    height: 500rem;

    .seats {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      padding: 50rem;
      margin-left: 10rem;
      justify-content: center;
      .rows {
        display: flex;
        flex-direction: column;
        top: 50rem;
        left: 20rem;
        position: absolute;
        background-color: #cccccc;
        padding: 10rem 5rem;
        border-radius: 10rem;
        .row {
          padding-bottom: 13rem;
        }
      }
      .row-seats {
        display: flex;
        flex-basis: 33rem;
        padding-top: 5rem;

        .seat {
        }
      }
    }
    .example {
      display: flex;
      padding-top: 50rem;
      justify-content: center;
      div {
        padding-right: 10rem;
        display: flex;
        align-items: center;
        span {
          padding-left: 5rem;
        }
      }
    }
  }
  .please-buy {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10rem 15rem;
    background-color: #fff;
    .text {
      color: #fff;
      background-color: #f7dbb3;
      padding: 15rem 80rem;
      font-size: 20rem;
      text-align: center;
      border-radius: 7rem;
    }
  }
  .buying {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15rem;
    background-color: #fff;
    .b-top {
      font-size: 16rem;
    }
    .center {
      display: flex;
      padding: 15rem 0;
      flex-wrap: wrap;
      li {
        margin-right: 8rem;
        position: relative;
        flex-basis: 92rem;
        flex-shrink: 0;
        border-top: solid 1rem #dadada;
        border-bottom: solid 1rem #dadada;
        border-left: solid 1rem #fafafa;
        border-right: solid 1rem #fafafa;
        padding-right: 15rem;
        margin-bottom: 15rem;
        .seat {
          padding: 3rem 20rem 5rem 5rem;
          font-size: 16rem;
        }
        .price {
          color: #e2654d;
        }
        .semicircle {
          position: absolute;
          left: -7rem;
          border-radius: 50%;
          width: 14rem;
          height: 14rem;
          border-right: solid 1rem #fafafa;
        }
        .cancel {
          position: absolute;
          right: 5rem;
          top: 14rem;
        }
      }
    }
    .sure {
      background-color: #fe9900;
      color: #fff;
      font-size: 20rem;
      text-align: center;
      padding: 15rem 0;
      border-radius: 5rem;
    }
  }
}
</style>