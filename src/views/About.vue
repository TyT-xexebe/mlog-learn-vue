<template>
  <div class="container">
    <div class="main">
      <h2 class="yellow">{{ $t('about.pageTitle') }}</h2>
      <h3>{{ $t('about.purpose') }}</h3>
      <span class="hr"><span class="title yellow">{{ $t('about.infoTitle') }}</span></span>
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
      <span class="hr"><span class="title yellow">{{ $t('about.contribute.main') }}</span></span>
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
    background-color: transparent;
    display: flex;
    flex-direction: column;
    min-height: 95vh;
    .main {
      margin-top: 10vh;
      margin-bottom: 5vh;
      flex: 1;
      color: white;
    }
  }
</style>