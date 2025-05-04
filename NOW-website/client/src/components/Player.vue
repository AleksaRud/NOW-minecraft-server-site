<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { goToLink, getSource } from './links';
import { fetchPlayerById, player } from './players';
import { useRoute } from 'vue-router';
onMounted(() => {
    const id = route.params.player_id as string;
    fetchPlayerById(id)
});
let route = useRoute();
const pageWidth = document.documentElement.scrollWidth;
</script>

<template>
    <div class="player-page">
        <a-breadcrumb>
            <a-breadcrumb-item><RouterLink to="/players">Игроки</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>{{ player?.nickname }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="player">
            <div class="card" v-bind:style="{ background: 'url(' + player?.card + '), #1f3c5b', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>
            <div class="about">
                <div class="nickname">{{ player?.nickname }}</div>
                <div class="info" v-html="player?.info"></div>
                <div v-if="player?.links" class="links">
                    <a-button v-for="link in player?.links" class="btn" @click = goToLink(link)>{{ getSource(link) }}</a-button>
                </div>
                
            </div>
            
        </div>
        <div class="nickname">Все карточки</div>
        <div class="pics">
            <div v-for="pic in player?.all_pics" class="pic" v-bind:style="{ background: 'url(' + pic + '), #1f3c5b', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>

        </div>
    </div>
</template>

<style scoped>
    .player-page{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 20px 100px 100px 100px;
    }
    .player{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .card{
        min-width: 352px;
        min-height: 495px;
        border-radius: 16px;
    }
    .about{
        width: 65%;
        display: flex;
        flex-direction: column;
        gap: 36px;
    }
    .nickname{
        font-size: 32px;
    }
    .about .info{
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 16px;
    }
    .links{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .btn{
        box-sizing: border-box;
        height: 48px;
        width: 144px;
    }
    .pics{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 24px;
    }
    .pic{
        min-width: 160px;
        min-height: 225px;
        border-radius: 4px;
    }
    @media(max-width: 425px) {
        .tabs{
            padding: 20px 0 40px 0;
            width: 80%;
        }
        .tab{
            font-size: 16px;
        }
        .player{
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
        }
        .card-and-name{
            display: flex;
            flex-direction: row;
            gap: 48px;
        }
        .card{
            min-width: 120px;
            min-height: 120px;
            height: 120px;
            border-radius: 20px;
        }
        .about{
            width: 100%;
            gap: 16px;
        }
        .nickname{
            font-size: 20px;
            padding-top: 20px;
        }
        .btn{
            box-sizing: border-box;
            height: 36px;
            width: 100%;
        }
    }
</style>
