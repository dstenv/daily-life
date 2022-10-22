<template>
    <div class="brand-component">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="head">
            <span>品牌馆</span>
        </div>
        <div class="main">
            <ul class="brand-box">
                <li v-for="(item,index) in brandData" :key="index" @click="gobrandpage(item.id,item)">
                    <div class="top">
                        <div>
                            <div class="mask"></div>
                            <img v-if="item.showUrls[0]" :src="item.showUrls[0] || ''" alt=""/>
                        </div>
                        <div>
                            <div class="mask"></div>
                            <img v-if="item.showUrls[1]" :src="item.showUrls[1] || ''" alt=""/>
                        </div>
                        <div>
                            <div class="mask"></div>
                            <img v-if="item.showUrls[2]" :src="item.showUrls[2] || ''" alt=""/>
                        </div>
                        <img :src="item.brandLogoUrl" alt="" class="logo" />
                    </div>
                    <div class="bottom">
                        <span class="name">{{item.brandName}}</span>
                        <span class="has-brand">近期有{{item.onSaleProjectCount}}场演出</span>
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
            brandData: []
        }
    },
    methods: {
        async getBrandData() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/brand/query', {
                params: {
                    uuid:"0000000000000E28E8322AED94881A483556D2A23DF02A155673889673398594",
                    sellChannel:8,
                    cityId:this.$store.state.cityId,
                }
            })
            this.brandData = data.data
            console.log('brand -> ', this.brandData);
        },
        gobrandpage(id,content) {
            this.$store.commit('changeShowControl', false)
            this.$router.push({path:'/brandpage', query: {
                id,
                brandImageUrl: content.brandImageUrl,
                brandName: content.brandName,
                brandLogoUrl: content.brandLogoUrl,
                brandIntroduction: content.brandIntroduction,
            }})
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.getBrandData()
    }
}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .brand-component {
        padding: 10rem 15rem;
        // height: 500rem;
    }
    .head{
        &>span {
            font-size:18rem;
            font-weight: 700;
        }
    }
    .main {
        margin-top: 15rem;
        width: 100%;
        overflow: auto;
    }
    .brand-box {
        width: calc(132rem * 11);
        display: flex;
        &>li {
            margin: 0 8rem;
            width: 124rem;
            &:first-of-type {
                margin-left: 0;
            }
            .top {
                position: relative;
                border-radius: 10rem 10rem 0 0;
                background-image: linear-gradient(180deg,#fff6f1,#fff0e8);
                height: 65rem;
                .logo {
                    position: absolute;
                    border-radius: 8rem 0 0 0;
                    right: 0;
                    bottom: 0;
                    width: 26rem;
                }
                &>div {
                    position: absolute;
                    bottom: 0;
                    background-color: #fff;
                    left: 15rem;
                    box-shadow: 0 0.25rem 0.75rem 0 rgb(146 81 42 / 23%);
                    border: 1rem solid #fff;
                    border-radius: 7rem 7rem 0 0;
                    &>img {
                        position: relative;
                        display: block;
                        height: 100%;
                        width: 100%;
                        border-radius: 7rem 7rem 0 0;
                    }
                    .mask {
                        background: hsla(0,0%,100%,.5);
                        box-shadow: 0 0.25rem 0.75rem 0 rgb(146 81 42 / 23%);
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        border-radius: 7rem 7rem 0 0;
                    }
                    &:first-of-type {
                        z-index: 3;
                        width: 39rem;
                        height: 52rem;
                    }
                    &:nth-of-type(2) {
                        transform: translateX(50%);
                        z-index:2;
                        width: 36rem;
                        height: 48rem;
                        opacity: .8;
                    }
                    &:last-of-type {
                        transform: translateX(100%);
                        z-index: 1;
                        width: 33rem;
                        opacity: .6;
                        height: 44rem;
                    }
                }
            }   
            .bottom {
                overflow: hidden;
                border-radius: 0 0 10rem 10rem;
                background-color: #fff;
                height: 54rem;
                padding-left: 8rem;
                &>span {
                    font-family: Hiragino Sans GB,sans-serif,Helvetica,"\5B8B\4F53";
                    display: block;
                }
                .name {
                    font-size: 13rem;
                    margin: 5rem 0;
                    font-weight: 600;
                }
                .has-brand {
                    letter-spacing: 1rem;
                    color: #999;
                }
            }
        }
    }
</style>