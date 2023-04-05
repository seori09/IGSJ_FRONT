<template>
  <div v-if="this.$store.state.signInPage">
    <router-view/>
  </div>
  <div v-else>
    <header-comp/>
    <div class="main">
      <div class="side"><sidebar-comp/></div>
      <div class="middle"><router-view/></div>
      <div class="bottom"><footer-comp/></div>
    </div>
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'
import SidebarComp from './components/Sidebar.vue'

export default {
  components: { HeaderComp, FooterComp, SidebarComp }
}
</script>

<style>
  .main {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    width: 100%;
    min-width: 1400px;
    height: 100%;
    gap: 0;
    grid-template-areas:
      "a b b b b" 
      "a c c c c";
    margin-top: 126px;
  }
  .side   {
    grid-area: a;
    border-right: 1px solid lightgrey;
  }
  .middle {
    grid-area: b;
    height: 100%;
    display: block;
  }
  .bottom {
    grid-area: c;
    height: 100%;
    display: block;
    border-top: 1px solid darkgrey;
  }
</style>
