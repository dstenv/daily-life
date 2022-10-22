<template>
  <div>
    <search-input
      v-if="showInput"
      :inputNow="input"
      @to-search="toSearch"
      @change-input="
        sureSearch = false;
        input = $event;
      "
    ></search-input>

    <search-previous
      v-if="!sureSearch || input === ''"
      @clean-previous="preSearchs = []"
      @to-search="
        input = $event;
        toSearch();
      "
      :preSearchs="preSearchs"
    ></search-previous>

    <search-res
      v-if="sureSearch && input !== '' && showInput "
      :keyword="input"
      @show-all="showInput = false; num = $event"
    ></search-res>
    <all-res v-if="!showInput" :Num="num" :keyword="input" @close-all="showInput = true"> </all-res>
  </div>
</template>

<script>
import SearchInput from "../components/search/SearchInput.vue";
import SearchRes from "../components/search/SearchRes.vue";
import SearchPrevious from "../components/search/SearchPrevious.vue";
import AllRes from "../components/search/AllRes.vue";
export default {
  components: { SearchInput, SearchPrevious, SearchRes, AllRes },
  data() {
    return {
      input: "",
      preSearchs: JSON.parse(localStorage.getItem("lifeSearchs")) || [],
      sureSearch: false,
      showInput: true,
      num: 0,
    };
  },
  computed: {},
  methods: {
    toSearch() {
      this.preSearchs = this.preSearchs.filter((o) => o !== this.input);
      this.preSearchs.push(this.input);
      this.sureSearch = true;
    },
  },
  watch: {
    preSearchs(newPre) {
      localStorage.setItem("lifeSearchs", JSON.stringify(newPre));
    },
  },
};
</script>

<style lang="less" scoped>
</style>