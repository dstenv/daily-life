<template>
    <div class="page-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list-item">
            <li v-for="(item,index) in listData" :key="index" @click="goshowdetail(item.performanceId)">
                <div class="left">
                    <span class="type">{{item.cornerDisplayName}}</span>
                    <img :src="item.posterUrl" alt="">
                </div>
                <div class="right">
                    <div class="top">
                        <span class="name">{{item.name}}</span>
                        <div v-show="(isOther || isTicketing) && item.score2!=0" class="score">
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
                        <span>{{item.showTimeRange}}</span>
                        <span>{{item.cityName}}&nbsp;{{item.shopName}}</span>
                    </div>
                    <div class="bottom" v-if="!isTicketing">
                        <span class="sel">选座购票</span>
                        <span class="zhekou" v-show="isOther && (item.projectExtendVO.maxDiscSingleValue || item.projectExtendVO.maxDiscSetValue)">
                            {{item.projectExtendVO.maxDiscSingleValue || item.projectExtendVO.maxDiscSetValue}}折起
                        </span>
                        <span style="font-size: 13rem;margin-right: 2rem">{{item.priceRange.split('-')[0]}}</span><span>元起</span>
                    </div>
                    <div class="ticket" v-if="isTicketing">
                        <span class="sel" v-if="item.seatType == 1">选座购票</span>
                        <span v-if="item.seatType != 1 && item.ticketStatus == 3" class="sale-ing">售票中</span>
                        <span v-if="item.seatType != 1 && item.ticketStatus == 2" class="sale-ing">预订</span>
                        <span v-if="item.seatType != 1 && item.ticketStatus == 12" class="sale-ing timeout">演出延期</span>
                        <span style="font-size: 13rem;margin-right: 2rem;font-weight: bold;">{{item.priceRange}}</span><span>元</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        listData: {
            type: Array
        },
        isOther: {
            type: Boolean
        },
        isTicketing: {
            type: Boolean,
            require: false
        }
    },
    methods: {
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
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
    .list-item {
        overflow: hidden;
        &>li {
            margin: 20rem 0;
            width: 100%;
            display: flex;
            .left {
                position: relative;
                border-radius: 8rem;
                width: 90rem;
                &>img {
                    border-radius: 8rem;
                    display: block;
                }
                .type {
                    position: absolute;
                    color: #fff;
                    font-size: 20rem;
                    transform: scale(0.5);
                    transform-origin: right top;
                    white-space: nowrap;
                    right: 4rem;
                    top: 5rem;
                    border-radius: 8rem;
                    padding: 4rem 7rem;
                    background-color: rgba(37, 40, 29, 0.7);
                }
            }
            .right {
                width: calc(100% - 90rem);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 10rem;
                .top {
                    span {
                        color: #999;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .name {
                        margin-bottom: 8rem;
                        white-space: normal;
                        color: black;
                        display: -webkit-box;
                        -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                        -webkit-box-orient: vertical; 
                        font-weight: bold;
                        font-size: 14rem;
                    }
                    .score {
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
                .sel {
                    display: inline-block;
                    padding: 1rem 4rem;
                    background-color: #fff1ef;
                    color: #ff876c;
                    transform: scale(.8);
                }
                .bottom {
                    .zhekou {
                        padding: 1rem 2rem;
                        background-color: #fff1ef;
                        color: #ff876c;
                        font-size: 13rem;
                        margin-right: 2rem;
                    }
                }
                .ticket {
                    .sale-ing {
                        display: inline-block;
                        padding: 1rem 4rem;
                        background-color: #fff1ef;
                        color: #ff876c;
                        transform: scale(0.9);
                    }
                    .timeout {
                        color: #4c8fe1;
                        background-color: #e9f5ff;
                    }
                }   
            }
        }
    }
</style>