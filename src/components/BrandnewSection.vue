<template>
  <div class="section">
    <div class="section-menu">
        <h5>{{title}}</h5>
    </div>
    <div class="section-content">
      <div class='mostViewProd'>
        <div class="products" @mouseenter="halter" @mouseleave="restarter">
          <div class="card" :key=i v-for='(prd, i) in brandnewArr'>
            <router-link :to="{name: 'product', params: {pno: prd.pno}}">
              <img :src="prd.image" class="card-img-top" alt="product">
              <div class="card-body" style="padding:0;">
                <div class="card-text">
                  <p class="product-title" style="">{{prd.product_name}}</p>
                  <p class="product-price">{{Number(prd.product_price).toLocaleString()}}원</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      brandnewArr: {},
      fn_flowDisp: null
    }
  },
  props: {
    title: String
  },
  mounted(){
    this.fn_rankDisplay()
  },
  unmounted() {
    clearInterval(this.fn_flowDisp)
  },
  methods:{
    fn_rankDisplay() {
      this.$axios.get(this.$serverUrl + '/product/brandnew')
      .then((res) => {
        this.brandnewArr = res.data
        this.fn_flowDisp = setInterval(()=>{
          try {this.flowDisplay()}
          catch(e) {console.log("IGNORE THIS ERROR : "+e)}
        }, 2000)
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {alert('Products Error')}
      })
    },
    flowDisplay() {
      const product = document.querySelectorAll('.card')
      const clone = document.querySelector('.card:first-child').cloneNode(true)
      setTimeout(()=>{
        for(const i in product){
          if(i>0){
            product[i].style.transform="translateX(-260px)"
            product[i].style.transition="1.0s linear"
          }
        }
      })
      setTimeout(()=>{
        try {
          document.querySelector(".products").appendChild(clone)
          product[0].remove()
          for(const i in product){
            if(i>0) product[i].removeAttribute('style')
          }
        } catch(err) {
          console.log(err)
        }
      }, 1000)
    },
    halter(){clearInterval(this.fn_flowDisp)},
    restarter(){this.fn_flowDisp = setInterval(()=>{this.flowDisplay()}, 2000)}
  }
}
</script>

<style scoped>
  .section {
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(1, 100%);
    width: 100%;
    height: 400px;
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
  .mostViewProd {
    display:flex;
    justify-content:center;
    align-items:center;
    width:1025px;
    height:335px;
    margin-top: 20px;
    overflow: hidden;
  }
  .products {
    display: flex;
    justify-content:left;
    min-width: 2600px;
  }
  .card {
    display: block;
    height: 335px;
    min-width: 240px;
    max-width: 240px;
    background: white;
    border: 1px solid lightgrey;
    margin: 0 10px;
  }
  .product-title{
    width:240px;
    height:20px;
    overflow:hidden;
    margin:0;
    font-weight:bold;
  }
  a {
    text-decoration: none;
    color: black;
  }
  img {
    display: block;
    height: 280px;
    margin: 0;
  }
</style>

