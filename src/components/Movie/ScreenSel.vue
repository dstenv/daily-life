<template>
    <div class="screen-sel">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="select-time" v-if="timeData?.length>0">
            <a style="color: black;" @click="gomaodian">
                <ul class="times">
                    <li v-for="(item,index) in timeData" :key="index" :class="{active: timeInd == index}" @click="changeTime(index)">
                        <span>{{item.date}}</span>
                    </li>
                </ul>
            </a>
        </div>
        <div class="select-sec">
            <a name='mao' ref="maodian"></a>
            <a style="color: black;" @click="gomaodian">
                <ul class="sel-list">
                    <li
                        v-for="item in listSel"
                        :key="item.name"
                        @click="showSelList(item)"
                        
                    >
                        {{ item.name }}
                        <span class="drop"></span>
                    </li>
                </ul>
            </a>
                <div class="select" v-show="isshow">
                    <SelList
                        v-if="selName == '品牌' && isshow"
                        :listData="listData"
                        :checkId="checkId[0]"
                        @changeCheck="changeCheck"
                    />
                    <SelList
                        v-if="selName == '距离近' && isshow"
                        :listData="listData"
                        :checkId="checkId[1]"
                        @changeCheck="changeCheck"
                    />
                    <div
                        class="city"
                        v-if="
                            selName == '全城' ||
                            selName == '商圈' ||
                            (selName == '地铁站' && isshow)
                        "
                    >
                        <div class="city-nav">
                            <span
                                :class="{ active: selName == '商圈' }"
                                @click="changeSelName('商圈')"
                                >商圈</span
                            >
                            <span
                                :class="{ active: selName == '地铁站' }"
                                @click="changeSelName('地铁站')"
                                >地铁站</span
                            >
                        </div>
                        <sta-dist
                            v-if="selName == '商圈' && isshow"
                            :checkId="checkId[2]"
                            :brandId="checkId[3]"
                            :listData="listData[0]"
                            @getStaAndDists="getStaAndDists"
                            @getStaAndDist="getStaAndDist"
                        />
                        <sta-dist
                            v-if="selName == '地铁站' && isshow"
                            :checkId="checkId[2]"
                            :brandId="checkId[3]"
                            :listData="listData[1]"
                            @getStaAndDists="getStaAndDists"
                            @getStaAndDist="getStaAndDist"
                        />
                    </div>
                    <div class="screen">
                        <screen-component 
                            :feature="feature" :special="special" :screenSel="screenSel"
                            v-if="selName == '筛选'"
                            @changescreen="changescreen" @reset="reset" @finish="finish"
                        />
                    </div>
                    <div class="time-sel">
                        <time-list v-if="selName == '时段'" 
                            :listData="listData" :checkTime="checkId[4]"
                            @changeTimeSel="changeTimeSel" @tfinish="tfinish" @treset="treset"
                        />
                    </div>
                </div>
                <CityList 
                    @close-isshow="isshow = false"
                    :mId="mId"
                    :param="MovieCityId" :checkId="checkId" :screenSel="screenSel" :isFinish="isFinish" :isBuy="isBuy"
                    :selTime="selTime" :timefinish="timeFinish" :selName="selName" :timeAxios="timeAxios"
                    @addOffset="addOffset" @getScreen="getScreen" @changeFinish="changeFinish" @changetFinish="changetFinish"
                />
        </div>
        <baidu-map class="bm-view" @ready="baiduok"></baidu-map>
    </div>
</template>
<script>
import SelList from '@/components/Movie/SelList.vue'
import StaDist from '@/components/Movie/StaDist.vue';
import CityList from '@/components/Movie/CityList.vue';
import ScreenComponent from '@/components/Movie/ScreenComponent.vue';
import TimeList from '@/components/Movie/BuyTicket/TimeList.vue'

