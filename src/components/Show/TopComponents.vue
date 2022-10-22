<template>
    <div class="top-components">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <!-- 背景图 -->
        <!-- <img src="https://obj.pipi.cn/festatic/common/media/1654501858099-top-bg.png" alt=""> -->
        <div class="head">
            <span class="sel-top">精选榜单</span>
            <span class="sel-many">更多榜单 &gt;</span>
        </div>
        <div class="main">
            <ul>
                <li v-for="(item,index) in topData" :key="index">
                    <div class="data-head">
                        <span class="data-title">{{item.name}}</span>
                        <span class="data-detail" @click="goDetail(item.rankId)">详情 &gt;</span>
                    </div>
                    <ul class="data-main">
                        <li v-for="(mdata,index) in item.performances" :key="index" @click="goshowdetail(mdata.performanceId)">
                            <div class="left">
                                <span class="No">NO.{{index + 1}}</span>
                                <img :src="mdata.posterUrl" alt="">
                            </div>
                            <div class="right">
                                <span class="main-name">{{mdata.name}}</span>
                                <span class="main-short">{{mdata.brightPointList? mdata.brightPointList[0].title:''}}</span>
                                <span class="m-p">￥</span><span class="main-price m-p" style="width: 35rem;">{{mdata.priceRange.split('-')[0]}}</span><span style="display: inline;width: 20rem;vertical-align: top;">起</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data() {
        return {
            rankId: 0,
        }
    },
    props: {
        topData: {
            type: Array
        }
    },
    methods: {
        goDetail(id) {
            this.rankId = id
        },
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        }
    },
    computed: {
        rankId2() {
            return this.rankId
        }
    },
    watch: {
        async rankId2(newv) {
            // https://yanchu.maoyan.com/myshow/ajax/ranks/3?sellChannel=8&cityId=20
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            let { data } = await this.axios.get(`https://yanchu.maoyan.com/myshow/ajax/ranks/${newv}`, {
                params: {
                    sellChannel: 8,
                    cityId: this.$store.state.cityId
                }
            })
            Toast.clear()
            console.log(data);
            // this.$router.push({path: '/show/toppage', query: {data: JSON.stringify(data)}})
            this.$store.commit('changeShowControl', false)
            this.$router.push({name: 'toppage', params: {data}})
        }
    },
    created() {
    }
}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .top-components {
        margin-top: 15rem;
        padding: 10rem 15rem;
        border-radius: 13rem;
        background-image: url(https://obj.pipi.cn/festatic/common/media/1654501858099-top-bg.png);
        background-size: cover;
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>.sel-top {
                font-size: 18rem;
                color: #523838;
                font-weight: 700;
            }
            &>.sel-many {
                border-radius: 15rem;
                text-align: center;
                background-color: #fff;
                padding: 4rem 8rem;
            }
        }
        .main {
            width: 100%;
            overflow: auto;
            &>ul {
                width: calc(256rem * 7);
                display: flex;
                &>li {
                    margin-top: 20rem;
                    background-color: #fff;
                    border-radius: 12rem;
                    width: 256rem;
                    margin-right: 8rem;
                    padding: 13rem 12rem 0;
                    
                }
            }
        }
        .data-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .data-title {
                font-size: 18rem;
                font-weight: 700;
            }
            .data-detail {
                color: #999;
            }
        }
        .data-main {
            overflow: hidden;
            padding-top: 25rem;
            &>li {
                margin-bottom: 25rem;
                display: flex;
                .left {
                    position: relative;
                    .No {
                        position: absolute;
                        padding: 1rem 2rem;
                        background-color: #ffece1;
                        color: #522727;
                        top: -17rem;
                        left: 3rem;
                        font-weight: bold;
                        border-radius: 3rem;
                    }
                    border-radius: 10rem;
                    &>img {
                        border-radius: 10rem;
                        outline: none;
                        width: 42rem;
                        height: 56rem;
                        max-width: 42rem;
                    }
                }
                &:first-of-type .left img {
                    height: 68rem;
                    width: 51rem;
                    max-width: 51rem;
                }
                .right {
                    margin-left: 12rem;
                    flex: 1;
                    &>span {
                        width: 181rem;
                        display: block;
                    }
                    &>.main-short {
                        margin: 3rem 0;
                        color: rgb(163, 144, 129);
                    }
                    &>.m-p {
                        display: inline;
                        color: red;
                        font-weight: 600;
                    }
                    &>.main-price {
                        margin-right: 2rem;
                        color: red;
                        font-weight: 600;
                        font-size: 15rem;
                    }
                    &>.main-name {
                        font-weight: 550;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14rem;
                    }
                }
            }
        }
    }
</style>