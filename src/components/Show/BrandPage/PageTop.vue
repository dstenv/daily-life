<template>
    <div class="page-top">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="head">
                <div class="left" @click="back">
                    <img src="../../../assets/icon/arrow-left.png" alt="">
                </div>
                <span>品牌主页</span>
                <div class="right" @click="show=!show">
                    <img src="../../../assets/icon/share.png" alt="">
                </div>
            </div>
        </nav>
        <main>
            <section>
                <div class="top">
                    <img :src="topdata.brandImageUrl" alt="" class="bgc">
                    <div class="info">
                        <img :src="topdata.brandLogoUrl" alt="">
                        <span class="brandname">{{topdata.brandName}}</span>
                        <span class="brandintroduction">{{topdata.brandIntroduction}}</span>
                    </div>
                    <div class="mask"></div>
                </div>
            </section>
        </main>
        <footer>
            <ShareComponents :show="show" @changeShow="changeShow"/>
        </footer>
    </div>
</template>
<script>
import ShareComponents from '../ShareComponents.vue'
export default {
    components: { ShareComponents },
    data() {
        return {
            show:false
        }
    },
    props: {
        topdata: {
            type: Object
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
        
    }
}
</script>
<style lang="less" scoped>
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
        &>.left {
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
    .top {
        position: relative;
        // height: 210rem;
        & img {
            position: static;
            width: 40rem;
            margin: 0 auto;
            border-radius: 50%;
            display: block;
        }
        .bgc {
            z-index: -1;
            position: absolute;
            border-radius: 0;
            width: 100%;
        }
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background-image: linear-gradient(179deg,rgba(5,18,51,.8) 1%,rgba(5,18,51,.85) 42%,rgba(20,70,102,.9) 71%);
        }
        .info {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 20rem 0 30rem;
            &>span {
                color: #fff;
                letter-spacing: 1rem;
            }
            .brandname {
                margin: 5rem 0 30rem;
                font-size: 16rem;
                font-weight: bold;
            }
            .brandintroduction {
                display: block;
                margin: 0 auto;
                width: 180rem;
                opacity: .7;
            }
        }
    }
</style>