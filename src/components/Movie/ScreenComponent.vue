<template>
    <div class="screen-component">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="feature">
            <span class="title">特色功能</span>
            <div class="check-list">
                <div v-for="(item,index) in feature" :key="index" :class="{active: screenSel[0] == item}" @click="changescreen(0,item)">
                    <span v-if="item != '全部'">可</span>{{item}}
                </div>
            </div>
        </div>
        <div class="special">
            <span class="title">特效厅</span>
            <div class="check-list">
                <div v-for="(item,index) in special" :key="index" :class="{active: screenSel[1] == item}" @click="changescreen(1,item)">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="reset" @click="reset">重置</div>
            <div class="finish" @click="finish">完成</div>
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
        feature: Array,
        special: Array,
        screenSel: Array
    },
    methods: {
        changescreen(index,value) {
            this.$emit('changescreen',{
                index,
                value
            })
        },
        finish() {
            this.$emit('finish',{
                isshow: false,
                selName: '',
                isfinish:true
            })
        },
        reset() {
            this.$emit('reset',{
                isshow: false,
                selName: '',
                screenArr: ['全部','全部']
            })
            this.finish()
        }
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
    .screen-component {
        background-color: #fff;
        width: 100vw;
        padding: 10rem 15rem;
        .title {
            margin-left: 5rem;
            font-size: 15rem;
            font-weight: 500;
        }
        .special {
            height: 200rem;
            overflow: auto;
            padding-top: 10rem;
        }
        .check-list {
            margin-top: 10rem;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 5rem;
            &:last-of-type {
                border-bottom: 1px solid rgb(169, 168, 168);
            }
            &>div {
                text-align: center;
                width: calc((100vw - 60rem)/3);
                height: 27rem;
                line-height: 27rem;
                margin: 0 5rem 10rem;
                border: 1px solid rgb(135, 135, 135);
                flex: none;
            }
            .active {
                border: 1px solid #ff7433;
                color: #ff7433;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            padding: 15rem;
            .reset,
            .finish {
                border-radius: 2rem;
                padding: 7rem 17rem;
            }
            .reset {
                border: 1px solid rgb(169, 168, 168);
            }
            .finish {
                color: #fff;
                background-color: #ff5200;
            }
        }
    }
</style>