<template>
  <div class="footer">
    <div class="footer-container">
      <div class="left">
        <h4>{{ $t('footer.mlogLearnSite') }}</h4>
      </div>
      <div class="center">
        <h4>{{ $t('footer.codeSpaceDebugger') }}</h4>
        <my-link>{{ $t('footer.codesVault') }}</my-link>
        <my-link>{{ $t('footer.privacyPolicy') }}</my-link>
      </div>
      <div class="right">
        <h4>{{ $t('footer.contacts') }}</h4>
        <my-link>{{ $t('footer.discord') }}</my-link>
        <my-link>{{ $t('footer.telegram') }}</my-link>
        <my-link>{{ $t('footer.email') }}</my-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .footer {
    z-index: 1;
    opacity: 0.85;
    position: absolute;
    left: 0;
    margin-top: auto;
    width: 100vw;
    min-height: 10vh;
    height: fit-content;
    background-color: rgb(36, 36, 36);
    .footer-container {
      padding: 10px 5vw 10px 5vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      div {
        min-height: 90px;
        width: auto;
        h4 {
          color: white;
          font-size: 14.8px;
        }
      }
      .left {
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
      }
      .right, .center {
        padding-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: left;
        flex-direction: column;
        flex-wrap: wrap;
        .myLink {
          padding: 1px;
        }
      }
    }
  }
</style>