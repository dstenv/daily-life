<template>
  <div>
    <div class="movie-item">
      <div class="movie-item-list">
        <div>返回</div>
        <div>影院</div>
      </div>

      <div>关注</div>
    </div>
    <div class="franchise">{{ desc }}</div>

    <router-link to="/DetailsView" tag="div">
      <div class="address-icon">
        <div class="address-name">
          <div class="address-name-list">{{ items }}</div>
          <div class="address-name-icon">{{ list }}</div>
        </div>
        <div class="address-icon-list">&gt;</div>
        <div class="address-icon-list">地图</div>
      </div>
    </router-link>

    <div class="lis-icon">
      <div class="lis-Package">
        <div>观影套餐</div>
        <div>小吃,周边46元起</div>
      </div>
      <div class="lis-discount">
        <div class="lis-discount-ite">
          <div>折扣卡</div>
          <div>{{ discount }}</div>
        </div>

        <div class="lis-discount-img">
          <img :src="icon" alt="" />
        </div>
      </div>
    </div>

    <div>1111</div>

    <div>
      <div>影院超值套餐</div>

      <div v-for="d in dealList" :key="d.dealId" class="Super-Value">
        <div><img :src="imgList" alt="" /></div>
        <div>
          <div class="Package-Value">
            <div class="Package-Value-titleTag">{{ d.titleTag }}</div>
            <div class="Package-Value-firstTitle">{{ d.firstTitle }}</div>
          </div>

          <div class="Cinema-Value">
            <div class="Cinema-Value-newprice">
              <span>￥</span>{{ d.price }}
            </div>
            <div class="Cinema-Value-oldprice">
              <span>￥</span>{{ d.value }}
            </div>
          </div>
        </div>
        <div class="New-products">
          <div class="curNumberDesc">{{ d.curNumberDesc }}</div>
          <div class="go-buy">去购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: "",
      list: "",
      discount: "",
      icon: "",
      desc: "",
      dealList: [],
      imgList: "",
    };
  },
  created() {
    console.log(this.$route.params.id);
    console.log(this.$store.state.cityId);

    this.getaddress();
    this.getName();
    this.SuperValue();
  },
  methods: {
    getaddress() {
      this.axios
        .get("/abc/mmcs/show/v2/cinema/shows.json", {
          params: {
            cinemaId: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.items = data.data.cinemaName;
        });
    },

    // http://api.maoyan.com/mmcs/cinema/v1/cinema.json

    getName() {
      this.axios
        .get("/abc/mmcs/cinema/v1/cinema.json", {
          params: {
            cinemaId: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.list = data.data.addr;
          this.discount = data.data.vipInfo.desc;
          this.icon = data.data.vipInfo.icon;
          this.desc = data.data.callboardInfo.desc;
        });
    },

    SuperValue() {
      this.axios
        .get("/abc/goods/queryDealList.json", {
          params: {
            cinemaId: this.$route.params.id,
            channel: 12,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.dealList = data.data.dealList;
          this.imgList = data.data.activity.icon;
          // console.log(data.data.activity.icon);
        });
    },
  },
};
</script>

<style scoped>
.movie-item {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
}

.movie-item-list {
  display: flex;
}

.address-icon {
  display: flex;
  justify-content: space-between;
}

.address-icon-list {
  height: 16rem;
  line-height: 36rem;
}

.address-name-list {
  font-size: 16rem;
  font-weight: 600;
}

.address-name-icon {
  font-size: 14px;
  color: #eee;
}

.lis-icon {
  display: flex;
  margin-top: 5rem;
}

.lis-Package {
  width: calc(50%);
  height: 40rem;
  background-color: rgba(255, 192, 203, 0.477);
  margin-left: 20rem;
  margin-right: 10rem;
}

.lis-discount {
  width: calc(50%);
  height: 40rem;
  background-color: rgba(152, 147, 76, 0.477);
  margin-left: 10rem;
  margin-right: 20rem;
  display: flex;
  justify-content: space-between;
}

.lis-discount-img {
  width: 30rem;
  height: 30rem;
  margin-right: 5rem;
  margin-top: 5rem;
}

.lis-discount-img img {
  display: block;
  width: 100%;
}

.swipe-img {
  width: 100rem;
  height: 100rem;
}

.franchise {
  background-color: rgba(250, 246, 189, 0.547);
  font-size: 18px;
  height: 30rem;
  line-height: 30rem;
  padding-left: 10rem;
  color: rgb(166, 170, 76);
}

.Super-Value {
  display: flex;
  padding-left: 10rem;
  position: relative;
}

.Package-Value {
  margin-top: 15rem;
  margin-bottom: 30rem;
  display: flex;
  margin-left: 10rem;
}

.Cinema-Value {
  display: flex;
  margin-left: 10rem;
}

.Package-Value-titleTag {
  background-color: orange;
  color: #fff;
}

.Cinema-Value-newprice {
  color: orange;
  margin-right: 5rem;
  font-size: 18px;
}

.Cinema-Value-oldprice {
  text-decoration: line-through;
  line-height: 24rem;
}

.New-products{
  position: absolute;
  bottom: 0;
  right: 5rem;
}

.Package-Value-firstTitle{
  margin-left: 5rem;
  font-size: 16px;
  font-weight: 500;
}

.curNumberDesc{
  color: #eee;
  margin-bottom: 5rem;
}

.go-buy{
  border: 1px solid orange;
  height: 30rem;
  line-height: 30rem;
  text-align: center;
}
</style>>
