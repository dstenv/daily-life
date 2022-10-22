<template>
    <div class="artist-pagecontent">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <!-- data:image/png;base64,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 -->
        <div class="container">
            <div v-if="isvideo || listData?.length>0" class="has-data">
                <span v-if="!isvideo">{{celebrityName}} 参加的演出</span>
                <span v-if="isvideo && listData?.length!=0">精彩现场回顾</span>
                <ul class="list">
                    <li v-for="(item,index) in listData" :key="index" @click="goshowdetail(item.performanceId)">
                        <div class="left" v-if="!isvideo">
                            <img :src="item.posterUrl" alt="">
                        </div>
                        <div class="right" v-if="!isvideo">
                            <div class="info">
                                <span class="info-name">{{item.name}}</span>
                                <span>{{item.showTimeRange}}</span>
                                <span>{{item.cityName}}</span>
                            </div>
                            <div class="status">
                                <span v-if="item.ticketStatus == 3" class="sale-ing">售票中</span>
                                <span v-if="item.ticketStatus == 2" class="sale-ing">预订</span>
                                <span v-if="item.ticketStatus == 12" class="sale-ing timeout">演出延期</span>
                            </div>
                        </div>
                        <div class="data" v-if="isvideo">
                            <p>{{item.videoName}}</p>
                            <video width="345.2" height="100" controls :src="item.videoUrl" style="border-radius: 8rem;">
                                
                            </video>
                            <div class="user">
                                <img :src="item.userAvatar" alt="">
                                <span>{{item.userName}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="no-data" v-if="!isvideo && listData?.length==0">
                <div>
                    <img src="https://www.dpfile.com/app/myshow/static/img/no.png" alt="">
                </div>
                <span>小喵没有找到TA的演出哦~</span>
            </div>
        </div>
        <!-- 	https://www.dpfile.com/app/myshow/static/img/no.png -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        listData: Array,
        celebrityName: String,
        isvideo: Boolean
    },
    methods: {
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            // this.$store.commit('changeShowControl', false)
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
    .container {
        background-color: #fff;
        padding: 20rem 15rem 0;
        border-radius: 15rem 15rem 0 0;
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-size: 20%;
        &>.has-data>span {
            font-size: 22rem;
            margin-bottom: 20rem;
            font-weight: bold;
            display: block;
        }
    }
    .no-data {
        padding-top: 150rem;
        text-align: center;
        div {
            &>img {
                width: 110rem;
                margin: 0 auto;
            }
        }
    }
    .list {
        &>li {
            margin-bottom: 30rem;
            display: flex;
            .left {
                border-radius: 8rem;
                width: 84rem;
                flex: none;
                &>img {
                    border-radius: 8rem;
                }
            }
            .right {
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                padding-left: 10rem;
            }
            .info {
                &>span {
                    display: block;
                    color: #888;
                    &:nth-of-type(2) {
                        margin-bottom: 2rem;
                    }
                }
                .info-name {
                    color: black;
                    font-weight: bold;
                    font-size: 14rem;
                    margin-bottom: 10rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                    -webkit-box-orient: vertical; 
                }
            }
            .status {
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
            .data {
                padding-bottom: 20rem;
                border-bottom:0.5rem solid #ddd;
                &>p {
                    margin: 0 0 20rem;
                    font-size: 15rem;
                    color: #111;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                    -webkit-box-orient: vertical; 
                }
                .user {
                    margin-top: 20rem;
                    display: flex;
                    align-items: center;
                    &>img {
                        border-radius: 50%;
                        width: 22rem;
                    }
                    &>span {
                        margin-left: 5rem;
                    }
                }
            }
        }
    }
</style>