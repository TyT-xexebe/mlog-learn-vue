<template>
  <div class="nav-bar" ref="nav">
    <div class="left navComponent">
      <my-button
        class="underlined"
        @click="$router.push('/about')"
        :class="{ active: $route.path === '/about' }"
      >{{ $t("navbar.about") }}</my-button>
      <my-button
        class="underlined"
        @click="$router.push('/basic')"
        :class="{ active: $route.path === '/basic' }"
      >{{ $t("navbar.basic") }}</my-button>
    </div>

    <div class="right navComponent" ref="navRight">
      <my-button
        class="underlined commands"
        @click="toggleCommands"
        :class="{ active: $route.path === '/commands' }"
      >{{ $t("navbar.commands") }}</my-button>
      <my-button
        class="underlined"
        @click="$router.push('/examples')"
        :class="{ active: $route.path === '/examples' }"
      >{{ $t("navbar.codeExamples") }}</my-button>
      <my-button
        class="underlined"
        @click="$router.push('/debugger')"
        :class="{ active: $route.path === '/debugger' }"
      >{{ $t("navbar.debugger") }}</my-button>
      <my-button @click="openLangMenu" class="language">{{
        $t("navbar.language")
      }}</my-button>

      <my-button
        @click="$router.push('/login')"
        :class="{ active: $route.path === '/login' }"
      >{{ $t("navbar.logIn") }}</my-button>
    </div>
    <div class="language-menu" ref="languageMenu">
      <my-button
        @click="changeLanguage('en'), openLangMenu()"
        :class="{ active: $i18n.locale === 'en' }"
      >{{ $t("navbar.languages.english") }}</my-button>
      <my-button
        @click="changeLanguage('ru'), openLangMenu()"
        :class="{ active: $i18n.locale === 'ru' }"
      >{{ $t("navbar.languages.russian") }}</my-button>
      <my-button
        @click="changeLanguage('uk'), openLangMenu()"
        :class="{ active: $i18n.locale === 'uk' }"
      >{{ $t("navbar.languages.ukrainian") }}</my-button>
    </div>
    <div class="menu-btn-container" @click="openFullNav">
      <div class="menu-btn"></div>
    </div>
    <div
      class="commandList"
      ref="commandsList"
      :class="{ 'show-commands': showCommands }"
    >
      <div id="params1">
        <span>Input & Output</span>
        <my-button>read</my-button>
        <my-button>write</my-button>
        <my-button>draw</my-button>
        <my-button>print</my-button>
        <hr />
      </div>
      <div id="params2">
        <span>Block Control</span>
        <my-button>drawflush</my-button>
        <my-button>printflush</my-button>
        <my-button>getlink</my-button>
        <my-button>control</my-button>
        <my-button>radar</my-button>
        <my-button>sensor</my-button>
        <hr />
      </div>
      <div id="params3">
        <span>Operations</span>
        <my-button>set</my-button>
        <my-button>operation</my-button>
        <my-button>lookup</my-button>
        <my-button>packcolor</my-button>
        <hr />
      </div>
      <div id="params4">
        <span>Flow Control</span>
        <my-button>wait</my-button>
        <my-button>stop</my-button>
        <my-button>end</my-button>
        <my-button>jump</my-button>
        <hr />
      </div>
      <div id="params5">
        <span>Unit Control</span>
        <my-button>ubind</my-button>
        <my-button>ucontrol</my-button>
        <my-button>uradar</my-button>
        <my-button>ulocate</my-button>
        <hr />
      </div>
      <div id="params6">
        <span>World</span>
        <my-button>get block</my-button>
        <my-button>set block</my-button>
        <my-button>spawn unit</my-button>
        <my-button>apply status</my-button>
        <my-button>spawn wave</my-button>
        <my-button>set rule</my-button>
        <my-button>flush message</my-button>
        <my-button>cutscene</my-button>
        <my-button>effect</my-button>
        <my-button>explosion</my-button>
        <my-button>set_rate</my-button>
        <my-button>fetch</my-button>
        <my-button>set flag</my-button>
        <my-button>get flag</my-button>
        <my-button>set prop</my-button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";

