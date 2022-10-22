<template>
   

    <div class="mainx">
        <div class="matop" v-for="item in movieData" :key="item.id">
            <div class="first">
                <div class="pic">
                    <div class="image">
                        <img :src="item.img" alt="" />
                        <van-icon
                            name="play-circle-o"
                            v-show="item.VideoEndImg == 2"
                            class="play-circle-o"
                        />
                    </div>
                    <div class="movenames">
                        <div class="namefosize">
                            <span class="thisone">{{ item.name }}</span>
                            <span
                                class="thistwo"
                                v-if="item.version == 'IMAX 2D'"
                                >{{ item.version }}</span
                            >
                        </div>
                        <div class="namefosizeun">
                            <div>{{ item.boxInfo }}</div>
                            <div>{{ item.desc }}</div>
                        </div>
                    </div>
                </div>
                <div class="pinfen">
                    <dir class="jishu" v-show="item.mk != 0">
                        <span>{{ item.mk }}</span> 分
                    </dir>
                    <dir class="jishu" v-show="item.mk == 0">暂无评分</dir>
                    <div class="goupiao" @click="goBuy(item.id)">购票</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movieData: [],
        };
    },
    created() {
        this.evermove();
    },
    computed: {
        cityId() {
            return this.$store.state.cityId;
        },
    },
    methods: {
        goBuy(id){
            this.$router.push({path:'/showncinema',query:{id}})
        },
        evermove() {
            this.axios
                .get("/text/mmdb/movie/v3/list/hot.json", {
                    params: {
                        cityId: this.cityId,
                    },
                })
                .then((res) => {
                    // console.log(res.data.data.hot);
                    this.movieData = res.data.data.hot.map((item) => {
                        return {
                            id: item.id,
                            img: item.img,
                            version:
                                item.ver.split("/")[0] == "IMAX 2D"
                                    ? item.ver.split("/")[0]
                                    : null,
                            name: item.nm,
                            boxInfo: item.boxInfo,
                            desc: item.desc,
                            videoId: item.videoId,
                            // 1是没有videoId的
                            // 2是有videoId的
                            VideoEndImg: item.videoId == 0 ? 1 : 2,
                            mk: item.mk,
                        };
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.mainx {
    width: 100vw;
    .matop {
        width: 100%;
        height: 80rem;
        padding: 5rem 10rem;
        background: #fff;
        border-bottom: 1rem solid rgb(160, 160, 160);

        .first {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            background: rgb(255, 255, 255);

            .pic {
                display: flex;

                .image {
                    width: 50rem;
                    height: 100%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .play-circle-o {
                        top: 50%;
                        left: 50%;
                        font-size: 20rem;
                        transform: translate(-50%, -50%);
                        position: absolute;
                        color: white;
                    }
                }

                .movenames {
                    padding: 5rem 10rem;

                    .namefosize {
                        display: flex;
                        color: #333;
                        .thisone {
                            display: block;
                            width: 135rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 16rem;
                            color: #333;
                        }
                        .thistwo {
                            color: #fff;
                            margin-left: 10rem;
                            border-radius: 3rem;
                            background-color: skyblue;
                            padding: 2rem;
                            transform: scale(0.8);
                        }
                    }
                    .namefosizeun {
                        color: #999;
                        font-size: 12rem;
                        margin-top: 8rem;
                    }
                }
            }

            .pinfen {
                position: relative;
                display: block;
                .jishu {
                    color: #ff9d21;
                    margin: 10rem 9rem 0 0rem;
                    span {
                        font-size: 16rem;
                    }
                }
                .goupiao {
                    width: 40rem;
                    padding: 5rem;
                    position: absolute;
                    top: 35rem;
                    right: 12rem;
                    text-align: center;
                    transform: scale(0.8);
                    border-radius: 3rem;
                    color: #fff;
                    color: red;
                    border: 1rem solid rgb(255, 0, 0);
                }
            }
        }
    }
}
</style>