<template>
    <div class="artisit-pagetop">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <!-- https://p1.meituan.net/scarlett/5b8fef5ad66febf0f783f2decbfa283b120523.png -->
        <div class="contain">
            <div class="left">
                <div class="img" :style="{'background-image': `url(${pic})`}"></div>
                <span>{{celebrityName}}</span>
            </div>
            <div class="right">
                <span>+&nbsp;&nbsp;关注</span>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        celebrityName: String,
        pic: String
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
    .artisit-pagetop {
        position: relative;
        margin-top: 55rem;
        background-image: url(https://p1.meituan.net/scarlett/5b8fef5ad66febf0f783f2decbfa283b120523.png);
        // background: no-repeat 50%/cover;
        padding: 20rem 15rem 70rem;
    }
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #292931;
        opacity: .7;
        // z-index: 5;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .contain{
        position: relative;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .img {
                width: 75rem;
                height: 75rem;
                border-radius: 50%;
                background: no-repeat 50%/cover;
            }
            &>span {
                margin-left: 10rem;
                font-size: 15rem;
                font-weight: bold;
                color: #fff;
            }
        }
        .right {
            display: flex;
            align-items: center;
            &>span {
                display: inline-block;
                background-color: rgb(89, 89, 101);
                color: #fff;
                padding: 8rem 20rem;
                border-radius: 21rem;
                line-height: 15.99rem;
            }
        }
    }
</style>