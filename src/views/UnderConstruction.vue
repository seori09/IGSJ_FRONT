<template>
  <div class="under-construction">
    <div class="stc-img">
      <span style="float:right;">( {{countdown}} )</span>&nbsp;
      <h2>어떻게든 살려 내겠습니다.</h2>
      <img :src="imgSrc" alt="Under Construction, Plz wait till it ends"/>
    </div>
  </div>
</template>

<script>
export default {
  data () { 
    return {
      imgSrc: require('@/assets/OPERATION.jpg'),
      interval: null,
      timeout: null,
      countdown: 10
    }
  },
  created(){
    this.interval = setInterval(()=>{this.countdown--}, 1000)
    this.timeout  = setTimeout(()=>{this.$router.replace('/')}, 10000)
  },
  unmounted(){
    clearInterval(this.interval)
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
  .under-construction{
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    width: 100vw;
    height: 100vh;
  }
  .stc-img{
    display:flex;
    justify-content: center;
    align-items: baseline;
    width: 100%;
  }
  span{
    width: 80px;
    color:white;
    font-size: 30px;
  }
  img {
    display: block;
    width: 200px;
    height: 200px;
  }
  h2 {
    font-weight: bold;
    color: white;
    margin-right: 20px;
  }
</style>