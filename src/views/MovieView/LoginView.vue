<template>
  <nav>
    <div><img src="@/assets/image/movie_detail_score_close_normal.png" alt="" /></div>
    <div>
      <div class="Account-verification-code">
        <span
          :class="{ current: !usePassword }"
          class="Account"
          @click="usePassword = false"
          >账号登入</span
        >
        <span class="verification">|</span>
        <span
          :class="{ current: usePassword }"
          class="Account"
          @click="usePassword = true"
          >验证码登入</span
        >
      </div>

      <div class="iphone">
        <div v-if="!usePassword">
          <input type="text" placeholder="请输入手机号或邮箱" />
        </div>

        <div v-if="usePassword">
          <input type="text" placeholder="请输入手机号" />
        </div>
      </div>

      <div class="iphone">
        <div v-if="!usePassword">
          <input type="text" placeholder="请输入密码" />
        </div>

        <div v-if="usePassword">
          <input type="text" placeholder="请输入验证码" />
          <span>获取验证码</span>
        </div>
      </div>
    </div>
    <div class="user">
      <wd-checkbox-group v-model="value" shape="square" checked-color="orange">
        <wd-checkbox value="jingmai"></wd-checkbox>
      </wd-checkbox-group>
      我已阅读并同意<a href="">《用户协议》</a>
    </div>
    <div class="btn">
      <wd-button type="warning" class="wd-btn">登入</wd-button>
    </div>

    <p>遇到问题？</p>
    <div class="other">
      <div class="mode">其他登入方式</div>
      <div>
        <div class="lis-img">
          <div class="lis-img-list">
            <img src="@/assets/image/icon_share_sina.png" alt="" />
          </div>
          <div class="lis-img-list">
            <img src="@/assets/image/alilogo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      usePassword: false,
      value: ["jingmai"],
    };
  },
};
</script>

<style scoped>
nav {
  margin-left: 15rem;
}

.Account-verification-code {
  color: gray;
  margin-top: 20rem;
  margin-bottom: 20rem;
  font-size: 24rem;
}

.current {
  color: black;
}

.Account {
  margin-left: 5rem;
}

.verification {
  margin-left: 5rem;
  color: #eee;
}

input {
  border: 0;
  outline: none;
}

.iphone {
  margin-bottom: 20rem;
}

.user {
  margin-top: 5rem;
  margin-bottom: 10rem;
  display: flex;
  line-height: 20rem;
}

.btn {
  width: 100%;
  text-align: center;
}

.wd-btn {
  width: 260rem;
  background-color: orange;
}

.other {
  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  background-color: #fff;
  height: 200rem;
}

.mode {
  width: 100%;
  text-align: center;
}

.lis-img {
  display: flex;
  justify-content: center;
  
}

.lis-img-list {
  margin-top: 20rem;
  margin-bottom: 20rem;
  width: 60rem;
  height: 60rem;
  margin-left: 15rem;
  margin-right: 15rem;
 border: 1rem solid #eee;
 border-radius: 50%;
}

p{
    text-align: center;
}
</style>
