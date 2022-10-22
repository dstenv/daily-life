<template>
    <div class="page-top">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="box" v-if="MoviesData.img" :style="{ 'background-image': `url(${MoviesData.img})` }">
            <div class="cover"></div>
            <div
                class="main-box"
                
            >
                <div class="main-top-img">
                    <div class="left">
                        <img :src="MoviesData.img" alt="" />
                        <van-icon name="play-circle" class="play-circle" />
                    </div>
                    <div class="maname">
                        <div class="big">{{ MoviesData.nm }}</div>
                        <div class="small">{{ MoviesData.enm }}</div>
                        <div class="small">猫眼观众评分</div>
                        <div class="small">
                            <span class="smallbig">{{ MoviesData.sc }}</span
                            >({{(MoviesData.snum/10000 + '').slice(0,4)}}万人评)
                        </div>
                        <div class="small">
                            {{ MoviesData.cat }}
                            <span class="smallwhi">{{ smallwhi }}</span>
                        </div>
                        <div class="small">
                            {{ MoviesData.src }} / {{ MoviesData.dur }}分钟
                        </div>
                        <div class="small">{{ MoviesData.rt }} {{MoviesData.src}}上映</div>
                        
                    </div>
                </div>
                <div class="linking">
                    <div class="linkle" @click="sendMovie(linkMath,'linkMath')">
                        <van-icon name="like" :class="{'want-icon': wantActive}"/>
                        想看
                    </div>
                    <div class="linkri" @click="sendMovie(linkMaths,'linkMaths')">
                        <van-icon name="star" :class="{'see-icon':seeActive}"/>
                        看过
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
            linkMath: JSON.parse(localStorage.linkMath),
            linkMaths: JSON.parse(localStorage.linkMaths)
        };
    },
    props: {
        MoviesData: Object,
        smallwhi: String,
        
    },
    methods: {
        sendMovie(localList,key) {
            if(localList.indexOf(this.MoviesData.id + '') == -1){
                localList.push(this.MoviesData.id + '')
            }else {
                localList.splice(localList.findIndex(v => v == this.MoviesData.id),1)
            }
            localStorage.setItem(key,JSON.stringify(localList))
        }
    },
    computed: {
        wantActive() {
            // console.log(JSON.parse(localStorage.linkMath).indexOf(this.MoviesData.id + '')!= -1);
            return this.linkMath.indexOf(this.MoviesData.id + '') != -1
        },
        seeActive() {
            return this.linkMaths.indexOf(this.MoviesData.id + '') != -1
        }
    },
    watch: {},
    created() {
    },
};
</script>
<style lang="less" scoped>
.box {
    background-size: cover;
    position: relative;
}
.cover{
    background-color: #8e8e8e99;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
}
.main-box {position: relative;
    z-index: 10;
margin-top: 45rem;
    width: 100vw;
    height: 240rem;
    padding: 20rem 15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    backdrop-filter: blur(15rem);
    .main-top-img {
        position: relative;
        display: flex;
        .left {
            position: relative;
        }
        img {
            width: 107rem;
        }

        .play-circle {
            position: absolute;
            right: 5rem;
            bottom: 7rem;
            text-align: center;
            color: white;
            font-size: 30rem;
        }

        .maname {
            // height: 110rem;
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
                // height: 15rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: white;
                margin-bottom: 4rem;
                .smallwhi {
                    display: inline-block;
                    padding: 4rem;
                    background-color: #67bbe5;
                    text-align: center;
                    transform: scale(.8);
                    color: white;
                }

                .smallbig {
                    font-size: 15rem;
                    color: #e8a404;
                }
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
            font-size: 14rem;
            line-height: 30rem;
            .want-icon {
                color: red;
            }
        }
        .linkri {
            width: 50vw;
            height: 30rem;
            border-radius: 5rem;
            background-color: #ebebeb47;
            text-align: center;
            color: white;
            font-size: 14rem;
            line-height: 30rem;
            .see-icon {
                color: #ffff00;
            }
        }
    }
}
</style>