<template>
    <div class="about">
            <!-- <div class="mask" @click="close"></div> -->
            <nav >
                <div class="navbar" >
                    <div class="left"  @click="$router.push('/city')">
                        <span>{{$store.state.cityName}}</span>
                        <img src="../../assets/icon/arrow-down.png" alt="" />
                    </div>
                    <div class="nav-search" >
                        <van-search
                            v-model="navSearchVal"
                            placeholder="找影视剧、影人、影院"
                            shape="round"
                            style="width: 100%; padding: 10rem 0 10rem 12rem;"
    
                            @click="$router.push('/search')"
                        />
                    </div>
                </div>
            </nav>

            <main >
                <section >
                    <div class="hot-movie">
                        <div class="hot-nav">
                            <span>热门影片</span>
                            <span @click="MoreEvery">查看全部 &gt;</span>
                        </div>
                        <ul class="movies">
                            <li v-for="(item, index) in hotMovies" :key="index" @click="$router.push('homeview/'+item.id)">
                                <img :src="item.img" alt="" />
                                <span>{{ item.nm }}</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <!--
                    使用这个组件传递的参数
                    listSel: 封装好的列表筛选条件
                    feature: 特色功能的筛选
                    special：特效厅的筛选
                -->
                <ScreenSel 
                    :listSel="listSel" :feature="feature" :special="special"
                />
            </main>
		
    </div>
</template>

<script>
import ScreenSel from '@/components/Movie/ScreenSel.vue'
// import MovieCity from "./MovieCity.vue";


export default {
    data() {
        return {
			listSel: [],
            
			navSearchVal: '',
			screenCondition: [
                "退",
                "改签",
                "巨幕厅",
                "IMAX厅",
                "杜比全景声厅",
                "4K厅",
                "120帧/4K厅",
                "CINITY厅",
                "ALPD Pro高亮厅",
                "CGS中国巨幕厅",
                "60帧厅",
                "RealD 6FL厅",
                "MX4D厅",
                "LUXE巨幕厅",
                "RealD厅",
                "激光厅",
                "4DX厅",
                "4D厅",
                "DTSX临境音厅",
                "Dolby Cinema厅",
                "儿童厅"
            ],
			hotMovies: [],
			// 筛选条件里面的特色功能
            feature: ['全部'],
            // 筛选条件里面的特效厅
            special: ['全部'],
        };
    },
    created() {
        this.getList();
        this.getHotMovie();
        // this.getListData(this.MovieCityId);
    },
	computed: {
		// brandId=-1&districtId=-1&stationId=-1&cityId=20
		
	},
	watch: {
		
	},
    methods: {
        // 获取列表筛选条件并进行封装
        async getList() {
            // console.log('cityId --> ',this.$store.state.cityId);
            // http://api.maoyan.com/mmcs/cinema/v1/select/items.json
            let { data } = await this.axios.get(
                "/abc/mmcs/cinema/v1/select/items.json",
                {
                    params: {
                        cityId: this.$store.state.cityId,
                    },
                }
            );
            this.listSel.push({
                name: "品牌",
				id: 0,
                subItems: data.data.brand.subItems,
            });
            // 这里注意全城有两个选择 所以subItems封装一下
            this.listSel.push({
                name: "全城",
                sonName: [
                    '商圈',
                    '地铁站',
                ],
				id: 1,
                subItems: [
                    data.data.district.subItems,
                    data.data.subway.subItems,
                ],
            });
            this.listSel.push({
                name: "距离近",
				id: 2,
                subItems: [
                    { name: "距离近", id: -1 },
                    { name: "价格低", id: 0 },
                ],
            });
            this.listSel.push({
                name: "筛选",
				id: 3,
                subItems: [],
            });
			console.log(data);
            console.log(this.listSel);

            // console.log('筛选条件',this.screenCondition);
            let reg = /厅/
            this.feature = [...this.feature,...this.screenCondition.filter(v => !reg.test(v))]
            this.special = [...this.special,...this.screenCondition.filter(v => reg.test(v))]
            // console.log('筛选条件',this.feature,this.special);
        },
		
		async getHotMovie() {
			// http://api.maoyan.com/mmdb/movie/v3/list/hot.json
			let {data} = await this.axios.get('/abc/mmdb/movie/v3/list/hot.json', {
				params: {
					cityId: this.$store.state.cityId,
				}
			})
			this.hotMovies = data.data.hot
			// console.log(data,this.hotMovies);
		},
        // 更多跳转路由
        MoreEvery(){
            // this.$store.commit('changeShowControl', false)
            this.$router.push('/HitMoviesView')
        },
        

        
    },
    components: {
        // MovieCity,
		ScreenSel
    },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
    display: none;
}
.van-cell {
    border-bottom: none;
}
.about {
    overflow: auto;
    margin-bottom: 50rem;
}
.mask {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: calc(100vh - 47.6rem);
}

nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .navbar {
        width: 100vw;
        background-color: #fff;
        z-index: 999;
        display: flex;
        align-items: center;
        padding: 0 10rem;
        font-size: 17rem;
        color: #666262;
        font-weight: 549;
        border-bottom: 0.5rem solid #ddd;
        // border {
        //     bottom {
        //         width: 90%;
        //         color: #ddd;
        //         height: 5px;
        //     };
        // };
        img {
            height: 18rem;
            vertical-align: middle;
        }
        .left {
            flex: none;
            font-size: 14rem;
            img {
                transition: all 0.3s;
                height: 11rem;
                margin-left: 5rem;
            }
        }
        .nav-search {
            width: calc(100vw - 64rem);
        }
    }
}
main {
    padding-top: 54.8rem;
}



.hot-movie {
    padding: 15rem 8rem 8rem ;
	margin: 0 7rem;
	border-bottom: 0.5rem solid #ddd;
    .hot-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > span {
            &:first-of-type {
                font-size: 14rem;
                font-weight: 500;
            }
            &:last-of-type {
                color: #666;
            }
        }
    }
    .movies {
        display: flex;
        overflow: auto;
        & > li {
            flex: none;
            margin: 8rem 8rem 0 8rem;
            &:first-of-type {
                margin-left: 0;
            }
        }
        img {
            display: block;
            width: 85rem;
            height: 115rem;
        }
        span {
            font-size: 13rem;
            margin-top: 3rem;
            display: block;
            width: 85rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>