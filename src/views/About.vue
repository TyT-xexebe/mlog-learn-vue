<template>
  <div class="container">
    <div class="main">
      <h2 class="yellow">{{ $t('about.pageTitle') }}</h2>
      <h3>{{ $t('about.purpose') }}</h3>
      <hr>
      <h3>{{ $t('about.informationAvailable') }}</h3>
      <ul>
        <li>
          <span class="bolt yellow">{{ $t('about.basicConcepts.title') }}</span>
          <p>{{ $t('about.basicConcepts.description') }}</p>
        </li>
        <li>
          <span class="bolt yellow">{{ $t('about.commands.title') }}</span>
          <p>{{ $t('about.commands.description') }}</p>
        </li>
        <li>
          <span class="bolt yellow">{{ $t('about.codeExamples.title') }}</span>
          <p>{{ $t('about.codeExamples.description') }}</p>
        </li>
        <li>
          <span class="bolt yellow">{{ $t('about.debugger.title') }}</span>
          <p>{{ $t('about.debugger.description') }}</p>
        </li>
      </ul>
      <hr>
      <h3>{{ $t('about.contribute.title') }}</h3>
      <p>{{ $t('about.contribute.contactUs') }}</p>
      <p>{{ $t('about.appreciateParticipation') }}</p>
    </div>
  </div>
</template>

<script>
</script>
<style lang="scss" scoped>
  .container {
    padding: 0 5vw 0 2vw;
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