<template>
  <div>
    <p class="typedData"><span>'{{typedParam}}'</span>에 대한 검색결과</p>
    <hr>
    <div class="all-products">
      <ul>
        <li :key=i v-for="(prd, i) in searchedProducts">
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
    <div class="all-products" v-if="this.searchedProducts.length===0">
      <div style="width: 100px; height: 100px; display:block; margin: 0 auto; margin-bottom: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="lightgrey" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
      </div>
      <h5 style="text-align:center; color:grey;">판매 중인 상품이 없습니다. 검색어를 변경해 보세요.</h5>
    </div>
  </div>
</template>

<script>
export default { 
  data () { 
    return {
      typedParam: '',
      searchedProducts: {}
    }
  },
  created(){
    this.$store.commit('setUrl', window.location.href)
    this.typedParam = this.$route.params.typed
    this.fn_searchedProducts(this.typedParam)
  },
  watch: {
    $route(to, form) {
      if (to.path !== form.path) {
        this.typedParam = this.$route.params.typed
        this.fn_searchedProducts(this.typedParam)
      }
    }
  },
  methods: {
    fn_searchedProducts(typed){
      this.$axios.get(this.$serverUrl + '/product/search?type='+typed)
      .then((res) => {
        this.searchedProducts = res.data
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Listing Error')
        }
      })
    }
  }
}
</script>

<style scoped>
  .typedData {
    height: 36px;
    padding-left: 16px;
    padding-top: 10px;
  }
  .typedData span {
    font-size: 18px;
    font-weight: bold;
    color: #33ccff;
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