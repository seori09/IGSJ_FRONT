<template>
  <div class="items">
    <p class="show_categories">
      <span>
        <router-link to="/">IGSJ 스토어</router-link>
      </span>
      <span>
        <router-link :to="{name: 'item', params: {cno: this.midLvCatArr[0].category_level}}">
          {{this.midLvCatArr[0].big_ctg}}
        </router-link>
      </span>
      <span v-if="this.midLvCatArr.length === 1">
        {{this.midLvCatArr[0].category_name}}
      </span>
    </p>
    <h4>{{this.midLvCatArr[0].big_ctg}}</h4>
    <div class="mid-level">
      <div class="midLvCat-name">중분류</div>
      <div class="midLvCat-total">
        <router-link :to="{name: 'item', params: {cno: this.midLvCatArr[0].category_level}}">전체</router-link>
      </div>
      <div class="midLvCat-detail">
        <ul>
          <li :key=i v-for="(ctg, i) in midLvCatArr">
            <router-link :to="{name: 'item', params: {cno: ctg.cno}}">
              {{ctg.category_name}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="all-products">
      <ul>
        <li :key=i v-for="(prd, i) in allProducts">
          <div class="select-product">
            <router-link :to="{name: 'product', params: {pno: prd.pno}}">
              <img class="thumb-img" :src="prd.image">
              <div class="thumb-desc">
                <span><b>{{prd.product_name}}</b></span><br>
                <span>{{Number(prd.product_price).toLocaleString()}}원</span>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
      curCno: window.location.href.slice(-3),
      midLvCatArr: {},
      allProducts: {}
    }
  },
  created(){
    this.$store.commit('setUrl', window.location.href)
    this.fn_CategoryDetails(this.curCno)
    this.fn_showProducts(this.curCno)
  },
  watch: {
    $route(to, form) {
      if (to.path !== form.path) {
        this.fn_CategoryDetails(this.$route.params.cno)
        this.fn_showProducts(this.$route.params.cno)
      }
    }
  },
  methods: {
    fn_CategoryDetails (cno) {
      this.$axios.get(this.$serverUrl + '/category/items/' + cno)
      .then((res) => {
        this.midLvCatArr = res.data
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Category Error')
        }
      })
    },
    fn_showProducts(cno) {
      this.$axios.get(this.$serverUrl + '/product/items/' + cno)
      .then((res) => {
        this.allProducts = res.data
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Products Error')
        }
      })
    }
  }
}
</script>

<style scoped>
  .items {
    display: block;
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
  h4 {
    font-weight:bold;
    border-bottom: 1px solid darkgrey;
    margin: 0;
    padding: 10px 8px;
  }
  .mid-level {
    display: flex;
    border-bottom: 1px solid darkgrey;
  }
  .mid-level div {
    height: 70px;
  }
  .midLvCat-name {
    font-size: 13px;
    font-weight: bold;
    width: 10%;
    padding-top: 10px;
    padding-left: 10px;
  }
  .midLvCat-total {
    width: 10%;
    padding-top: 10px;
    padding-left: 10px;
  }
  .midLvCat-total a {
    font-size: 12px;
    font-weight: bold;
    color: darkgrey;
    text-decoration: none;
    margin:0;
  }
  .midLvCat-total a:hover {
    text-decoration: underline;
    color: black;
  }
  .midLvCat-detail {
    width: 80%;
    padding-top: 10px;
    padding-left: 10px;
    display: flex;
  }
  .midLvCat-detail ul {
    width: 100%;
  }
  .midLvCat-detail li {
    list-style-type: none;
    float: left;
    width: 200px;
    margin: 0 auto;
  }
  .midLvCat-detail li a {
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    color: darkgrey;
  }
  .midLvCat-detail li a:hover {
    text-decoration: underline;
    color: black;
  }
  .all-products {
    width:100%
  }
  .all-products ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: left;
    margin: 30px;
  }
  .all-products ul li {
    list-style-type: none;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .select-product {
    width: 240px;
    height: 300px;
    border: 1px solid darkgrey;
  }
  .select-product:hover {
    background: #f2f2f2;
  }
  .select-product a {
    text-decoration: none;
    color: black;
  }
  .thumb-img {
    display: block;
    width: 150px;
    height: 180px;
    background: green;
    margin: 20px auto 0;
  }
  .thumb-desc {
    width: 150px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
  }
</style>
