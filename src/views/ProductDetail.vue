<template>
  <div>
    <p class="show_categories">
      <span>
        <router-link to="/">IGSJ 스토어</router-link>
      </span>
      <span>
        <router-link :to="{ name: 'item', params: { cno: this.midLvCatArr[0].category_level } }">
          {{ this.midLvCatArr[0].big_ctg }}
        </router-link>
      </span>
      <span>
        <router-link :to="{ name: 'item', params: { cno: this.midLvCatArr[0].cno } }">
          {{ this.midLvCatArr[0].category_name }}
        </router-link>
      </span>
    </p>
    <div class="aboutProduct">
      <div class="inner-product">
        <div class="img-box">
          <img id="productImage" :src="this.productInfo.image" :alt="this.productInfo.pno">
        </div>
        <div class="product-info">
          <div class="product-title">{{ this.productInfo.product_name }}</div>
          <div class="explan_product product_info_section">
            <h4 class="title-box font-mss">
              Product Info
              <span class="korSub">&nbsp;<font size="2">제품정보</font></span>
            </h4>
            <ul class="product_article" style="border-bottom:1px solid lightgrey;">
              <li>
                <p class="product_article_tit">품번</p>
                <p class="product_article_contents">
                  <strong>{{ this.productInfo.pno }}</strong>
                </p>
              </li>
            </ul>
          </div>
          <div class="explan_product price_info_section">
            <h4 class="title-box font-mss">
              Price Info
              <span class="korSub">&nbsp;<font size="2">가격정보</font></span>
            </h4>
            <ul class="product_article" style="border-bottom:1px solid lightgrey;">
              <li class="box_info_products">
                <p class="product_article_tit">IGSJ 판매가</p>
                <p class="product_article_contents">
                  <span class="product_article_price" id="goods_price">
                    <span class="product-price">{{ Number(this.productInfo.product_price).toLocaleString() }}원</span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div class="explan_product product_info_section">
            <h4 class="title-box font-mss">
              Delivery Info
              <span class="korSub">&nbsp;<font size="2">배송정보</font></span>
            </h4>
            <ul class="product_article" style="border-bottom:1px solid lightgrey;">
              <li>
                <p class="product_article_tit">
                  출고 정보
                  <span style="border: none; padding: 0;" data-bs-toggle="tooltip" data-bs-placement="bottom"
                    title="판매자가 설정한 정보로, 업체 및 상품상황에 따라 변경될 수 있습니다. 주말, 공휴일 및 업체 휴무일 제외한 평일(영업일) 기준 일자 입니다.">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                      class="bi bi-question-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path
                        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </span>
                </p>
                <p class="product_article_contents">
                  <strong>결제 3일 이내 출고</strong>
                </p>
              </li>
              <li>
                <p class="product_article_tit">배송 정보</p>
                <p class="product_article_contents">
                  <strong>국내 배송 / 입점사 배송 / CJ대한통운</strong>
                </p>
              </li>
            </ul>
          </div>
          <div class="order-area" style="display:block; height:100%;">
            <div class="option-box">
              <select v-model="size">
                <option value="">옵션 선택</option>
                <option :value="sz" :key='i' v-for="(sz, i) in sizeArr">{{ sz }}</option>
              </select>
            </div>
            <div :key='i' v-for="(sz, i) in sizeArr" :id="sz" class="count-check" style="display:none;">
              <span class="count-check-size">{{ sz }}</span>
              <span class="count-check-count">
                <input type="number" min="1" :max="this.productInfo.product_stock" v-model.number="count[sz]" />
              </span>
              <span class="count-check-sum">{{ Number(this.productInfo.product_price * count[sz]).toLocaleString() }}</span>
              <span class="count-check-delete">
                <svg :name="sz" @click="removeCount" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey"
                  viewBox="0 0 16 16">
                  <path :name="sz"
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
            </div>
            <div class="sum-total-price">
              <span>총 상품 금액</span>
              <span>
                {{ Object.values(this.count).reduce((a, b) => a + b, 0) === 0 ?
                  Number(this.productInfo.product_price).toLocaleString() :
                  Number(Object.values(this.count).reduce((a, b) => a + b, 0) *
                    this.productInfo.product_price).toLocaleString()
                }}원
              </span>
            </div>
            <div class="btn-box">
              <button class="purchase" @click="toPurchase">바로구매</button>
              <button class="cart" @click="toCart">장바구니</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="info_detail">
      <h4 class="title-box font-mss">
        Info
        <span class="korSub">&nbsp;<font size="2">정보</font></span>
      </h4>
      <ck-editor v-model="this.productInfo.product_description" :editor="editor" :config="editorConfig" :disabled="editorDisabled"/>
    </div>
  </div>
  <ReviewVue ref="review_vue" />
</template>

