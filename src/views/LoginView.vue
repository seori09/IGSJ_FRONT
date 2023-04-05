<template>
  <div class="login-container">
    <div class="login">
      <p>로그인</p>
      <div class="login-option">
        <button :class="{'focused':memberActivate}" @click="forMember">가입 회원</button>
        <button :class="{'focused':guestActivate}" @click="forGuest">비회원 주문 조회</button>
      </div>
      <div class="member-login" v-if="this.memberActivate">
        <form>
          <input id="id" type="text" v-model="id" maxlength="20" placeholder="아이디" v-focus>
          <input id="pwd" type="password" v-model="pwd" maxlength="30" autocomplete="on" placeholder="비밀번호">
        </form>
        <button class="login-btn" @click="memberLogin">로그인</button>
        <div class="search-info">
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
        </div>
        <button class="KAKAO_login-btn">카카오 로그인</button>
      </div>
      <div class="non-member" v-if="this.guestActivate">
        <span>주문자명</span>
        <input type="text">
        <span>주문번호</span>
        <input type="number">
        <button class="order-check">주문 내역 조회하기</button>
      </div>
      <div class="signup">
        <span>가입만 해도 즉시 15% 할인</span>
        <button class="signup-btn"><a href="http://localhost:8086/member/memberSignUp">회원가입</a></button>
        <!-- 회원가입 페이지는 http://localhost:8086/ 에서 JSP로 제작 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberActivate: true,
      guestActivate: false,
      id : '',
      pwd : ''
    }
  },
  created(){
    this.$store.commit('setUrl', window.location.href)
  },
  methods : {
    memberLogin(){
      if(this.id==='' || this.id.length===0) {
        alert('아이디를 입력해 주세요.')
        document.querySelector('#id').focus()
      }
      else if(this.pwd==='' || this.pwd.length===0) {
        alert('비밀번호를 입력해 주세요.')
        document.querySelector('#pwd').focus()
      }
      else {
        this.$axios.post(this.$serverUrl + '/member/memberLogin', {
          userId : this.id,
          userPwd : this.pwd
        }).then((res) => {
          if(res.data.userId===undefined){
            alert('아이디 또는 패스워드를 확인하세요.')
            this.id=''
            this.pwd=''
            document.querySelector('#id').focus()
          }
          else {
            this.$store.commit('signIn', res.data)
            this.$router.replace('/')
          }
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('Error')
          }
        })
      }
    },
    forMember(){
      this.memberActivate = true
      this.guestActivate = false
    },
    forGuest(){
      this.memberActivate = false
      this.guestActivate = true
    }
  },
  directives: {
    focus: {
      mounted(el){
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
  /* vh : viewport height */
  .login-container {
    background: #f2f2f2;
    width:100%;
    height: 100%;
    min-height: 100vh;
  }
  .login {
    width: 460px;
    height: 100%;
    min-height: 100vh;
    background: white;
    margin: 0 auto;
    padding-top: 80px;
  }
  .login p {
    font-size: 18px;
    text-align:center;
    margin-bottom: 26px;
  }
  input {
    display: block;
    margin: 8px auto;
    width: 350px;
    height: 52px;
    border: 1px solid lightgrey;
    border-radius: 4px;
  }
  input:focus {
    outline: 1px solid darkgrey;
  }
  .login-btn {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 350px;
    height: 52px;
    background: black;
    color: white;
    border-radius: 4px;
    border: 1px solid black;
  }
  .login-option {
    width: 380px;
    display: flex;
    margin: 0 auto;
  }
  .login-option button {
    width:50%;
    background: white;
    border:none;
    border-bottom:1px solid darkgrey;
    text-align:center;
    padding-bottom: 8px; 
    margin-bottom: 12px;
  }
  .focused {
    font-weight:bold;
    outline:none;
    border-bottom:2px solid black !important;
  }
  .search-info {
    width:350px;
    display:flex;
    justify-content:right;
    margin:0 auto;
    margin-top: 16px;
  }
  .search-info a {
    text-decoration: none;
    color: grey;
    font-size: 14px;
  }
  .search-info a:first-child::after {
    content: "|";
    margin: 0 10px;
  }
  .KAKAO_login-btn {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 350px;
    height: 52px;
    background: yellow;
    color: black;
    font-weight: bold;
    border-radius: 4px;
    border: 1px solid yellow;
  }
  .signup {
    width:360px;
    margin:0 auto;
    margin-top: 32px;
  }
  .signup span {
    color:blue;
    margin-left: 54px;
    margin-right: 10px;
    font-size: 14px;
  }
  .signup-btn {
    width: 76px;
    color:blue;
    border: 1px solid blue;
    background: white;
    border-radius: 3px;
    font-size: 14px;
    padding: 3px;
  }
  .signup-btn a {
    text-decoration: none;
  }
  .non-member span {
    margin-left: 60px;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  .order-check {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 350px;
    height: 52px;
    background: black;
    color: white;
    border-radius: 4px;
    border: 1px solid black;
  }
</style>