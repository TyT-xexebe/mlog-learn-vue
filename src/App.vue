<template>
  <nav-bar />
  <router-view />
  <footer-bar />
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
.underlined {
      position: relative;
    }

    .underlined:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #3194ff88;
      border-radius: 1px;
      transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform-origin: bottom center;
      opacity: 0;
    }

    .underlined:hover:after {
      width: 100%;
      opacity: 1;
      transition-delay: 0.1s;
    }
  // default styles reset
*,*::before,*::after {margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;}
html {font-size: 62.5%;}
body {font-size: 1.6rem;line-height: 1.5;box-sizing: border-box;background-color: rgb(24, 24, 24);}
ul,ol {list-style: none;}
a {text-decoration: none;&:focus {outline: 0;}}
table {border-collapse: collapse;border-spacing: 0;}
</style>
