<template>
    <keep-alive>
    <div class="brand-home">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <PageTop :topdata="topData" />
        </header>
        <main>
            <section>
                <PageContent :contentData="contentData"/>
            </section>
        </main>
    </div>
    </keep-alive>
</template>
<script>
import PageTop from '@/components/Show/BrandPage/PageTop.vue'
import PageContent from '@/components/Show/BrandPage/PageContent.vue'
export default {
    components: { PageTop, PageContent },
    data() {
        return {
            brandId: 0,
            topData: {},
            contentData: []
        }
    },
    methods: {
        async getBrandPage() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/performances/0;st=4;p=1;s=20;tft=0', {
                params: {
                    brandId: this.brandId,
                    sellChannel: 8,
                    cityId: 20
                }
            })
            let localData = data.data.filter(v => v.cityName == this.$store.state.cityName)
            let otherData = data.data.filter(v => v.cityName != this.$store.state.cityName)
            // console.log(data);
            otherData.forEach(v => {
                v.score2 = parseFloat(v.score) / 2
            })
            this.contentData.push(localData)
            this.contentData.push(otherData)
            console.log(this.contentData);
        },
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.brandId = this.$route.params.id
        this.topData = {
            brandImageUrl:this.$route.query.brandImageUrl,
            brandName: this.$route.query.brandName,
            brandLogoUrl: this.$route.query.brandLogoUrl,
            brandIntroduction: this.$route.query.brandIntroduction,
        }
        console.log(this.brandId,this.topData);
        this.getBrandPage()
    }
}
</script>
<style lang="less" scoped>
    @import url(./index.less);
</style>