<template>
  <my-button @click="updateMenu">menu</my-button>
  <div class="hotbar" ref="hotbar">
    
    <div class="container-errors">
      <h2>Errors</h2>
      <div class="errors" ref="errorList">

      </div>
    </div>

    <div class="container-settings">
      <h2>Settings</h2>
      <div class="settings">

      </div>
    </div>
  </div>
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
import { updateErrorList } from './../debugger/errorHandler'

const input = ref(null);
const output = ref(null);
const hotbar = ref(null);
const errorList = ref(null);
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
  const errorContainer = errorList.value || '';
  outputData(textContent, outputDiv);
  hightlighting(outputHtml);
  errorContainer.innerHTML = updateErrorList();
};

const updateMenu = () => {

  hotbar.value.style.zIndex == 0 ? hotbar.value.style.zIndex = 2 : hotbar.value.style.zIndex = 0;
}
</script>



<style scoped lang="scss">

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
  font-size: 11.5px;
  z-index: 1;
  line-height: normal;
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
  z-index: 0;
  font-size: 11.5px;
  line-height: normal;
}
  .mainBtn {
    position: absolute;
    top: 8.5vh;
    right: 1vw;
    border: 1px solid #CCCCCC;
    padding: 3.5px;
    z-index: 3;
    opacity: 0.5;
  }
.hotbar {
  overflow-y: scroll;
  transition: 0.3s;
  left: 0;
  width: 96vw;
  height: 81vh;
  padding: 2vh 2vw 2vh 2vw;
  margin-top: 7.5vh;
  z-index: 0;
  background-color: rgb(45, 44, 53);
  color: #CCCCCC;
  opacity: 0.8;
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  div.container-settings {
    width: 50%;
    height: 100%;
  }
  .container-errors {
    width: 50%;
    height: 100%;
    .errors {
      color: #CCCCCC;
      display: flex;
      flex-direction: column;
      span {
        padding: 5px;
        font-size: medium;
      }
    }
  }
}
</style>
