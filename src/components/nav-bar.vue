<template>
  <div class="nav-bar" ref="nav">
    <div class="left">
      <my-button
        @click="$router.push('/about')"
        :class="{ active: $route.path === '/about' }"
        >{{ $t("navbar.about") }}</my-button
      >
      <my-button
        @click="$router.push('/basic')"
        :class="{ active: $route.path === '/basic' }"
        >{{ $t("navbar.basic") }}</my-button
      >
    </div>

    <div class="right" ref="navRight">
      <my-button
        @click="$router.push('/commands')"
        :class="{ active: $route.path === '/commands' }"
        >{{ $t("navbar.commands") }}</my-button
      >
      <my-button
        @click="$router.push('/examples')"
        :class="{ active: $route.path === '/examples' }"
        >{{ $t("navbar.codeExamples") }}</my-button
      >
      <my-button
        @click="$router.push('/debugger')"
        :class="{ active: $route.path === '/debugger' }"
        >{{ $t("navbar.debugger") }}</my-button
      >
      <my-button @click="openLangMenu" class="language">{{
        $t("navbar.language")
      }}</my-button>
      <my-button
        @click="$router.push('/login')"
        :class="{ active: $route.path === '/login' }"
        >{{ $t("navbar.logIn") }}</my-button
      >
    </div>
    <div class="language-menu" ref="languageMenu">
      <my-button
        @click="changeLanguage('en'), openLangMenu()"
        :class="{ active: $i18n.locale === 'en' }"
        >{{ $t("navbar.languages.english") }}</my-button
      >
      <my-button
        @click="changeLanguage('ru'), openLangMenu()"
        :class="{ active: $i18n.locale === 'ru' }"
        >{{ $t("navbar.languages.russian") }}</my-button
      >
      <my-button
        @click="changeLanguage('uk'), openLangMenu()"
        :class="{ active: $i18n.locale === 'uk' }"
        >{{ $t("navbar.languages.ukrainian") }}</my-button
      >
    </div>
    <div class="menu-btn-container" @click="openFullNav">
      <div class="menu-btn"></div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "nav-bar",

  mounted() {
    this.openFullNav();
    this.positionedLangMenu();
    this.openLangMenu();
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
  },

  setup() {
    const showBar = ref(false);
    const showLang = ref(false);
    const nav = ref(null);
    const navRight = ref(null);
    const languageMenu = ref(null);
    return {
      showBar,
      showLang,
      nav,
      navRight,
      languageMenu,
    };
  },

  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
    openFullNav() {
      if (window.innerWidth <= 800) {
        if (this.showBar) {
          this.navRight.style.paddingTop = `${
            this.nav.getBoundingClientRect().height
          }px`;
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
        this.languageMenu.style.left = this.navRight.getBoundingClientRect().left - this.languageMenu.getBoundingClientRect().width + 1 + 'px';
        this.languageMenu.style.width = "fit-content";
      } else {
        this.languageMenu.style.top = rect.bottom + "px";
        this.languageMenu.style.width = rect.width;
        if (window.innerWidth < 950) {
          if(this.$i18n.locale === 'ru' || this.$i18n.locale === 'uk'){
            const newCoords = (this.languageMenu.getBoundingClientRect().width - rect.width) / 2
            this.languageMenu.style.left = rect.left - newCoords + "px";
          }else{
            this.languageMenu.style.left = rect.left - 10 + "px";
          }
        } else {
          if(this.$i18n.locale === 'ru' || this.$i18n.locale === 'uk'){
            const newCoords = (this.languageMenu.getBoundingClientRect().width - rect.width) / 2
            this.languageMenu.style.left = rect.left - newCoords + "px";
          }else{
            this.languageMenu.style.left = rect.left - 15 - 8 + "px";
          }
        }
      }
    },
    openLangMenu() {
      this.positionedLangMenu()
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
  z-index: 2;
  border-bottom: 3.5px solid #3c8888;
  background-color: rgb(36, 36, 36);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  .language-menu {
    transition: 0.6s;
    height: auto;
    padding: 8px;
    display: flex;
    position: absolute;
    top: 5.5vh;
    flex-direction: column;
    background-color: rgb(36, 36, 36);
    border-bottom: 3.5px solid #3c8888;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    justify-content: center;
    align-items: center;
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
    }
    .menu-btn-container {
      display: block;
      cursor: pointer;
    }
  }
}
</style>
