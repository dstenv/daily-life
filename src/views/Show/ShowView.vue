<template>
    <div class="showview">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <!-- <h1>这是演出页面</h1> -->
        <header>
            <Header :sel="headerSel"/>
        </header>
        <main>
            <section>
                <Rob />
            </section>
            <section>
                <div class="banner">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(image, index) in bannerImgs" :key="index">
                            <img v-lazy="image" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </section>
            <section>
                <Top :topData = "topData"/>
            </section>
            <section>
                <Brand />
            </section>
            <section>
                <Shot :shotData="shotData" />
            </section>
            <section>
                <Recommend :recommendData = "recommendData"/>
            </section>
        </main>
    </div>
</template>
<script>
import Header from '../../components/Show/HeaderComponents.vue'
import Rob from '../../components/Show/RobComponents.vue'
import Top from '../../components/Show/TopComponents.vue'
import Brand from '../../components/Show/BrandComponents.vue'
import Shot from '../../components/Show/ShotComponents.vue'
import Recommend from '../../components/Show/RecommendComponents.vue'

export default {
    data() {
        return {
            headerSel: [
                {
                    imgUrl: 'https://img.meituan.net/kylisean/251b917b350e4501f74c806b7a84d33c6442.png@180w_180h_1c_1e',
                    text: '话剧音乐剧',
                    categoryId: 4
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/df3b2047e7b119b30fa9e5aeeaa86c2c5389.png@180w_180h_1c_1e',
                    text: '脱口秀',
                    categoryId: 15
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/6c948edf52e230eb8437af37f554d72e5852.png@180w_180h_1c_1e',
                    text: '休闲展览',
                    categoryId: 9
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/8e70698f3ee2229f434aff6c81c9ba0b5159.png@180w_180h_1c_1e',
                    text: '沉浸剧场',
                    categoryId: 14
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/af59e1c098cca69c7b09fdecb872cda34380.png@180w_180h_1c_1e',
                    text: '演唱会',
                    categoryId: 1
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/6d1af5d881e43c937214188f73c776915585.png@180w_180h_1c_1e',
                    text: '亲子艺术',
                    categoryId: 7
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/8680a46c5592da991874fbf5be80bd6e6105.png@180w_180h_1c_1e',
                    text: '音乐会',
                    categoryId: 6
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/144dff87ac9a7192ba20f31a8f25ec9025610.png@180w_180h_1c_1e',
                    text: '相声',
                    categoryId: 16
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/bfa0903aeeabd5f7c181704e83b7813f5812.png@180w_180h_1c_1e',
                    text: '舞蹈芭蕾',
                    categoryId: 5
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/6b6618b02fd4e661620d46ae7ca14eb54919.png@180w_180h_1c_1e',
                    text: '音乐节',
                    categoryId: 10
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/fb4ed0cef0da4cbdd69b51bfd387bd7c15619.png@180w_180h_1c_1e',
                    text: '戏曲艺术',
                    categoryId: 3
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/e43306e1130cce7c1a70e5647ea1ee4715782.png@180w_180h_1c_1e',
                    text: '竞技赛事',
                    categoryId: 12
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/a78c2c6d63eace9ffa5dcf876b1115bb4776.png@180w_180h_1c_1e',
                    text: '剧本杀',
                    categoryId: 13
                },
                {
                    imgUrl: 'https://img.meituan.net/kylisean/22f3c50037036a59ef23d19c96dbbd6f5549.png@180w_180h_1c_1e',
                    text: '其他',
                    categoryId: 8
                },
            ],
            bannerImgs: [
                'https://img.meituan.net/kylisean/72256760d49b2ea7eeec96e0ecb16416176361.jpg@1035w_180h_1c_1e',
                'https://img.meituan.net/kylisean/33070784e02614e56666ad4c23ab485766229.jpg@1035w_180h_1c_1e',
                'https://img.meituan.net/kylisean/cf9ae8a139f7339f7ad3ebb42a56cd0575241.jpg@1035w_180h_1c_1e',
                'https://img.meituan.net/kylisean/9bfb89a46a657b92ff549bcdf57d75dd53796.jpg@1035w_180h_1c_1e',
                'https://img.meituan.net/kylisean/269e18403ef01aabdd173a55508413f882352.jpg@1035w_180h_1c_1e'
            ],
            shotData: [],
            recommendData: [],
            topData: []
        }
    },
    methods: {
        async getShotData() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/celebrityBasicList/query', {
                params: {
                    uuid:"0000000000000E28E8322AED94881A483556D2A23DF02A155673889673398594",
                    sellChannel:8,
                    cityId:this.$store.state.cityId,
                }
            })
            this.shotData = data.data
            console.log('shot -> ', this.shotData);
        },
        async getRecommendData() {
            // let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/performances/0;st=4;p=1;s=20;tft=0')
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/performances/0;st=4;p=1;s=20;tft=0', {
                params: {
                    sellChannel:8,
                    cityId:this.$store.state.cityId,
                }
            })
            this.recommendData = data.data
            this.recommendData.forEach(v => {
                v.score2 = parseFloat(v.score) / 2
            })
            console.log('recommendData -> ', this.recommendData);
        },
        async getTopData() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/ranks', {
                params: {
                    sellChannel: 8,
                    cityId: this.$store.state.cityId
                }
            })
            this.topData = data.data
            console.log('top -> ', this.topData);
        },
    },
    components: {
        Header,
        Rob,
        Top,
        Brand,
        Shot,
        Recommend
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.getShotData()
        this.getRecommendData()
        this.getTopData()
    }
}
</script>
<style lang="less" scoped>
    @import url(./less);
</style>