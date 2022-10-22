<template>
    <div>
        <!-- 头部导航 -->
        <div class="navigation">
            <div class="navigatio-left">
                <van-icon name="down" class="down" @click="downgo" />
                <span class="navigatiomax">{{ MoviesData.nm }}</span>
            </div>
            <div
                class="navigatio-right"
                @click="show = !show"
                style="
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                "
            >
                <svg
                    t="1665990427850"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2912"
                    width="22"
                    height="22"
                >
                    <path
                        d="M809.890909 879.709091H116.363636V186.181818h344.436364V116.363636H79.127273c-18.618182 0-32.581818 18.618182-32.581818 37.236364v763.345455c0 18.618182 13.963636 32.581818 32.581818 32.581818h763.345454c18.618182 0 32.581818-13.963636 32.581818-32.581818v-367.709091h-69.818181v330.472727z"
                        p-id="2913"
                        fill="#f03e38"
                    ></path>
                    <path
                        d="M944.872727 74.472727h-279.272727v69.818182h200.145455l-358.4 358.4 46.545454 46.545455 358.4-358.4v176.872727H977.454545V111.709091c0-18.618182-13.963636-37.236364-32.581818-37.236364z"
                        p-id="2914"
                        fill="#f03e38"
                    ></path>
                </svg>
            </div>
        </div>

        <!-- https://p0.pipi.cn/mmdb/25bfd6ddb53c7e5015d23c5bc24d876c03d41.jpg?imageMogr2/thumbnail/2500x2500%3E -->
        <div class="main">
            <div class="maoboli">
                <img :src="MoviesData.img" alt="" />
            </div>
            <div class="main-box">
                <div class="main-top-img">
                    <img :src="MoviesData.img" alt="" />
                    <van-icon name="play-circle" class="play-circle" />
                    <div class="maname">
                        <div class="big">{{ MoviesData.nm }}</div>

                        <div class="small">{{ MoviesData.enm }}</div>
                        <div class="small">
                            {{ MoviesData.cat }}
                            <span class="smallwhi">{{ smallwhi }}</span>
                        </div>
                        <div class="small">
                            {{ MoviesData.src }} / {{ MoviesData.dur }}分钟
                        </div>
                        <div class="small">{{ MoviesData.pubDesc }}</div>
                        <div class="small">
                            <span class="smallbig">{{ MoviesData.wish }}</span
                            >人想看
                        </div>
                    </div>
                </div>
                <div class="pingfende">
                    <div class="pingfenleft" v-show="MoviesData.sc != 0">
                        <div class="fenleft">
                            <img src="@/assets/icon/maoyan.jpg" alt="" />
                            口碑
                        </div>
                        <div class="mainpro">
                            <div
                                class="mainpro-one"
                                v-for="(
                                    item, index
                                ) in MoviesData.distributions"
                                :key="index"
                            >
                                <span>{{ item.movieScoreLevel }}</span>
                                <progress
                                    :value="item.proportion"
                                    max="100"
                                    class="progress"
                                ></progress>
                                <span>{{ item.proportion }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="pingfenright" v-show="MoviesData.sc != 0">
                        <div class="maoyan">猫眼评分</div>
                        <div class="maoyanpf">
                            {{ MoviesData.sc }}
                            <van-rate
                                v-model="value"
                                :size="6"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                                allow-half
                                class="rate"
                            />
                        </div>
                        <div class="renshu">
                            {{ MoviesData.snum }}人<van-icon name="arrow" />
                        </div>
                    </div>
                </div>
                <div class="linking">
                    <div class="linkle" @click="linkleing">
                        <van-icon name="like" :class="{ linkles: linkle}" />
                        想看
                    </div>
                    <div class="linkri" @click="linkriing">
                        <van-icon name="star" :class="{ linkris: linkri}"/>
                        看过
                    </div>
                </div>
            </div>
            <div class="caidang" v-show="MoviesData.egg">
                <img src="@/assets/icon/egg2.jpg" alt="" />

                <span>有1个彩蛋，片尾</span>
            </div>

            <div class="jiexi" :class="{ jiexidtbd: jiexi }">
                {{ MoviesData.dra }}
            </div>
            <div class="zhangkai" :class="{ trans: trans }">
                <van-icon name="arrow-down" @click="zhangkai" />
            </div>

            <ActorView />
            <VideoPichView />
            <CommentsView />
            <div class="boot"></div>
        </div>

        <!-- 底部导航 -->
        <div
            class="footh"
            v-show="MoviesData.comScorePersona"
            @click="goBuy(MoviesData.id)"
        >
            特惠购票
        </div>

        <footer>
            <ShareComponents :show="show" @changeShow="changeShow" />
        </footer>
    </div>
</template>

<script>
import CommentsView from "./CommentsView.vue";
import VideoPichView from "./VideoPichView.vue";
import ActorView from "./ActorView.vue";
import ShareComponents from "../Show/ShareComponents.vue";
export default {
    data() {
        return {
            MoviesData: {},
            value: 0,
            jiexi: true,
            trans: false,
            smallwhi: "",
            moveid: 0,
            show: false,
            // 喜欢
            linkle: false,
            linkMath:[],
            // 看过
            linkri:false,
            linkriMath:[]

        };
    },
    created() {
        this.getLocalStorage();
        this.moveData();
        this.moveid = this.$store.state.movieId;

    },
    computed:{
        moveids(){
            return this.$route.params.id
        }
    },
    methods: {
        // 拿到localStorage
        getLocalStorage(){
            // 看过
            if( localStorage.getItem("linkMath") == null ){
                // 创建一个localStorage
                localStorage.setItem("linkMath",JSON.stringify([]))
            }

            // 如果localStorage有this.moveid时linkle等于true
            this.linkMath = JSON.parse(localStorage.getItem("linkMath"))
            this.linkMath.forEach(item => {
                // console.log(item);
                if(item == this.moveids){
                    // console.log('object');
                    this.linkle = true
                }
            });
        

            // 喜欢
            if( localStorage.getItem("linkMaths") == null ){
                // 创建一个localStorage
                localStorage.setItem("linkMaths",JSON.stringify([]))
            }
             // 如果localStorage有this.moveid时linkri等于true
            this.linkriMath = JSON.parse(localStorage.getItem("linkMaths"))
            this.linkriMath.forEach(item => {
                // console.log(item);
                if(item == this.moveids){
                    // console.log('object');
                    this.linkri = true
                }
            });
        },
        // 喜欢
        linkleing(){
            // linkMath没有this.moveid时push进去
            if( this.linkMath.indexOf(this.moveid) == -1 ){
                this.linkMath.push(this.moveid);
                this.linkle = true;
            }else{
                this.linkMath.splice(this.linkMath.indexOf(this.moveid),1);
                this.linkle = false;
            }
            localStorage.setItem("linkMath",JSON.stringify(this.linkMath))
            
        },
        // 看过
        linkriing(){
             // linkMaths没有this.moveid时push进去

            if( this.linkriMath.indexOf(this.moveid) == -1 ){
                this.linkriMath.push(this.moveid);
                this.linkri = true;
            }else{
                this.linkriMath.splice(this.linkriMath.indexOf(this.moveid),1);
                this.linkri = false;
            }
             localStorage.setItem("linkMaths",JSON.stringify(this.linkriMath))
             
        },

        goBuy(id) {
            this.$router.push({ path: "/showncinema", query: { id } });
        },
        zhangkai() {
            this.jiexi = !this.jiexi;
            this.trans = !this.trans;
        },
        downgo() {
            this.$router.go(-1);
        },

        // http://api.maoyan.com/mmdb/movie/v5/1229843.json
        moveData() {
            this.axios
                .get(`/text/mmdb/movie/v5/${this.$store.state.movieId}.json`)
                .then((res) => {
                    // console.log(res.data.data.movie);
                    let data = res.data.data.movie;
                    this.MoviesData = data;
                    // console.log(data);
                    this.smallwhi = data.ver.split("/")[0];
                    this.value = data.sc / 2;
                    // console.log(this.VideoPich);
                });
        },
        changeShow(val) {
            // console.log('aaa', val);
            this.show = val;
        },
    },
    components: {
        ActorView,
        VideoPichView,
        CommentsView,
        ShareComponents,
    },
};
</script>

<style lang="less" scoped>
.navigation {
    display: flex;
    width: 100vw;
    height: 40rem;
    background-color: white;
    position: fixed;
    justify-content: space-between;
    line-height: 40rem;
    padding: 0 10rem;
    font-size: 18rem;
    z-index: 999;
    .navigatio-left {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .down {
        color: #9c9c9c;
        margin-right: 10rem;
        transform: rotate(90deg);
    }

    .share {
        color: red;
    }
}

.main {
    width: 100vw;
    padding: 40rem 0;
    position: relative;

    .boot {
        margin-bottom: 380rem;
    }

    .maoboli {
        width: 100vw;
        height: 255rem;
        background-color: cadetblue;
        position: relative;
        overflow: hidden;
        // 毛玻璃效果

        img {
            width: 100%;
            height: 100%;
            // 毛玻璃效果;

            filter: blur(10px);
            -webkit-filter: blur(10px);
            -moz-filter: blur(10px);
            -o-filter: blur(10px);
            -ms-filter: blur(10px);
            transform: scale(1.1);
        }
    }
    .main-box {
        margin-top: 40rem;
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 240.13rem;
        top: 0;
        left: 0;
        width: 100vw;
        /* height: 100vh; */
        padding: 20rem 15rem;
        justify-content: space-between;

        .main-top-img {
            width: 80rem;
            height: 110rem;
            position: relative;
            display: flex;

            img {
                width: 100%;
                height: 100%;
            }

            .play-circle {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                text-align: center;
                line-height: 110rem;
                color: white;
                font-size: 30rem;
            }

            .maname {
                height: 110rem;
                // background-color: white;
                margin-left: 10rem;

                .big {
                    width: 200rem;
                    height: 25rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 20rem;
                    color: white;
                }

                .small {
                    margin-top: 1rem;
                    width: 200rem;
                    height: 15rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #bdbeb1;

                    .smallwhi {
                        color: white;
                    }

                    .smallbig {
                        font-size: 15rem;
                        color: #e8a404;
                    }
                }
            }
        }
        .pingfende {
            display: flex;

            .pingfenleft {
                display: flex;
                width: 240rem;
                height: 60rem;
                margin: 10rem 10rem 10rem 0;
                border-radius: 5rem;
                background-color: #ebebeb47;

                .fenleft {
                    width: 55rem;
                    height: 55rem;
                    padding: 5rem;
                    border-right: 1rem solid #ffffff;
                    text-align: center;
                    color: #ffffff;
                    font-size: 16rem;
                    font-weight: 600;

                    img {
                        margin: 0 3rem;
                        width: 20rem;
                        height: 20rem;
                        background-color: forestgreen;
                    }
                }

                .mainpro {
                    // display: flex;
                    padding: 5rem;

                    .mainpro-one {
                        margin-left: -10rem;
                        display: block;
                        width: 52vw;
                        height: 15rem;
                        line-height: 15rem;
                        font-size: 12rem;
                        transform: scale(0.8);
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        color: white;

                        .progress {
                            width: 100rem;
                            height: 3rem;
                            background-color: #ffffff;
                            border-radius: 5rem;
                            align-items: center;
                            margin: 5rem;
                        }
                        // 设置进度条的颜色
                        ::-webkit-progress-value {
                            background-color: #fbaf00;
                        }
                    }
                }
            }

            .pingfenright {
                padding: 5rem;
                width: 95rem;
                height: 60rem;
                margin: 10rem 0;
                border-radius: 5rem;
                background-color: #ebebeb47;
                // color: white;

                .maoyan {
                    color: white;
                }

                .maoyanpf {
                    display: flex;
                    font-size: 18rem;
                    color: #febb29;
                }
                .rate {
                    margin: 2px 0 0 3px;
                }

                .renshu {
                    color: white;
                }
            }
        }

        .linking {
            display: flex;

            .linkle {
                width: 50vw;
                height: 30rem;
                border-radius: 5rem;
                margin-right: 10rem;
                background-color: #ebebeb47;
                text-align: center;
                color: white;
                font-size: 16rem;
                line-height: 30rem;
            }
            .linkles{
                color:red;
            }
            .linkri {
                width: 50vw;
                height: 30rem;
                border-radius: 5rem;
                background-color: #ebebeb47;
                text-align: center;
                color: white;
                font-size: 16rem;
                line-height: 30rem;
            }
            .linkris{
                color:yellow;
            }
        }
    }

    .caidang {
        width: 100%;
        height: 30rem;
        padding: 5rem 15rem;
        font-size: 14rem;
        background-color: white;
        display: flex;
        align-items: center;

        img {
            width: 20rem;
            height: 20rem;
            margin-right: 5rem;
        }

        span {
            line-height: 30rem;
        }
    }

    .jiexidtbd {
        height: 70rem;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
    }
    .trans {
        transform: rotateZ(180deg);
    }
    .jiexi {
        width: 100vw;
        margin: 10rem 0 0 0;
        padding: 10rem;
        background-color: rgb(255, 255, 255);
        color: #5c5c5c;
        position: relative;
        // 文字换行
        font-size: 14rem;
        word-break: break-all;
        overflow: hidden;
    }

    .zhangkai {
        bottom: 5rem;
        width: 100vw;
        text-align: center;
        background-color: rgb(255, 255, 255);
        font-size: 16rem;
    }
}

.footh {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 40rem;
    background-color: #ff6633;
    font-size: 18rem;
    color: white;
    text-align: center;
    line-height: 40rem;
}
</style>