<script lang="ts" setup>
import { products } from './products';

</script>

<template>
    <div class="catalog">
        <div class="product-card" v-for="product in products">
            <div class="pic" v-bind:style="{ background: 'url(' + product.pic + '), #D5EAFFDE', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }"></div>
            <div class="name">{{ product.name }}</div>
            <div class="price"> {{ product.price }}</div> 
        </div>
    </div>
</template>

<style scoped>
    .catalog{
        width: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 100px 0;
    }
    .product-card{

        padding: 16px;
        display: flex;
        flex-direction: column;
        background-color: #1f3c5b;
        border-radius: 12px;
        gap: 28px;
        transition: all 0.3s;
    }
    .product-card:hover{
        transform: scale(1.05);
    }
    .pic{   
        width: 240px;
        height: 240px;
        border-radius: 4px;
    }
    .name, .price{
        font-size: 20px;
        width: 240px;
    }
    .name{
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        -webkit-line-clamp: 2;
        line-height: 1.3em;
        height: 2.6em;
    }
    @media(max-width: 425px) {
        .catalog{
            width: 90%;
            padding: 40px 0;
            gap: 16px;
        }
        .product-card{
            padding: 16px;
            gap: 16px;
            border-radius: 8px;
        }
        .pic{
            width: 140px;
            height: 140px;
        }
        .name, .price{
            font-size: 14px;
            width: 140px;
        }
    }
</style>
