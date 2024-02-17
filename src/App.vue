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
.yellow {
  color: rgb(245, 209, 8);
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
  @media (max-width: 900px) {
    font-size: 17.5px;
  }
  @media (min-width: 900px) {
    font-size: 19.5px;
  }
  height: auto;
  width: 85vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 10px;

  &::before,
  &::after {
    content: "";
    height: 2px;
    width: calc(50vw - 2.5%);
    background-color: aliceblue;
    position: relative;
    top: 50%;
  }

  &::before {
    left: 0;
    margin-left: -50vw;
  }

  &::after {
    right: 0;
    margin-right: -50vw;
  }

  span {
    margin: 0 20px;
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
    min-width: calc(100%);
    height: fit-content;
    padding: 20px 10% 20px 10%;
    background-color: rgba(32, 31, 31, 0.562);
    border-radius: 0.5px;
    font-size: 12.5px;
    margin-left: -10%;
    margin-right: -10%;
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
</style>
