<template>
    <div class="page-nav">
        <!-- vue简化开发 将template配置选项改为标签 -->
            <div class="head">
                <div class="left" @click="back">
                    <img src="@/assets/icon/arrow-left.png" alt="">
                </div>
                <span>演出票务列表</span>
                <div class="right" @click="show=!show"></div>
            </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            
            show: false,
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
    .head {
        padding: 5rem 10rem 5rem 5rem;
        width: 99.8vw;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .5rem solid #ddd;
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
</style>