<template>
    <div class="show-detail">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="head">
                <div class="left" @click="back">
                    <img src="../../../assets/icon/arrow-left.png" alt="">
                </div>
                <span>猫眼演出详情</span>
                <div class="right" @click="show=!show">
                    <img src="../../../assets/icon/share.png" alt="" >
                </div>
            </div>
        </nav>
        <main>
            <section>
                <DetailpageComponents :data = "detailHead" :performanceId="performanceId" />
            </section>
            <section v-if="data.promotional && data.promotional.discountList">
                <div class="discount" >
                    <div class="top">
                        <span>限时优惠</span>
                        <span>共{{data.promotional?.discountList?.length}}个&gt;</span>
                    </div>
                    <div class="bottom">
                        <span class="zhekou">折扣</span>
                        <span>{{(data.promotional && data.promotional.discountList)? data.promotional.discountList[0].discountShow:''}}</span>
                    </div>
                </div>
            </section>
            <section class="sec-info">
                <div class="title">
                    <span>演出详情</span>
                </div>
                <div class="showdetailinfo" v-html="data.detail"></div>
            </section>
        </main>
        <footer>
            <div class="buy">
                <span>立即购票</span>
            </div>
            <ShareComponents :show="show" @changeShow="changeShow"></ShareComponents>
        </footer>
    </div>
</template>
<script>
import {Toast} from 'vant'
import DetailpageComponents from '@/components/Show/DetailPage/DetailpageComponents.vue'
import ShareComponents from '@/components/Show/ShareComponents.vue'

export default {
    components: { 
        DetailpageComponents ,
        ShareComponents
    },
    data() {
        return {
            performanceId: 0,
            data: [],
            detailHead: null,
            show: false
        }
    },

    methods: {
        back() {
            this.$store.commit('changeShowControl',true)
            // this.$router.push('/show') 
            this.$router.go(-1)
        },
        async getData(id){
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            let { data } = await this.axios.get(`https://yanchu.maoyan.com/myshow/ajax/v2/performance/${id}`)
            Toast.clear()
            this.data = data.data
            console.log(this.data);
            let {name,posterUrl,priceList,showTimeRange,cityName,shopName,serviceTitleList} = this.data
            this.detailHead = {
                name,
                posterUrl,
                priceList,
                showTimeRange,
                cityName,
                shopName,
                serviceTitleList
            }
            console.log(this.detailHead);
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
        this.performanceId = this.$route.query.id
        this.getData(this.performanceId)
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
    .content {
        padding: 15rem;
    }
    .discount {
        padding: 15rem;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15rem;
            &>span:first-of-type {
                font-size: 14rem;
                font-weight: bold;
            }
            &>span:last-of-type {
                color: #8c8e96;
            }
        }
        .bottom {
            &>span {
                display: inline-block;
                transform: scale(.85);
                color: #8c8e96;
            }
            .zhekou {
                margin-right: -8rem;
                background-color: #ffe9e9;
                color: red;
            }
        }
    }
    .sec-info {
        margin-top: 10rem;
        padding: 0 15rem;
        margin-bottom: 60rem;
        .showdetailinfo {
            color: #808188;
            letter-spacing: 1rem;
        }
        .title {
            margin: 0 0 15rem;
            &>span {
                font-size: 14rem;
                font-weight: bold;
            }
        }
    }
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        padding: 8rem 10rem;
        background-color: #fff;
    }
    .buy {
        color: #fff;
        border-radius: 20rem;
        width: calc(100vw - 20rem);
        background-color: red;
        font-size: 14rem;
        text-align: center;
        padding: 10rem 0;
        letter-spacing: 1rem;
    }
</style>