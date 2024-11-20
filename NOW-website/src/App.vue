<script setup lang="ts">
import {theme} from './theme'
</script>

<template>
  <a-config-provider :theme = "theme">
    <div class="app">
      <div class="header">
        <div class="logo"></div>
        <div class="group">
          <RouterLink to="/">
            <div class="tasks-icon"></div>
            Главная
          </RouterLink>
          <RouterLink to="/aboutserver">
            <div class="users-icon"></div>
            О сервере
          </RouterLink>
          <RouterLink to="/players">
            <div class="users-icon"></div>
            Игроки
          </RouterLink>
          <RouterLink to="/projects">
            <div class="users-icon"></div>
            Проекты
          </RouterLink>
          <RouterLink to="/shop">
            <div class="users-icon"></div>
            Магазин
          </RouterLink>
        </div>
        <RouterLink to="/account" id="account" class="account">
          <div class="users-icon"></div>
          Личный кабинет
        </RouterLink>
      </div>
      <RouterView style="margin-top: 80px;"/>
      
      <div class="footer">
        <div class="footer-links">
          <div class="links">
            <div>О сервере</div>
            <div>Проекты</div>
            <div>Участники</div>
            <div>Магазин</div>
          </div>
          <div class="links">
            <div>Пользовательское соглашение</div>
            <div>Discord</div>
            <div>Telegram</div>
            <div>Поддержка</div>
          </div>
        </div>
        <div>Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.</div>
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped>
  .app{
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
  
  .header{
    box-sizing: border-box;
    width: 100%;
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
  }/*
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
  }
  .footer-links{
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .links{
    display: flex;
    flex-direction: row;
    gap: 64px;
  }
</style>

