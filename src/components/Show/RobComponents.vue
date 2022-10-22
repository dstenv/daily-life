<template>
    <div class="rob-components">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="navBar">
            <img src="https://obj.pipi.cn/festatic/common/media/1641437249993-today-look.png" />
            <span>更多 &gt;</span>
        </div>
        <div class="main">
            <ul class="rob-data">
                <li v-for="(item,index) in robData" :key="index" @click="goshowdetail(item.performanceId)">
                    <div class="wrapper">
                        <img :src="item.posterUrl" alt="">
                        <div class="cover">
                        </div>
                        <div class="show-core" v-if="item.score>0">
                            {{item.score}}分
                        </div>
                    </div>
                    <span class="hot info-span" v-if="item.robType == 1">
                        火热抢购中
                    </span>
                    <span class="tao-discount info-span nohot" v-if="item.robType == 2 && (item.projectExtendVO.maxDiscTicketSetNumber == 2 || item.projectExtendVO.maxDiscTicketSetNumber == 3)">
                        套票{{item.projectExtendVO.maxDiscSetValue}}折起
                    </span>
                    <span class="discount info-span nohot" v-if="item.robType == 2&& item.projectExtendVO.maxDiscTicketSetNumber == 0">
                        {{item.projectExtendVO.maxDiscSingleValue}}折起
                    </span>
                    <span>{{item.name}}</span>
                    <div class="rob-type">{{item.cornerDisplayName}}</div>
                </li>
                <li>
                    <div class="wrapper">
                        <img src="https://p0.meituan.net/ingee/002db5b983bdd6684ad58bdc8a283bc656077.png" alt="">
                        <span class="see-much">查看更多</span>
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
            robData: [],
        }
    },
    methods: {
        async getRobData() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/performances/rob/main', {
                params: {
                    sellChannel: 8,
                    cityId: this.$store.state.cityId
                }
            })
            this.robData = data.data.slice(0,12)
            console.log(this.robData);
        },
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        }
    },
    computed: {
        
    },
    created() {
        this.getRobData()
    },
    watch: {
        
    }
}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .rob-components {
        margin: 5rem 0;
        padding: 10rem 15rem;
        .navBar {
            display: flex;
            
            justify-content: space-between;
            img {
                width: 90rem;
            }
            span {
                display: inline-block;
                background-color: #f5f5f5;
                width: 50rem;
                height: 24rem;
                text-align: center;
                line-height: 24rem;
                border-radius: 10rem;
            }
        }
        .main {
            margin-top: 15rem;
            width: 100%;
            overflow: auto;
            .rob-data {
                width: 312vw;
                display: flex;
                li {
                    position: relative;
                    width: 80rem;
                    border-radius: 8rem;
                    margin: 0 5rem;
                    span {
                        display: block;
                        width: 80rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                        -webkit-box-orient: vertical; 
                        font-weight: bold;
                    }
                    .wrapper {
                        position: relative;
                        border-radius: 8rem;
                        position: relative;
                        width: 100%;
                        height: 108rem;
                        .see-much {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            margin: 0 auto;
                            transform: translate(-50%,-50%);
                            text-align: center;
                            color: #fff;
                        }
                        img {
                            border-radius: 8rem;
                            width: 100%;
                            height: 107.81rem;
                            display: block;
                        }
                        
                        .cover {
                            border-radius: 8rem;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 107.81rem;
                            border: none;
                            z-index: 1;
                            box-sizing: border-box;
                            background-image: linear-gradient(180deg,transparent,rgba(61,61,61,0) 54%,rgba(0,0,0,.85));
                        }
                        .show-core {
                            font-weight: 700;
                            position: absolute;
                            left: 5rem;
                            bottom: 5rem;
                            color: #faaf00;
                            z-index: 3;
                            font-size: 12rem;
                            font-family: MaoYanHeiTi-H;
                        }
                    }
                    &:first-of-type{
                        margin-left: 0;
                    }
                    .rob-type {
                        position: absolute;
                        color: #fff;
                        font-size: 20rem;
                        transform: scale(.5);
                        transform-origin: right top;
                        white-space: nowrap;
                        right: 4rem;
                        top: 4rem;
                        border-radius: 8rem;
                        padding: 4rem 7rem;
                        background-color: rgba(37, 40, 29,.8);
                    }
                    .info-span {
                        margin: 6rem 0;
                        display: inline-flex;
                        color: #fff;
                        width: auto;
                        border-radius: 5rem;
                        font-family: MaoYanHeiTi-H,Hiragino Sans GB,sans-serif,Helvetica,"\5B8B\4F53";
                        padding: 1rem 3rem;
                    }
                    .hot {
                        background: linear-gradient(135deg,#ff7142,#ff0b0b);
                    }
                    .nohot {
                        background: linear-gradient(270deg,#ffa30f,#ff7d3d);
                    }
                }
            }
        }
        
    }
    
</style>