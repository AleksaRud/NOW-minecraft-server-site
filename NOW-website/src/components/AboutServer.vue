<script lang="ts" setup>
import { ref } from 'vue';
import { goToLink } from './links';
const activeKey = ref(0);
const seasons = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024",
        minecraft_version: "1.21",
        name: "Сезон ",
        description: "Сервер стартовал в 2024 году. <br/>Он не планировался быть публичным — мы с друзьями решили поиграть вместе и поснимать видео по нему. На старте нас было всего 8 человека. <br/>Но после того, как зрители стримов хотели попасть на сервер, мы решили устроить набор новичков на сервер. После подведения итогов набора к нам присоединилось ещё 4 человека. К сожалению, из-за нарушений правил сервера, один новичок был забанен. <br/>На данный момент в основной состав 1 сезона входит 11 игроков. <br/>Сервер потихоньку развивается. Спавн растёт, на нём появляются новые постройки, к разным праздникам спавн преображается. Например, в связи с Хеллоуином мы украсили спавн и добавили кучу жутких звуков.",
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



</script>

<template>
   <a-tabs v-model:activeKey="activeKey" centered class="tabs">
    <a-tab-pane v-for="(season, id) in seasons" :key="id" :tab="season.name" class="tab">
        <div class="pic" v-bind:style="{ background: 'url(' + season.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>
        <div class="info">
            <div class="group">
                <div>{{ season.period }}</div>
                <div>{{ season.minecraft_version }}</div>
            </div>
            <div v-html="season.description"></div>
            <div v-if="season.hint">{{ season.hint }}</div>
            <a-button v-if="season.world_save" class="btn" @click = goToLink(season.world_save)>Карта сезона</a-button>
        </div>
        
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
    .tabs{
        max-width: 75%;
    }
    .pic{
        width: 200px;
        height: 200px;
    }
</style>
