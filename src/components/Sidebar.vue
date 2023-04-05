<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button v-focus class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          전체
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:100}}">OUTER</router-link><br>
          <router-link :to="{name: 'item', params: {cno:200}}">TOP</router-link><br>
          <router-link :to="{name: 'item', params: {cno:300}}">BOTTOM</router-link><br>
          <router-link :to="{name: 'item', params: {cno:400}}">ACC</router-link><br>
          <router-link :to="{name: 'item', params: {cno:500}}">SHOES</router-link>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          OUTER
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:101}}">가디건</router-link><br>
          <router-link :to="{name: 'item', params: {cno:102}}">코트</router-link><br>
          <router-link :to="{name: 'item', params: {cno:103}}">패딩</router-link><br>
          <router-link :to="{name: 'item', params: {cno:104}}">재킷</router-link>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          TOP
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:201}}">니트/스웨터</router-link><br>
          <router-link :to="{name: 'item', params: {cno:202}}">셔츠/블라우스</router-link><br>
          <router-link :to="{name: 'item', params: {cno:203}}">후드</router-link><br>
          <router-link :to="{name: 'item', params: {cno:204}}">맨투맨</router-link>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          BOTTOM
        </button>
      </h2>
      <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:301}}">슬랙스</router-link><br>
          <router-link :to="{name: 'item', params: {cno:302}}">트레이닝</router-link><br>
          <router-link :to="{name: 'item', params: {cno:303}}">데님팬츠</router-link><br>
          <router-link :to="{name: 'item', params: {cno:304}}">스커트</router-link>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFive">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          ACC
        </button>
      </h2>
      <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:401}}">귀걸이</router-link><br>
          <router-link :to="{name: 'item', params: {cno:402}}">목걸이</router-link><br>
          <router-link :to="{name: 'item', params: {cno:403}}">반지</router-link><br>
          <router-link :to="{name: 'item', params: {cno:404}}">벨트</router-link>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingSix">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          SHOES
        </button>
      </h2>
      <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <router-link :to="{name: 'item', params: {cno:501}}">구두</router-link><br>
          <router-link :to="{name: 'item', params: {cno:502}}">운동화</router-link><br>
          <router-link :to="{name: 'item', params: {cno:503}}">샌들</router-link><br>
          <router-link :to="{name: 'item', params: {cno:504}}">슬리퍼</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  .accordion-button {
    background: white;
    color: black;
  }
  .accordion-button:focus {
    font-weight: bold;
    box-shadow: none;
    border-bottom: 1px solid lightgrey;
    border-radius: 0px;
    background: #f2f2f2;
  }
  .accordion-button:hover {
    background: #f2f2f2;
    border-radius: 0px;
  }
  .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  }
  .accordion-body a:hover {
    font-weight:bold;
  }
  .accordion-item {
    border-radius: 0px;
  }
  a {
    text-decoration: none;
    color: black;
  }
</style>