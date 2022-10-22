<template>
    <div class="city-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul
        @touchstart="$emit('close-isshow')"
            class="list-item"
            :class="{ list2: isBuy }"
            v-if="showData.length > 0"
        >
            <li v-for="(item, index) in showData" :key="index" @click="$router.push({path:'/cinema',query:{id: item.id,mId: mId} })">
                <div class="top">
                    <span class="name">{{ item.nm }}</span>
                    <span class="distance" v-if="item.distance">{{
                        item.distance
                    }}</span>
                </div>
                <div class="mid">
                    <span
                        class="p2"
                        v-if="!item.sellPrice && item.referencePrice"
                        >参考价:</span
                    >
                    <span
                        class="m-p"
                        v-if="item.sellPrice != 0 || item.referencePrice != 0"
                        >￥</span
                    >
                    <span class="m-p p" v-if="item.sellPrice">{{
                        item.sellPrice
                    }}</span>
                    <span
                        class="m-p p"
                        v-if="!item.sellPrice && item.referencePrice != 0"
                        >{{ item.referencePrice }}</span
                    >
                    <span
                        class="m-p p2"
                        v-if="item.sellPrice == 0 && item.referencePrice == 0"
                        >暂无</span
                    >
                    <span
                        class="m-p"
                        v-if="item.sellPrice && item.referencePrice"
                        >起</span
                    >
                </div>
                <div class="bottom">
                    <ul class="labels">
                        <li v-for="label in item.labels" :key="label.name">
                            <span
                                :style="[
                                    { color: label.color },
                                    { border: `1px solid ${label.color}` },
                                ]"
                                >{{ label.name }}</span
                            >
                        </li>
                    </ul>
                    <div class="showTimes" v-if="item.showTimes">
                        近期场次：{{item.showTimes}}
                    </div>
                    <div class="promotions" v-if="item.promotion">
                        <div
                            v-if="item.promotion.cardPromotionTag"
                            class="c-tag"
                        >
                            <span>卡</span>
                            <span>{{ item.promotion.cardPromotionTag }}</span>
                        </div>
                        <div
                            v-if="item.promotion.platformActivityTag"
                            class="p-tag"
                        >
                            <span>惠</span>
                            <span>{{
                                item.promotion.platformActivityTag
                            }}</span>
                        </div>
                    </div>
                </div>
            </li>
            <wd-infinite-load
                ref="loadmore"
                @loadmore="loadmore"
                :loading="loading"
                :immediate-check="false"
                :offset="10"
            ></wd-infinite-load>
        </ul>
        <div class="no-data" v-if="showData.length == 0" :class="{ list2: isBuy }">
            <div>
                <img
                    src="https://www.dpfile.com/app/myshow/static/img/no.png"
                    alt=""
                />
            </div>
            <span>小喵没有找到影院哦~</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            maxTotal: 0,
            loading: false,
            listData: [],
            showData: [],
            findList1: [],
            findList2: [],
            findList: [],
        };
    },
    props: {
        mId: Number,
        param: Object,
        checkId: Array,
        screenSel: Array,
        isFinish: Boolean,
        isBuy: Boolean,
        selTime: {
            type: Object,
            require: false
        },
        timefinish: {
            type:Boolean,
            require: false
        },
        selName: {
            type:String,
            require: false
        },
        timeAxios: {
            type: Boolean,
            require: false
        }
    },
    methods: {
        async getListData(param,isb) {
            let res = {}
                console.log("子组件aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", param);
                if(!isb) {
                    res = await this.axios.get(
                        `/abc/mmcs/cinema/v1/select/cinemas.json`,
                        {
                            params: param,
                        }
                    );
                }else {
                    res = await this.$axios.get('/buyticket/mmcs/cinema/v1/select/movie/cinemas.json', {
                        params:param
                    })
                }
                // http://api.maoyan.com/mmcs/cinema/v1/select/cinemas.json
                console.log(res);
                this.listData = [...this.listData, ...res.data.data.cinemas];
                // let findArr = []
                this.listData.forEach((v) => {
                    v.special = v.labels.filter((val) => {
                        return v.tag.hallType?.indexOf(val.name) == -1;
                    });
                });
                console.log(this.listData);
                this.maxTotal = res.data.data.paging.total;
                console.log(this.maxTotal);
                if (this.showData.length < 0) {
                    this.showData = this.listData;
                } else {
                    // this.showData = [...this.showData,...data.data.cinemas]
                    this.showData = this.loading
                        ? [...this.showData, ...res.data.data.cinemas]
                        : res.data.data.cinemas;
                }
                if (this.checkId[1] == -1) {
                    this.showData = this.showData.sort((a, b) => {
                        return parseFloat(a.distance) - parseFloat(b.distance);
                    });
                } else {
                    this.showData = this.showData.sort((a, b) => {
                        return parseFloat(a.price) - parseFloat(b.price);
                    });
                }
                console.log("影院数据列表 --> ", this.showData);
            
        },
        loadmore() {
            console.log("准备加载更多");
            this.loading = true;
            console.log("loadmore", this.param.offset);
            // offset+10>=maxTotal
            if (this.maxTotal - this.showData.length > 0) {
                setTimeout(() => {
                    this.$emit("addOffset", this.param.offset + 10);
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                    this.maxTotal--;
                }, 2000);
            } else {
                // this.loading = false
                this.$refs.loadmore.loadEnd();
            }
        },
        screenFun(screenarr) {
            console.log(screenarr);
            let reg = /[^全部]/;
            this.findList1 = [];
            this.findList2 = [];
            this.findList = [];
            screenarr.forEach((v, index) => {
                if (reg.test(v)) {
                    console.log("不是全部");
                    let reg2 = /厅/;
                    if (reg2.test(v)) {
                        this.listData.forEach((value) => {
                            let arr = value.tag.hallType?.filter(
                                (val) => val == v
                            );
                            // console.log(arr);
                            if (arr.length > 0) {
                                this.findList2.push(value);
                            }
                        });
                        console.log("findList2", this.findList2);
                    } else {
                        this.listData.forEach((value) => {
                            let arr = value.labels?.filter(
                                (val) => val.name == v
                            );
                            // console.log(arr);
                            if (arr.length > 0) {
                                this.findList1.push(value);
                            }
                        });
                        console.log("findList1", this.findList1);
                    }
                } else {
                    // console.log('是全部');
                    if (index == 1) {
                       
                        this.findList2 = this.listData.filter(
                            (value) => value.tag.hallType?.length > 0
                        );
                        console.log("findList2", this.findList2);
                    } else {
                        
                        this.findList1 = this.listData.filter(
                            (value) => value.special?.length > 0
                        );
                        console.log("findList1", this.findList1);
                    }
                }
            });
            if (this.findList1.length > this.findList2.length) {
            
                this.findList1.forEach((v) => {
                    let arr = this.findList2.filter(
                        value => value.id == v.id
                    );
                    if(arr.length > 0){
                        this.findList.push(v);
                    }
                });
            } else {
                
                this.findList2.forEach((v) => {
                    let arr = this.findList1.filter(
                        value => value.nm == v.nm
                    );
                       if(arr.length > 0){
                        this.findList.push(v);
                    }
                });
            }
            console.log("findList", this.findList);
        },
    },
    computed: {},
    watch: {
        selTime(val) {
            if(this.isBuy) {
                console.log("子组件监听selTime", val);
                this.getListData(this.selTime,true);
                this.$nextTick(() => {
                    this.$emit('changetFinish',true)
                })
            }
        },
        param(val) {
            if(!this.isBuy) {
                console.log("子组件监听props", val);
                this.getListData(this.param,false);
            }
        },
        screenSel(val) {
            this.screenFun(val);
            // console.log(this.listData);
        },
        isFinish(val) {
            if (val) {
                this.showData = this.findList;
                if (this.showData.length < 5) {
                    this.loadmore();
                }
                this.$nextTick(() => {
                    this.$emit("changeFinish", false);
                });
            }
        },
        // timefinish(val) {
        //     console.log('子组件监听time选择是否完成',val);
        //     this.getListData(this.selTime,true);
        //     this.$nextTick(() => {
        //         this.$emit("changetFinish", false);
        //     });
        // }
    },
    created() {
        // this.getListData(this.param)
    },
};
</script>
<style lang="less" scoped>
.no-data {
    height: 509rem;
    padding-top: 150rem;
    text-align: center;
    div {
        & > img {
            width: 110rem;
            margin: 0 auto;
        }
    }
}
.list-item {
    height: 513rem;
    overflow: auto;
    // padding: 0 15rem 10rem 15rem;
    & > li {
        padding: 10rem 15rem 15rem 15rem;
        border-bottom: 0.5rem solid #ddd;
    }
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
            padding-bottom: 4rem;
            font-size: 15rem;
        }
        .distance {
            color: rgb(116, 115, 115);
        }
    }

    .mid {
        padding-bottom: 5rem;
        // display: flex;
        .m-p {
            color: #ff5403;
            vertical-align: baseline;
        }
        .p {
            font-size: 15rem;
        }
        .p2 {
            color: rgb(116, 115, 115);
            font-size: 13rem;
        }
    }
    .bottom {
        .labels {
            display: flex;
            flex-wrap: wrap;
            span {
                display: inline-block;
                padding: 1rem 2rem;
                border-radius: 3rem;
                transform: scale(0.9);
            }
        }
        .showTimes {
            padding: 5rem 0 0;
            color: #938f8f;
            font-size: 13rem;
        }
        .promotions {
            color: rgb(116, 115, 115);
            .c-tag,
            .p-tag {
                margin-top: 4rem;
                & > span {
                    &:first-of-type {
                        display: inline-block;
                        border-radius: 3rem;
                        transform: scale(0.9);
                        padding: 0.5rem 3rem;
                        color: #fff;
                        background-color: #a97be0;
                        margin-right: 4rem;
                    }
                }
            }
            .p-tag {
                & > span {
                    &:first-of-type {
                        background-color: #ff9900;
                    }
                }
            }
        }
    }
}
.list2 {
    height: 530rem;
}
</style>