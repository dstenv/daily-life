<template>
    <div class="box">
        <SwiperView />
        <HitMovies />

        <div v-for="item in hotData" :key="item.id">
            <TheConcert :id="item.id" :name="item.text" />
        </div>

        <ShopList />
        <PreferentialView />
        <div class="butt"></div>
    </div>
</template>

<script>
// 最后的优惠享不停
import PreferentialView from "@/components/Home/section/PreferentialView.vue";
// 热门场馆
import ShopList from "@/components/Home/section/ShopList.vue";
// 轮播图
import SwiperView from "@/components/Home/section/SwiperView.vue";
// 电影
import HitMovies from "@/components/Home/section/HitMovies.vue";

import TheConcert from "@/components/Home/section/TheConcert.vue";

export default {
    data() {
        return {
            hotData: [
                {
                    text: "热门演唱会",
                    id: 1,
                },
                {
                    text: "热门话剧音乐剧",
                    id: 4,
                },
                {
                    text: "热门展览",
                    id: 9,
                },
                {
                    text: "热门儿童亲子",
                    id: 7,
                },
                {
                    text: "热门音乐会",
                    id: 6,
                },
                {
                    text: "热门舞蹈芭蕾",
                    id: 5,
                },
                {
                    text: "热门戏曲艺术",
                    id: 3,
                },
            ],
        };
    },
    methods: {},
    components: {
        SwiperView,
        HitMovies,
        TheConcert,
  
        ShopList,
        PreferentialView,
    },
    created() {
     
    },
};
</script>
<style lang="less" scoped>
.box {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20rem;
        // line-height: 200px;
        text-align: center;
        background-color: #39a9ed;
    }

    .butt {
        width: 100%;
        height: 50rem;
    }
}
</style>