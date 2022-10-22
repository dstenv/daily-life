<template>
  <div class="detail-page">
    <!-- vue简化开发 将template配置选项改为标签 -->
    <div class="content">
      <div class="box">
        <div class="top">
          <div class="left">
            <img :src="data?.posterUrl" alt="" />
          </div>
          <div class="right">
            <span class="right-name">{{ data?.name }}</span>
            <span>{{ data?.priceList.join("-") }} 元</span>
          </div>
        </div>
        <div class="bottom">
          <span>{{ data?.showTimeRange }}</span>
          <span
            >{{ data?.cityName }}&nbsp;&nbsp;{{
              data?.shopName
            }}</span
          >
        </div>
        <div class="bottom-box">
          <div class="do" @click="see(1)">
            <img
              v-if="!boolwant"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMAs/z1+LuupZRN4rGhjoh67Ofd1L+2qJx0NBfw2c3DmIB+X1c8KyAdEghxa0RDCwRuTtF4AAABIElEQVRIx+3Tx3KDMBCA4ZVErwYTU9xr7NR9/6fLxGYwrCUFLrmY77gz/+igXRg9s2ofBZYd7k7NxPUTwYVnl+ro691ntbi6Tsop1viqUlSva3ZnHwFgZ+Dd/CCtzgFrs0p449gmjpLqO2RdvsOxK7k8Zi4jlhypNVAXm1RTfGScaXaQVlRMs6JbLVBqSTOnU6UoN6GZ3a48VDBoZvWpkNMsb6KXBJUEzaKmmqCaR7N9nwpnNDvdKnOOOh9Aba+V0FYLydn4jGWGtuKfINvllb5CB2S2XF+ZIJdpqwxUTO1bakxZMdCxFJUFejPldugFkiqAv+VI5dCHo/xlvbBThdBX1Koi6G/D64hvYIiY36oYhin4b1XAUG4qUhdGo3/2A0wegsC8d2KOAAAAAElFTkSuQmCC"
              alt=""
            />
     
            <svg
              v-if="boolwant"
              t="1666008436184"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14807"
              width="15"
              height="15"
            >
              <path
                d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z"
                p-id="14808"
                fill="#d81e06"
              ></path>
            </svg>
            <span>想看</span>
          </div>
          <div class="do" @click="see(2)">
            <img
              v-if="!boolhave"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAAA85JREFUaEPtmUuolVUUx3//Qns4qCZqkxCzgRDRoKTS0IImkQQFETYIMoIogggMxdAEX1hJEAiG0SQCewyMmjSwSM0e9BbpYUZRYaUlUdhzyT++q5fbPX577+9sOV7Omh3OWmuv3177W3vtvcUEFU1QLoZgp1pmhxkbZmxAZqD6UoyI84CXgcsb5reBhZIO1ZyDqmARYf+fAxeOgfgSmCUpasHVBtsC3NEj+KckLT7lwCLiGuBV4PQewf8DXCdpew24KhmLiMnA18C0lqAPABdI+rPfcLXAXgBuSgz2RUk3J+omq/UdLCIc5FbgtMQo/gVukeTJ6Jv0FSwizgG+As7NjPAXYIakw5l2PdX7DfYmcEVhcLslXVlo+z+zzmARMQm4DVgGXNQxMO95a4BnJP3VxVcRWNNN3AX4e7oEOKNLEOPY/gF8BPi72yzp51z/yWARMQu4G7i+yUyv/Sk3hjZ973fO5CvAJklftBn4/1awiFgIPO6PO0U/ZdAOOm7B9gP3SXL/WVY8ImIO8AbgDXeQxBv61ZLcUI8rJ8xYRLwE3DBIRKNi2SbpxlKwncBVAwq2S9LcUrDVTRkfRLYNkpaUgvnbcidx/oCRfd90Kj2b55SqeBngJTkoBcQwcyW9W1wVRwwjYmnTEQxC4pZJWtsWSGvGRsH5QLigzWHl/7dLujZljBywKYDvKqamOK6g8wMwU9JvKb6TwewsIlz6XwPc+J5McUO8QNKu1EGzwBq4FcDK1AH6pLdS0sM5vrLBGriPgYtzBuqgW3ROKwW7H3isQ7Cppv6mF0l6K9VgRK8UzOew53MHy9D3XvUh4FusByR9lmH7n2op2K3As7mDJer76vs94Eijv0TS3kTbY2qlYLcDT+cO1qLvs5YPkZ+O0Vsq6ZPcsUrB7gSezB3sBPrOzvvAwXF0lkvyssySUrB7gCeyRuqt7I33A6BXQ7tCkpdmlpSC9aMq+qLUy25fS8SrJL2TRdWheDwIrMsdbJT+702B8EVpm6yR5PvKLCnN2EPAqqyRjiv7LOVv5u9E+/WSdiTqHlMrBTOU4XLEd4Veen6FyZFHJL2eY2DdUrDUqug7wT2+2W2qqJtZt2LzAd+ApRxeT2q5Pxv4DvAjxFhxUXAr9JzbLkk/jTfbEXEW4Lt6Q17a43XGy/bekvezoow50IjwodPdx3T/BL4FtgGPSjJYsjSvNPMayNmNoW9/N0r6JtnRKMVisBEfETET+FHSryUBjLWJiDP9FtD1SakzWD9gavgYgtWY1Zo+hxmrObs1fA8zVmNWa/qcsBk7CvrAD0anq47iAAAAAElFTkSuQmCC"
              alt=""
            />
            <svg
              v-if="boolhave"
              t="1666010350102"
              class="icon"
              viewBox="0 0 1025 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="15999"
              width="14"
              height="14"
            >
              <path
                d="M778.479 1002.496c-12.288 0-24.576-3.071-37.888-10.239L533.742 883.713c-5.12-3.072-12.288-5.12-20.479-5.12-7.168 0-15.36 2.048-20.48 4.096L286.959 992.257c-12.288 7.168-24.576 10.239-38.912 10.239-24.576 0-48.128-11.264-64.513-29.695-16.384-18.433-22.527-43.008-18.432-67.584l39.937-229.376c2.048-14.336-3.072-28.672-13.313-38.912L25.839 476.16C2.287 453.633-5.905 420.864 4.335 390.144c10.239-30.721 35.84-52.225 67.584-57.345l229.376-33.792c14.336-2.048 27.647-11.264 33.791-23.552l102.4-208.896c14.336-28.672 43.008-46.08 74.752-46.08s60.416 17.408 74.752 46.08l102.4 208.896c7.168 13.313 19.456 21.504 33.792 23.552L952.559 332.8c31.744 5.12 57.344 26.624 67.584 56.32 10.24 30.72 2.048 63.488-20.48 86.017L834.799 636.928c-11.265 10.24-15.36 24.576-13.313 38.912l38.912 228.352c4.096 24.576-2.048 49.152-18.432 67.584C826.607 991.232 803.055 1002.496 778.479 1002.496z"
                p-id="16000"
                fill="#f4ea2a"
              ></path>
            </svg>
            <span>看过</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boolwant: false,
      boolhave: false,
      want:
        JSON.parse(localStorage.getItem("wantsee")) || [],
      have:
        JSON.parse(localStorage.getItem("havesee")) || [],
    };
  },
  props: {
    data: {
      type: Object,
    },
    performanceId: [Number, String],
  },
  methods: {
    see(n) {
      let i = -1;
      if (n === 1) {
        i =
          this.want.length > 0
            ? this.want.findIndex(
                (o) => o === this.performanceId
              )
            : -1;
        console.log("i", i);
        if (i !== -1) {
          this.want.splice(i, 1);
          console.log(this.want);
        } else {
          this.want.push(this.performanceId);
          this.want = [...new Set(this.want)];
        }

          localStorage.setItem(
            "wantsee",
            JSON.stringify(this.want)
          );
        if (this.want) {
          this.boolwant = this.want.includes(
            this.performanceId
          );
        }
      } else if (n === 2) {
        if (
          (i = this.have.findIndex(
            (o) => o === this.performanceId
          )) !== -1
        ) {
          this.have.splice(i, 1);
        } else {
          this.have.push(this.performanceId);
          this.have = [...new Set(this.have)];
        }
          localStorage.setItem(
            "havesee",
            JSON.stringify(this.have)
          );

        if (this.have) {
          this.boolhave = this.have.includes(
            this.performanceId
          );
        }
      }
    },
  },
  computed: {},
  watch: {
    want() {},
    have() {},
  },
  created() {
    if (this.want && this.want.length > 0) {
      this.boolwant = this.want.includes(
        this.performanceId
      );
    }
    if (this.have && this.have.length > 0) {
      this.boolhave = this.have.includes(
        this.performanceId
      );
    }
  },
};
</script>
<style lang="less" scoped>
.detail-page {
  overflow: hidden;
}
.content {
  padding: 15rem;
  margin-top: 45rem;
  // height: 300rem;
  // background: radial-gradient(#36304f,#44435f,#36304f);
  background-image: url(https://www.dpfile.com/app/myshow/static/img/bg@2x.png);
  background-size: cover;
}
.box {
  color: #fff;
  backdrop-filter: blur(10rem);
}
.top {
  display: flex;
  .left {
    border-radius: 8rem;
    width: 104rem;
    & > img {
      border-radius: 8rem;
      display: block;
    }
  }
  .right {
    box-sizing: border-box;
    padding-left: 10rem;
    width: calc(100% - 104rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > span {
      font-size: 13rem;
      display: block;
      font-family: DINAlternate-Bold;
    }
    .right-name {
      font-family: initial;
      letter-spacing: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 设置显示文本的行数 */
      -webkit-box-orient: vertical;
      font-size: 14rem;
    }
  }
}
.bottom {
  margin: 15rem 0;
  border-radius: 8rem;
  background-color: #1f1e3b;
  padding: 12rem 10rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  & > span:first-of-type {
    margin-bottom: 5rem;
  }
}

.bottom-box {
  display: flex;
  margin-bottom: 10rem;
  & > div:first-of-type {
    margin-right: 10rem;
  }
  .do {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > div {
    display: flex;
    align-items: center;
    flex: 1;
    background-color: rgba(212, 219, 255, 0.1);
    display: inline-block;
    padding: 2rem 20rem;
    text-align: center;
    padding: 8rem 0;
    border-radius: 8rem;
    & > img {
      vertical-align: top;
      width: 16rem;
    }
    & > span {
      margin-left: 5rem;
    }
  }
}
</style>
