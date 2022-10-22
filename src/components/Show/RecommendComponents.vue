<template>
    <div class="recommend-component">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="head">
            <span>为你推荐</span>
        </div>
        <div class="main">
            <ul class="recommend-box">
                <li v-for="(item,index) in recommendData" :key="index" @click="goshowdetail(item.performanceId)">
                    <img :src="item.posterUrl" alt="">
                    <div class="info">
                        <span class="recommend-name">{{item.name}}</span>
                        <div class="rate" v-if="item.score2>0">
                            <span>{{item.score}}</span>
                            <van-rate 
                                allow-half
                                v-model="item.score2"
                                :size="8"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                            />
                        </div>
                        <span class="time-range">{{item.showTimeRange}}</span>
                        <span class="p p-before" style="display: inline;">￥{{item.priceRange.split('-')[0]}}</span><span class="p" style="display: inline;">起</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        recommendData: {
            type: Array
        }
    },
    methods: {
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        },
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
    .recommend-component {
        padding: 10rem 15rem;
    }
    .head{
        &>span {
            font-size:18rem;
            font-weight: 700;
        }
    }
    .recommend-box {
        margin-top: 15rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>li {
            margin-top: 10rem;
            border-radius: 12rem;
            width: calc(50% - 4rem);
            background-color: #fff;
            &>img {
                border-radius: 12rem 12rem 0 0;
                width: 100%;
                height: 225rem;
                display: block;
            }
            .info {
                padding: 7rem 15rem 10rem;
                span {
                    display: block;
                }
                .recommend-name {
                    font-size: 14rem;
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .rate {
                    margin: 5rem 0;
                    &>span {
                        display: inline;
                        color: #ff913d;
                        font-size: 12rem;
                        margin-right: 5rem;
                        font-weight: 600;
                        font-family: MaoYanHeiTi-H;
                    }
                }
            }
            .time-range {
                color: #9e9e9e;
                margin: 5rem 0 7rem;
            }
            .p {
                color: red;
                font-size: 13rem;
                vertical-align: middle;
            }
            .p-before {
                margin-right: 2rem;
                font-size: 15rem;
                font-weight: 600;
            }
        }
        &>li:nth-of-type(2n-1) {
            margin-right: 4rem;
        }
        &>li:nth-of-type(2n) {
            margin-left: 4rem;
        }
    }
</style>