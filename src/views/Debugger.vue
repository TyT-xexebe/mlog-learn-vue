<template>
  <div class="main">
    <div class="container-syntax">
      <span id="syntaxHelper" ref="syntaxHelper" v-html="syntaxOutput"></span>
    </div>
      <my-button @click="updateMenu">menu</my-button>
  </div>

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

  <div id="code-editor" >
    <div id="line-numbers" ref="lineNumbers" ></div>
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
import { updateErrorList } from './../debugger/errorHandler';
import { commandSyntaxOutput } from './../debugger/syntaxHelper';

const input = ref(null);
const output = ref(null);
const hotbar = ref(null);
const errorList = ref(null);
const syntaxHelper = ref(null);
const lineNumbers = ref(null);
const outputHtml = ref('');
const syntaxOutput = ref('Syntax Helper');

const updateScroll = () => {
  const inputDiv = input.value;
  const outputDiv = output.value;
  outputDiv.scrollTop = inputDiv.scrollTop;
  outputDiv.scrollLeft = inputDiv.scrollLeft;
};

const getCaretPosition = (element) => {
  var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.endContainer.data
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.endContainer.data;
    }
    return caretOffset;
}

const updateData = () => {
  const textContent = input.value.innerText || '';
  const outputDiv = output.value || '';
  const inputDiv = input.value || '';

  outputData(textContent, outputDiv);
  hightlighting(outputHtml);

  appendErrorMenu();

  let syntaxO = commandSyntaxOutput(getCaretPosition(inputDiv))
  if(syntaxO.output != false && syntaxO.output != '' && syntaxO != false) {
    syntaxOutput.value = syntaxO.output;
  }
  console.log(syntaxO);

  const lines = inputDiv.innerText.split('\n').length - 1;
  let lineNumbers2 = [];
  for(let i = 0; i < lines; i++) {lineNumbers2.push(`${i}`)};
  lineNumbers.value.innerText = lineNumbers2.join('\n');
};

const appendErrorMenu = () => {
  const container = errorList.value || '';
  container.innerHTML = '';

  const obj = updateErrorList();

  Object.keys(obj).forEach(key => {
    const array = obj[key];

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = `Line ${key}`; 

    details.appendChild(summary);

    array.forEach(item => {
      const itemElement = document.createElement('span');
      itemElement.innerHTML = item;
      details.appendChild(itemElement);
    });

    container.appendChild(details);
  });
}

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
  width: 97vw;
  padding: 0 1vw 0 2vw;
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
  width: 97vw;
  padding: 0 1vw 0 2vw;
  z-index: 0;
  font-size: 11.5px;
  line-height: normal;
}


.main {
  display: flex;
  position: absolute;
  top: 8vh;
  right: 1vw;
  flex-direction: column;
  align-items: flex-end;
  z-index: 3;
}
  .mainBtn {
    margin: 0;
    height: 28px;
    border: 1px solid #CCCCCC;
    border-radius: 3.5px;
    padding: 3.5px 8px 3.5px 8px;
    opacity: 0.7;
  }
  div.container-syntax {
    width: auto;
    height: 28px;
    margin-bottom: 3px;
    padding: 0px 5px 0px 5px;
    border: 1px solid #CCCCCC;
    border-radius: 3.5px;
    opacity: 0.7;
    color: #CCCCCC;
    span {
      display: inline-block;
      height: 28px;
      margin: 0;
      padding: 0;
    }
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
        font-size: 5px;
      }
    }
  }
}

#code-editor {
  border-right: 1px solid #CCCCCC;
  color: #CCCCCC;
  background-color: transparent;
  display: flex;
  position: absolute;
  top: 7.5vh;
  left: 0;
  z-index: 1;
  #line-numbers {
    display: flex;
    flex-direction: column;
    font-size: 11.5px;
    line-height: normal;
    br {
      margin-bottom: 0; 
    }
  }
}
</style>
