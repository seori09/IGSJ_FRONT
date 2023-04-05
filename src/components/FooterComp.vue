<template>
  <footer>
    <div>
      <p style="width:100%; display:block;">
        <ul style="float:left;">
          <li><router-link to="#">회사소개</router-link></li>
          <li><router-link to="#">공지사항</router-link></li>
          <li><router-link to="#">이벤트 공지</router-link></li>
          <li><router-link to="#">입점/제휴/대량구매</router-link></li>
          <li><router-link to="#"><b>개인정보처리방침</b></router-link></li>
          <li><router-link to="#">영상정보처리기기 운영·관리방침</router-link></li>
          <li><router-link to="#">이용약관</router-link></li>
          <li><router-link to="#">로고 다운로드</router-link></li>
          <li><a href="http://localhost:8086">관리자</a></li>
        </ul>
      </p>
    </div>
    <div></div>
    <div></div>
    <div class="copyright">FASHION WEB MAGAZINE / LIFE STYLE SELECT SHOP WWW.IPGOSALJA.COM</div>
  </footer>
</template>

<style scoped>
  footer {
    display: block;
  }
  ul {
    list-style-type: none;
    padding-left: 10px;
  }
  li {
    font-size: 12px;
    float: left;
  }
  a {
    text-decoration: none;
    color: black;
  }
  a::after {
    content: "|";
    margin: 0 4px;
  }
  .copyright {
    width: 100%;
    height: 40px;
    display:flex;
    justify-content:left;
    align-items:center;
    padding-left: 16px;
    background-color: black;
    color: white;
    font-size: 20px;
  }
</style>
