<script setup lang="ts">
import { news_cards, Card } from './news';
import { goToLink } from './links';

import { ref } from 'vue';
const open = ref<boolean>(false);

const selectedCard = ref<Card | null>(null);

const showModal = (card: Card) => {
  selectedCard.value = card;
  open.value = true;
};

const handleOk = () => {
  open.value = false;
  selectedCard.value = null;
};
</script>

<template>
    <div class="all-news">
        <a-breadcrumb>
            <a-breadcrumb-item><RouterLink to="/">Главная</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>Новости</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="news-block">
            <div class="news">
                
                <div v-for="card in news_cards" class="news-card" v-bind:style="{ background: 'linear-gradient(#3f3d3d00 18%,#070707ce 90%), url(' + card.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover' }">
                    <div class="title-date">
                        <div class="news-title">{{ card.title }}</div>
                        <div class="date">{{ card.date.format('DD.MM.YYYY') }}</div>
                    </div>
                    <div class="description">{{ card.discription }}</div>
                    <a-button type="link" @click="showModal(card)" class="link-btn">Подробнее</a-button>
                    <a-modal class="modal" style="top: 20px" v-model:open="open" :title="selectedCard?.title" width="800px" @ok="handleOk" :closable="true">
                        <div class="pic" v-bind:style="{ background: 'url(' + selectedCard?.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover' }"></div>
                        <div class="title-date">
                            <div class="news-title-modal">{{ selectedCard?.title }}</div>
                            <div class="date">{{ selectedCard?.date.format("DD.MM.YYYY") }}</div>
                        </div>
                        <div class="description">{{ selectedCard?.discription }}</div>
                        <a-button class="link-btn" type="link" v-if="selectedCard" @click = goToLink(selectedCard.btn_link)>{{ selectedCard.btn_tytle }}</a-button>
                    </a-modal>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.all-news{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px 100px 100px 100px;
}
.news-block{
    
    width: 100%; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .news{   
        
        width: 95%;     
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 80px;
        flex-wrap: wrap;
    }
    
    .news-card{
        width: 280px;
        height: 420px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 32px;
        gap: 16px;
        font-size: 16px;
        border-radius: 16px;
    }
    .title-date{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .news-title{
        font-size: 26px;
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        -webkit-line-clamp: 2;
        line-height: 1em;
        height: 2em;
    }
    .date{
        opacity: 0.8;
    }
    .news-card .description{
        width: 100%;
        opacity: 0.6;
        font-size: 18px;
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        -webkit-line-clamp: 2;
        line-height: 1.1em;
        height: 2.2em;
    }
    .link-btn{
        padding: 0;
    }
    .modal{
        width: 800px;
        display: flex;
        flex-direction: column;
        height: fit-content;
    }
    .modal .pic{
        width: 100%;
        height: 360px;
        border-radius: 4px;
    }
    .news-title-modal{
        font-size: 26px;
        overflow: hidden; 
        text-overflow:unset;
    }

</style>