<script lang="ts" setup>
import { news_cards } from './news';
import { goToLink, tg_link, discord_link } from './links';



</script>

<template>
    <div class="landing-page">
        <div class="welcome">
            <div class="title">Non-Ordinary World</div>
            <div class="sub-title">Твои возможности ограничиваются только твоим воображением</div>
        </div>
        <div class="about-server">
            Добро пожаловать в Non-ordinary World, приватный сервер Minecraft, где каждый игрок может найти что-то для себя. Здесь вас ждут захватывающие приключения, креативные постройки и дружелюбное сообщество. Исследуйте мир, полный тайн и загадок, стройте невероятные сооружения и участвуйте в увлекательных событиях!
        </div>
        <div class="offers">
            <div class="offer1">
                <div class="pic1"></div>
                <div class="text">Присоединяйтесь к активному и дружелюбному сообществу игроков</div>
            </div>
            <div class="offer2">
                <div class="pic2"></div>
                <div class="text">Участвуйте в регулярных ивентах и конкурсах с призами</div>
            </div>
            <div class="offer3">
                <div class="pic3"></div>
                <div class="text">Создавайте шедевры без ограничений!</div>
            </div>
        </div>
        <div class="offer-join1">
            <div class="group">
                <div class="title">Присоединяйся к растущему сообществу по серверу!</div>
                <div class="buttons">
                    
                    <a-button class="btn" @click = goToLink(discord_link)>Discord</a-button>
                    <a-button class="btn" @click = goToLink(tg_link)>Telegram</a-button>
                    <a-button class="btn" >Межсезонье</a-button>    
                    
                </div>
            </div>
            <div class="pic"></div>
        </div>
        <div class="news-block">
            <div class="title">Последние новости</div>
            <div class="news">
                
                <div v-for="card in news_cards" class="news-card" v-bind:style="{ background: 'linear-gradient(#3f3d3d00 18%,#070707ce 90%), url(' + card.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover' }">
                    <div>
                        <div class="date">{{ card.date }}</div>
                        <div class="news-title">{{ card.title }}</div>
                    </div>
                    <div>
                        <div>{{ card.discription }}</div>
                        <a-button type="link" v-if="card.btn_link" @click = goToLink(card.btn_link)>{{ card.btn_tytle }}</a-button>
                    </div>  
                </div>

            </div>
        </div>
        <div class="players-projects">
            <div class="title">Постройки наший игроков</div>
            <div class="buildings">
                <div class="building1"></div>
                <div class="group">
                    <div class="building2"></div>
                    <RouterLink to="/projects">
                        <a-button type="text" class="btn">
                            <div>Посмотреть все</div>
                            <div class="icon"></div>
                        </a-button>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="comments">
            <div class="comment1">
                <div class="block">
                    <div class="nickname">Bylka</div>
                    <div>Какой кирпич, это МРАМОР ИТАЛЬЯНСКИЙ!</div>
                </div>
            </div>
            <div class="comment2">
                <div class="block">
                    <div class="nickname">Обамка</div>
                    <div>Саша- у меня всё под контролем. коля- ай ай (RIP)</div>
                </div>
            </div>
            <div class="comment3">
                <div class="block">
                    <div class="nickname">MrShaurma</div>
                    <div>Ну я делал прилесным дамам комплименты потом ходил туда сюда за энергосами потом я общался с Ксюшей пока Александра настраивала скины а в конце Александра сделала аконтовку дома и офнула стрим</div>
                </div>
            </div>
            
            <div class="comment4">
                <div class="block">
                    <div class="nickname">ExE_GS</div>
                    <div>ЪЮЪ</div>
                </div>
            </div>
            <div class="comment5">
                <div class="block">
                    <div class="nickname">boy with the tie</div>
                    <div>ehh.. хочу поиграть с вами. Ну ладно! тегните как будете набирать людей</div>
                </div>
            </div>
        </div>
        <div class="offer-join2">
            <div class="group">
                <div class="title">Стань участником растущего майнкрафт сервера!</div>
                <div class="sub-title"> Следующий набор скоро</div>
            </div>
            <div class="buttons">
                <a-button class="btn" @click = goToLink(discord_link)>Discord</a-button>
                <a-button class="btn" @click = goToLink(tg_link)>Telegram</a-button>
                <a-button class="btn">Межсезонье</a-button>      
            </div>
        </div>
    </div>