export default {
  name: "nav-bar",

  setup() {
    const showBar = ref(false);
    const showCommands = ref(false);
    const showLang = ref(false);
    const nav = ref(false);
    const navRight = ref(false);
    const languageMenu = ref(false);
    const commandsList = ref(false);

    document.addEventListener('click', function(event) {
      if (!commandsList.value.contains(event.target) && !event.target.classList.contains('commands')) {
        showCommands.value = false;
      }
    });

    return {
      showBar,
      showCommands,
      showLang,
      nav,
      navRight,
      languageMenu,
      commandsList,
    };
  },

  watch: {
    showCommands() {
      this.openCommandsMenu();
    },
  },

  mounted() {
    this.openFullNav();
    this.positionedLangMenu();
    this.openLangMenu();
    this.openCommandsMenu();
    window.addEventListener("resize", () => {
      this.positionedLangMenu();
      this.showLang = false;
      this.openLangMenu();
      if (window.innerWidth > 800) {
        if (this.showBar) this.openFullNav();
      } else {
        if (!this.showBar) this.openFullNav();
      }
    });
    const navBtns = this.nav.querySelectorAll('button');
    navBtns.forEach(btn => { btn.addEventListener('click', (event) => { this.reload(event) }) });
    const navBtns2 = this.nav.querySelectorAll('.navComponent button');
    navBtns2.forEach(btn => { btn.addEventListener('click', () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })) });
  },

  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
    openFullNav() {
      if (window.innerWidth <= 800) {
        if (this.showBar) {
          this.navRight.style.paddingTop = `${this.nav.getBoundingClientRect().height}px`;
          this.navRight.style.transform = "translateY(0px)";
          this.navRight.style.opacity = "1.0";
          this.showBar = false;
        } else {
          this.navRight.style.paddingTop = "0px";
          this.navRight.style.transform = "translateY(-100px)";
          this.navRight.style.opacity = "0";
          this.showBar = true;
        }
        this.navRight.style.display = "flex";
      } else {
        this.showBar = false;
        this.navRight.style.transform = "translateY(0px)";
        this.navRight.style.opacity = "1.0";
        this.navRight.style.display = "block";
        this.navRight.style.paddingTop = "0px";
      }
    },
    positionedLangMenu() {
      const langBtn = this.navRight.querySelector(".language");
      const rect = langBtn.getBoundingClientRect();
      if (window.innerWidth < 800) {
        this.languageMenu.style.top = "5.5vh";
        this.languageMenu.style.left =
          this.navRight.getBoundingClientRect().left -
          this.languageMenu.getBoundingClientRect().width +
          1 +
          "px";
        this.languageMenu.style.width = "fit-content";
      } else {
        this.languageMenu.style.top = rect.bottom + "px";
        this.languageMenu.style.width = rect.width;
        if (window.innerWidth < 950) {
          if (this.$i18n.locale === "ru" || this.$i18n.locale === "uk") {
            const newCoords =
              (this.languageMenu.getBoundingClientRect().width - rect.width) /
              2;
            this.languageMenu.style.left = rect.left - newCoords + "px";
          } else {
            this.languageMenu.style.left = rect.left - 10 + "px";
          }
        } else {
          if (this.$i18n.locale === "ru" || this.$i18n.locale === "uk") {
            const newCoords =
              (this.languageMenu.getBoundingClientRect().width - rect.width) /
              2;
            this.languageMenu.style.left = rect.left - newCoords + "px";
          } else {
            this.languageMenu.style.left = rect.left - 15 - 8 + "px";
          }
        }
      }
    },
    openLangMenu() {
      this.positionedLangMenu();
      if (this.showLang) {
        this.languageMenu.style.transform = "translateY(0px)";
        this.languageMenu.style.opacity = "1.0";
        this.showLang = false;
      } else {
        this.languageMenu.style.transform = "translateY(-300px)";
        this.languageMenu.style.opacity = "0";
        this.showLang = true;
      }
    },
    openCommandsMenu() {
      if (this.showCommands) {
        this.commandsList.style.transform = "translateX(0)";
        this.commandsList.style.opacity = "1.0";
      } else {
        this.commandsList.style.transform = "translateX(-300px)";
        this.commandsList.style.opacity = "0";
      }
    },
    toggleCommands() {
      this.showCommands = !this.showCommands;
    },
    reload(event) {
      const btn = event.target;
      btn.classList.contains('commands') ? this.showCommands = true : this.showCommands = false
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 5.5vh;
  max-height: 5.5vh;
  position: fixed;
  top: 0;
  padding: 8px 0px 8px 0px;
  width: 100%;
  left: 0;
  z-index: 3;
  background-color: rgb(36, 36, 36);
  opacity: 0.85;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  div.left > my-button,
  div.right > my-button {
    z-index: 3;
  }
  .menu-btn-container {
    z-index: 1;
    cursor: pointer;
    padding: 9px;
    display: none;
    &:hover {
      .menu-btn {
        background-color: #45c9c4;
        &::before,
        &::after {
          background-color: #45c9c4;
        }
      }
    }
    .menu-btn {
      transition: 0.3s;
      background-color: rgb(255, 255, 255);
      height: 3px;
      width: 25px;
      position: relative;
      &::before,
      &::after {
        transition: 0.3s;
        content: "";
        display: block;
        position: absolute;
        background-color: rgb(255, 255, 255);
        height: 3px;
        width: 25px;
      }
      &::before {
        top: -7px;
      }
      &::after {
        top: 7px;
      }
    }
  }
  .commandList {
    left: 0;
    top: 7.5vh;
    transform: translateX(-300px);
    opacity: 0;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 90vh;
    padding: 2vh 2vh 6vh 2vh;
    z-index: 0;
    overflow-y: scroll;
    transition: 0.6s;
    position: absolute;
    background-color: rgb(36, 36, 36);
  }

  .language-menu {
    z-index: 1;
    transition: 0.6s;
    height: auto;
    display: flex;
    position: absolute;
    flex-direction: column;
    background-color: rgb(36, 36, 36);
  }
  .language-menu {
    top: 5.5vh;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 8px;
  }
  .commandList.show-commands {
    transform: translateX(0);
    opacity: 1;
  }
  .commandList div {
    .mainBtn {
      padding: 10px;
      margin: 0;
    }
    span {
      display: block;
      color: #3c8888;
      font-size: 16px;
      width: fit-content;
    }
  }
  @media (min-width: 800px) {
    .right {
      display: block;
    }
    .menu-btn-container {
      display: none;
      cursor: pointer;
    }
  }
  @media (max-width: 800px) {
    .right {
      transition: 0.5s;
      background-color: rgb(36, 36, 36);
      flex-direction: column;
      position: absolute;
      top: 0;
      right: 0;
      border-bottom-left-radius: 5px;
      border-bottom: 3.5px solid #3c8888;
      padding: 6px;
      button {
        padding: 8px;
      }
    }
    .menu-btn-container {
      display: block;
      cursor: pointer;
    }
  }
}
</style>
