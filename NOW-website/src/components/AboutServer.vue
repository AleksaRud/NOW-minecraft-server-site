<script lang="ts" setup>
import { ref } from 'vue';
import { goToLink } from './links';
const activeKey = ref(0);
const seasons = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024-",
        minecraft_version: "1.21",
        name: "1 Сезон",
        description: "Сервер стартовал в 2024 году. \n"
                    +"Он не планировался быть публичным — мы с друзьями решили поиграть вместе и поснимать видео по нему. На старте нас было всего 8 человека. \n"
                    +"Но после того, как зрители стримов хотели попасть на сервер, мы решили устроить набор новичков на сервер. После подведения итогов набора к нам присоединилось ещё 4 человека. К сожалению, из-за нарушений правил сервера, один новичок был забанен. \n"
                    +"На данный момент в основной состав 1 сезона входит 11 игроков. \n"
                    +"Сервер потихоньку развивается. Спавн растёт, на нём появляются новые постройки, к разным праздникам спавн преображается. Например, в связи с Хеллоуином мы украсили спавн и добавили кучу жутких звуков.\n",
        hint: "Сезон ещё идёт, поэтому информацию будет обновляться...",
        world_save: "", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024",
        minecraft_version: "1.21",
        name: "Межсезонье",
        description: "Скоро..",
        hint: "Сезон ещё идёт, поэтому информацию будет обновляться...",
        world_save: "", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024",
        minecraft_version: "1.21",
        name: "Сезон 2",
        description: "Скоро",
        hint: "",
        world_save: "", 
    },
])

function makeParagraphs( text: string ){
    let paragraphs = text.split('\n');
    for( let i = 0; i < paragraphs.length; i++){
        paragraphs[i] = '<div>' + paragraphs[i] + '</div>';
    };
    return paragraphs.join('');
}
/*
for(let i=0; i<seasons.value.length; i++){
    seasons.value[i].description = makeParagraphs(seasons.value[i].description);
}*/


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
                    <div v-html="makeParagraphs(season.description)" class="text"></div>
                    <div v-if="season.hint" class="hint">{{ season.hint }}</div>
                    <a-button v-if="season.world_save" class="btn" @click = goToLink(season.world_save)>Карта сезона</a-button>
                </div>
                
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<style scoped>
    .tabs{
        padding: 60px 0;
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
