<template>
  <div class="contents">
    <RankSection title="실시간 랭킹"/>
    <BrandnewSection title="신상품"/>
    <SpecialSection title="입고살자 TV"/>
  </div>
</template>

<script>
import RankSection     from "@/components/RankSection.vue"
import BrandnewSection from "@/components/BrandnewSection.vue"
import SpecialSection  from "@/components/SpecialSection.vue"

export default {
  components: {BrandnewSection, RankSection, SpecialSection}
}
</script>


<style scoped>
  .contents {
    display:block;
  }
</style>
