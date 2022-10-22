<template>
    <div class="artist-page">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <div class="head">
                    <div class="left" @click="back">
                        <img src="@/assets/icon/arrow-left.png" alt="">
                    </div>
                    <span>艺人主页</span>
                    <div class="right" @click="show=!show"></div>
                </div>
            </nav>
        </header>
        <main>
            <section style="position: relative;z-index: 5">
                <PageTop :celebrityName="celebrityName" :pic="pic"/>
            </section>
            <section class="sel-list">
                <!-- :listData="listData" -->
                <PageContent :celebrityName="celebrityName" :listData="listData" :isvideo="false"/>
            </section>
            <section style="position: relative;top: -25rem">
                <PageContent :celebrityName="celebrityName" :listData="videoData" :isvideo="true"/>
            </section>
        </main>
        <footer>
            <ShareComponents :show="show" @changeShow="changeShow"></ShareComponents>
        </footer>
    </div>
</template>
<script>
import PageTop from '../../../components/Show/ArtistPage/PageTop.vue'
import PageContent from '../../../components/Show/ArtistPage/PageContent.vue'
import ShareComponents from '@/components/Show/ShareComponents.vue'

export default {
    components: {
        PageTop,
        PageContent,
        ShareComponents,
    },
    data() {
        return {
            show: false,
            ipId: 0,
            celebrityId: 0,
            celebrityName:'',
            pic: '',
            listData: [],
            videoData: []
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
        },
        async getshowData() {
            // https://yanchu.maoyan.com/myshow/ajax/celebrityOtherProject/query
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/celebrityOtherProject/query', {
                params: {
                    otherTourSort: 0,
                    celebrityId: this.celebrityId,
                    sellChannel: 8,
                    cityId: this.$store.state.cityId
                }
            })
            // ticketStatus: 3(售票中) 12(演出延期) 2(预订)
            this.listData = data.data
            // console.log(this.listData);
        },
        async getvedioData() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/celebrityVideo/query', {
                params: {
                    ipId: this.ipId
                }
            })
            this.videoData = data.data
            console.log(this.videoData);
        },
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        // ipId, celebrityId, celebrityName, pic
        this.ipId = this.$route.query.ipId
        this.celebrityId = this.$route.query.celebrityId
        this.celebrityName = this.$route.query.celebrityName
        this.pic = this.$route.query.pic
        console.log(this.ipId,this.celebrityId, this.celebrityName,this.pic);
        this.getshowData()
        this.getvedioData()
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
            width: 45rem;
            height: 45rem;
        }
    }
    .sel-list {
        position: relative;
        z-index: 8;
        top: -25rem;
    }
</style>