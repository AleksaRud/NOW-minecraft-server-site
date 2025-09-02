<script lang="ts" setup>
import LoginForm from './LoginForm.vue';



</script>

<template>
    
    <div class="account">
        <div class="account-info">
            <div class="photo">
                <div class="pic"></div>
                <a-button class="btn">Сменить фото</a-button>
            </div>
            <div class="info">
                <div class="group1">
                    <div class="info-group">
                        <div class="hint">Ник</div>
                        <div>AlexaVain</div>
                    </div>
                    <div class="info-group">
                        <div class="hint">Роль</div>
                        <div>Игрок</div>
                    </div>
                </div>
                <div class="info-group">
                    <div class="hint">Аккаунт в дискорде</div>
                    <div>@alexavain</div>
                </div>
                
            </div>
            <a-button>Редактировать</a-button>
        </div>
        <div class="statistics" >
            <div class="title">Статистика</div>
            <div class="stat-data">
                <div class="group">
                    <div class="cathegory">
                        <div class="cathegory-name">Количество построек за сезон</div>
                        <div>7</div>
                    </div>
                    <div class="cathegory">
                        <div class="cathegory-name">Игровое время</div>
                        <div>200 часов, 57 минут</div>
                    </div>
                    <div class="cathegory">
                        <div class="cathegory-name">Смерти</div>
                        <div>37</div>
                    </div>
                </div>
                <div class="cathegory">
                    <div class="cathegory-name">Пройденное расстояние (в блоках)</div>
                    <div class="distance-info">
                        <div class="total">
                            <div>Всего</div>
                            <div>1,147,939</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено бегом</div>
                            <div>434,651</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено на лодке</div>
                            <div>309,105</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено пешком</div>
                            <div>253,642</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено вплавь</div>
                            <div>38,506</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено в падении</div>
                            <div>28,100</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено крадучись</div>
                            <div>23,709</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено верхом на лошади</div>
                            <div>23,420</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено пешком под водой</div>
                            <div>12,129</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено пешком по воде</div>
                            <div>11,094</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено взбираясь</div>
                            <div>8,917</div>
                        </div>
                        <div class="distance-type">
                            <div>Преодолено в вагонетке</div>
                            <div>4,666</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-button class="btn">Выйти из аккаунта</a-button>
    </div>
</template>

<style scoped>
    .account{
        width: 70%;
        padding: 100px 0;
        display: flex;
        flex-direction: column;
        gap: 80px;
    }
    
    .account-info{
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 160px;
    }
    .photo{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .pic{
        width: 200px;
        height: 200px;
        background: url('../assets/players_cards/season1/AlexaVain.png'), #5a8fba;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 40px;
    }
    .info{
        display: flex;
        flex-direction: column;
        gap: 48px;
        width: 75%;
    }
    .info-group{
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 24px;
    }
    .info-group .hint{
        font-size: 16px;
    }
    .info .group1{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .statistics{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .statistics .title{
        font-size: 28px;
    }
    .stat-data{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .stat-data .group{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 48%;
    }
    .cathegory{
        width: 45%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-weight: 300;
        font-size: 16px;
        color: rgba(240, 248, 255, 0.856);
    }
    .stat-data .group .cathegory{
        gap: 4px;
        width: 100%;
    }
    .cathegory-name{
        font-weight: 700;
        font-size: 18px;
        color: aliceblue;
    }
    .distance-info{
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }
    .total, .distance-type{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .total{
        border-bottom:  rgba(240, 248, 255, 0.856) 1px solid;
    }
    .btn{
        height: 40px;
    }

    @media (max-width: 425px) {
        .account{
            width: 80%;
            padding: 40px 0;
            
            gap: 40px;
        }
        .account-info{
            flex-direction: column;
            gap: 24px;
        }
        .photo{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }
        .pic{
            width: 100px;
            height: 100px;
           
            border-radius: 30px;
        }
        .info{
            gap: 20px;
        }
        .info-group{
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 20px;
        }
        .info-group .hint{
            font-size: 14px;
        }
        .statistics{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .statistics .title{
            font-size: 24px;
        }
        .stat-data{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .stat-data .group{
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
        }
        .cathegory{
            width: 100%;
            
            gap: 16px;
            font-weight: 300;
            font-size: 14px;
            
        }
        .cathegory-name{
            font-size: 16px;
        }
        
        
    }
</style>
