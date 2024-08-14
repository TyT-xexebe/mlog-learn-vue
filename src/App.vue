<template>
  <nav-bar />
  <div class="mainContainer">
    <router-view />
  </div>
  <footer-bar />
</template>
<script>
import navBar from "@/components/nav-bar.vue";
import footerBar from "@/components/footer.vue";
export default {
  components: {
    "nav-bar": navBar,
    "footer-bar": footerBar,
  },
};
</script>
<style lang="scss">
body {
  overflow-x: hidden;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainContainer {
  flex: 1;
  padding-bottom: 50px;
  min-height: 90vh;
  width: 90vw;
}
.underlined {
  position: relative;
}
.underlined:after {
  content: "";
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3194ff88;
  border-radius: 1px;
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform-origin: bottom center;
  opacity: 0;
}

.underlined:hover:after {
  width: 100%;
  opacity: 1;
  transition-delay: 0.1s;
}

.hr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50%;
    height: 2px; 
    background-color: #3c8888; 
  }

  &::before {
    left: 0;
    margin-right: 10px; 
  }

  &::after {
    right: 0;
    margin-left: 10px; 
  }
}

.title {
  position: relative;
  padding: 0 10px; 
  background-color: rgb(24, 24, 24); 
  z-index: 1; 

  @media (max-width: 900px) {
    font-size: 17.5px;
    font-weight: 500;
  }

  @media (min-width: 900px) {
    font-size: 18.5px;
    font-weight: 600;
  }
}

#code-editor {
  #line-numbers {
    br {
      margin-bottom: 0; 
    }
  }
}

hr {
    color: rgb(212, 212, 212);
    font-weight: 900;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  br {
    margin-bottom: 8px;
  }
  h2 {
    @media (max-width: 900px) {
      font-weight: 600;
      font-size: 17.5px;
      padding-bottom: 5px;
      span.bolt {
        font-size: 16.5px;
        font-weight: 700;
      }
    }
    @media (min-width: 900px) {
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
    @media (max-width: 900px) {
      font-weight: 600;
      font-size: 15.5px;
      padding-bottom: 5px;
      span.bolt {
        font-size: 16px;
        font-weight: 600;
      }
    }
    @media (min-width: 900px) {
      font-weight: 600;
      font-size: 17.5px;
      padding-bottom: 5px;
      span.bolt {
        font-size: 17px;
        font-weight: 700;
      }
    }
  }
  p {
    font-weight: 500;
    font-size: 15.8px;
    span.bolt {
      font-size: 16.5px;
      font-weight: 600;
    }
  }
  ul li {
    padding-bottom: 5px;
    padding-left: 10px;
    span.bolt {
      font-weight: 600;
      font-size: 16px;
    }
  }
  h5 {
    margin: 20px 0 20px 0;
    min-width: calc(100% - 20px);
    height: fit-content;
    padding: 20px 10px 20px 10px;
    background-color: rgba(32, 31, 31, 0.562);
    border-radius: 0.5px;
    font-size: 12.5px;
    br {
      margin: 1px;
    }
  }
// default styles reset
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
html {
  font-size: 62.5%;
}
body {
  font-size: 1.6rem;
  line-height: 1.5;
  box-sizing: border-box;
  background-color: rgb(24, 24, 24);
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  &:focus {
    outline: 0;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

#output br, #input br {
  margin-bottom: 0 !important;
  padding: 0;
  line-height: 0;
  height: 0;
}

.purple {  color: #C792EA;  }
.green {  color: #A4E57E;  }
.red {  color: #F07178;  }
.yellow {  color: #F9D649;  }
.default {color: #CCCCCC}
</style>
