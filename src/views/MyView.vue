<template>
  <div>
    <div class="login">
      <div class="cover"></div>
      <div class="box">
        <img src="../assets/img/sidebar_pic.png" alt="" />
        <p>点击登录</p>
      </div>
    </div>
    <div class="middle">
      <div class="left item">
        <img src="../assets/img/user_friend.png" alt="" />
        <div class="text">哇啦</div>
      </div>
      <div class="center item">
        <img
          src="../assets/img/attention_cinema_icon.png"
          alt=""
        />
        <div class="text">收藏</div>
      </div>
      <div class="right item">
        <img
          src="../assets/img/mine_order_icon.png"
          alt=""
        />
        <div class="text">订单</div>
      </div>
    </div>
    <div class="list">
      <my-item
        text="我的票券升级为优惠券"
        :picUrl="`https://show.maoyan.com/s3plus/gewara/icons/i-yhq.png`"
        head="优惠券"
      ></my-item>
      <my-item
        text="观影卡升级为猫娱卡"
        :picUrl="`https://show.maoyan.com/s3plus/gewara/icons/i-gyk.png`"
        head="猫娱卡"
      ></my-item>
      <my-item
        :picUrl="`https://show.maoyan.com/s3plus/gewara/icons/i-zkk.png`"
        head="折扣卡"
      ></my-item>
      <my-item
        :picUrl="`https://show.maoyan.com/s3plus/gewara/icons/i-jf.png`"
        head="我的积分"
      ></my-item>
    </div>

    <div class="list last">
      <my-item
        :num="1"
        text="手机/密码更换"
        head="账号设置"
      ></my-item>
      <my-item :num="2" head="意见反馈"></my-item>
      <my-item :num="3" head="联系客服"></my-item>
    </div>
  </div>
</template>

<script>
import MyItem from "../components/MyItem.vue";
export default {
  components: {
    MyItem,
  },
};
</script>

<style lang="less" scoped>

.login {
  background-image: url(../assets/img/sidebar_pic.png);
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  height: 200rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .cover {
    background-color: #6867676b;
    -webkit-backdrop-filter: blur(10rem);
    backdrop-filter: blur(10rem);
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
  .box {
    position: relative;
    z-index: 5;
    img {
      border-radius: 50%;
      width: 80rem;
    }
    p {
      padding: 10rem;
      text-align: center;
    }
  }
}
.middle {
  display: flex;
  justify-content: space-around;
  padding: 15rem;
  img {
    width: 40rem;
  }
  text-align: center;
}

.list {
  border-top: 10rem solid #f0efef;
 
}
  .last{
    border-bottom: 10rem solid #f0efef;
  }
</style>
