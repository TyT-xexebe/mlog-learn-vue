<template>
  <router-view></router-view>
  <nav-bar></nav-bar>
  <footer-bar></footer-bar>
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
  // default styles reset
*,*::before,*::after {margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;}
html {font-size: 62.5%;}
body {font-size: 1.6rem;line-height: 1.5;box-sizing: border-box;background-color: rgb(24, 24, 24);}
ul,ol {list-style: none;}
a {text-decoration: none;&:focus {outline: 0;}}
table {border-collapse: collapse;border-spacing: 0;}
</style>
