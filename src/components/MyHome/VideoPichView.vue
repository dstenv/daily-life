<template>
    <div class="ever">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit">视频剧照</div>
            </div>
            <div class="More"><span>全部剧照</span><van-icon name="arrow" /></div>
        </div>
        <div class="slide-box">
            <div class="slide-item" v-show="slideList.videoImg != undefined">
                <img :src="slideList.videoImg" alt="" />
                <van-icon name="play-circle" class="play-circle" />
            </div>
            <div
                class="slide-item"
                v-for="(item, index) in slideList.photos" :key="index"
            >
                <img :src="item" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActorView",
    data() {
        return {
            slideList: [],
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
            this.axios
                .get(`/text/mmdb/movie/v5/${this.$store.state.movieId}.json`)
                .then((res) => {
                    // console.log(res.data.data.movie);
                    let data = res.data.data.movie;
                    this.slideList = data;
                    console.log('datadata',data.videoImg);
                    

                    // console.log(this.VideoPich);
                });
        },
    },
    components: {},
};
</script>

<style lang="less" scoped>
.ever {
    position: relative;
    margin: 20rem 0;
    width: 100%;

    .mainOneIng {
        display: flex;
        padding: 10rem;
        width: 100%;
        height: 100%;
        background-color: #fff;
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

    .slide-box {
        background-color: white;
        display: -webkit-box;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 0 0 10rem;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
    }

    .slide-item {
        width: 130rem;
        height: 72rem;
        // border: 1px solid #ccc;
        margin-right: 10rem;
        // margin-bottom: 40rem;
        background: white;
        position: relative;

        // img {
        //     width: 130rem;
        //     height: 80rem;
        // }

        .play-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30rem;
            color: #fff;
        }
    }

    /*隐藏掉滚动条*/
    .slide-box::-webkit-scrollbar {
        display: none;
    }
}
</style>