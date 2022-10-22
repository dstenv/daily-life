<template>
    <div class="top-page">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="head">
                <div class="left" @click="back">
                    <img src="../../../assets/icon/arrow-left.png" alt="">
                </div>
                <span>{{data.name}}</span>
                <div class="right" @click="show = !show">
                    <img src="../../../assets/icon/share.png" alt="">
                </div>
            </div>
        </nav>
        <main>
            <section class="sec1">
                <img :src="data.imageUrl" alt="">
                <div class="many-top">更多榜单</div>
            </section>
            <section>
                <div class="top-data">
                    <ul class="data-item">
                        <li v-for="(item,index) in data.performances" :key="index">
                            <div class="left">
                                <img :src="item.posterUrl" alt="">
                            </div>
                            <div class="right">
                                <div class="top">
                                <div class="right-name">
                                    <span>{{item.name}}</span>
                                    <img src="https://obj.pipi.cn/festatic/common/image/b89b9b5921d4f7c26e892042d1f23476.png" alt="">
                                </div>
                                <div class="right-bright" v-if="item.brightPointList">
                                    <img src="https://obj.pipi.cn/festatic/common/media/1657885012849-boforeicon.png" alt="">
                                    <span>{{item.brightPointList? item.brightPointList[0].title : ''}}</span>
                                    <img src="https://obj.pipi.cn/festatic/common/media/1657885008246-aftericon.png" alt="">
                                </div>
                                <span class="right-pers">{{item.intendedNum}}人想看</span>
                                <div class="photo" v-if="item.photoStageList">
                                    <img :src="item.photoStageList[0]?.photoUrl" alt="">
                                    <img :src="item.photoStageList[1]?.photoUrl" alt="">
                                    <img :src="item.photoStageList[2]?.photoUrl" alt="">
                                </div>
                                </div>
                                <div class="bottom">
                                    <span style="font-size: 13.5rem;">{{item.priceRange.split('-')[0]}}元起</span>
                                    <span class="gosee">去看看</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
        <footer>
            <ShareComponents :show="show" @changeShow="changeShow"></ShareComponents>
        </footer>
    </div>
</template>
<script>
import ShareComponents from '@/components/Show/ShareComponents.vue'
export default {
    components: { ShareComponents },
    data() {
        return {
            data: [],
            show: false
        }
    },
    methods: {
        back() {
            this.$store.commit('changeShowControl',true)
            this.$router.go(-1) 
        },
        changeShow(val) {
            // console.log('aaa', val);
            this.show = val
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.data = this.$route.params.data.data
        console.log('ccc',this.data);
    },
}
</script>
<style lang="less" scoped>
    .top-page {
        background-color: #ff503b;
    }
    nav {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .head {
        padding: 5rem 10rem 5rem 5rem;
        width: 99.8vw;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div {
            width: 35rem;
            height: 35rem;
        }
        .left {
            &>img {
                height: 100%;
                vertical-align: middle;
            }
        }
        &>span {
            font-size: 14rem;
        }
        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            &>img {
                height: 20rem;
                vertical-align: middle;
            }
        }
    }
    main {
        margin-top: 45rem;
    }
    .sec1 {
        position: relative;
        &>img {
            z-index: -1;
            width: 100%;
        }
        .many-top {
            position: absolute;
            right: 10rem;
            top: 11rem;
            background-color: rgba(255,255,255,.15);
            border: 1px solid #fff;
            color: #fff;
            border-radius: 14rem;
            padding: 2rem 6rem;
            text-align: center;
            vertical-align: middle;
        }
    }
    .top-data {
        .data-item {
            padding-bottom: 20rem;
            overflow: hidden;
            &>li {
                box-sizing: border-box;
                display: flex;
                padding: 15rem;
                background-color: #fff;
                margin: 15rem 10rem;
                border-radius: 10rem;
                .left {
                    border-radius: 8rem;
                    width: 31%;
                    &>img {
                        border-radius: 8rem;
                        width: 100rem;
                        display: block;
                    }
                }
                .right {
                    width: 69%;
                    padding-left: 10rem;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    &>span {
                        display: block;
                    }
                    .top {
                        &>span {
                            display: block;
                        }
                    }
                    .right-name {
                        font-size: 14rem;
                        font-weight: 600;
                        letter-spacing: 1rem;
                        display: flex;
                        justify-content: space-between;
                        &>img {
                            width: 24rem;
                            height: 24rem;
                        }
                        &>span {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                    }
                    .right-bright {
                        margin-top: 5rem;
                        display: inline-block;
                        padding: 3rem 7rem;
                        background-color: #f6f6f6;
                        &>img {
                            width: 6rem;
                        }
                        &>span {
                            margin: 0 3rem;
                        }
                    }
                    .right-pers {
                        margin-top: 5rem;
                        color: #727479;
                        font-size: 13rem;
                    }
                    .photo {
                        margin: 10rem 0 15rem;
                        &>img {
                            margin-right: 1.33%;
                            width: 32%;
                            height: 70rem;
                        }
                        &>img:first-of-type {
                            border-radius: 5rem 0 0 5rem;
                        }
                        &>img:last-of-type {
                            border-radius: 0 5rem 5rem 0;
                        }
                    }
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .gosee {
                            font-size: 15rem;
                            color: #fff;
                            font-weight: 600;
                            padding: 4rem 10rem;
                            background-color: #ff503b;
                            border-radius: 15rem;
                            letter-spacing: 1rem;
                        }
                    }
                }
            }
        }
    }
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
    }
</style>