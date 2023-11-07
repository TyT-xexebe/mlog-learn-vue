<template>
  <div>
    <nav-bar></nav-bar>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import navBar from '@/components/nav-bar.vue'
import footerBar from '@/components/footer.vue'
export default {
  components: {
    'nav-bar': navBar,
    'footer-bar': footerBar,
  }

}
</script>
<style lang="scss">
  
</style>