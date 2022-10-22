
<template>
<!-- 这个是加的路由 -->

    <div class="bosing">
        <div class="heanav">
            <van-icon name="down" class="down" @click="downgo" />
            <div class="navput">
                <div
                    class="nav-le"
                    :class="{ navputcolor: value == 1 }"
                    @click="navLe"
                >
                    全部热映
                </div>
                <div
                    class="nav-ri"
                    :class="{ navputcolor: value == 2 }"
                    @click="navRi"
                >
                    即将上映
                </div>
            </div>
        </div>
        <div class="mar"></div>
        <MoveView v-show="value == 1"/>
        <UpcomingView v-show="value == 2"/>

    </div>
</template>

<script>
import UpcomingView from "@/components/Home/UpcomingView.vue";
import MoveView from "@/components/Home/movieMore/MoveView.vue";
export default {
    data() {
        return {
            value: 1,
        };
    },
    methods: {
        downgo() {
            this.$router.go(-1);
            this.$store.commit('changeShowControl', true)
        },
        navLe() {
            this.value = 1;
        },
        navRi() {
            this.value = 2;
        },
    },
    components: {
        MoveView,
        UpcomingView
    },
};
</script>

<style lang="less" scoped>
.bosing {
    width: 100vw;

    .heanav {
        display: flex;
            position: fixed;
    z-index: 999;
        width: 100%;
        height: 50rem;
        background-color: #fafafa;

        .down {
            transform: rotate(90deg);
            color: #717171;
            margin-left: 10rem;
            line-height: 50rem;
            font-size: 20rem;
        }
        .navput {
            display: flex;
            width: 120rem;
            height: 30rem;
            border: 1px solid #ff5200;
            margin: 10rem auto;
            border-radius: 5rem;

            .nav-le {
                width: 60rem;
                height: 30rem;
                line-height: 30rem;
                text-align: center;
                color: #ff5200;
            }

            .nav-ri {
                width: 60rem;
                height: 30rem;
                line-height: 30rem;
                text-align: center;
                color: #ff5200;
            }

            // 类名绑定
            .navputcolor {
                color: #ffffff;
                background-color: #ff5200;
                border-radius: 5rem;
            }
        }
    }

    .mar{
        padding: 50px 0 0 0;
    }
}
</style>