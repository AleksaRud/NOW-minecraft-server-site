<script lang="ts" setup>
import { ref } from 'vue';
import { goToLink, getSource } from './links';
import { players } from './players';

const activeKey = ref(0);
</script>

<template>
    <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane v-for="(season_group, id) in players" :key="id" :tab="(players.length >= 2) ? season_group.season : ''" class="tab">
                <div v-for="(player, ind) in season_group.players_list" class="player" v-bind:style="(ind % 2) ? {flexDirection:'row-reverse'} : {flexDirection:'row'}">
                    <div class="card" v-bind:style="{ background: 'url(' + player.card + '), #5a8fba', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>
                    <div class="about">
                        <div class="nickname">{{ player.nickname }}</div>
                        <div class="info" v-html="player.info"></div>
                        <div v-if="player.links" class="links">
                            <a-button v-for="link in player.links" class="btn" @click = goToLink(link)>{{ getSource(link) }}</a-button>
                        </div>
                    </div>
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
        flex-direction: column;
        gap: 100px;
        align-items: flex-start;
        font-size: 18px;
    }
    .player{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .card{
        min-width: 384px;
        min-height: 540px;
    }
    .about{
        width: 55%;
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
</style>
