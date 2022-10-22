<template>
    <div>
        <div class="main-one"  v-for="item in detail" :key="item.adId" v-show="item.value != 0">
            <div class="mainOneIng">
                <div class="movies">
                    <div class="The-hit" @click="Preferential">优惠享不停</div>
                </div>
            </div>
            <div class="mainOneIngpich" >
                <img :src="detail[0].img" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detail: [],
        };
    },

    created() {
        this.Preferential();
    },
    methods: {
        // https://ad.maoyan.com/api/position/detail?positionIds=1043&clientType=android&channelId=80001&ci=20
        Preferential() {
            this.axios
                .get("/iswu/api/position/detail", {
                    params: {
                        positionIds: 1043,
                        clientType: "android",
                        channelId: 80001,
                        // ci是市的cityId: 20,
                        ci: this.$store.state.cityId,
                    },
                })
                .then((res) => {
                    this.detail = res.data.data.map((item) => {
                        console.log("item.config[0].image", item);
                        return {
                            value :item.config.length == 0 ? 0 : item.config[0].image,
                            img:
                                item.config.length == 0
                                    ? "https://www.dpfile.com/app/myshow/static/img/no.png"
                                    : item.config[0].image,
                            positionId: item.positionId,
                            adId:
                                item.config.length == 0
                                    ? "https://www.dpfile.com/app/myshow/static/img/no.png"
                                    : item.config[0].adId,
                            materialId:
                                item.config.length == 0
                                    ? "https://www.dpfile.com/app/myshow/static/img/no.png"
                                    : item.config[0].materialId,
                        };
                    });
                    console.log("this.detail", this.detail);
                    console.log(
                        "this.detail = res.data.data[0]",
                        res.data.data
                    );
                });
        },
    },
    computed: {},
};
</script>

<style lang="less" scoped>
.main-one {
    position: relative;
    margin: 20rem 0;
    width: 100%;

    .mainOneIng {
        display: flex;
        padding: 10rem;
        width: 100%;
        height: 100%;
        justify-content: space-between;

        .moviesactive {
            color: black;
            position: relative;
            font-weight: 600;
        }
        .moviesactive::after {
            content: "";
            position: absolute;
            bottom: -10rem;
            left: 0;
            width: 50%;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 2rem;
            background-color: #f00;
        }

        .movies {
            display: flex;
            font-size: 14rem;
            color: #a7a7a7;
        }

        .The-hit {
            margin-right: 20rem;
            color: black;
            font-weight: 600;
        }

        .More {
            color: #a7a7a7;
            margin: 2rem;
        }
    }

    .mainOneIngpich {
        padding: 0 10rem;
        width: 100%;
        height: 150rem;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>