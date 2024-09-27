<template>
  <div class="section">
    <div class="section-menu">
        <h5>{{title}}</h5>
    </div>
    <div class="section-content">
      <div class="all-products">
        <ul>
          <li :key=i v-for="(prd, i) in rankArr">
            <div class="select-product">
              <router-link :to="{name: 'product', params: {pno: prd.pno}}">
                <img class="thumb-img" :src="prd.image">
                <div class="thumb-desc">
                  <span>{{prd.product_name}}</span>
                  <span>{{Number(prd.product_price).toLocaleString()}}원</span>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rankArr: {}
    }
  },
  props: {
    title: String
  },
  created(){
    this.fn_rankDisplay()
  },
  methods:{
    fn_rankDisplay() {
      this.$axios.get(this.$serverUrl + '/product/all') // 주문량 기준 Top10 쿼리문은 만듦
      .then((res) => {
        this.rankArr = res.data
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
  .section {
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(1, 100%);
    width: 100%;
    height: 100%;
    gap: 0;
    grid-template-areas:
      "a b b b b b b b" ;
    border-bottom: 1px solid lightgrey;
  }
  .section-menu {
    grid-area: a;
  }
  .section-content {
    grid-area: b;
  }
  h5 {
    margin-top: 20px;
    text-align: center;
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
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .all-products ul li {
    list-style-type: none;
  }
  .select-product {
    width: 205px;
    height: 280px;
    padding-top:10px;
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
    margin: 12px auto 0;
  }
  .thumb-desc {
    width: 150px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
  }
  .thumb-desc span:first-child {
    display: block;
    width: 100%;
    max-height: 50px;
    overflow: hidden;
    font-weight: bold;
  }
  .thumb-desc span:last-child {
    display: block;
    width: 100%;
    height: 100%;
    margin-top:0;
  }
</style>