<script>
import { Tooltip } from 'bootstrap'
import ReviewVue from '../components/Review.vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: { ReviewVue, 'ck-editor': CKEditor.component },
  data() {
    return {
      editor: ClassicEditor,
      editorDisabled: true,
      editorData: '',
      editorConfig: {
        toolbar: [],
      },
      pno: '',
      midLvCatArr: [{ big_ctg: '대분류명', category_level: '대분류', category_name: '중분류명', cno: '중분류' }],
      productInfo: { pno: 0, cno: 0, product_name: '상품명', product_price: 0, product_stock: 0, image: '사진', product_description: '' },
      size: '',
      sizeArr: ['S', 'M', 'L', 'XL', '2XL'],
      count: { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 }
    }
  },
  created() {
    this.pno = this.$route.params.pno
    this.fn_productInfo(this.pno)
  },
  mounted() {
    new Tooltip(document.body, { selector: "[data-bs-toggle='tooltip']" })
    this.$refs.review_vue.reviewRead(this.pno)
    this.$refs.review_vue.pno = this.pno
    this.$refs.review_vue.id = this.$store.state.userInfo.userId
  },
  watch: {
    size: function (val) {
      document.getElementById(val).style.display = "flex"
      this.count[val] = 1
    }
  },
  methods: {
    fn_CategoryDetails(cno) {
      this.$axios.get(this.$serverUrl + '/category/items/' + cno)
        .then((res) => { this.midLvCatArr = res.data })
        .catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Category Error')
          }
        })
    },
    fn_productInfo(pno) {
      this.$axios.get(this.$serverUrl + '/product/detail?pno=' + pno)
        .then((res) => {
          this.productInfo = res.data
          this.fn_CategoryDetails(this.productInfo.cno)
        })
        .catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Error')
          }
        })
    },
    removeCount(evt) {
      if (evt.target.getAttribute("name") === null) { return false }
      else {
        document.getElementById(evt.target.getAttribute("name")).style.display = "none"
        this.count[evt.target.getAttribute("name")] = 0
      }
    },
    toPurchase() {
      alert('준비 중')
    },
    toCart() {
      if (Object.values(this.count).reduce((a, b) => a + b, 0) === 0) {
        alert('사이즈/수량을 선택해주세요')
      }
      else if (this.$store.state.idConfirmed === false) {
        const toLoginPage = confirm("로그인 페이지로 이동할까요?")
        if (toLoginPage) { this.$router.push("/login") }
      }
      else {
        this.$axios.post(this.$serverUrl + '/cart/cartWrite', {
          userId: this.$store.state.userInfo.userId,
          pno: this.productInfo.pno,
          size: JSON.stringify(this.count)
        }).then((res) => {
          res.data ? this.$router.push("/cart") : alert("Cart-banned")
        })
          .catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('Cart Error')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');

* {
  /* 구글 폰트 웹사이트 전체 적용 */
  font-family: 'Nanum Pen Script', cursive;
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
}

.show_categories {
  border-bottom: 1px solid darkgrey;
  padding: 6px 0;
  margin: 0;
}

.show_categories span {
  font-size: 12px;
  font-weight: bold;
}

.show_categories span::after {
  content: ' > ';
  font-weight: 100;
}

.show_categories span:first-child {
  margin-left: 10px;
}

.show_categories span:last-child::after {
  content: '';
}

.show_categories a {
  text-decoration: none;
  color: black;
}

.show_categories a:hover {
  text-decoration: underline;
}

.inner-product {
  display: flex;
  padding: 20px;
  align-items: flex-start;
  height: 100%;
}

.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 490px;
  min-width: 490px;
  height: 630px;
  border: 1px solid #bebebe;
  margin-top: 10px;
}

#productImage {
  border: 1px solid #e9e9e9;
  width: 455px;
  height: 595px;
}

.product-info {
  width: 380px;
  min-width: 380px;
  height: 100%;
  margin: 0px;
  margin-left: 36px;
}

.product-title {
  border-bottom: 1px solid lightgrey;
  width: 100%;
  padding: 10px 0px;
  padding-left: 0px;
  margin-bottom: 10px;
  font-size: 20px;
}

ul {
  list-style: none;
  padding: 0px;
}

.korSub {
  color: #b4b4b4;
}

.product_article_tit {
  display: inline-block;
  width: 120px;
}

.product_article_contents {
  display: inline-block;
}

.btn-box {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.purchase {
  width: 70%;
  height: 100%;
  border: none;
  font-size: 20px;
  cursor: pointer;
  background: #000000;
  color: #FFFFFF;
}

.cart {
  width: 28%;
  height: 100%;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid darkgrey;
  background: white;
  color: darkgrey;
}

.option-box {
  width: 100%;
  height: 50px;
  background: lightgrey;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option-box select {
  width: 90%;
  text-align: left;
}

.count-check {
  width: 100%;
  height: 50px;
  padding: 10px;
  background: white;
  border: 1px solid lightgrey;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.count-check input {
  width: 60px;
  padding-left: 20px;
}

.sum-total-price {
  width: 100%;
  height: 50px;
  padding: 10px;
  background: white;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

hr {
  margin: 20px 0;
  color: grey;
}

.count-check-size {
  width: 45%;
}

.count-check-count {
  width: 20%;
}

.count-check-sum {
  font-size: 14px;
  width: 30%;
  text-align: right;
  color: darkgrey;
  font-weight: bold;
}

.count-check-delete {
  width: 5%;
  height: 100%;
}

.count-check-delete svg {
  cursor: pointer;
}

.info_detail {
  width: 906px;
  margin-left: 20px;
  margin-bottom: 50px;
}

.purchase,
.cart {
  font-weight: bold;
}</style>