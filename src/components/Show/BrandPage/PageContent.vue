<template>
    <div class="page-content">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="content-box">
            <div class="top">
                <span>在售演出</span>
                <span>更多 &gt;</span>
            </div>
            <div class="local">
                <PageList :listData="contentData[0]" :isOther="false"/>
            </div>
            <span class="no-have" v-show="contentData[1]?.length == 0">没有更多啦</span>
            <div class="other" v-show="contentData[1]?.length>0">
                <div class="top">
                    <span>其他城市演出</span>
                    <PageList :listData="contentData[1]" :isOther="true"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PageList from './PageList.vue'
export default {
    components: { PageList },
    data() {
        return {
            
        }
    },
    props: {
        contentData: {
            type: Array
        }
    },
    methods: {
        
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
    .content-box {
            background-color: #fff;
            border-radius: 15rem;
            padding: 30rem 20rem;
            position: relative;
            z-index: 3;
            top: -10rem;
        &>.top {
            display: flex;
            justify-content: space-between;
            span {
                &:first-of-type{
                    font-size: 18rem;
                    font-weight: bold;
                }
                &:last-of-type {
                    background-color: #f5f5f5;
                    padding: 2rem 8rem;
                    border-radius: 12rem;
                    line-height: 24rem;
                }
            }
        }
        &>.local {
            margin-top: 5rem;
        }
        &>.other {
            span {
                font-size: 16rem;
                font-weight: bold;
            }
        }
        .no-have {
            color: #777;
            font-size: 13rem;
            display: block;
            text-align: center;
        }
    }
</style>