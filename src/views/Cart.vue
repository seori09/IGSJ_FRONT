<template>
  <div class="wrap">
    <div class="title">
      <h2>Cart</h2>
    </div>
    <ul class="thead">
      <div class="thead-inner-li">
        <li class="w8">이미지</li>
        <li class="w40">상품명(옵션)</li>
        <li class="w10">수량</li>
        <li class="w10">주문금액</li>
        <li class="w20">주문관리</li>
        <li class="w15">배송비/배송 형태</li>
      </div>
    </ul>
    <ul
      class="tbody prod-on-cart"
      :key="index"
      v-for="(item, index) in cartList"
    >
      <div class="thead-inner-li">
        <li class="product-img w8">
          <img
            :src="item.storedFileRootName"
            class="img_block"
            alt="product_name"
          />
        </li>
        <li class="product-name w40">
          <router-link :to="{ name: 'product', params: { pno: item.pno } }">
            {{ item.product_name }}
          </router-link>
        </li>
        <li class="numberbox w10">
          <div class="cnt">
            <button type="button" @click="minus(index)">-</button>
            <span class="product-cnt">
              <input
                type="number"
                id="productcnt"
                v-model.number="item.productCnt"
                class="counter"
                @change="modifyProduct(index)"
              />
            </span>
            <button type="button" @click="plus(index)">+</button>
          </div>
        </li>
        <li class="w10">
          {{
            Number(item.product_price * item.productCnt).toLocaleString()
          }}&nbsp;원
        </li>
        <li class="w20">
          <div>
            <button @click="modifyProduct(index)" class="editbutton">
              수정하기
            </button>
            <button @click="deletebutton(index)" class="delbutton">
              삭제하기
            </button>
          </div>
        </li>
        <li></li>
        <li class="w15">배송비무료</li>
      </div>
    </ul>
    <div class="cart">
      <!-- <div class="del-button"><button @click="del-button">선택삭제</button></div> -->
      <ul class="caution">
        <li style="color: red">수량 수정 후 수정하기 버튼을 눌러주세요</li>
        <li>'입고살자'는 전 상품 무료 배송입니다.</li>
        <li>2개 이상의 브랜드를 주문하신 경우, 개별 배송됩니다.</li>
        <li>결제 시 각종 할인 적용이 달라질 수 있습니다.</li>
        <li>해외배송 상품은 배송료가 추가로 발생될 수 있습니다.</li>
        <li>
          장바구니 상품은 최대 1년 보관(비회원 2일)되며 담은 시점과 현재의 판매
          가격이 달라질 수 있습니다.
        </li>
        <li>
          장바구니에는 최대 100개의 상품을 보관할 수 있으며, 주문당 한번에 주문
          가능한 상품수는 100개로 제한됩니다.
        </li>
        <li>
          구매 가능 수량이 1개로 제한된 상품은 주문 취소 시, 24시간 내 가상계좌
          재주문이 불가합니다.
        </li>
        <li>
          수량 제한 상품의 경우, 가상계좌를 통한 주문은 최대 2건까지만
          가능합니다.(미입금 주문 기준, 기존 주문 합산)
        </li>
      </ul>
      <div class="final-payment">
        <p style="margin-right: 10px">최종 결제 금액</p>
        <p>{{ formattedTotalPrice }}원</p>
      </div>
      <div class="order-button">
        <button class="order" @click="$router.push('/orderPage')">
          주문하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
    };
  },
  created() {
    this.cartInfo(this.$store.state.userInfo.userId);
  },
  computed: {
    formattedTotalPrice() {
      //전체상품 수량가격
      const totalPrice = this.cartList.reduce((acc, cartList) => {
        return acc + cartList.product_price * cartList.productCnt;
      }, 0);
      return totalPrice.toLocaleString();
    },
  },
  methods: {
    cartInfo(userId) {
      //장바구니 확인
      this.$axios
        .get(this.$serverUrl + "/cart/cartList/" + userId)
        .then((res) => {
          console.log(res.data);
          this.cartList = res.data;
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("장바구니 불러오기 오류. 다시 시도해주십시오.");
          }
        });
    },
    deletebutton(index) {
      //선택상품 삭제
      this.$axios
        .post(this.$serverUrl + "/cart/cartDelete", {
          userId: this.$store.state.userInfo.userId,
          pno: this.cartList[index].pno,
        })
        .then((res) => {
          if (res.data === true) {
            alert("상품 삭제가 완료되었습니다.");
            location.reload(true);
          } else {
            alert("상품 삭제를 하지 못했습니다. 다시 시도해주십시오.");
          }
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("상품 삭제 서버 오류. 다시 시도해주십시오.");
          }
        });
    },
    modifyProduct(index) {
      //선택 상품 수량 수정
      this.$axios
        .post(this.$serverUrl + "/cart/modifyCart", {
          productCnt: this.cartList[index].productCnt,
          pno: this.cartList[index].pno,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data == true) {
            alert("수량이 수정 되었습니다.");
            location.reload(true);
          } else {
            alert("주문 수량 수정 오류. 다시 시도해주십시오.");
          }
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("주문 수량 수정 오류(vue서버 오류). 다시 시도해주십시오.");
          }
        });
    },
    minus(index) {
      //상품 수량 변경
      if (this.cartList[index].productCnt > 1) {
        this.cartList[index].productCnt--;
      } else {
        this.cartList[index].productCnt == 1;
      }
    },
    plus(index) {
      this.cartList[index].productCnt++;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap");
* {
  /* 구글 폰트 웹사이트 전체 적용 */
  font-family: "Nanum Pen Script", cursive;
  font-family: "Noto Sans", sans-serif;
  font-family: "Noto Sans KR", sans-serif;
  margin: 0;
  padding: 0;
}
ul {
  border-bottom: 1px solid lightgray;
}
ul,
li {
  list-style: none;
}
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  position: relative;
}
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 10px 20px 10px 20px;
  line-height: 1.5;
  position: relative;
}
.title h2 {
  color: #000000;
  font-weight: bold;
  font-size: 19px;
  text-transform: uppercase;
  padding: 4px;
  margin-bottom: 0px;
}
.title,
.cart-list {
  border: 1px solid #ddd;
}
/* table */
.cart-list {
  display: table;
  width: 98%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 14px;
}
.thead-inner-li {
  display: flex;
  align-items: center;
  width: 100%;
}
.thead {
  display: flex;
  width: 100%;
  height: 50px;
}
.thead li,
.tbody li {
  display: flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  float: left;
  height: 25px;
  line-height: 30px;
  text-align: center;
}
.tbody {
  display: block;
  height: 40px;
}
.tbody {
  line-height: 40px;
}

