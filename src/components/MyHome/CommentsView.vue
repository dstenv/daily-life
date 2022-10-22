<template>
    <div class="ever">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit">短评</div>
            </div>
            <div class="More"><van-icon name="plus" /><span>写短评</span></div>
        </div>

        <div class="pinglun">
            <div v-for="item in slideList" :key="item.id">
                <div class="pinglunle">
                    <div class="pinglunle-le">
                        <div class="pinglunleimg">
                            <img :src="item.avatarUrl" alt="" />
                            <div class="pinglunleimg-icon">
                                v{{ item.userLevel }}
                            </div>
                        </div>
                        <div class="yhmc">
                            <div class="yhmc-name">{{ item.nick }}</div>
                            <div class="yhmcxx">
                                <van-rate
                                    v-model="item.score2"
                                    :size="10"
                                    color="#ffbb29"
                                    void-icon="star"
                                    void-color="#eee"
                                    allow-half
                                />
                                <span class="yhmcxxpingfen"
                                    >{{ item.score }}分</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="pinglunle-ri">...</div>
                </div>
                <div class="pinlunmain">
                    {{ item.content }}
                </div>
                <div class="pinlundidian">
                    <div class="pinlundidian-le">
                        {{ item.time }}&nbsp;&nbsp;&nbsp;{{ item.ipLocName }}
                    </div>
                    <div class="pinlundidian-ri">
                        <div class="zan">
                            <van-icon name="good-job-o" />
                            赞
                        </div>
                        <div class="huifu">
                            <van-icon name="chat-o" />
                            回复
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActorView",
    data() {
        return {
            slideList: [],
            value: 3,
        };
    },
    created() {
        // this.$store.state.movieId = this.moveid;
        // console.log('this.$store.state.movieId',this.$store.state.movieId);
        this.movies();
        this.tiem();
    },
    methods: {
        tiem(ti) {
            let tim = ti;
            let time = new Date(tim);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let hour = time.getHours();
            let minute = time.getMinutes();
            let second = time.getSeconds();

            let dates = new Date();
            let years = dates.getFullYear();
            let months = dates.getMonth() + 1;
            let days = dates.getDate();
            let hours = dates.getHours();
            let minutes = dates.getMinutes();
            let seconds = dates.getSeconds();

            let date = years - year;
            let month1 = months - month;
            let day1 = days - day;
            let hour1 = hours - hour;
            let minute1 = minutes - minute;
            let second1 = seconds - second;
            if (date > 0) {
                return date + "年前";
            } else if (month1 > 0) {
                return month1 + "月前";
            } else if (day1 > 0) {
                return day1 + "天前";
            } else if (hour1 > 0) {
                return hour1 + "小时前";
            } else if (minute1 > 0) {
                return minute1 + "分钟前";
            } else if (second1 > 0) {
                return second1 + "秒前";
            }
        },
        movies() {
            this.axios
                .get(`/text/review/v1/comments.json`, {
                    params: {
                        movieId: this.$store.state.movieId,
                        type: 2,
                    },
                })
                .then((res) => {
                    console.log(res.data.data);
                    this.slideList = res.data.data.comments
                        .slice(1, 4)
                        .map((item) => {
                            return {
                                avatarUrl: item.avatarUrl,
                                content: item.content,
                                id: item.id,
                                ipLocName: item.ipLocName,
                                nick: item.nick,
                                score: item.score,
                                score2: item.score / 2,
                                time: this.tiem(item.time),
                                ugcType: item.ugcType,
                                userLevel: item.userLevel,
                            };
                        });
                    console.log(this.slideList);
                });
        },
    },
    components: {},
};
</script>

<style lang="less" scoped>
.ever {
    position: relative;
    border-top: 20rem solid #f5f5f5;
    width: 100%;
    margin-bottom: 40rem;

    .mainOneIng {
        display: flex;
        padding: 10rem;
        width: 100%;
        height: 100%;
        background-color: #fff;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;

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
            color: red;
            margin: 2rem;
        }
    }

    .pinglun {
        width: 100%;
        height: 100rem;
        // background-color: rgb(202, 14, 14);

        .pinglunle {
            display: flex;
            width: 100%;
            height: 50rem;
            background-color: rgb(255, 255, 255);
            justify-content: space-between;

            .pinglunle-le {
                display: flex;
                padding: 10rem;
                height: 100%;
                background-color: rgb(255, 255, 255);

                .pinglunleimg {
                    position: relative;
                    width: 50rem;
                    height: 50rem;
                    // background-color: rgb(47, 47, 114);

                    img {
                        width: 30rem;
                        height: 30rem;
                        border-radius: 50%;
                    }

                    .pinglunleimg-icon {
                        position: absolute;
                        bottom: 15rem;
                        right: 15rem;
                        width: 15rem;
                        height: 15rem;
                        border-radius: 50%;
                        background-color: #fec500;
                        font-size: 12rem;
                        text-align: center;
                        line-height: 15rem;
                        color: white;
                    }
                }

                .yhmc {
                    display: block;
                    .yhmc-name {
                        font-size: 12rem;
                        color: #bebebe;
                    }
                    .yhmcxx {
                        margin-top: 4rem;

                        .yhmcxxpingfen {
                            margin-left: 10rem;
                            font-size: 14rem;
                            color: #ffbb29;
                        }
                    }
                }
            }
            .pinglunle-ri {
                margin-right: 10rem;
                font-size: 25rem;
                color: #bebebe;
            }
        }

        .pinlunmain {
            margin: 10rem 50rem;
            font-size: 14rem;
            line-height: 20rem;
            background-color: rgb(255, 255, 255);
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
        }

        .pinlundidian {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            height: 35rem;
            margin: 20rem 0 20rem 50rem;
            // background-color: #cc3232;
            border-bottom: 1px solid #ccc;
            color: #c4c4c4;

            .pinlundidian-ri {
                display: flex;
                margin-right: 10rem;
                .zan {
                    width: 40rem;
                    height: 25rem;
                    margin-right: 20rem;
                    border: 1px solid #ddd;
                    border-radius: 10rem;
                    text-align: center;
                    line-height: 25rem;
                }
                .huifu {
                    width: 50rem;
                    height: 25rem;
                    margin-right: 20rem;
                    border: 1px solid #ddd;
                    border-radius: 10rem;
                    text-align: center;
                    line-height: 25rem;
                }
            }
        }
    }
}
</style>