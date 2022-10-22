<template>
  <div class="item">
    <img
      :src="item.img|| '../../assets/people.png' "
      alt=""/>

    <div class="info">
      <h3>{{ item.nm }}</h3>
      <h5>{{ item.representative }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  img {
    width: 100rem;
    padding: 10rem;

  }
  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    h3 {
        padding: 10rem;
        padding-left: 0;
        font-size: 17rem;
    }
    h5 {
        padding-left: 10rem;
        color: #8e8e8e
    }
  }
}
</style>