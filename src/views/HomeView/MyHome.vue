<template>
<!-- 修改了vuex -->
    <div class="asd">
        <MoviesView />
    </div>
</template>

<script>
import MoviesView from "@/components/MyHome/MoviesView.vue";
export default {
    data() {
        return {
        };
    },
    created() {
        this.changemovieId(this.$route.params.id)
    },
    watch: {

    },
    methods: {
        changemovieId(n){
           this.$store.commit("changemovieId", n);
        }
    },
    components: {
        MoviesView,
    },


}
</script>

<style lang="less" scoped>
.asd{
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
}
</style>