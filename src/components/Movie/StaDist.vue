<template>
    <div class="sta-dist">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="box">
            <ul class="left">
                <li v-for="(item,index) in listData" :key="index" @click="getRight(item.id,item.subItems)" :class="{active: checkId == item.id}">
                    <span>{{item.name}}</span>
                    <span v-if="item.count > 0 && index != 0">{{item.count}}</span>
                </li>
            </ul>
            <ul class="right">
                <li v-for="(item,index) in rightData" :key="index" @click="sendMsg(item.id)" :class="{active: brandId == item.id}">
                    <span>{{item.name}}</span>
                    <span v-if="item.count > 0 && index != 0">{{item.count}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rightData: [],
        }
    },
    props: {
        listData: Array,
        checkId: Number,
        brandId: Number,
    },
    methods: {
        getRight(id,data) {
            this.rightData = data
            this.$emit('getStaAndDists',id)
        },
        sendMsg(id){
            this.$emit('getStaAndDist',id)
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        if(this.brandId > -1) {
            this.getRight(this.checkId,this.listData.filter( v => this.checkId == v.id)[0].subItems)
        }
    }
}
</script>
<style lang="less" scoped>
    .box {
        display: flex;
        .left {
            overflow: auto;
            max-height: 350rem;
            flex: none;
            &>li {
                font-size: 13rem;
                padding: 10rem;
                background-color: #f2f2f2;
                width: 135rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &>span {
                    &:first-of-type {
                        display: inline-block;
                        width: 100rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    &:nth-of-type(2) {
                        color: #666;
                    }
                }
            }
            .active {
                background-color: #fff;
            }
        }
        .right {
            height: 350rem;
            overflow: auto;
            width: calc(375.2rem - 135.06rem);
            &>li {
                font-size: 13rem;
                padding: 10rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &>span {
                    &:first-of-type {
                        display: inline-block;
                        width: 100rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    &:nth-of-type(2) {
                        color: #666;
                    }
                }
            }
            .active {
                color: #ff6820;
            }
        }
    }
</style>