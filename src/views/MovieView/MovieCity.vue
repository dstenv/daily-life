<template>
  <div>
    <div v-for="s in cinemas" :key="s.id">
      <router-link :to="'package/'+s.id " tag="div">
        <div class="Studios">
          <div class="Studios-name">{{ s.nm }}</div>
          <div class="Studios-distance">{{ s.distance }}</div>
        </div>

        <div class="Cinema-Advertising">
          <span class="Cinema-Advertising-price"
            ><span>￥</span>{{ s.price }}</span
          >
          <span
            :style="{
              border: `1px solid ${s.labels[0].color}`,
              color: `${s.labels[0].color}`,
            }"
            >{{ s.labels[0].name }}</span
          >
          <span
            :style="{
              border: `1px solid ${s.labels[1].color}`,
              color: `${s.labels[1].color}`,
            }"
            >{{ s.labels[1].name }}</span
          >
          <span
            :style="{
              border: `1px solid ${s.labels[2].color}`,
              color: `${s.labels[2].color}`,
            }"
            >{{ s.labels[2].name }}</span
          >
        </div>

        <div class="Discount">{{ s.promotion.platformActivityTag }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subItems: [],
      cinemas: [],
    };
  },

  created() {
    this.getData();
    this.postData();
  },
  methods: {
    getData() {
      this.axios
        .get("abc/mmcs/cinema/v1/select/items.json", {
          params: {
            cityId: 20,
          },
        })
        .then(({ data }) => {
          console.log(data.data);
          this.subItems = data.data.brand.subItems;
          this.subItems.splice(0, 1);
        });
    },

    postData() {
      this.axios
        .get("abc/mmcs/cinema/v1/select/cinemas.json", {
          params: {
            lat: 23.129098901764177,
            lng: 113.26499537425079,
            cityId: 20,
            brandId: 188982,
            channelId: 80001,
          },
        })
        .then(({ data }) => {
          console.log(data.data);
          this.cinemas = data.data.cinemas;
          console.log('this.cinemas',this.cinemas )
        });
    },

    Data() {},
  },
};
</script>

<style scoped>
.Studios {
  display: flex;
  justify-content: space-between;
}

.Studios .Studios-name {
  font-size: 16rem;
  font-weight: 500;
}

.Studios .Studios-distance {
  font-size: 16rem;
  color: #ddd;
}

.Cinema-Advertising {
  margin-top: 10rem;
}

.Cinema-Advertising-price {
  color: orange;
  font-size: 16rem;
}

.Cinema-Advertising-price span {
  font-size: 16rem;
}

.Cinema-Advertising span {
  margin: 5rem;
}

.Discount {
  font-size: 16rem;
  color: #ddd;
  margin-top: 5rem;
  margin-bottom: 5rem;
}
</style>