<template>
  <router-link :to="'homeview/'+item.id">
  <div class="item">
    <div class="left">
      <img :src="item?.img" alt="" />
      <div class="info">
        <h3>{{ item?.nm }}</h3>
        <h5>{{ item?.act }}</h5>
      </div>
    </div>

    <div class="right">
      <div class="score">
        <span v-if="item?.sc" class="big">{{ big }}</span>
        <span v-if="item?.sc" class="small">{{ small }}</span>
        <span v-else class="none">暂无评分</span>
      </div>
      <div class="tobuy" @click="goBuy(MoviesData.id)">购票</div>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    big() {
      return Math.floor(this.item.sc);
    },
    small() {
      return (
        "." + Math.floor(((this.item.sc - Math.floor(this.item.sc)) * 10) % 10)
      );
    },
  },
  methods: {
    goBuy(id){
            this.$router.push({path:'/showncinema',query:{id}})
        },
  },
};
</script>

<style lang="less" scoped>
.item {
  margin: 0 10rem;
  padding: 10rem 0;
  border-bottom: 1rem #dadada solid;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    img {
      width: 80rem;
    }
    .info {
      padding: 5rem 10rem;
      h3 {
        font-size: 14rem;
        padding-bottom: 20rem;
        color: black;
      }
      h5 {
        font-size: 13rem;
        color: #8e8e8e;
      }
    }
  }

  .right {
    flex-basis: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .score {
      span {
        &.big {
          color: rgb(255, 101, 28);
          font-size: 20rem;
        }
        &.small {
          color: rgb(255, 101, 28);
          font-size: 13rem;
        }
        &.none {
          color: #8e8e8e;
          font-size: 13rem;
        }
      }
    }

    .tobuy {
      padding: 7rem 10rem;
      color: rgb(255, 101, 28);
      border: rgb(255, 101, 28) 1rem solid;
      font-size: 13rem;
      border-radius: 5rem;
    }
  }
}
</style>