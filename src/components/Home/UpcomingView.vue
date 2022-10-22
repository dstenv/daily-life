<template>
    <!-- 新加的路由 -->
    <div class="boxnav">
        <TheTrailer />
        <EagerlyAwaited @movieIdsfun="movieIdsfun" />
        <ComingOutSoon :movieIds="movieIds" />
        
    </div>
</template>

<script>
import ComingOutSoon from "@/components/Home/movieMore/ComingOutSoon.vue";
import TheTrailer from "@/components/Home/movieMore/TheTrailer.vue";
import EagerlyAwaited from "@/components/Home/movieMore/EagerlyAwaited.vue";

export default {
    data() {
        return {
            comming: [],
            movieIds: [],

        };
    },
    created() {
        console.log(this.movieIds);
    },
    methods: {
        // Upcomming(){
        //     this.axios.get("/text/mmdb/movie/v2/list/rt/order/coming.json").then((res)=>{
        //         // console.log(res.data.data.coming);
        //         this.finis = res.data.data.coming.filter((item)=>{
        //             return item.comingTitle
        //         });
        //         console.log(this.finis);

        //     })
        // }
        movieIdsfun(options) {
            this.movieIds = options.movieIds;
        },

    },
    components: {
        TheTrailer,
        EagerlyAwaited,
        ComingOutSoon,
    },
};
</script>

<style lang="less" scoped>
.boxnav {
    width: 100vw;
    background: #ffffff;
}
</style>