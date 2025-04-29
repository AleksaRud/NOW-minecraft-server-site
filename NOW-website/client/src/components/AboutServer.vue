<script lang="ts" setup>
import { ref } from 'vue';
import { goToLink } from './links';
import { seasons } from './seasons';

const activeKey = ref(0);
const pageWidth = document.documentElement.scrollWidth;
const position  = (pageWidth >= 425) ? 'center' : '60%';
</script>

<template>
    <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" centered class="a-tabs">
            <a-tab-pane v-for="(season, id) in seasons" :key="id" :tab="season.name" class="tab">
                <div class="pic" v-bind:style="{ background: 'url(' + season.pic + ')', backgroundPosition: position, backgroundSize: 'cover' }"></div>
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

    @media(max-width: 425px) {
        .tabs{
            padding: 20px 0 40px 0;
        }
        .tab{
            font-size: 16px;
            gap: 32px;
        }
        .info{
            gap: 20px;
        }
        .group{
            font-size: 20px;
            gap: 0;
            justify-content: space-between;
        }
        .hint{
            font-size: 14px;
        }
        .info .text{
            gap: 12px;
        }
    }
</style>
