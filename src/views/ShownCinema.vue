<template>
    <div class="shown-cinema">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="head">
                <div class="left" >
                    <img src="@/assets/icon/arrow-left.png" alt="" @click="back">
                    <span>上映影院和购票</span>
                </div>
                <div class="right" @click="show=!show">
                    <img src="@/assets/icon/share.png" alt="">
                </div>
            </div>
        </nav>
        <main>
            <section>
                <PageTop :MoviesData="MoviesData" :smallwhi="smallwhi"/>
            </section>
            <section>
                <ScreenSel 
                    :listSel="listSel" :mId="mId" :feature="feature" :special="special" :isBuy="true" :timeData="timeData" :movieid="mId"
                />
            </section>
        </main>
        <footer>
            <ShareComponents :show="show" @changeShow="changeShow"></ShareComponents>
        </footer>
    </div>
</template>
<script>
import ShareComponents from '@/components/Show/ShareComponents.vue'
import PageTop from '@/components/Movie/BuyTicket/PageTop.vue'
import ScreenSel from '@/components/Movie/ScreenSel.vue'

export default {
    data() {
        return {
            backNum: -1,
            show: false,
            mId: 0,
            timeData: [],
            currentTime: '',
            MoviesData: {},
            smallwhi: '',
            screenCondition: [
                "退",
                "改签",
                "巨幕厅",
                "IMAX厅",
                "杜比全景声厅",
                "4K厅",
                "120帧/4K厅",
                "CINITY厅",
                "ALPD Pro高亮厅",
                "CGS中国巨幕厅",
                "60帧厅",
                "RealD 6FL厅",
                "MX4D厅",
                "LUXE巨幕厅",
                "RealD厅",
                "激光厅",
                "4DX厅",
                "4D厅",
                "DTSX临境音厅",
                "Dolby Cinema厅",
                "儿童厅"
            ],
            listSel: [],
            // 筛选条件里面的特色功能
            feature: ['全部'],
            // 筛选条件里面的特效厅
            special: ['全部'],
        }
    },
    components: {
        ShareComponents,
        PageTop,
        ScreenSel
    },
    methods: {
        back() {
            this.$router.back(-1)
        },
        changeShow(val) {
            this.show = val
        },
        async getShowData() {
            // http://api.maoyan.com/mmcs/show/v1/movie/showdays.json
            let {data} = await this.$axios.get('/abc/mmcs/show/v1/movie/showdays.json', {
                params: {
                    cityId: this.$store.state.cityId,
                    movieId: this.mId
                }
            })
            this.timeData = data.data.dates
            if(!this.currentTime) {
                this.currentTime = this.timeData[0].date
            }
            // console.log(this.timeData);
        },
        moveData() {
            this.axios
                .get(`/text/mmdb/movie/v5/${this.mId}.json`)
                .then((res) => {
                    // console.log(res.data.data.movie);
                    let data = res.data.data.movie;
                    this.MoviesData = data;
                    this.smallwhi = data.ver.split("/")[0];
                    console.log(this.MoviesData);
                });
        },
        // 获取列表筛选条件并进行封装
        async getList() {
                console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',this.currentTime);
                console.log('cityId --> ',this.$store.state.cityId);
                // http://api.maoyan.com/mmcs/cinema/v1/select/items.json
                let { data } = await this.axios.get(
                    "/movie/mmcs/cinema/v1/select/items.json",
                    {
                        params: {
                            movieId:this.mId,
                            showDate:this.currentTime,
                            cityId: this.$store.state.cityId,
                        },
                    }
                );
                this.listSel.push({
                    name: "品牌",
                    id: 0,
                    subItems: data.data.brand.subItems,
                });
                // 这里注意全城有两个选择 所以subItems封装一下
                this.listSel.push({
                    name: "全城",
                    sonName: [
                        '商圈',
                        '地铁站',
                    ],
                    id: 1,
                    subItems: [
                        data.data.district.subItems,
                        data.data.subway.subItems,
                    ],
                });
                this.listSel.push({
                    name: "距离近",
                    id: 2,
                    subItems: [
                        { name: "距离近", id: -1 },
                        { name: "价格低", id: 0 },
                    ],
                });
                this.listSel.push({
                    name: '时段',
                    id: 3,
                    subItems: data.data.timeRanges.subItems
                })
                this.listSel.push({
                    name: "筛选",
                    id: 3,
                    subItems: [],
                });
                console.log(data);
                console.log(this.listSel);

                // console.log('筛选条件',this.screenCondition);
                let reg = /厅/
                this.feature = [...this.feature,...this.screenCondition.filter(v => !reg.test(v))]
                this.special = [...this.special,...this.screenCondition.filter(v => reg.test(v))]
                console.log('筛选条件',this.feature,this.special);
            
        },
    },
    computed: {
        
    },
    watch: {
        currentTime(val) {
            if(val) {
                this.getList()
            }
        }
    },
    created() {
        this.mId = parseFloat(this.$route.query.id)
        // console.log(this.mId,typeof this.mId);
        this.getShowData()
        this.moveData()
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
        .left {
            display: flex;
            align-items: center;
            &>img {
                height: 35rem;
                vertical-align: middle;
            }
            &>span {
                font-size: 16rem;
            }
        }
        .right {
            width: 35rem;
            height: 35rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &>img {
                height: 20rem;
                vertical-align: middle;
            }
        }
    }
    
</style>