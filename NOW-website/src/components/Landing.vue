<script lang="ts" setup>


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
            <div class="offer">
                <div class="pic1"></div>
                <div class="text">Присоединяйтесь к активному и дружелюбному сообществу игроков</div>
            </div>
            <div class="offer">
                <div class="pic2"></div>
                <div class="text">Участвуйте в регулярных ивентах и конкурсах с призами</div>
            </div>
            <div class="offer">
                <div class="pic3"></div>
                <div class="text">Создавайте шедевры без ограничений!</div>
            </div>
        </div>
        <div class="offer-join1">
            <div>
                <div class="title">Присоединяйся к растущему сообществу по серверу!</div>
                <div class="buttons">
                    <button>Discord</button>
                    <button>Telegram</button>
                    <button>Межсезонье</button>    
                </div>
            </div>
            <div class="pic"></div>
        </div>
        <div class="news-block">
            <div class="title">Последние новости</div>
            <div class="news">
                <div class="news-card">
                    <div class="date">16.08.2024</div>
                    <div class="news-title">Завершение первого набора новичков!</div>
                    <div>Набор новичков на сервер завершён! Теперь к нам присоедились 2 человека. Если у вас не получилось пройти, не расстраивайтесь, в будущем будем проводить ещё наборы</div>
                </div>
                <div class="news-card">
                    <div class="date">14.08.2024</div>
                    <div class="news-title">Набираем новых участников на сервер!</div>
                    <div>Поздравляю всех с началом первого набора новичков на наш сервер! Время проведения набора до 00:00 по МСК 16 августа. Итоги будут подведены на стриме 16 августа</div>
                    <div>Подробнее о наборе</div>
                </div>
                <div class="news-card">
                    <div class="date">20.07.2024</div>
                    <div class="news-title">Старт 1 сезона!</div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="players-projects">
            <div class="title">Постройки наший игроков</div>
            <div class="buildings">
                <div class="building1"></div>
                <div>
                    <div class="building2"></div>
                    <button>
                        <div>Посмотреть все</div>
                        <div class="icon"></div>
                    </button>
                </div>
            </div>
        </div>
        <div class="comments">
            <div class="comment1">
                <div class="nickname">Обамка</div>
                <div>Саша- у меня всё под контролем. коля- ай ай (RIP)</div>
            </div>
            <div class="comment2">
                <div class="nickname">MrShaurma</div>
                <div>Ну я делал прилесным дамам комплименты потом ходил туда сюда за энергосами потом я общался с Ксюшей пока Александра настраивала скины а в конце Александра сделала аконтовку дома и офнула стрим</div>
            </div>
            <div class="comment3">
                <div class="nickname">Bylka</div>
                <div>Какой кирпич, это МРАМОР ИТАЛЬЯНСКИЙ!</div>
            </div>
            <div class="comment4">
                <div class="nickname">ExE_GS</div>
                <div>ЪЮЪ</div>
            </div>
            <div class="comment5">
                <div class="nickname">boy with the tie</div>
                <div>ehh.. хочу поиграть с вами. Ну ладно! тегните как будете набирать людей</div>
            </div>
        </div>
        <div class="offer-join2">
            <div>
                <div class="title">Стань участником растущего майнкрафт сервера!</div>
                <div class="sub-title"> Следующий набор скоро</div>
            </div>
            <div class="buttons">
                <button>Discord</button>
                <button>Telegram</button>
                <button>Межсезонье</button>    
            </div>
        </div>
    </div>
</template>

<style scoped>
    .landing-page{
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
    .offer{
        
        display: flex;
        flex-direction: row;
        gap: 88px;
        font-size: 32px;
    }
    .pic1, .pic2, .pic3{
        width: 164px;
        height: 164px;
        background-color: #5a8fba;
    }
    
</style>
