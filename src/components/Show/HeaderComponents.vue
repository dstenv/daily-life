<template>
    <div class="header-components">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="navbar">
                <div class="left"  @click="$router.push('/city')">
                    <span>{{$store.state.cityName}}</span>
                    <img src="../../assets/icon/arrow-down.png" :style="{'transform':`rotate(${iconRte}deg)`}" alt="" @click="iconRotate">
                </div>
                <div>演出</div>
                <div class="right" @click="$router.push('/search')">
                    <img src="../../assets/icon/search.png" alt="">
                </div>
            </div>
        </nav>
        <div class="nav-search">
            <van-search v-model="navSearchVal" placeholder="找明星、演出、场馆"  @focus="$router.push('/search')"/>
        </div>
        <div class="sel">
            <ul class="header-select" @touchstart="down" @touchmove="move" @touchend="up" ref="Ele">
                <li v-for="(item,index) in sel" :key="index" @click="goticket(item.categoryId)">
                    <img :src="item.imgUrl" alt="">
                    {{item.text}}
                </li>
            </ul>
        </div>
        <div class="nav-tabbar" >
            <div class="tabbar" ref="tabbar"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navSearchVal:'',
            iconRte: 0,
            downX: 0,
            moveX: 0,
            pauseX: 0
        }
    },
    props: {
        sel: {
            type: Array
        }
    },
    methods: {
        iconRotate(event) {
            this.iconRte += 180
            event.target.style.transform = `rotate(${this.iconRte % 360}deg)`
        },
        down() {
            // console.log(event);
            this.downX = event.changedTouches[0].pageX
        },
        move() {
            let move = (event.changedTouches[0].pageX - this.downX) 
            this.moveX = move * 18 / (parseFloat(getComputedStyle(this.$refs.Ele).width) - 375.2)
            // console.log(this.moveX);
            // console.log(-(this.pauseX + this.moveX));
            this.$refs.tabbar.style.left = -(this.pauseX + this.moveX) + 'rem'
            if(parseFloat(this.$refs.tabbar.style.left)<=0) {
                this.$refs.tabbar.style.left = 0
            }
            if(parseFloat(this.$refs.tabbar.style.left) >= 18) {
                this.$refs.tabbar.style.left = '18rem'
            }
        },
        up() {
            this.pauseX = -parseFloat(this.$refs.tabbar.style.left)
            console.log(this.pauseX);
        },
        goticket(id) {
            this.$store.commit('changeShowControl', false)
            this.$router.push({path: '/ticketpage', query: {id}})
        }
    },

}
</script>
<style lang="less" scoped>
    ::-webkit-scrollbar{
        display:none;
    }
    .van-cell {
        border-bottom: none;
    }
    nav {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .navbar {
        width: 97.5vw;
        background-color: #fff;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 5rem;
        padding: 10rem 15rem;
        font-size: 17rem;
        color: #666262;
        font-weight: 549;
        border-bottom: .5rem solid #ddd;
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
            font-size: 14rem;
            img {
                transition: all .3s;
                height: 11rem;
                margin-left: 5rem;
            }
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            
        }
    }
    .sel {
        width: 100vw;
        overflow: auto;
        .header-select {
            position: relative;
            left: 0;
            width: 280vw;
            flex-wrap: nowrap;
            display: flex;
            margin: 10rem 0 15rem;
            &>li {
                text-align: center;
                width: 75rem;
                font-size: 12rem;
                img {
                    width: 60rem;
                    margin: 0 auto;
                    display: block;
                }
            }
        }
    }
    .nav-tabbar {
        width: 28rem;
        margin: 0 auto; 
        // height: 5rem;
        border-radius: 5rem;
        background-color: #eee;
        // background-color: red;
        .tabbar {
            position: relative;
            left: 0;
            width: 10rem;
            height: 5rem;
            border-radius: 5rem;
            background-color: red;
        }
    }
    .nav-search {
        margin-top: 43.2rem;
    }
</style>