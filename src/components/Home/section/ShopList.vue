<template>
    <div class="boxsing" v-show="value!=0">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit" @click="TheHit">热门场馆</div>
            </div>
            <div class="More"><span>更多</span><van-icon name="arrow" /></div>
        </div>

        <div class="mains">
            <div class="mainscover">
                <div
                    class="mainscover-to"
                    v-for="item in venues"
                    :key="item.shopId"
                >
                    <div class="cover-top">
                        <p class="remcg">{{ item.shopName }}</p>
                        <van-icon name="arrow" class="remcgicon" />
                        <p class="remcg2">
                            {{ item.sellingPerformanceNumber }}场在售演出
                        </p>
                    </div>
                    <div class="cover-but">
                        <div class="neiron" v-for="i in item.firstPagePerformance" :key="i.performanceId" @click="goshowdetail(i.performanceId)">
                            <img class="neironimg" :src="i.posterUrl" alt="" />
                            <div class="neironimg-text">
                                {{i.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            venues: [],
            value:0
        };
    },
    computed: {
        cityId() {
            return this.$store.state.cityId;
        },
    },
    created() {
        this.TheHit();
    },
    methods: {
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            // this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        },
        TheHit() {
            this.axios
                .get("/yanchu/myshow/ajax/hotShop/hotShopList", {
                    params: {
                        performanceNumber: 2,
                        // 返回来的多少个
                        pageSize: 2,
                        // 对应的页码, 比如 2 *4 就是总数据的5 – 8个
                        pageNo: 1,

                        sellChannel: 8,
                        cityId: this.cityId,
                    },
                })
                .then((res) => {
                    console.log('res.data.daddddddddddddta',res.data.data.length);
                    this.value = res.data.data.length
                    this.venues = res.data.data;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.boxsing {
    width: 100vw;
    padding: 20rem 0;

    .mainOneIng {
        display: flex;
        padding: 10rem;
        width: 100%;
        background-color: #fff;
        justify-content: space-between;

        .moviesactive {
            color: black;
            position: relative;
            font-weight: 600;
        }
        .moviesactive::after {
            content: "";
            position: absolute;
            bottom: -10rem;
            left: 0;
            width: 50%;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 2rem;
            background-color: #f00;
        }

        .movies {
            display: flex;
            font-size: 14rem;
            color: #a7a7a7;
        }

        .The-hit {
            margin-right: 20rem;
            color: black;
            font-weight: 600;
        }

        .More {
            color: #a7a7a7;
            margin: 2rem;
        }
    }

    .mains {
        overflow-x: scroll;
        width: 100vw;
        height: 230rem;

        .mainscover {
            display: flex;
            width: 430rem;
            height: 100%;

            .mainscover-to {
                margin: 0 0 0 10rem;
                width: 200rem;
                height: 100%;
                background-color: #f8f8f8;

                .cover-top {
                    padding: 4rem 8rem;
                    width: 100%;
                    height: 50rem;
                    background-color: #f8f8f8;
                    z-index: 2;
                    position: relative;

                    .remcg {
                        width: 160rem;
                        font-size: 14rem;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                         background-color: #f8f8f8;
                    }

                    .remcgicon {
                        position: absolute;
                        right: 10rem;
                        top: 15rem;
                        font-size: 14rem;
                    }

                    .remcg2 {
                        margin: 0 0 0 -20rem;
                        font-size: 12rem;
                        transform: scale(0.8);
                        color: #9d9d9d;
                    }
                }

                .cover-but {
                    display: flex;
                    width: 100%;
                    height: 180rem;

                    .neiron {
                        padding: 5rem;
                        width: 100rem;
                        height: 100%;
                        background-color:#f8f8f8;

                        .neironimg {
                            width: 100%;
                            height: 130rem;
                            background-color: cadetblue;
                        }

                        .neironimg-text {
                            padding: 3rem 0 0 3rem;
                            width: 100%;
                            font-size: 12rem;
                            transform: scale(0.9);
                            height: 35rem;
                            /* font-weight: 600; */
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: -webkit-box;
                        }
                    }
                }
            }
        }
    }
    .mains::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    } /* 去除滚动条 */
}
</style>