<template>
  <div id="container">
    <div id="input" ref="input" contenteditable="true" spellcheck="false" @scroll="updateScroll" v-on:input="$root.handleInput(event)">
    </div>
    <div id="output" ref="output">
      {{ inputData }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      inputData: ''
    };
  },

  mounted() {
    console.log(this.input)
    this.input.addEventListener('input', () => {this.updateData();});
  },

  setup() {
    const input = ref(null);
    const output = ref(null);
    return {
      input,
      output,
    }
  },

  methods: {
    updateScroll() {
      const inputDiv = this.input;
      const outputDiv = this.output;
      outputDiv.scrollTop = inputDiv.scrollTop;
      outputDiv.scrollLeft = inputDiv.scrollLeft;
    },
    updateData() {
      this.inputData = this.input.textContent;
    },
  }
};
</script>

<style scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  height: 85vh;
  width: 100vw;
  background-color: rgb(37, 37, 37);
  padding: 10px; /* Fixed: Added 'px' */
  margin-top: calc(5.5vh + 16px);
}

#input {
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  overflow-y: scroll;
  overflow-x: scroll;
  overflow-wrap: normal;
  color: transparent;
  border: none;
  height: 85vh;
  width: 100vw;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 11.5px;
  z-index: 1;
}

#output {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(37, 37, 37);
  overflow-y: scroll;
  overflow-x: scroll;
  overflow-wrap: normal;
  color: white;
  border: none;
  height: 85vh;
  width: 100vw;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  z-index: 0;
  font-size: 11.5px;
}
</style>
