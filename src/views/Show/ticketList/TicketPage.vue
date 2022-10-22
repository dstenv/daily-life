<template>
    <div class="ticket-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <page-nav />
                <van-search
                    v-model="value"
                    shape="round"
                    placeholder="找明星、演出、场馆"
                    @focus="$router.push('/search')"
                />
                <div class="sel-box">
                    <ul class="sel-list">
                        <li v-for="(item,index) in listSel" :key="index" @click="id = item.categoryId" :class="{active: item.categoryId == id}">
                            <span>{{item.categoryName}}</span>
                        </li>
                    </ul>
                    <div class="sel-type"></div>
                </div>
            </nav>
        </header>
        <main v-if="listData?.length>0" style="min-height: 78vh;">
            <section class="list-data">
                <PageList :listData="listData" :isOther="false" :isTicketing="true"/>
            </section>
            <span class="no-data">没有更多数据</span>
        </main>
        <main v-if="listData?.length==0">
            <div class="empty">
                <img src="data:image/png;base64,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" alt="">
                <span>没有您想要的内容</span>
            </div>
        </main>
        
    </div>
</template>
<script>
import PageNav from '@/components/Show/TicketPage/PageNav.vue'
import PageList from '@/components/Show/BrandPage/PageList.vue'

export default {
    components: { PageNav, PageList },
    data() {
        return {
            value: '',
            listSel: [],
            id: 0,
            listData: []
        }
    },
    methods: {
        async getListSel() {
            let {data} = await this.axios.get('https://yanchu.maoyan.com/myshow/ajax/performance/navigation')
            this.listSel = data.data
            console.log(this.listSel);
        },
        async getListData(url) {
            // https://yanchu.maoyan.com/myshow/ajax/performances/0;st=0;p=1;s=20;tft=0;marketLevel=0?sellChannel=8&cityId=20
            let {data} = await this.axios.get(url, {
                params: {
                    sellChannel: 8,
                    cityId: this.$store.state.cityId
                }
            })
            this.listData = data.data
            this.listData.forEach(v => {
                v.score2 = parseFloat(v.score) / 2
            })
            console.log('list -->',this.listData);
        }
    },
    computed: {
        checkId() {
            return `https://yanchu.maoyan.com/myshow/ajax/performances/${this.id};st=0;p=1;s=20;tft=0;marketLevel=0`
        }
    },
    watch: {
        checkId(val) {
            // console.log(val);
            this.getListData(val)
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getListSel()
        this.getListData(this.checkId)
    }
}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .van-cell {
        border-bottom: none;
    }
    .ticket-list {
        background-color: #f0f0f0;
    }
    header {
        width: 100vw;
        height: 145.53rem;
        // margin-bottom: 145.53rem;
    }
    nav {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .sel-box {
        background-color: #fff;
        display: flex;
        width: 100vw;
    }
    .sel-list {
        width: 315vw;
        overflow: scroll;
        display: flex;
        &>li {
            position: relative;
            &>span {
                box-sizing: border-box;
                display: inline-block;
                white-space: nowrap;
                font-size: 14rem;
                padding: 5rem 10rem 5rem;
            }
        }
        .active {
            left: 0;
            &>span {
                color: #f03d37;
                border-bottom: 1px solid #f03d37;
            }
        }
    }
    .sel-type {
        flex: none;
        width: 39rem;
        height: 35.7rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAYAAAD+vg1LAAAAAXNSR0IArs4c6QAAAZVJREFUSA3NlLtLxEAQxvNERDApbO0stRXsLVVEIYiFEE6SRi2sBcHaSkFM6iAxdnaCkP8jpehpJUExHiQSv8HLseZx5BY8HJjN7szkt98+EtHzvOkkSS4EQVjP83wKTy4TRfEVL97Jsmx3Op13BdBLBLbgPrwL5zKI0gDfybJsAoBNBc0K3Lcsa5uLyLzkuu4H4LtBEMgS4s+YbQGDSaZm5G4Yhgo4i/AXwzC+JHSOQJmP4/iWF07QKIquwVmC4lNSJdm2fYPBASZY5oEz0A1wjrGldGaCSA0Z9mcf8DMk73VdX8NyPn8yzW0N9KSoHoApMAp8GJRYv8Bt4Y7jqKil61ksf6CUGGQVMAVZ5aqqrpqm2aM4WRso1dF1qxgO4BzBQzrQNE3p42FtD4NGpUVhLZiSkiRd9YtmimJ64nDn4D1MXlk+W9cIZovKfawkL8fKYy5wGVI3/l9g7HHtbWKVj1+xpmlvEPYIFQ+skrZ9+h/XWv9fMVubbBEc/1a0EDW0hEtxmw+kcY+b5OBAffhTU/7P49+e37DfwninXQAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    main {
        // margin-top: 145.53rem;
        overflow: hidden;
    }
    .list-data {
        background-color: #fff;
        padding: 0 15rem;
    }
    .no-data {
        color: #99a4be;
        font-size: 14rem;
        display: block;
        text-align: center;
        margin: 15rem 0;
    }
    .empty {
        height: calc(100vh - 145.6rem);
        box-sizing: border-box;
        padding-top: 100rem;
        text-align: center;
        &>img {
            display: block;
            width: 120rem;
            margin: 0 auto;
        }
    }
</style>