<template>
  <div class="main">
    <div class="container-syntax">
      <span
        id="syntaxHelper"
        ref="syntaxHelper"
        v-for="(item, index) in tooltipItems"
        :key="index"
        v-tooltip="{
          content: item.tooltipContent,
          placement: 'bottom',
          target: ['click', 'hover'],
          html: true,
        }"
        class="tooltip-item"
        >{{ item.item }}</span
      >
    </div>
    <my-button @click="updateMenu">menu</my-button>
  </div>

  <div class="hotbar" ref="hotbar">
    <div class="selectDisplay" ref="selectDisplay">
      <button
        v-for="section in ['errors', 'labels', 'settings', 'ranges']"
        :key="section"
        @click="showList(`container-${section}`)">
        {{ section.charAt(0).toUpperCase() + section.slice(1) }}
      </button>
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

  <div id="code-editor">
    <div id="line-numbers" ref="lineNumbers"></div>
  </div>
  <div id="autocompleteMenu">{{ autocompleteItems }}</div>
  <div id="container">
    <div
      id="input"
      ref="input"
      contenteditable="true"
      spellcheck="false"
      @scroll="updateScroll"
      @input="updateData"
      v-on:input="$root.handleInput(event)"
      @keyup="moveAutocompleteMenu"
      @blur="moveAutocompleteMenu"></div>
    <div id="output" ref="output" v-html="outputHtml"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { outputData } from "./../debugger/parser.ts";
import { hightlighting } from "./../debugger/hightlighting";
import { updateErrorList } from "./../debugger/errorHandler";
import { mergeT } from "./../debugger/syntaxHelper";
import { mergedLabel } from "./../debugger/labelChecker";
import { range } from "./../debugger/processorTokens/mainProcessor";
import { mergeA } from "./../debugger/autoComplete";
const input = ref(null);
const output = ref(null);
const hotbar = ref(null);
const errorList = ref(null);
const labelList = ref(null);
const rangeList = ref(null);
const syntaxHelper = ref(null);
const lineNumbers = ref(null);
const selectDisplay = ref(null);
const outputHtml = ref("");
const tooltipItems = ref([]);
const autocompleteItems = ref([]);

const updateScroll = () => {
  const inputDiv = input.value;
  const outputDiv = output.value;
  outputDiv.scrollTop = inputDiv.scrollTop;
  outputDiv.scrollLeft = inputDiv.scrollLeft;
};

const getCaretPosition = (element) => {
  let caretOffset = 0;
  let textBeforeWord = "";
  let currentLine = "";

  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;

  if (typeof win.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);

      caretOffset = preCaretRange.endOffset;

      currentLine = range.endContainer.textContent || "";

      const beforeCursor = currentLine.slice(0, caretOffset);
      const words = beforeCursor.split(/\s+/);
      textBeforeWord = words.join(" ");
    }
  }

  return [caretOffset, textBeforeWord, currentLine];
};

const fetchTooltipData = (type = true) => {
  const data = mergeT(
    type ? getCaretPosition(input.value || "")[2] : undefined
  );
  if (data) tooltipItems.value = data;
};

const fetchAutocompleteData = () => {
  const data = mergeA(getCaretPosition(input.value || ""));
  autocompleteItems.value = data ? data.join(", ") : "";
};

const updateData = () => {
  const inputDiv = input.value.innerText || "";
  const textContent = input.value.innerHTML || "";
  const outputDiv = output.value || "";

  outputData(inputDiv, outputDiv, textContent);
  hightlighting(outputHtml);
  appendErrorMenu();
  appendLabelMenu();
  fetchTooltipData();
  fetchAutocompleteData();

  const lines = textContent.split("</div>").length - 1;
  lineNumbers.value.innerText = Array.from(
    { length: lines },
    (_, i) => i + 1
  ).join("\n");
};

const appendMenu = (container, obj, noErrorsText) => {
  container.innerHTML = "";

  if (!Object.keys(obj).length) {
    const main = document.createElement("h3");
    main.textContent = noErrorsText;
    container.appendChild(main);
  } else {
    Object.entries(obj).forEach(([key, array]) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = noErrorsText.includes("errors")
        ? `Line ${key}`
        : `label ' ${key} ''`;
      details.appendChild(summary);

      array.forEach((item) => {
        const itemElement = document.createElement("span");
        itemElement.innerHTML = noErrorsText.includes("errors")
          ? `${item}<br>`
          : `label ' ${item[0]} ' used at line ${item[1]}<br>`;
        details.appendChild(itemElement);
      });

      container.appendChild(details);
    });
  }
};

const appendErrorMenu = () => {
  const container = errorList.value || "";
  appendMenu(container, updateErrorList(), "No errors yet!");
};

