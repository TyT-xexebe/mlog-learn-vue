<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="main">
      <h2>The website is created for the purpose of educating users about <span class="bolt yellow">M-Log (Mindustry - Logic)</span>.<br>Here you will find extensive materials to help you master m-log.</h2>
      <hr>
      <h3>In particular, <span class="bolt yellow">the following information is available on the website</span>:</h3>
      <ul>
        <li>
          <span class="bolt yellow">Basic concepts of M-Log:</span>
          <p>We provide a detailed description of basic concepts to help you understand how everything works.</p>
        </li>
        <li>
          <span class="bolt yellow">Commands and their application:</span>
          <p>You will find information about various M-Log commands and how to use them to achieve specific goals.</p>
        </li>
        <li>
          <span class="bolt yellow">Code examples:</span>
          <p>We offer extensive code examples with detailed explanations to make it easier for you to master M-Log.</p>
        </li>
        <li>
          <span class="bolt yellow">Debugger:</span>
          <p>Our debugger allows you to check and improve your code by detecting and fixing errors.</p>
        </li>
      </ul>
      <hr>
      <h3>In addition, we are always ready to welcome <span class="yellow">new ideas and suggestions from our users</span>. If you want to contribute to the development of our website, you can <span class="yellow">contact us</span></h3>
      <p>We appreciate your participation and are ready to consider any suggestions <span class="yellow">to improve our resource</span>.</p>
    </div>
  </div>
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
<style lang="scss" scoped>
  .container {
    padding: 0 5vw 0 5vw;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .main {
      margin-top: 15vh;
      margin-bottom: 5vh;
      flex: 1;
      hr {
        color: rgb(212, 212, 212);
        font-weight: 900;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      br {
        margin-bottom: 5px;
      }
      .yellow {
        color: rgb(245, 209, 8);
      }
      h2 {
        @media (max-width: 900px){
          font-weight: 600;
          font-size: 17.5px;
          padding-bottom: 5px;
          span.bolt {
            font-size: 16.5px;
            font-weight: 700;
          }
        }
        @media (min-width: 900px){
          font-weight: 700;
          font-size: 21.5px;
          padding-bottom: 5px;
          span.bolt {
            font-size: 18.5px;
            font-weight: 800;
          }
        }
      }
      h3 {
        @media (max-width: 900px){
          font-weight: 600;
          font-size: 15px;
          padding-bottom: 5px;
          span.bolt {
            font-size: 16px;
            font-weight: 600;
          }}
        @media (min-width: 900px){
          font-weight: 600;
          font-size: 17.5px;
          padding-bottom: 5px;
          span.bolt {
            font-size: 17px;
            font-weight: 700;
          }}
      }
      p {
        font-weight: 500;
        font-size: 15.8px;
        span.bolt {
          font-size: 16.8px;
          font-weight: 600;
        }
      }
      ul li {
        padding-bottom: 5px;
        padding-left: 10px;
        span.yellow {
          font-weight: 600;
          font-size: 16px;
        }
      }
      color: white;
    }
  }
</style>