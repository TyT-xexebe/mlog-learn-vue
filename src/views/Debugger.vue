<template>
  <div class="main">
    <div class="container-syntax">
      <span id="syntaxHelper" ref="syntaxHelper" 
        v-for="(item, index) in tooltipItems" 
        :key="index" 
        v-tooltip="{ content: item.tooltipContent, placement: 'bottom', target: ['click', 'hover'], html: true }" 
        class="tooltip-item"
      >{{ item.item }}</span>
    </div>
      <my-button @click="updateMenu">menu</my-button>
  </div>

  <div class="hotbar" ref="hotbar">

    <div class="selectDisplay">
      <button @click="showList('container-errors')">Errors</button>
      <button @click="showList('container-labels')">Labels</button>
      <button @click="showList('container-settings')">Settings</button>
      <button @click="showList('container-ranges')">Ranges</button>
    </div>

    <div class="container-errors hotbarList">
      <h2>Errors</h2>
      <div class="errors" ref="errorList"></div>
    </div>

    <div class="container-labels hotbarList">
      <h2>Labels</h2>
      <div class="labels" ref="labelList"></div>
    </div>

    <div class="container-settings hotbarList">
      <h2>Settings</h2>
      <div class="settings"></div>
    </div>

    <div class="container-ranges hotbarList">
      <h2>Ranges</h2>
      <div class="ranges" ref="rangeList"></div>
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
import { merge } from './../debugger/syntaxHelper';
import { mergedLabel } from './../debugger/labelChecker';
import { range } from './../debugger/processorTokens/mainProcessor';

const input = ref(null);
const output = ref(null);
const hotbar = ref(null);
const errorList = ref(null);
const labelList = ref(null);
const rangeList = ref(null);
const syntaxHelper = ref(null);
const lineNumbers = ref(null);
const outputHtml = ref('');
const tooltipItems = ref([]);

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
            var range2 = win.getSelection().getRangeAt(0);
            var preCaretRange = range2.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range2.endContainer, range2.endOffset);
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

const fetchTooltipData = () => {
  const inputDiv = input.value || '';
  const data = merge(getCaretPosition(inputDiv))
  if(data){
    tooltipItems.value = data;
  }
};

const updateData = () => {
  const inputDiv = input.value.innerText || '';
  const textContent = input.value.innerHTML || '';
  const outputDiv = output.value || '';

  outputData(textContent, outputDiv);
  hightlighting(outputHtml);

  appendErrorMenu();
  appendLabelMenu();
  appendRangeMenu();
  fetchTooltipData();

    const lines = textContent.split('</div>').length - 1;
    let lineNumbers2 = [];
    for (let i = 0; i < lines; i++) {
        lineNumbers2.push(`${i + 1}`);
    }
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
      itemElement.innerHTML = `${item}<br>`;
      details.appendChild(itemElement);
    });

    container.appendChild(details);
  });
}

const appendLabelMenu = () => {
  const container = labelList.value || '';
  container.innerHTML = '';

  Object.keys(mergedLabel).forEach(key => {
    const array = mergedLabel[key];

    const details = document.createElement('details');
    const summary = document.createElement('summary');

    summary.textContent = `label  ' ${key} ''`;

    details.appendChild(summary);

    array.forEach(item => {
      const itemElement = document.createElement('span');
      itemElement.innerHTML = `label ' ${item[0]} ' used at line ${item[1]}<br>`;
      details.appendChild(itemElement);
    });

    container.appendChild(details);
  });
}

const appendRangeMenu = () => {
  const container = rangeList.value || '';
  let output = '';
  Object.keys(range).forEach(key => {
    if (Array.isArray(range[key])) {
      if (range[key][0] == "$#$default" || range[key][0] == "$#$at") {
      output += `<details><summary class = "yellow">${key}</summary>${range[key].join(' ')}</details><hr>`;
      }  else if (range[key][0] == "$#$obj") {
        output += `<h3>${key}</h3>`
        for (let i = 1; range[key].length > i; i++) {
          const index = range[key][i];
          console.log(i)
          const entries = Object.entries(index);
          output += `<span class = "yellow">${entries[0][0]}</span><span> : ${entries[0][1].join(' ')}</span><br>`;
          output += `<span class = "yellow">${entries[1][0]}</span><span> : ${entries[1][1].join(' ')}</span><br class = "brDown">`;
        }
        output += '<hr>';
      }
    } else {
      output += `<h3 class = "yellow">${key}</h3><span>${range[key].rangeS}</span><hr>`;
    }
  });
  container.innerHTML = output;
}

const updateMenu = () => {
  const syntaxDiv = document.getElementsByClassName('container-syntax')[0];
  hotbar.value.style.zIndex == 0 ? hotbar.value.style.zIndex = 2 : hotbar.value.style.zIndex = 0;
  if (syntaxDiv.style.opacity == '') {syntaxDiv.style.opacity = 0.7};
  syntaxDiv.style.opacity == 0.7 ? syntaxDiv.style.opacity = 0 : syntaxDiv.style.opacity = 0.7;
}

const showList = (element) => {
  Array.from(document.getElementsByClassName('hotbarList'))
    .forEach((list) => {
        list.style.display = 'none';
    });

  document.getElementsByClassName(element)[0].style.display = 'block';
}
</script>

<script>
export default {
  name: "nav-bar",

  mounted() {
    Array.from(document.getElementsByClassName('hotbarList'))
    .forEach((list) => {
        list.style.display = 'none';
    });
  }
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
  width: 100vw;
  height: 85vh;
  margin-top: 7.5vh;
  z-index: 0;
  background-color: rgb(45, 44, 53);
  color: #CCCCCC;
  opacity: 0.8;
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .hotbarList {
    width: 80%;
    height: 100%;
    padding: 2vh 0vw 2vh 2vw;
    margin-left: 20%;
  }
  .container-errors {
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

  .selectDisplay {
    display: block;
    position: absolute;
    width: 20%;
    height: 100%;
    background-color: rgb(37, 37, 37);
    button {
      font-size: 14px;
      width: 100%;
      height: 30px;
      color: #CCCCCC;
      border: none;
      background-color: transparent;
      transition: 0.3s;
      &:hover {
        cursor: pointer;
        color: rgb(12, 150, 150);
        border: 1px solid #CCCCCC;
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

.tooltip-item {
  margin-right: 0.5em !important;
}
</style>
