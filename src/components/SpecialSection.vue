<template>
  <div class="section">
    <div class="section-menu">
        <h5>{{title}}</h5>
    </div>
    <div class="section-content">
      <div class="media">
        <iframe src="https://www.youtube.com/embed/YvPiLBWjzek"></iframe>
      </div>
      <div class="media">
        <iframe src="https://www.youtube.com/embed/paMx-JKx9R8"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped>
  .section {
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(1, 100%);
    width: 100%;
    height: 390px;
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
    display: flex;
  }
  h5 {
    margin-top: 20px;
    text-align: center;
  }
  .media {
    width:512px;
    height:100%;
    padding-top:20px;
    display:flex;
    justify-content: center;
  }
  .media:hover {
    background: #f2f2f2;
  }
  iframe {
    width:425px;
    height:320px;
  }
</style>

