<template>
  <div class="wrap">
    <div class="title">
      <h2>Order / Payment</h2>
    </div>
      <table class="cart-list">
        <thead>
          <tr>
            <!-- <th><div class="totalCnt">전체{{ totalCnt }} 개</div></th> -->
            <th><input type="checkbox" @click="selectAllCheckbox" v-model="allSelected" class="checkall"></th>
            <th></th>
            <th>상품명(옵션)</th>
            <th>수량</th>
            <th>주문금액</th>
            <th>주문관리</th>
            <th>배송비/배송 형태</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr class="prod-on-cart" :key = "i" v-for="(cartList, i) in cartList">
            <!-- <td><div class="count">{{ cartList.pno }}</div></td> -->
            <td><input class="selector" type="checkbox" v-model="select" name="check"></td>
            <td> <!--<div class="img-box"><img id="productImage" :src="this.productInfo.image" :alt="this.productInfo.pno"/></div>--></td>
            <td class="product-name">{{ cartList.product_name }}</td>
            <td class = "numberbox">
              <div class="cnt">
                <button type="button" @click="minus()">-</button>
                  <!-- <span class="product-cnt">{{ cartList.productCnt }}</span> -->
                  <span class = "product-cnt">
                    <input type = "number" id = "productcnt" v-model = "cartList.productCnt"/>
                  </span>
                <button type="button" @click="plus()">+</button>
              </div>
            </td>
            <td><div class="product-price">{{ cartList.product_price * cartList.productCnt }}</div><span>원</span></td>
            <td><button @click="cancelProduct">삭제하기</button></td>
            <td>배송비무료</td>
          </tr>
        </tbody>
      </table>
      <div class="cart">
        <div class="del-button">
          <button @click="del-button">선택삭제</button>
        </div>
        <ul class="caution">
          <li>무신사는 전 상품 무료 배송입니다.</li>
          <li>2개 이상의 브랜드를 주문하신 경우, 개별 배송됩니다.</li>
          <li>결제 시 각종 할인 적용이 달라질 수 있습니다.</li>
          <li>해외배송 상품은 배송료가 추가로 발생될 수 있습니다.</li>
          <li>장바구니 상품은 최대 1년 보관(비회원 2일)되며 담은 시점과 현재의 판매 가격이 달라질 수 있습니다.</li>
          <li>장바구니에는 최대 100개의 상품을 보관할 수 있으며, 주문당 한번에 주문 가능한 상품수는 100개로 제한됩니다.</li>
          <li>구매 가능 수량이 1개로 제한된 상품은 주문 취소 시, 24시간 내 가상계좌 재주문이 불가합니다.</li>
          <li>수량 제한 상품의 경우, 가상계좌를 통한 주문은 최대 2건까지만 가능합니다.(미입금 주문 기준, 기존 주문 합산)</li>
        </ul>
        <div class="final-payment">
          <p style="margin-right:10px;">최종 결제 금액</p>
          <p>{{ Number(TotalPrice).toLocaleString() }}원</p>
        </div>
        <div class="order-button">
          <button class="order">주문하기</button>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          cartList : {}
        }
    },
    created() {
      this.cartInfo(this.$store.state.userInfo.userId)
      this.$store.commit('setUrl', window.location.href)
    },
    computed: {
      //개별상품 수량가격
        ProductPrice() {
            return this.productPrice * this.productCnt;
        },
      //전체상품 수량가격
      TotalPrice() {
        const productArr = [1000, 2000, 3000]
        const initVal = 0;
        const priceSum = productArr.reduce(
          (acc, cur) => acc + cur,
          initVal
        );
        return priceSum
      },
    },
    methods: {
        //장바구니 확인
        cartInfo(userId) {
          this.$axios.get(this.$serverUrl + "/cart/cartList/" + userId)
          .then((res) => {
            console.log(res.data)
            this.cartList = res.data
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
                alert('장바구니 불러오기 오류. 다시 시도해주십시오.')
              }
          })
        },
        //상품 수량변경
        minus() {
          if(this.counter > 1) {
              alert("수량이 변경되었습니다.");
              document.getElementById("productcnt").value
            }
        },
        plus() {
            alert("수량이 변경되었습니다.");
            document.getElementById("productcnt") + 1
        },
        //상품 개별삭제
        cancelProduct() {
            alert("상품이 삭제되었습니다.");
            document.querySelector(".prod-on-cart").style.display="none"
        },
        //선택상품 삭제
        deletebutton() {
            this.$axios.post(this.$serverUrl + "/cart/cartDelete", {
                userId : this.userId,
                pno : this.pno
            }).then((res) => {
                if(res.data == 1) {
                  alert("상품 삭제가 완료되었습니다.")
                } else if (res.data == 0) {
                  alert("상품 삭제를 하지 못했습니다. 다시 시도해주십시오.")
                }
            }).catch((err) => {
              if (err.message.indexOf('Network Error') > -1) {
                alert('상품 삭제 서버 오류. 다시 시도해주십시오.')
              }
            })
        },
        selectAllCheckbox(){
          if(document.querySelectorAll(".checkall input[type='checkbox']:checked")){
            document.getElementsByClassName("selector").checked=true
          }
        }
      }
    }



</script>

<style>
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');
        * {/* 구글 폰트 웹사이트 전체 적용 */
          font-family: 'Nanum Pen Script', cursive;
          font-family: 'Noto Sans', sans-serif;
          font-family: 'Noto Sans KR', sans-serif;

          margin: 0;
          padding: 0;
        }

        .wrap {
            width: 100%; 
            height: 100%; 
            border: 1px solid #ddd;
            position: relative;
        }

        .title {
            padding: 20px;
        }

        .title h2 {
            font-size: 24px;
            font-weight: 700;
        }

        .title, tr, .cart-list {
            border: 1px solid #ddd;
        }


        /* table */
        .cart-list {
            width: 98%;
            margin: 0 auto;
            margin-top: 20px;
        }


        .cart-list, .cart {
            width: 98%;
            margin: 0 auto;
            margin-top: 20px;
        }

        th, td {
            padding: 10px 0;
            font-size: 14px;
            font-weight: 700;
            text-align: center;
        }
        td {
          font-weight: 400;
        }

        .img-box {
          display: flex;
          justify-content: center;
          width: 62px;
          height: 75px;
          min-width: 62px;
          min-height: 75px;
        }

        td button {
            padding: 10px;
            border: 1px solid #ddd;
            background: #fff;
            font-size: 14px;
            font-weight: 600;
        }
        td button.hover {
            cursor: pointer;
        }
        
        .cnt {
          display: flex;
          justify-content: space-around;
        }

        .cnt button {
          justify-content: center;
          align-content: center;
          background: #ddd;
          border: #ddd;
          width: 30px;
          height: 30px;
        }
      

        .cnt span {
          font-size: 16px;
          display: block;
          color: #777;
        }



        /* cart */
        .del-button {
            margin-top: 20px;
        }
        .del-button button {
            border: 1px solid #ddd;
            background: #fff;
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



        ul {
            padding-top: 15px;
        }
        ul li {
            margin: 5px 0 0 0;
            padding: 0 0 0 8px;
            color: #777;
            font-size: 12px;
        }


        /* order-button */
        .order-button {
            display: flex;
            justify-content: center;
            padding: 30px 0 60px 0;
        }


        button.order {
            padding: 10px 50px;
            background: #000;
            color: #fff;
            font-weight: 800;
        }
        button.order:hover {
            background: #0078ff;
            border: 1px solid #0078ff;
            color: fff;
            cursor: pointer;
        }

</style>