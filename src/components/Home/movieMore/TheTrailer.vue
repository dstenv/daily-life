<template>
    <div class="ever">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit">预告片推荐</div>
            </div>
            <!-- <div class="More"><span>全部剧照</span><van-icon name="arrow" /></div> -->
        </div>
        <div class="slide-box">
            <div class="slide-item" v-for="item in trailerData" :key="item.videoId">
                <img
                    :src="item.img"
                    alt=""
                />
                <span class="slicde-one">{{item.movieName}}</span>
                <span class="slicde-two"
                    >{{item.originName}}</span
                >
                <van-icon name="play-circle-o" class="play-circle" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActorView",
    data() {
        return {
            trailerData: [],
        };
    },
    props: {
        VideoPich: {
            type: Object,
        },
    },
    created() {
        this.movies();
    },
    methods: {
        movies() {
            this.axios.get(`/text/mmdb/movie/lp/list.json`).then((res) => {
                console.log(res);
                this.trailerData = res.data.data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.ever {
    position: relative;
    width: 100%;

    .mainOneIng {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #fff;
        justify-content: space-between;

        .movies {
            display: flex;
            font-size: 14rem;
            color: #a7a7a7;
        }

        .The-hit {
            width: 100vw;
            font-size: 12rem;
            padding: 5rem 10rem;
            background-color: #f5f5f5;
            color: black;
            border-bottom: 1px solid #ccc;
        }

        .More {
            color: #a7a7a7;
            margin: 2rem;
        }
    }

    .slide-box {
        background-color: white;
        display: -webkit-box;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 0 0 5rem;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
    }

    .slide-item {
        width: 130rem;
        height: 100rem;
        // border: 1px solid #ccc;
        margin-right: 10rem;
        // margin-bottom: 40rem;
        background: white;
        position: relative;

        .slicde-one {
            width: 105rem;
            bottom: 28rem;
            position: absolute;
            left: 3px;
            /* top: 0px; */
            color: white;
            display: block;
            font-size: 12rem;
            transform: scale(0.8);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .slicde-two {
            width: 119rem;
            bottom: 13rem;
            position: absolute;
            left: -3px;
            /* top: 0px; */
            color: #a8a8a8;
            display: block;
            font-size: 12rem;
            transform: scale(0.8);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        img {
            margin: 10rem 5rem;
            width: 130rem;
            height: 80rem;
        }

        .play-circle {
            position: absolute;
            right: 0;
            bottom: 15rem;
            font-size: 25rem;
            color: #fff;
        }
    }

    /*隐藏掉滚动条*/
    .slide-box::-webkit-scrollbar {
        display: none;
    }
}
</style>