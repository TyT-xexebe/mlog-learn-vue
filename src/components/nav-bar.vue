<template>
  <div class="nav-bar" ref="nav">
    <div class="left">
      <my-button @click="$router.push('/about')" :class="{ active: $route.path === '/about' }">About</my-button>
      <my-button @click="$router.push('/basic')" :class="{ active: $route.path === '/basic' }">Basic</my-button>
    </div>

    
      <div class="right" ref="navRight">
        <my-button @click="$router.push('/commands')" :class="{ active: $route.path === '/commands' }">Commands</my-button>
        <my-button @click="$router.push('/examples')" :class="{ active: $route.path === '/examples' }">Code Examples</my-button>
        <my-button @click="$router.push('/debugger')" :class="{ active: $route.path === '/debugger' }">Debugger</my-button>
        <my-button @click="$router.push('/login')" :class="{ active: $route.path === '/login' }">Log In</my-button>
      </div>
    
    <div class="menu-btn-container" @click="openFullNav">
      <div class="menu-btn"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-bar',

  created() {
    window.addEventListener("resize", this.openFullNav);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.openFullNav);
  },

  data() {
    return {
      showBar: true
    };
  },

  methods: {
    openFullNav() {
      const navRight = this.$refs.navRight;
      const nav = this.$refs.nav;
      
      if (!navRight && !nav) return
      if (window.innerWidth <= 500){
          if (this.showBar) {
            navRight.style.paddingTop = `${nav.getBoundingClientRect().height}px`;
            navRight.style.transform = 'translateY(0px)';
            navRight.style.opacity = '1.0';
            this.showBar = false;
          }else{
            navRight.style.transform = 'translateY(-100px)';
            navRight.style.opacity = '0';
            this.showBar = true;
          }
          navRight.style.display = 'flex';
      }else{
        navRight.style.display = 'block';
        navRight.style.paddingTop = '0px';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar {
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
        .menu-btn{
          background-color: #45c9c4;
          &::before,
          &::after {
            background-color: #45c9c4;
          }}
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
    @media (min-width: 500px){
      .right {
        display: block;
        padding: 0px;
      }
      .menu-btn-container {
        display: none;
        cursor: pointer;
      }
    }
    @media (max-width: 500px){
      .right {
        transition: 0.5s;
        background-color: rgb(36, 36, 36);
        display: none;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        padding: 6px;
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