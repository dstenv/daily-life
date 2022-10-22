<template>
    <div class="time-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list-box">
            <li v-for="(item,index) in listData" :key="index" :class="{active: checkTime == item.id + ''}" @click="getId(item.id)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: '100000000'
        }
    },
    props: {
        listData: Array,
        checkTime: String,
    },
    methods: {
        getId(id) {
            this.id = id + ''
            this.$emit('changeTimeSel',this.id)
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
    ::-webkit-scrollbar {
        display: none;
    }
    .time-list {
        
    }
    .list-box {
        display: flex;
        width: calc(100vw - 30rem);
        box-sizing: border-box;
        padding: 15rem 0;
        margin: 0 15rem;
        overflow: hidden;
        flex-wrap: wrap;
        border-bottom: 1rem solid rgb(169, 168, 168);
        &>li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: none;
            width: calc(100%/5);
            border-radius: 3rem;
            height: 30rem;
            box-sizing: border-box;
            border: 1rem solid transparent;
        }
        .active {
            border: 1rem solid #ff5b0d;
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        padding: 15rem;
        .sure,
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
</style>