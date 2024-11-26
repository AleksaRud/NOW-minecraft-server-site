<script lang="ts" setup>
import { ref } from 'vue';
import { goToLink } from './links';
import { seasons } from './seasons';

const activeKey = ref(0);

</script>

<template>
    <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane v-for="(season, id) in seasons" :key="id" :tab="season.name" class="tab">
                <div class="pic" v-bind:style="{ background: 'url(' + season.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>
                <div class="info">
                    <div class="group">
                        <div>{{ season.period }}</div>
                        <div>{{ season.minecraft_version }}</div>
                    </div>
                    <div v-html="season.description" class="text"></div>
                    <div v-if="season.hint" class="hint">{{ season.hint }}</div>
                    <a-button v-if="season.world_save" class="btn" @click = goToLink(season.world_save)>Карта сезона</a-button>
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
    .pic{
        width: 100%;
        min-height: 400px;
    }
    .tab{
        display: flex;
        flex-direction: column;
        gap: 64px;
        align-items: flex-start;
        font-size: 18px;
    }
    .info{
        display: flex;
        flex-direction: column;
        gap: 36px;
    }
    .group{
        font-size: 24px;
        display: flex;
        flex-direction: row;
        gap: 160px
    }
    .info .text{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .hint{
        font-size: 16px;
        color: #999999;
    }
</style>