const appendLabelMenu = () => {
  const container = labelList.value || "";
  appendMenu(container, mergedLabel, "No labels yet!");
};

const appendRangeMenu = () => {
  const container = rangeList.value || "";
  let output = "";
  Object.keys(range).forEach((key) => {
    if (Array.isArray(range[key])) {
      if (range[key][0] == "$#$default" || range[key][0] == "$#$at") {
        output += `<details><summary class = "yellow">${key}</summary>${range[
          key
        ].join(" ")}</details><hr>`;
      } else if (range[key][0] == "$#$obj") {
        output += `<h3>${key}</h3>`;
        for (let i = 1; range[key].length > i; i++) {
          const index = range[key][i];
          const entries = Object.entries(index);
          output += `<span class = "yellow">${
            entries[0][0]
          }</span><span> : ${entries[0][1].join(" ")}</span><br>`;
          output += `<span class = "yellow">${
            entries[1][0]
          }</span><span> : ${entries[1][1].join(
            " "
          )}</span><br class = "brDown">`;
        }
        output += "<hr>";
      }
    } else {
      output += `<h3 class = "yellow">${key}</h3><span>${range[key].rangeS}</span><hr>`;
    }
  });
  container.innerHTML = output;
};

const updateMenu = () => {
  const syntaxDiv = document.getElementsByClassName("container-syntax")[0];
  const selectedDisplay = selectDisplay.value || "";

  const autocomplete = document.getElementById("autocompleteMenu");
  autocomplete.style.display = "none";

  hotbar.value.style.zIndex == 0
    ? (hotbar.value.style.zIndex = 2)
    : (hotbar.value.style.zIndex = 0);

  if (syntaxDiv.style.opacity == "") {
    syntaxDiv.style.opacity = 0.7;
  }
  syntaxDiv.style.opacity == 0.7
    ? (syntaxDiv.style.opacity = 0)
    : (syntaxDiv.style.opacity = 0.7);

  if (selectedDisplay.style.display == "") {
    selectedDisplay.style.display = "none";
  }
  selectedDisplay.style.display == "block"
    ? (selectedDisplay.style.display = "none")
    : (selectedDisplay.style.display = "block");
};

const showList = (element) => {
  Array.from(document.getElementsByClassName("hotbarList")).forEach((list) => {
    list.style.display = "none";
  });

  document.getElementsByClassName(element)[0].style.display = "block";
};

const moveAutocompleteMenu = (event) => {
  const selection = window.getSelection();
  const autocomplete = document.getElementById("autocompleteMenu");
  if (autocomplete.innerHTML == "")
    return (autocomplete.style.display = "none");
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.bottom == 0 && rect.left == 0) {
      autocomplete.style.display = "none";
    } else {
      autocomplete.style.display = "flex";
      autocomplete.style.top = rect.bottom + window.scrollY + "px";
      autocomplete.style.left = rect.left + window.scrollX + "px";
    }
  } else {
    autocomplete.style.display = "none";
  }
};

onMounted(() => {
  Array.from(document.getElementsByClassName("hotbarList")).forEach((list) => {
    list.style.display = "none";
  });

  fetchTooltipData(false);
  appendRangeMenu();
  appendLabelMenu();
  appendErrorMenu();
  moveAutocompleteMenu();
});
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
  caret-color: rgb(255, 255, 255);
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
  color: #cccccc;
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
  border: 1px solid #cccccc;
  border-radius: 3.5px;
  padding: 3.5px 8px 3.5px 8px;
  opacity: 0.7;
}
div.container-syntax {
  width: auto;
  height: 28px;
  margin-bottom: 3px;
  padding: 0px 5px 0px 5px;
  border: 1px solid #cccccc;
  border-radius: 3.5px;
  opacity: 0.7;
  color: #cccccc;
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
  color: #cccccc;
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
      color: #cccccc;
      display: flex;
      flex-direction: column;
      span {
        padding: 5px;
        font-size: 5px;
      }
    }
  }

  .selectDisplay {
    display: none;
    position: fixed;
    width: 20%;
    height: 85vh;
    background-color: rgb(37, 37, 37);
    button {
      font-size: 14px;
      width: 100%;
      height: 30px;
      color: #cccccc;
      border: none;
      background-color: transparent;
      transition: 0.3s;
      &:hover {
        cursor: pointer;
        color: rgb(12, 150, 150);
        border: 1px solid #cccccc;
      }
    }
  }
}

#code-editor {
  border-right: 1px solid #cccccc;
  color: #cccccc;
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

#autocompleteMenu {
  background-color: #bbbbbb;
  color: #333333;
  padding: 4px;
  height: 80px;
  width: 200px;
  z-index: 2;
  position: absolute;
  overflow-y: scroll;
  border-radius: 5px;
  font-size: 14px;
}
</style>
