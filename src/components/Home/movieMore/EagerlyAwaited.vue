<template>
 
    <div>
        <div class="bosing" v-for="item in awaitedData" :key="item.id">
            <div class="eagerly-awaited">{{ item.times }}</div>

            <div class="mainx" v-for="list in item.arr" :key="list.id">
                <div class="matop">
                    <div class="first">
                        <div class="pic">
                            <div class="image">
                                <img :src="list.img" alt="" />
                                <van-icon
                                    name="play-circle-o"
                                    class="play-circle-o"
                                    v-show="list.videoId !== 0"
                                />
                            </div>
                            <div class="movenames">
                                <div class="namefosize">
                                    <span class="thisone">{{ list.nm }}</span>
                                </div>
                                <div class="namefosizeun">
                                    <div>{{ list.scm }}&nbsp;</div>
                                    <div>{{ list.desc }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="pinfen">
                            <dir class="jishu">
                                <span>{{ list.wish }}</span> 人想看
                            </dir>
                            <div class="goupiao">
                                <van-icon name="like-o" />想看
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
            awaitedData: [],
            movieIds: [],
        };
    },
    created() {
        this.movies();
    },
    methods: {
        async movies() {
            await this.axios
                .get(`/text/mmdb/movie/v2/list/rt/order/coming.json`)
                .then((res) => {
                    console.log(res);

                    let list = res.data.data.coming;
                    // console.log(list);
                    let time = list[0].comingTitle;
                    list.forEach((item) => {
                        if (time != item.comingTitle) {
                            time = item.comingTitle;
                        }
                        let find = this.awaitedData.filter(
                            (val) => val.times == time
                        );
                        if (find.length > 0) {
                            find[0].arr.push(item);
                        } else {
                            this.awaitedData.push({
                                id: item.id,
                                times: time,
                                arr: new Array(item),
                            });
                        }
                    });
                    // console.log(this.awaitedData);
                    this.movieIds = res.data.data.movieIds;
                    this.$emit("movieIdsfun", {
                        movieIds: this.movieIds,
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.bosing {
    width: 100vw;

    .eagerly-awaited {
        width: 100vw;
        padding: 5rem 10rem;
        background-color: #f5f5f5;
        border-top: 1rem solid #d7d7d7;
        border-bottom: 1rem solid #d7d7d7;
    }

    .mainx {
        width: 100vw;
        .matop {
            width: 100%;
            height: 80rem;
            padding: 5rem;
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
                        padding: 5rem 15rem;

                        .namefosize {
                            display: flex;
                            color: #333;
                            .thisone {
                                display: block;
                                width: 135rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 14rem;
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
                        width: 60rem;
                        padding: 5rem;
                        position: absolute;
                        top: 35rem;
                        right: 0;
                        text-align: center;
                        transform: scale(0.8);
                        border-radius: 3rem;
                        color: #fff;
                        color: red;
                        border: 1rem solid rgb(255, 0, 0);
                        font-size: 14rem;
                    }
                }
            }
        }
    }
}
</style>

