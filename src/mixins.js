export default {
  created(){
    this.$store.commit('setUrl', window.location.href)
  }
}