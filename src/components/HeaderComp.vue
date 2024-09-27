<template>
  <header>
    <nav class="fixed-top header-menu">
      <div class="container">
        <span class="logo">
          <router-link to="/">IGSJ</router-link>
        </span>
        <span class="search_cont">
          <input id="search" class="search" type="text" maxlength="20"
           v-model="toSearch" @keyup.enter="searchProducts" placeholder="로라로라 × 재유 최대 10% 할인"
           oninput="this.value = this.value.replace(/^\s/g, '');"/>
          <button class="search_btn" @click="searchProducts">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="white" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </span>
        <span class="rank_bar">
          <p class="rank">{{rank}}</p>
          <router-link to="#" class="product">{{product}}</router-link>
        </span>
      </div>
      <div class="menus">
        <router-link to="/login/not-yet">랭킹</router-link>
        <router-link to="/login/not-yet">업데이트</router-link>
        <router-link to="/login/not-yet">코디</router-link>
        <router-link to="/login/not-yet">세일</router-link>
        <router-link to="/login/not-yet">스페셜</router-link>
        <router-link to="/login/not-yet">매거진</router-link>
        <router-link to="/login/not-yet">TV</router-link>
        <router-link to="/login/not-yet">이벤트</router-link>
        <router-link to="/login/not-yet">브랜드</router-link>
      </div>
    </nav>
    <nav class="fixed-top header-submenu">
      <router-link to="/login" v-if="this.$store.state.idConfirmed===false"><button class="login_btn">로그인</button></router-link>
      <div class="id-reveal" v-if="this.$store.state.idConfirmed===true">
        {{this.$store.state.userInfo.userId}}
      </div>
      <router-link :to="this.$store.state.myPageLink">마이페이지</router-link>
      <router-link to="/login/not-yet">최근 본 상품</router-link>
      <router-link to="/login/not-yet" style="color:red;">좋아요</router-link>
      <router-link :to="this.$store.state.myCartLink">장바구니</router-link>
      <router-link to="/orderList" v-if="this.$store.state.idConfirmed===true">주문배송조회</router-link>
      <router-link to="/notice/NoticeList">고객센터</router-link>
      <div v-if="this.$store.state.idConfirmed===true" @click="logout">로그아웃</div>

    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      rank: 1,
      product:'상품',
      rankArr: ['니트', '가디건', '슬랙스', '샌들', '블라우스', '스커트', '맨투맨', '후드', '트레이닝', '재킷'],
      fn_rankShow: null,
      toSearch: ''
    }
  },
  mounted(){
    this.product=this.rankArr[Number(this.rank)-1]
    this.rankSetter()
  },
  methods: {
    rankSetter(){
      setInterval(()=>{
        this.rank++
        if(this.rank>10) this.rank=1
        this.product=this.rankArr[Number(this.rank)-1]
      }, 2000)
    },
    searchProducts(){
      if(this.toSearch==='' || this.toSearch.length===0) {alert('검색어를 입력하세요.')}
      else {this.$router.push({name: 'search', params: {typed: this.toSearch}})}
    },
    logout(){
      this.$store.commit('signOut')
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
  header {
    width: 100%;
  }
  .fixed-top {
    min-width: 1400px;
  }
  .header-menu {
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background: black;
    padding: 20px;
  }
  .container {
    display:flex;
    justify-content: left;
    align-items: center;
    padding: 0;
  }
  .logo a {
    color: white;
    font-size: 40px;
    margin-right: 20px;
    text-decoration: none;
  }
  .search_cont {
    display: flex;
    width: 300px;
    height: 30px;
    border: 1px solid darkgrey;
    padding: 0;
  }
  .search {
    height: 100%;
    width: 90%;
    border: none;
    outline: none;
  }
  .search_btn {
    width: 30px;
    height: 28.5px;
    border: none;
    background: black;
  }
  .rank_bar {
    width: 350px;
    height: 30px;
    text-align: left;
    font-size: 20px;
  }
  .rank {
    width: 20px;
    display: inline;
    color: white;
    font-weight: bold;
    margin: 0 20px;
  }
  .product {
    width: 300px;
    display: inline;
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  .menus {
    width: 700px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .menus a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .header-submenu {
    margin-top: 70px;
    width: 100%;
    height: 56px;
    background: white;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .header-submenu a {
    font-size: 12px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  .header-submenu a:hover {
    text-decoration: underline;
  }
  .header-submenu a::after {
    content: "|";
    color: lightgrey;
    font-size: 10px;
    margin: 0 10px;
  }
  .header-submenu a:first-child::after {
    content: "";
    margin-left: 0;
  }
  .header-submenu a:last-child::after {
    content: "";
    margin-right: 0;
  }
  .header-submenu div:last-child {
    font-size: 12px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }
  .header-submenu div:last-child:hover {
    text-decoration: underline;
  }
  .login_btn {
    width: 160px;
    height: 30px;
    font-size: 12px;
    border: 1px solid black;
    background: none;
    margin: 0 16px;
  }
  .login_btn:hover {
    border: 1px solid black;
    background: black;
    color: white;
  }
  .id-reveal {
    width:160px;
    height:30px;
    font-size:18px;
    color:black;
    font-weight:bold;
    text-align:center;
    overflow:hidden;
  }
</style>
