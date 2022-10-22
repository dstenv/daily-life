<template>
  
    <div class="ever">
        <div class="mainOneIng">
            <div class="movies">
                <div class="The-hit">演职人员</div>
            </div>
            <div class="More"><span>全部</span><van-icon name="arrow" /></div>
        </div>
        <div class="slide-box">
            <div class="slide-item" v-for="(item,index) in slideList" :key="index">
                <img :src="item.avatar" alt="">
                <div class="slidename">
                    <div class="slidhedd1">{{item.cnm}}</div>
                    <div class="slidhedd2">{{item.desc}}</div>
                </div>
            </div>

        </div>
    </div>
 
</template>

<script>
export default {
    name: "ActorView",
    data() {
        return {
            slideList: []
        };
    },
    created() {
        // this.$store.state.movieId = this.moveid;
        // console.log('this.$store.state.movieId',this.$store.state.movieId);
        this.movies();
    },
    methods: {
        movies(){
            this.axios
                .get(`/text/mmdb/v7/movie/${this.$store.state.movieId}/celebrities.json`)
                .then((res) => {
                    // console.log(res.data.data);
                    this.slideList = [...res.data.data[0],...res.data.data[1]]
                    // console.log(this.slideList);
                });
        }
    
    },
    components: {},
    
}
</script>

<style lang="less" scoped>
.ever{
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
        padding: 0 0 0 10rem;
        background-color: white;
		display: -webkit-box;
		overflow-x: auto;
        overflow-y: hidden;
        // padding:  0 0 0 10rem;
		/*适应苹果*/
		-webkit-overflow-scrolling: touch;
	}
 
	.slide-item {
		width: 80rem;
		height: 150rem;
		// border: 1px solid #ccc;
		margin-right: 10rem;
		background: white;
        
        img{
            
            width: 80rem;
            height: 105rem;

        }

        .slidename{
            width: 80rem;
            margin-top: 5rem;
            text-align: center;

            .slidhedd1{
                width: 100%;
                font-size: 14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .slidhedd2{
                width: 100%;
                color: #a7a7a7;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
	}
 
	/*隐藏掉滚动条*/
	.slide-box::-webkit-scrollbar {
		display: none;
	}
}
</style>