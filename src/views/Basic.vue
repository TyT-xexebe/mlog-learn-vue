<template>
  <div class="container">
    <div class="main">
      <h2 class="yellow">{{ $t('basic.understandingLogic.title') }}</h2>
      <p>{{ $t('basic.understandingLogic.intro') }}</p><br>
      <p>{{ $t('basic.understandingLogic.processorDescription') }}</p><br>
      <p>{{ $t('basic.understandingLogic.processorUsage') }}</p><br>
      <p>{{ $t('basic.understandingLogic.connectingBlocks') }}</p><br>

      <span class="hr"><span class="title yellow">{{ $t('basic.understandingLogic.specialValuesTitle') }}</span></span>
<ul>
  <li v-for="value in this.$tm('basic.understandingLogic.specialValues')">
    <strong class="bolt yellow"  v-html="decodeHTMLEntities(value.name)"></strong>: <span v-html="decodeHTMLEntities(value.description)"></span><br>
  </li>
</ul>

<span class="hr"><span class="title yellow">{{ $t('basic.understandingLogic.basicProcessorInfoTitle') }}</span></span>
<ul>
  <li v-for="info in this.$tm('basic.understandingLogic.basicProcessorInfo')"><span v-html="decodeHTMLEntities(info)"></span><br></li>
</ul>


      <p class="bolt yellow">{{ $t('basic.understandingLogic.jumpLabelsTitle') }}</p>
      <p>{{ $t('basic.understandingLogic.jumpLabelsIntro') }}</p>
      <h5>
        jump 2 always 0 0<br />
        end<br />
        print "hello"<br />
      </h5>
      <p class="bolt yellow">{{ $t('basic.understandingLogic.jumpLabelMethodsTitle') }}</p>
      <p>{{ $t('basic.understandingLogic.jumpMethods') }}</p>
      <h5>
        jump label always 0 0<br />
        end<br />
        label:<br />
        print "hello"<br />
      </h5>
      <p>{{ $t('basic.understandingLogic.jumpLabelMethods') }}</p>

      <span class="hr"><span class="title yellow">{{ $t('basic.understandingLogic.otherLogicBlocksTitle') }}</span></span>
      <p v-html="decodeHTMLEntities($t('basic.understandingLogic.otherLogicBlocksIntro'))"></p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    decodeHTMLEntities: function(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
  }
};

</script>
<style lang="scss">
.container {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  margin-bottom: 5vh;
  flex: 1;
  color: white;
}
</style>
