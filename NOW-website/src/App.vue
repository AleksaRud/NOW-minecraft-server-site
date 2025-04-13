<script setup lang="ts">
import {theme, theme_mobile} from './theme'
import Preloader from './components/Preloader.vue';
import { ref, onMounted } from 'vue';
import { discord_link, goToLink, tg_link } from './components/links';
const show = ref<boolean>(true);

const showToggle = (): void => {
  setTimeout(() => {
    show.value = false;
  }, 4000);
};

onMounted(() => {
  showToggle();
});

const pageWidth = document.documentElement.scrollWidth;
function showMenu(){
  if(pageWidth <= 424){
    const burger = document.getElementById('burger_btn');
    burger!.style.display = 'none';
    const menu = document.getElementById('menu');
    menu!.style.display = 'flex';
    const close_btn = document.getElementById('close_btn');
    close_btn!.style.display = 'block';
    const logo = document.getElementById('logo');
    logo!.style.display = 'none';
  }
  
}

function closeMenu(){
  if(pageWidth <= 424){
    const burger = document.getElementById('burger_btn');
    burger!.style.display = 'block';
    const menu = document.getElementById('menu');
    menu!.style.display = 'none';
    const close_btn = document.getElementById('close_btn');
    close_btn!.style.display = 'none';
    const logo = document.getElementById('logo');
    logo!.style.display = 'block';
  }
}
</script>

<template>
  <Preloader />
  <a-config-provider v-if="!show" :theme = "(pageWidth > 425) ? theme : theme_mobile">
    <div class="app">
      <div class="header">
        <div class="logo" id="logo"></div>        
        <div class="menu" id="menu">
          <div class="close" id="close_btn" @click="closeMenu()"></div>
          <div class="group">
            <RouterLink to="/" @click="closeMenu()">
              <div class="tasks-icon"></div>
              Главная
            </RouterLink>
            <RouterLink to="/aboutserver" @click="closeMenu()">
              <div class="users-icon"></div>
              О сервере
            </RouterLink>
            <RouterLink to="/players" @click="closeMenu()">
              <div class="users-icon"></div>
              Игроки
            </RouterLink>
            <RouterLink to="/projects" @click="closeMenu()">
              <div class="users-icon"></div>
              Проекты
            </RouterLink>
            <RouterLink to="/shop" @click="closeMenu()">
              <div class="users-icon"></div>
              Магазин
            </RouterLink>
          </div>
          <RouterLink to="/account" id="account" class="account" @click="closeMenu()">
            <div class="users-icon"></div>
            Личный кабинет
          </RouterLink>
        </div>
        <div class="burger" id="burger_btn" @click="showMenu()"></div>
      </div>
      <RouterView style="margin-top: 80px; z-index: 0;"/>
      
      <div class="footer">
        <div class="footer-links">
          <div class="links">
            <RouterLink to="/aboutserver">
              <a-button type="link" class="link">
                О сервере
              </a-button>
            </RouterLink>
            <RouterLink to="/projects">
              <a-button type="link" class="link">
                Проекты
              </a-button>
            </RouterLink>
            <RouterLink to="/players">
              <a-button type="link" class="link">
                Участники
              </a-button>
            </RouterLink>
            <RouterLink to="/shop">
              <a-button type="link" class="link">
                Магазин
              </a-button>
            </RouterLink>
          </div>
          <div class="links">
            <a-button type="link" class="link">Пользовательское соглашение</a-button>
            <a-button type="link" class="link" @click="goToLink(discord_link)">Discord</a-button>
            <a-button type="link" class="link" @click="goToLink(tg_link)">Telegram</a-button>
            <a-button type="link" class="link" @click="goToLink(discord_link)">Поддержка</a-button>
          </div>
        </div>
        <div>Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.</div>
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped>
  .app{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-between;
  }
  .router-link-active{
    box-sizing: border-box;
    /*background-color: #87BBA2;*/
    color: #FFFFFF;
    border-bottom: #a3d9e0 4px solid;
  }
  .router-link-active[id='account']{
    border: 0;
  }
  a{
    height: 80px;
    box-sizing: border-box;
    text-decoration: none;
    color:#a3d9e0;
    font-size: 16px;
    font-weight: 600;
    padding: 28px 28px;
    transition: all 0.3s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  a:active{
    box-sizing: border-box;
    text-decoration: none;
    color: #FFFFFF;
    border-bottom: #a3d9e0 4px solid;
  }
  a:hover, a:focus{
    box-sizing: border-box;
    text-decoration: none;
    color: #FFFFFF;
    /*background-color: #87BBA2;*/
    border-bottom: #a3d9e0 4px solid;
  }
  .account:hover, .account:focus{
    border: 0;
  }
  
  .burger{
    display: none;
  }
  
  .header{
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    /*background-color: #5D737E;*/
    height: fit-content;
    position: fixed;
    backdrop-filter: blur(10px);
    background-color: #121619c6;
  }
  .group{
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: fit-content;
    
  }
  .logo{
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-image: url('./assets/logo2.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .menu{
    display: flex;
    flex-direction: row;
    width: 85%;
    justify-content: space-between;
  }
  /*
  .tasks-icon{
    width: 28px;
    height: 28px;
    background-image: url('./assets/task.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .users-icon{
    width: 28px;
    height: 28px;
    background-image: url('./assets/users.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }*/

  .footer{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 64px;
    padding: 72px 64px;
    border-top: #1f3c5b 1px solid;
    box-shadow: 0px 0px 4px #1f3c5b;
    z-index: 2;
  }
  .footer-links{
    display: flex;
    flex-direction: column;
    gap: 32px;
    z-index: -1;
  }
  .links{
    display: flex;
    flex-direction: row;
    gap: 64px;
  }
  .links a{
    color: #FFFFFF;
    border-bottom: none;
    font-size: 16px;
    font-weight: 300;
    padding: 0;
    height: fit-content;
    width: auto;
  }
  .links a:hover, .links a:active, .links a:focus{
    border: none;
  }
  .link{
    color:#FFFFFF;
    padding: 0;
    font-size: 16px;
  }
  @media(max-width:425px){
    .header{
      width: 100%;
      flex-direction: row;
      box-sizing: border-box;
      padding: 8px 16px;
      position: fixed;
    }
    .header .group{
      display: flex;
      flex-direction: column;
      
    }
    .burger{ 
      display: block;
      background-image: url('./assets/burger-menu.svg');
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .close{
      display: none;
      background-image: url('./assets/close.svg');
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: contain;
      padding-bottom: 20px;
    }
    .menu{
      width: 100%;
      display: none;
      padding-top: 12px;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      transition: all 0.4s ease;
    }
    .menu a{
      font-size: 18px;
      margin-right: 40px;
      text-align: right;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    a{
      font-size: 12px;
      padding: 16px;
      height: fit-content;
    }
    .footer{
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 20px;
      padding: 24px 20px;
      font-size: 12px;
    }
    .footer-links{
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
    .links{
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 45%;
      text-wrap: wrap;
    }
    .link{
      font-size: 12px;
    }
  }
</style>

