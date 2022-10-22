<template>
    <div class="sel-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list-item">
            <li v-for="(item,index) in listData" :key="index" :class="{active: item.id == checkId}" @click="sendId(item)">
                {{item.name}}
                <span v-if="item.count > 0 && index != 0">{{item.count}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        listData: Array,
        chaneShow: Boolean,
        checkId: Number,
    },
    methods: {
        sendId(data) {
            this.$emit('changeCheck',{
                id: data.id,
                text: data.name
            })
            // console.log(data.name);
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
    .list-item {
        width: 100vw;
        box-sizing: border-box;
        padding: 0 20rem;
        max-height: 350rem;
        overflow: auto;
        &>li {
            display: flex;
            justify-content: space-between;
            font-size: 13rem;
            color: #666;
            padding: 10rem 0;
        }
        .active {
            color: #ff6820;
        }
    }
</style>