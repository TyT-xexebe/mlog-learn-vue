<template>
  <div class="footer">
    <div class="footer-container">
      <div class="left">
        <h4>M-Log Learn Site</h4>
      </div>
      <div class="center">
        <h4>CodeSpace (Debugger)</h4>
        <my-link>Codes Vault</my-link>
        <my-link>Privacy Policy</my-link>
      </div>
      <div class="right">
        <h4>Contacts</h4>
        <my-link>Discord</my-link>
        <my-link>Telegram</my-link>
        <my-link>Email</my-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .footer {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 10vh;
    height: fit-content;
    background-color: rgb(36, 36, 36);
    border-top: 3px solid #3c8888;
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