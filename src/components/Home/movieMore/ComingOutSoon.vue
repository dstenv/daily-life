<template>

    <div>
        <div class="eagerly-awaited">2022年 &nbsp; 待定</div>
        <div v-for="(item, index) in LazyLoading" :key="index">
            <div class="bosing" v-for="(list, index) in item" :key="index">
                <!-- <img v-for="img in imageList" v-lazy="img" /> -->
                <div class="mainx">
                    <div class="matop">
                        <div class="first">
                            <div class="pic">
                                <div class="image" @click="ruthomeview(list.id,list.videoId)">
                                     <!-- :to="'homeview/'+item.id" -->
                                    <img :src="list.img" alt="" />
                                    <van-icon
                                        name="play-circle-o"
                                        class="play-circle-o"
                                        v-show="list.videoId !== 0"
                                    />
                                </div>
                                <div class="movenames">
                                    <div class="namefosize">
                                        <span class="thisone">{{
                                            list.nm
                                        }}</span>
                                    </div>
                                    <div class="namefosizeun">
                                        <div class="fosizeunone">
                                            {{ list.scm }}&nbsp;
                                        </div>
                                        <div class="fosizeuntwo">
                                            {{ list.desc }}
                                        </div>
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

        <wd-infinite-load
            ref="loadmore"
            @loadmore="loadmore"
            :loading="loading"
            :offset="10"
        ></wd-infinite-load>
    </div>
</template>

<script>
export default {
    data() {
        return {
            LazyLoading: [],

            list: [],
            num: 0,
            loading: false,
            time: 4,
        };
    },
    props: {
        movieIds: {
            type: Array,
        },
    },
    created() {
        // console.log(this.movieIds);
    },
    methods: {
        ruthomeview(id,videoId){
            console.log(id,videoId);
            if(videoId == 0){
            this.$router.push({path:'/homeview/'+id})

            }
        },
        Loading() {
            this.axios
                .get("/text/mmdb/movie/list/info.json", {
                    params: {
                        cityId: this.$store.state.cityId,
                        movieIds: `${this.list}`,
                    },
                })
                .then((res) => {
                    // console.log(res.data.data);
                    // console.log('object',res);
                    this.LazyLoading.push(res.data.data.movies);
                    // console.log(this.LazyLoading);
                });
        },

        loadmore() {
            this.loading = true;

            if (this.time) {
                setTimeout(() => {
                    let list = [];
                    this.num += 15;
                    for (let i = this.num - 15; i < this.num; i++) {
                        list.push(this.movieIds.slice(i, i + 1));
                    }
                    this.list = list;
                    // console.log(this.list.join(","));

                    this.Loading();
                    setTimeout(() => {
                        this.loading = false;
                    }, 1000);
                    // 模拟请求，请求4次,4次结束后设置加载结束
                    this.time--;
                }, 2000);
            } else {
                this.loading = false;
                this.$refs.loadmore.loadEnd();
            }
        },
    },
    beforeDestroy(){
        if(this.time > 0){
            clearTimeout(this.time)
        }
    }
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

                            .fosizeunone {
                                width: 100rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .fosizeuntwo {
                                width: 100rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
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