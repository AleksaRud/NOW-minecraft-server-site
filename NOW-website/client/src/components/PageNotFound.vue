<script lang="ts" setup>
import { goToLink, discord_link } from './links';



</script>

<template>
    <div class="page-not-found">
        <div class="text">
            <div class="title">Упс, кажется страницу украли, или её не существовало :(</div>
            <div class="hint">Вернитесь на главную или напишите в поддержу</div>
        </div>
        <div class="buttons">
            <RouterLink to="/">
                <a-button class="btn">Главная</a-button>
            </RouterLink>
            <a-button class="btn" @click = goToLink(discord_link)>Поддержка</a-button>
        </div>
    </div>
    
</template>

<style scoped>
    .page-not-found{
        /*top: -80px;*/
        box-sizing: border-box;
        /*position: absolute;*/
        width: 100%;
        height: 100%;
        background-color: #121619;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 80px;
        height: 90vh;
    }
    .text{
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
    }
    .title{
        font-size: 48px;
        text-align: center;
    }
    .hint{
        font-size: 24px;
        color: rgba(240, 248, 255, 0.652);
    }
    .buttons{
        display: flex;
        flex-direction: row;
        width: 30%;
        justify-content: space-between;
    }
    .btn{
        width: 160px;
        height: 60px;
    }
    @media(max-width: 425px) {
        .page-not-found{
            gap: 64px;
        }
        .text{
            gap: 16px;
        }
        .title{
            font-size: 32px;
        }
        .hint{
            font-size: 18px;
            text-align: center;
        }
        .buttons{
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
        }
        .btn{
            height: 48px;
            text-align: center;
        }
    }
</style>
