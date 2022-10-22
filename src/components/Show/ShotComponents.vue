<template>
    <div class="bigshot-component">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="head">
            <span>大咖新动态</span>
        </div>
        <div class="main">
            <ul class="main-person">
                <li v-for="(item,index) in shotData" :key="index" @click="goArtist(item.id,item.celebrityId,item.celebrityName,item.headUrl)">
                    <img :src="item.headUrl" alt="">
                    <span class="p-name">{{item.celebrityName}}</span>
                    <span>{{item.recommendTag}}</span>
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
        shotData: {
            type: Array
        }
    },
    methods: {
        goArtist(ipId,celebrityId,celebrityName,pic) {
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/artistpage', query: {ipId, celebrityId, celebrityName, pic}})
        }
    },
    computed: {

    },
    watch: {
        
    },
    created() {
    },
}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .bigshot-component {
        padding: 10rem 15rem;
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
    .main-person {
        width: calc(98rem * 99);
        display: flex;
        &>li {
            padding: 10rem 5rem;
            background-color: #fff;
            border-radius: 10rem;
            height: 100%;
            width: 90rem;
            margin-right: 8rem;
            display: flex;
            flex-direction: column;
            text-align: center;
            &>img {
                margin: 0 auto;
                width: 40rem;
                height: 40rem;
                border-radius: 50%;
            }
            &>span {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                letter-spacing: .5rem;
                color: #999;
            }
            .p-name {
                letter-spacing: 0;
                color: black;
                font-size: 13rem;
                margin: 8rem 0 3rem;
                font-weight: 600;
            }
        }
    }
</style>