.w8 {
  width: 8%;
}
.w40 {
  width: 40%;
}
.w20 {
  width: 20%;
  height: 20%;
}
.w10 {
  width: 10%;
}
.w15 {
  width: 15%;
}

.cnt {
  float: left;
}
.cnt input {
  width: 20%;
  text-align: center;
  border: 1px solid white;
}
/* table */

/* button */
.w20 button {
  border-radius: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  background: #000;
  color: #fff;
}
.w20 button:hover {
  border-radius: 5px;
  background: white;
  border: 1px solid white;
  color: black;
  cursor: pointer;
}
.cnt button {
  border-radius: 5px;
  width: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background: #000;
  color: #fff;
}
.cnt button:hover {
  border-radius: 5px;
  background: white;
  border: 1px solid white;
  color: black;
  cursor: pointer;
}
.editbutton {
  padding: 5px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: auto;
  margin-right: 5px;
}
.editbutton.hover {
  cursor: pointer;
}
.delbutton {
  padding: 5px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: auto;
  margin-left: 5px;
}
.delbutton.hover {
  cursor: pointer;
}
/* button */

/* cart */
.cart {
  width: 98%;
  margin: 0 auto;
}
.del-button {
  margin-top: 20px;
}
.del-button button {
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #000;
  color: #fff;
  width: 90px;
  height: 33px;
}
.del-button button.hover {
  cursor: pointer;
}
.final-payment {
  display: flex;
  justify-content: center;
}
ul.caution {
  padding-top: 15px;
  text-align: left;
  border-bottom: 5px;
}
ul.caution li {
  margin: 5px 0 0 0;
  padding: 0 0 0 8px;
  color: #777;
  font-size: 12px;
}
/* cart */

/* order-button */
.order-button {
  display: flex;
  justify-content: center;
  padding: 30px 0 60px 0;
}
button.order {
  border-radius: 5px;
  padding: 10px 50px;
  background: #000;
  color: #fff;
  font-weight: 800;
}
button.order:hover {
  border-radius: 5px;
  background: white;
  border: 1px solid white;
  color: black;
  cursor: pointer;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.img_block {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
/* order-button */
a {
  text-decoration:none; color: black
  }
</style>
