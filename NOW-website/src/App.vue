<script setup lang="ts">

</script>

<template>
  
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
    <RouterView/>
  
</template>

<style scoped>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    /*background-color: #5D737E;*/
    height: fit-content;
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
</style>

