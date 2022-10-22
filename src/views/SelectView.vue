<template>
  <div class="select-view">
    <div class="top">
      <div class="left" @click="$emit('close-select')">
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
      <div class="center">{{ cinema }}</div>
    </div>
    <div class="info">
        <p class="movie">{{movie}}</p>
        <p class="show-info">{{showInfo}}</p>
    </div>
    <choose-seat :th="th" :type="true"  @close-select="$emit('close-select')">

    </choose-seat>
  </div>
</template>

<script>
import ChooseSeat from '@/components/ChooseSeat.vue'
export default {
    components:{
        ChooseSeat
    },
  props: {
    cinema: String,
    movie: String,
    showInfo: String,
    th: String,
  },
};
</script>

<style lang="less" scoped>
.select-view {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;


  .top {
    display: flex;
    padding: 10rem;
    background: #fafafa;
    align-items: center;
    .center {
      padding-left: 3rem;
      flex-grow: 1;
      font-size: 20rem;
    }
  }
  .info{
    padding: 15rem;
    .movie{
        font-size: 17rem;
    }
    .show-info{
        color: #8e8e8e;
    }
  }
}
</style>