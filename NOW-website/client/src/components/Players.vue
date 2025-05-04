<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchPlayers, players } from './players';
import { fetchSeasons, seasons } from './seasons';
onMounted(() => {
    fetchSeasons();
    fetchPlayers()
});
const activeKey = ref(0);
const pageWidth = document.documentElement.scrollWidth;
</script>

<template>
    <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane v-for="(season, id) in seasons" :key="id" :tab="(players.length >= 2) ? season.name : ''" class="tab">
                <div v-for="player in players.filter(player => player.season_id.includes(season.season_id))">
                    <RouterLink :to="{
                        name: 'Player',
                        params: {
                            player_id: player.player_id
                        }
                    }" class="player">
                        <div class="card" v-bind:style="{ background: 'url(' + player.card + '), #1f3c5b', backgroundPosition: pageWidth>425 ? 'center' : 'top', backgroundSize: 'cover' }"></div>
                        <div class="nickname">{{ player.nickname }}</div>
                    </RouterLink>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<style scoped>
    .tabs{
        padding: 40px 0 60px 0;
        width: 75%;
    }
    .tab{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 40px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .player{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        filter: grayscale(100%);
        transition: all 0.2s ease-in;
    }
    .player:hover, .player:focus{
        filter: grayscale(0%);
        transform:translateY(-20px);
    }
    .card{
        min-width: 192px;
        min-height: 270px;
        border-radius: 18px;
    }
    .nickname{
        font-size: 24px;
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
            gap: 8px;
            filter: grayscale(0%);
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
        }
        .btn{
            box-sizing: border-box;
            height: 36px;
            width: 100%;
        }
    }
</style>
