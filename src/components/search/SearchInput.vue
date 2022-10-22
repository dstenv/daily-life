<template>
  <div class="s-input">
    <div class="contain">
      <svg
        t="1663751679776"
        width="18rem"
        height="18rem"
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
        type="text"
        placeholder="搜索电影、演出、艺人、影院"
        :value="inputNow"
        @input="$emit('change-input', $event.target.value)"
        @keyup.enter="$emit('to-search')"
      />
         <svg
        @click="$emit('change-input','')"
        width="18rem"
        height="18rem"
        v-if="inputNow"
        t="1663763098720"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9691"
      >
        <path
          d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z"
          p-id="9692"
          fill="#bcbdbd"
        ></path>
      </svg>
      <span @click="$router.go(-1)">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
   
    inputNow: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.s-input {
    padding: 0 10rem;
  background: #fff;
  border-bottom: solid 2rem #dedede;

  .contain {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      position: absolute;
      top: 10rem;
      &:nth-of-type(2) {
        right: 58rem;
      }
    }

    span {
      min-width: 50rem;
      text-align: center;

      font-size: 15rem;
    }
    input {
      width: 100%;
      height: 30rem;
   
        line-height: 20rem;
      border: 0;
      font-size: 14rem;
      padding:  20rem;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>