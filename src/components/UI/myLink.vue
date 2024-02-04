<template>
  <a class="myLink"><slot></slot></a>
</template>
<script>
export default {
  name: 'my-link'
}
</script>
<style lang="scss">
  .myLink {
    color: rgb(240, 240, 240);
    transition: 0.25s;
    padding: 5px;
    &:hover {
      cursor: pointer;
      color: rgb(12, 150, 150);
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      font-size: 14.5px;
      font-weight: 400;
    }
    @media (min-width: 600px) {
      font-size: 15.2px;
      font-weight: 400;
    }
  }
</style>