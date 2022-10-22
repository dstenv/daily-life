<template>
    <div class="main-one">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit" @click="TheHit">热门音乐会</div>
            </div>
            <div class="More" @click="goticket(0)"><span>更多</span><van-icon name="arrow" /></div>
        </div>
        <div class="hitendupcoming">
            <div class="ss">
                <div class="main" v-for="item in hitendData6" :key="item.id" @click="goshowdetail(item.performanceId)">
                    <div class="main-img">
                        <img :src="item.img" alt="" />
                    </div>
                    <div class="main-name">{{ item.name }}</div>
                    <div class="pinjia">
                        {{ item.score }}
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
            hitendData6: [],
        };
    },
    created() {
        this.TheHit();
    },
    computed: {
        cityId() {
            return this.$store.state.cityId;
        },
    },
    methods: {
        goticket(id) {
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/ticketpage', query: {id}})
        },
        TheHit() {
            this.axios
                .get("https://yanchu.maoyan.com/myshow/ajax/performances/6", {
                    params: {
                        sellChannel: 8,
                        cityId: this.cityId ,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    this.hitendData6 = res.data.data.map((res) => {
                        return {
                            shopId: res.shopId,
                            performanceId: res.performanceId,
                            img: res.posterUrl,
                            name: `[${res.cityName}]${res.name}`,
                            score: res.showTimeRange,
                        };
                    });
                    // console.log(this.hitendData6);
                });
        },
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        }
    },
};
</script>

<style lang="less" scoped>
.main-one {
    position: relative;
    margin: 20rem 0;
    width: 100%;
    // padding: 10rem;
    // background-color: #f00;

    .mainOneIng {
        display: flex;
        padding: 10rem;
        width: 100%;
        height: 100%;
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
    .hitendupcoming {
        margin-top: 5rem;
        // width: 100vw;
        // position: absolute;
        overflow-x: scroll;
        height: 180rem;

        .ss {
            width: 296vw;
            height: 100%;
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;

            .main {
                // display: block;
                width: 100rem;
                height: 100%;
                margin-left: 10rem;
                position: relative;
                background-color: #f8f8f8;

                .mainabslo {
                    position: absolute;
                    top: -2rem;
                    left: -4rem;
                    font-size: 12rem;
                    border-radius: 2rem;
                    color: white;
                    background-color: #11acff;
                    padding: 1rem;
                    transform: scale(0.8);
                    // z-index: 2;
                }

                .mainabslotwo {
                    position: absolute;
                    font-size: 12rem;
                    bottom: 47rem;
                    right: 15rem;
                    color: white;
                }

                .main-img {
                    width: 100%;
                    height: 120rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .main-name {
                    padding: 3rem 0 0 3rem;
                    width: 100%;
                    font-size: 12rem;
                    transform: scale(0.9);
                    height: 35rem;
                    font-weight: 600;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                }

                .pinjia {
                    font-size: 12rem;
                    color: #a4a4a4;
                    margin-left: 1rem;
                    transform: scale(0.8);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 5rem 0;
                }
            }
        }
    }
    .hitendupcoming::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    } /* 去除滚动条 */
}
</style>