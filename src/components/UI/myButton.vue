<template>
  <button class="mainBtn"><slot></slot></button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>
<style lang="scss" scoped>
  .mainBtn {
    border: none;
    width: fit-content;
    height: fit-content;
    color: #ffffff;
    background-color: transparent;
    border-radius: 4px;
    transition: 0.45s;
    &:hover {
      color: #45c9c4;
    }
    &.active {
      color: #45c9c4;
    }
    @media (max-width: 950px) {
      padding: 5px 10px 5px 10px;
      margin-left: 5px;
      margin-right: 5px;
      font-size: 15.5px;
      font-weight: 400;
    }
    @media (min-width: 950px) {
      padding: 9px 15px 9px 15px;
      margin-left: 15px;
      margin-right: 15px;
      font-size: 16px;
      font-weight: 500;
    }
  }
</style>