</template>

<style scoped>
    a{
        text-decoration: none;
        
    }
    .landing-page{
        max-width: 1440px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 296px;
        padding: 200px 72px 0px 72px;
    }
    .welcome{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 32px;
        
    }
    .title{
        font-size: 88px;
    }
    .sub-title{
        font-size: 32px;
    }
    
    .about-server{
        width: 80%;
        font-size: 32px;
    }
    .offers{
        max-width: 80%;
        display: flex;
        flex-direction: column;
        gap: 88px;
    }
    .offer1, .offer2, .offer3{
        display: flex;
        flex-direction: row;
        gap: 88px;
        font-size: 32px;
        width: 100%;
        align-items: center;
    }
    .offer1{
        justify-content: flex-start;
    }
    .offer2{
        justify-content: flex-end;
        
    }
    .offer3{
        justify-content: center;
    }
    .offer2 .text{
        width: 45%;
    }
    .text{
        max-width: 60%;
    }
    .pic1, .pic2, .pic3{
        width: 164px;
        height: 164px;
        background-color: #5a8fba;
    }
    .offer-join1{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 32px;
    }
    .offer-join1 .group{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .offer-join1 .title{
        font-size: 40px;
    }
    .offer-join1 .buttons{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .btn{
        box-sizing: border-box;
        height: 64px;
        text-align: left;
    }
    .offer-join1 .pic{
        width: 75%;
        background-color: #5a8fba;
        background-image: url('../assets/chill.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: right;
    }
    .news-block{
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 16px;
    }
    .news-block .title{
        font-size: 40px;
    }
    .news{
        width: 1340px;        
        display: flex;
        flex-direction: row;
        gap: 64px;
        
        flex-wrap: nowrap;
        overflow-x: auto;
        
    }
    
    .news-card{
        min-width: 320px;
        width: 320px;
        height: 540px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 32px;
        gap: 16px;
        font-size: 16px;
        border-radius: 16px;
    }
    .date, .news-title{
        font-size: 28px;
    }
    .players-projects{
        display: flex;
        flex-direction: column;
        gap: 64px;
    }
    .players-projects .title{
        font-size: 40px;
    }
    .buildings{
        display: flex;
        flex-direction: row;
        gap: 24px;
    }
    .building1{
        width: 800px;
        height: 620px;
        background-color: #1f3c5b;
        background-image: url('../assets/projects/Mystery_Shack.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .buildings .group{
        display: flex;
        flex-direction: column;
        gap: 96px;
        align-items: center;
    }
    .building2{
        width: 480px;
        height: 320px;
        background-color: #1f3c5b;
        background-image: url('../assets/projects/Mystery_Shack.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .buildings .btn{
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        width: 240px;
        font-size: 28px;
        height: 116px;
        padding-top: 20px;
    }
    .icon{
        width: 160px;
        height: 160px;
        background-image: url('../assets/arrow_rigth.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .comments{
        
        width: 100%;
        display: flex;
        flex-direction: column;
        
    }
    .comment1{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .comment1 .block{
        width: 300px;
    }
    .block{
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 36px;
        border-radius: 32px;
        background-color: #1f3c5b;
        font-size: 20px;
        align-items: center;
        text-align: center;
        transition: all 0.6s;
    }
    
    .block:hover{
        box-shadow: 0px 0px 8px 4px #3b5b8c;
        transform: scale(1.05);
    }
    .nickname{
        font-size: 32px;
    }
    .comment2{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: -40px;
    }
    .comment2 .block{
        width: 320px;
    }
    .comment3{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 40px;
        margin-top: -20px;
    }
    .comment3 .block{
        width: 380px;
        
    }
    .comment4{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 80px;
        margin-top: 40px;
    }
    .comment4 .block{
        width: 180px;
    }
    .comment5{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 40px;
        margin-top: -40px;
        
    }
    .comment5 .block{
        width: 280px;
    }
    .offer-join2{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 80px;
        padding: 140px 160px;
        box-sizing: border-box;
        background: rgb(31,60,91);
        background: radial-gradient(circle, rgba(31,60,91,1) 8%, rgba(18,22,25,1) 40%);
    }
    .offer-join2 .title{
        font-size: 48px;
    }
    .offer-join2 .sub-title{
        font-size: 32px;
    }
    .offer-join2 .group{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 32px;
    }
    .offer-join2 .buttons{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .offer-join2 .btn{
        width: 280px;
        text-align: center;
    }


    @media(max-width:425px){
        .landing-page{
            width: 100%;
            gap: 120px;
            padding: 80px 20px 0px 20px;
            box-sizing: border-box;
            align-items: center;
        }
        .welcome{
            gap: 16px;
        }
        .title{
            font-size: 44px;
            text-align: center;
        }
        .sub-title{
            width: 80%;
            font-size: 18px;
        }
        .about-server{
            width: 90%;
            font-size: 16px;
        }
        .offers{
            max-width: 80%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .offer1, .offer2, .offer3{
            display: flex;
            flex-direction: row;
            gap: 20px;
            font-size: 16px;
            width: 100%;
            align-items: center;
            justify-content: flex-start;
        }
        
        .pic1, .pic2, .pic3{
            width: 40px;
            height: 40px;
        }

        .offer-join1{
            width: 90%;
            display: flex;
            flex-direction: column-reverse;
            gap: 12px;
            /*background-color: #5a8fba;*/
        }
        .offer-join1 .group{
            display: flex;
            flex-direction: column;
            gap: 8px;
            /*backdrop-filter: brightness(50%);*/
        }
        .offer-join1 .title{
            font-size: 24px;
        }
        .offer-join1 .buttons{
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .btn{
            box-sizing: border-box;
            height: 36px;
            text-align: left;
            font-size: 16px;
        }
        .offer-join1 .pic{
            display: none;
        }

        .news-block{
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .news-block .title{
            font-size: 24px;
        }
        .news{
            width: 360px;        
            display: flex;
            flex-direction: row;
            gap: 16px;
            
            flex-wrap: nowrap;
            overflow-x: auto;
            
        }
        
        .news-card{
            min-width: 300px;
            width: 300px;
            height: 420px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            padding: 16px;
            gap: 8px;
            font-size: 12px;
            border-radius: 8px;
        }
        .date, .news-title{
            font-size: 20px;
        }
        .players-projects{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .players-projects .title{
            font-size: 24px;
        }
        .buildings{
            display: flex;
            width: 400px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 0px;
            padding: 0;
            margin: 0;
        }
        .building2{
            width: 360px;
        }
        .building1{
            display: none;
        }
        .buildings .group{
            gap: 12px;
        }
        .buildings .btn{
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            width: 240px;
            font-size: 20px;
            height: 116px;
            padding-top: 20px;
        }
        .icon{
            width: 40px;
            height: 40px;
            background-image: url('../assets/arrow_rigth.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        .comments{
            width: 370px;
            height: 210px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: scroll;
            gap: 8px;
        }
        .comment1, .comment2, .comment3, .comment4, .comment5{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            width: 180px;
            height: 100%;
            display: block;
        }
        .block{
            margin: 0;
            box-sizing: border-box;
            max-width: 180px;
            width: 180px;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 20px;
            border-radius: 12px;
            background-color: #1f3c5b;
            font-size: 12px;
            align-items: center;
            text-align: left;
            text-wrap: wrap;
        }
        .block:hover{
            box-shadow: none;
            transform:none;
        }
        .nickname{
            font-size: 18px;
        }
        .offer-join2{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 80px 60px;
            box-sizing: border-box;
            background: rgb(31,60,91);
            background: radial-gradient(circle, rgba(31,60,91,1) 8%, rgba(18,22,25,1) 40%);
        }
        .offer-join2 .title{
            font-size: 28px;
        }
        .offer-join2 .sub-title{
            font-size: 16px;
        }
        .offer-join2 .group{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
        }
        .offer-join2 .buttons{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
        }
        .offer-join2 .btn{
            text-align: center;
            font-size: 16px;
        }
    }
</style>
