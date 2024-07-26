<template>
  <div id="container">
    <div id="input" ref="input" contenteditable="true" spellcheck="false" @scroll="updateScroll" @input="updateData" v-on:input="$root.handleInput(event)">
    </div>
    <div id="output" ref="output" v-html="outputHtml"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { outputData } from './../debugger/parser.ts';
import { hightlighting } from './../debugger/hightlighting';

const input = ref(null);
const output = ref(null);
const outputHtml = ref('');

const updateScroll = () => {
  const inputDiv = input.value;
  const outputDiv = output.value;
  outputDiv.scrollTop = inputDiv.scrollTop;
  outputDiv.scrollLeft = inputDiv.scrollLeft;
};

const updateData = () => {
  const textContent = input.value.innerText || '';
  const outputDiv = output.value || '';
  outputData(textContent, outputDiv);
  hightlighting(outputHtml);
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
  width: 98vw;
  padding: 0 1vw 0 1vw;
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
  color: #CCCCCC;
  border: none;
  height: 85vh;
  width: 98vw;
  padding: 0 1vw 0 1vw;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  z-index: 0;
  font-size: 11.5px;
}
</style>
