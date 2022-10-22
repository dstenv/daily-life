<template>
  <div>
    <h3>搜索历史</h3>
    <p v-for="(item, index) in preSearchs" :key="index" @click="$emit('to-search',item)">
      {{ item }}
    </p>
    <div class="clean" @click="$emit('clean-previous')">清空所有搜索历史</div>
  </div>
</template>

<script>
export default {
  props: {
    preSearchs: Array,
  },
};
</script>

<style lang="less" scoped>
h3{
  padding: 10rem;
  font-size: 14rem;
  color: #dadada;
}
p{
  padding: 10rem;
  font-size: 14rem;
}
div.clean{
  margin: 10rem;
  padding: 10rem ;
  font-size: 14rem;
  color: orange;
  text-align: center;
  border: orange 1rem solid;
}
</style>