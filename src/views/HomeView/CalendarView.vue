<template>
    <div class="CalendarView">
        <div class="main-top">
            <div class="thisone">
                <div class="thisone-le">
                    <van-icon name="arrow-left" @click="arrowRouter" />
                </div>
                <div class="yanchu">{{ month }}月演出</div>
            </div>
        </div>
        <van-calendar
            title="日历"
            :poppable="false"
            :show-confirm="false"
            :style="{ height: '350px' }"
            class="calendar"
            :show-title="false"
            :show-subtitle="true"
            :lazy-render="false"
            @select="timeDate"
            :min-date="minDate"
            :max-date="maxDate"
        />
        <div class="main">
            <div class="main-to">
                <div class="mainone" v-for="item in proprieData" :key="item.performanceId" @click="goshowdetail(item.performanceId)">
                    <div class="mainone-data">
                        <div class="mainone-img">
                            <img
                                :src="item.posterUrl"
                                alt=""
                            />
                            <div class="mainone-text">
                                售票中
                            </div>
                        </div>
                        <div class="mainone-neir">
                            <div class="mainone-one">
                                {{item.name}}
                            </div>
                            <div class="mainone-two">
                                <div class="time-two">
                                    <van-icon
                                        name="clock"
                                    />&nbsp;&nbsp;{{item.showTimeRange}}
                                </div>
                                <div class="name-two">
                                    <van-icon name="location" />&nbsp;&nbsp;{{item.cityName}} {{item.shopName}}
                                </div>
                            </div>
                            <div class="money-two">
                                ￥<span class="money-size">{{item.priceRange}}</span
                                >&nbsp;&nbsp;&nbsp;
                                <span class="proprietary">自营</span>
                                &nbsp;
                                <span class="propriechoose" v-show="item.seatType == 1">可选座</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- https://p0.meituan.net/myvideodistribute/30310040db5da65e73833a58f2e99cf66579218.jpg -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            day: 0,
            date: 0,
            month: 0,
            fullYear: 0,
            // minDate是组件的最小时间maxDate是最长时间
            minDate: new Date(2022, 9, 11),
            maxDate: new Date(2022, 9, 31),

            proprieData:[]
        };
    },
    created() {
        this.newDate();
        // this.montInfo();
    },
    watch: {},
    computed: {
        cityId() {
            return this.$store.state.cityId;
        },
    },
    methods: {
        goshowdetail(id) {
            // https://yanchu.maoyan.com/myshow/ajax/v2/performance/211667
            // this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/show/detail', query: {id}})
        },
        timeDate(date) {
            // console.log(date);
            // console.log(date.getDate());
            // console.log(date.getMonth() + 1);
            // console.log(date.getFullYear());
            this.CalendarData(date.getFullYear(), date.getMonth() + 1, date.getDate());
        },
        newDate() {
            let date = new Date().getDate();
            let mon = new Date().getMonth() + 1;
            let year = new Date().getFullYear();

            let day = new Date(year, mon, 0).getDate(); // 30

            this.month = mon;
            this.minDate = new Date(year, mon - 1, date);
            this.maxDate = new Date(year, mon - 1, day);

            console.log(date, mon, year);
            // 调用封装请求的数据year=年,mon=月,date=日,后面是箭头函数
            this.CalendarData(year, mon, date);
        },

        // 返回上一级路由
        arrowRouter() {
            this.$router.go(-1);
        },

        // 封装请求的数据
        CalendarData(year, mon, day) {
            this.axios
                .get(
                    `/yanchu/myshow/ajax/performances/0;st=0;p=1;s=20;sd=${year}-${mon}-${day}`,
                    {
                        params: {
                            cityId: this.cityId,
                        },
                    }
                )
                .then( ({data}) => {
                // console.log(data);
                this.proprieData = data.data
            });
        },

        // https://yanchu.maoyan.com/myshow/ajax/performances/0;st=0;p=1;s=10;sd=2022-10-13?cityId=20
    },
};
</script>

<style lang="less" scoped>
.CalendarView {
    width: 100vw;

    .main-top {
        position: fixed;
        width: 100vw;
        height: 40rem;
        background-color: rgb(255, 255, 255);
        z-index: 999;

        .thisone {
            padding: 0 10rem;
            display: flex;
            position: relative;

            .thisone-le {
                line-height: 40rem;
                font-size: 20rem;
                color: red;
            }

            .yanchu {
                line-height: 40rem;
                font-size: 18rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .main {
        width: 100vw;
        height: 500rem;
        overflow: hidden;

        .main-to {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            .mainone {
                padding: 5rem 10rem;
                width: 100vw;
                height: 130rem;
                // background-color: blue;

                .mainone-data {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    // background-color: red;
                    border-bottom: 1px solid #ddd;

                    .mainone-img {
                        padding: 5rem 0;
                        margin-right: 10rem;
                        width: 100rem;
                        height: 100%;
                        // background-color: yellow;
                        position: relative;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10rem;
                        }

                        .mainone-text{
                            position: absolute;
                            color: white;
                            left: 0;
                            top: 5rem;
                            padding: 3rem;
                            background: linear-gradient(
                                90deg,
                                rgba(255, 0, 0, 1) 0%,
                                rgba(255, 255, 255, 0) 100%
                            );
                            border-top-left-radius: 10rem;
                        }
                    }

                    .mainone-neir {
                        padding: 5rem 0;
                        width: 100%;
                        height: 100%;
                        // background-color: green;

                        .mainone-one {
                            font-weight: 600;
                            font-size: 14rem;
                            color: #333;
                            line-height: 20rem;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: -webkit-box;
                        }

                        .mainone-two {
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 5rem;

                            .time-two {
                                line-height: 20rem;
                                color: #999;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }

                            .name-two {
                                color: #999;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }

                        .money-two {
                            margin-top: 7rem;
                            font-size: 12rem;
                            color: #ff4d4f;

                            .money-size {
                                font-size: 18rem;
                            }

                            .proprietary {
                                padding: 2rem;
                                background-color: #fff4e8;
                                border-radius: 2rem;
                                color: #ff5c0e;
                            }
                            .propriechoose {
                                padding: 2rem;
                                background-color: #e9f2ff;
                                border-radius: 2rem;
                                color: #5d84dd;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>