<template>
    <div class="main-one">
        <div class="mainOneIng">
            <div class="movies">
                <div
                    class="The-hit"
                    @click="TheHit"
                    :class="{ moviesactive: active == 1 }"
                >
                    热映电影
                </div>
                <div
                    class="upcoming"
                    @click="upcoming"
                    :class="{ moviesactive: active == 2 }"
                >
                    即将上映
                </div>
            </div>
            <div class="More" @click="MoreEvery"><span>更多</span><van-icon name="arrow" /></div>
        </div>
        <div class="hitendupcoming">
            <div class="ss">
                <div
                    class="main"
                    v-for="item in hitendData"
                    :key="item.id"
                    @click="tiaozhaun"
                >
                    <router-link :to="'homeview/'+item.id" >
                        <div class="mainabslo" v-show="active == 1">
                            {{ item.version }}
                        </div>
                        <div class="mainabslotwo" v-show="active == 2">
                            <van-icon name="like" />
                            {{ item.version }}
                        </div>
                        <div class="main-img">
                            <img :src="item.img" alt="" />
                        </div>
                        <div class="main-name">{{ item.name }}</div>
                        <div class="pinjia">
                            <van-rate
                                v-model="item.score2"
                                allow-half
                                size="12"
                                color="#ffc102"
                                void-icon="star"
                                void-color="#eee"
                                v-show="active == 1"
                            />
                            {{ item.score }}
                        </div>
                    </router-link>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 1,
            hitendData: [],
        };
    },
    created() {
        this.TheHit();
    },
    methods: {
        tiaozhaun() {
            console.log("object");
        },

         // 更多跳转路由
        MoreEvery(){
            // this.$store.commit('changeShowControl', false)
            this.$router.push('/HitMoviesView')
        },

        version() {
            // return res.ver.spl
        },
        TheHit() {
            this.active = 1;
            this.axios.get("/text/mmdb/movie/v3/list/hot.json").then((res) => {
                // console.log(res.data.data.hot);
                    console.log('res',res);

                this.hitendData = res.data.data.hot.map((res) => {
                    return {
                        id: res.id,
                        img: res.img,
                        name: res.nm,
                        score: res.sc,
                        score2: res.sc / 2,
                        version:
                            res.ver.split("/")[0] == "IMAX 2D"
                                ? res.ver.split("/")[0]
                                : " ",
                    };
                });
                console.log("this.hitendData", this.hitendData);
                // this.value = this.valuetext/2
            });
        },
        upcoming() {
            this.active = 2;
            this.axios
                .get("/text/mmdb/movie/v1/list/wish/order/coming.json")
                .then((res) => {
                    this.hitendData = res.data.data.coming.map((res) => {
                        return {
                            id: res.id,
                            img: res.img,
                            name: res.nm,
                            score: res.comingTitle.split(" ")[0] + "上映",
                            score2: res.sc / 2,
                            version: res.wish,
                        };
                    });
                    // this.value = this.valuetext/2
                });
        },
    },
};
</script>

<style lang="less" scoped>
.main-one {
    position: relative;
    margin: 10rem 0;
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
        overflow-y: hidden;

        height: 160rem;

        .ss {
            width: 355vw;
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
                    height: 20rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: black;
                }

                .pinjia {
                    line-height: 20rem;
                    font-size: 12rem;
                    color: #a4a4a4;
                    transform: scale(0.8);
                    margin: 0 0 0 -8rem;
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