export default {
    data() {
        return {
            
            selName:'', 
            listData: [],
            isshow: false,
            // 筛选条件里面的选择
            screenSel: ['全部','全部'],
            // 第0个:品牌id  第1个:距离近id  第2个: 行政区id或者地铁线路id  第3个: 商圈id或者地铁站id  第4个：时段选择
			checkId: [-1,-1,-1,-1,'100000000'],
            isFinish: false,
            lat: 0,
			lng: 0,
            offset: 0,
            // 是否选择了商圈
			isSel: true,
            timeInd: 0,
            timeFinish: false,
            timeAxios: true,
            hash: ''
        }
    },
    props: {
        listSel: Array,
        feature: Array,
        special:Array,
        mId: Number,
        isBuy: Boolean,
        timeData: {
            type: Array,
            require: false
        },
        movieid: {
            type: Number,
            require: false
        },
        backNum: {
            type: Number,
            require: false
        }
    },
    components: {
        SelList,
        StaDist,
		CityList,
        ScreenComponent,
        TimeList
    },
    methods: {
        baiduok(options) {
			let vuethis = this
			console.log('aaaa',options);
			var myGeo = new options.BMap.Geocoder()
			// 定位成功的话 `${this.$store.state.cityName}`
			myGeo.getPoint(`${this.$store.state.cityName}`,function (point) {
				if(point){
				// 移动视角
				// console.log(point);
				vuethis.lat = point.lat
				vuethis.lng = point.lng
				console.log('经纬度 --> ',vuethis.lat,vuethis.lng)
			}},`${this.$store.state.cityName}市`)

			// 逆解析
			// options.map.addEventListener('click',function () {
			// 	// var pt = e.point
			// 	var pt = {lat: 39.910925,lng: 116.413384}
			// 	// 逆解析地址
			// 	myGeo.getLocation(pt,function(rs){
			// 		console.log(pt,rs);
			// 		var addComp = rs.addressComponents
			// 		alert(addComp.province+','+addComp.city+',' +
			// 		addComp.street + ", " + addComp.streetNumber)
			// 	})
			// })
		},
        gomaodian() {
            this.$refs.maodian.scrollIntoView()
        },
        addOffset(num) {
            console.log(num);
            this.offset = num
        },
        getScreen(arr) {
            this.screenCondition = arr
        },
        changeFinish(boolean) {
            this.isFinish = boolean
        },
        changetFinish(b) {
            // console.log('改改改改改');
            this.timeFinish = b
            // this.timeAxios = false
        },
        changeTime(i) {
            this.timeInd = i
            this.offset = 0
            this.timeFinish = true
            this.timeAxios = true
        },
        changeTimeSel(id) {
            this.$set(this.checkId,4,id + '')
            this.isshow = false
            this.selName = ''
            this.timeAxios = true
        },
        showSelList(data) {
			// console.log('event --> ',event.target);
			this.isshow = true
            console.log(data);
			if(data.name == this.selName) {
				this.isshow = false
				this.selName = ''
			}
            else if((this.selName == '商圈' || this.selName == '地铁站') && data.name == '全城') {
                this.isshow = false
				this.selName = ''
            }
            else {
				this.selName = data.name
			}
			if(this.selName == '全城') {
				if(this.isSel) {
					this.selName = '商圈'
				}else {
					this.selName = '地铁站'
				}
			}
			console.log(this.selName);
			this.listData = data.subItems
			// console.log(this.listData);
		},
        changeCheck(option) {
			// console.log(this.selId,id);
            this.offset = 0
            this.isshow = false
			if(this.selName == '品牌') {
				this.$set(this.checkId,0,option.id)
			}else {
				this.$set(this.checkId,1,option.id)
			}
            this.selName = ''
            this.timeAxios = false
            console.log(this.checkId);
		},
        changescreen(options) {
            this.$set(this.screenSel,options.index,options.value)
            
            // console.log(this.screenSel);
        },
        reset(option) {
            this.isshow = option.isshow
            this.selName = option.selName
            this.screenSel = option.screenArr
                this.isFinish = option.isfinish
        },
        finish(option) {
            this.isshow = option.isshow
            this.selName = option.selName
                this.isFinish = option.isfinish
        },
        treset(option) {
            this.isshow = option.isshow
            this.selName = option.selName
            this.timeFinish = option.isfinish
            this.$set(this.checkId,4,option.id)
            // console.log(this.timeFinish);
        },
        tfinish(option) {
            this.isshow = option.isshow
            this.selName = option.selName
            this.timeFinish = option.isfinish
            // console.log(this.timeFinish);
        },
		// close() {
		// 	this.isshow =false
		// 	this.selName = ''
		// },
		getStaAndDist(id) {
            this.offset = 0
            this.isshow = false
            this.selName = ''
			this.$set(this.checkId,3,id)
			// console.log('a',id);
            this.timeAxios = false
			console.log(this.checkId);
		},
		getStaAndDists(id) {
            this.offset = 0
            if(id == -1) {
                // console.log(111111111);
                this.isshow = false
                this.selName = ''
                this.$set(this.checkId,3,id)
            }
            this.timeAxios = false
			this.$set(this.checkId,2,id)
			console.log(this.checkId);
			// console.log('b',id);
		},
		changeSelName(str) {
			if(str == '商圈') {
				this.isSel = true
			}else {
				this.isSel = false
			}
			this.selName = str
		}
    },
    computed: {
        MovieCityId() {
			if(this.isSel) {
				// return `brandId=${this.checkId[0]}&districtId=${this.checkId[3]}`
				return {
					cityId: this.$store.state.cityId,
					channelId: 80001,
					lat: this.lat,
					lng: this.lng,
                    offset: this.offset,
                    limit: 10,
					brandId: this.checkId[0],
					districtId:this.checkId[3]
				}
			}else {
				// return `brandId=${this.checkId[0]}&stationId=${this.checkId[3]}`
				return {
					cityId: this.$store.state.cityId,
					channelId: 80001,
					lat: this.lat,
					lng: this.lng,
                    offset: this.offset,
                    limit: 10,
					brandId: this.checkId[0],
					stationId:this.checkId[3]
				}
			}
		},
        selTime() {
            let selectQu = this.isSel? 'areaId':'stationId'
            let selectBef = this.isSel? 'districtId':'lineId'
            return {
                movieId: this.movieid,
                showDate:this.isBuy? this.timeData[this.timeInd]?.date:'',
                lat:this.lat,
                channelId: 80001,
                offset: this.offset,
                lng:this.lng,
                cityId:this.$store.state.cityId,
                brandId: this.checkId[0],
                [selectQu]:this.checkId[3],
                [selectBef]: this.checkId[2],
                timeRanges: `[${this.checkId[4]}]`,
                // tf: this.timeFinish
            }
        }
    },
    watch: {
        
    },
    created() {
        // this.getList()
        // console.log();
        this.hash = location.hash.slice(2)
    }
}
</script>
<style lang="less" scoped>
    .select-sec {
        position: relative;
    }
    .sel-list {
    position: relative;
    z-index: 5;
    display: flex;
    background-color: #fff;
    border-bottom: 0.5rem solid rgb(238, 237, 237);
    & > li {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 13rem;
        padding: 15rem 0;
        flex: 1;
        text-align: center;
        border-right: 0.5rem solid rgb(238, 237, 237);
        .drop {
            position: relative;
            top: 2.5rem;
            left: 4rem;
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 4rem;
            border: 4rem solid transparent;
            border-top-color: #b0b0b0;
        }
    }
    .active {
        color: #ff6820;
    }
}
    .select {
    z-index: 200;
    position: absolute;
    // margin-top: 102.4rem;
    background-color: #fff;
}
.city-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 70rem;
    & > span {
        display: inline-block;
        padding: 20rem 15rem 10rem;
        font-size: 13rem;
    }
    .active {
        color: #ff6820;
        border-bottom: 2rem solid #ff6820;
    }
}
::-webkit-scrollbar {
        display: none;
    }
.times {
    display: flex;
    width: 100vw;
    overflow: auto;
    &>li {
        flex: none;
        // width: 100rem;   
        text-align: center;
        padding: 15rem 15rem 10rem;
        font-size: 14rem;
    }
    .active {
        border-bottom: 3rem solid #ed6534;
    }
}
</style>