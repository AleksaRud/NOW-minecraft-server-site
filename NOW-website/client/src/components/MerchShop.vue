<script lang="ts" setup>
import { onMounted } from 'vue';
import { categories, fetchCategories } from './categories'; // убедитесь, что путь указан правильно

onMounted(() => {
    fetchCategories();
});
</script>

<template>

    <div class="shop">

        <div class="categories">
            
                <div v-for="category in categories">
                    <RouterLink :to="`/catalog/${category.category_id}`" class="category" >
                        <div class="pic" v-bind:style="{ background: 'url(' + category.pic + '), #a5b8e388', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }"></div>
                        <div class="name">{{ category.name }}</div>
                    </RouterLink>
                </div>
            
        </div>
    </div>

</template>

<style scoped>
  a{
    box-sizing: border-box;
    text-decoration: none;
    color: #FFFFFF;
  }
  a:active, a:hover, a:focus{
    text-decoration: none;
    color: #FFFFFF;
  }
    .shop{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 80px 0;
    }
    .categories{
        width: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 100px 0;
    }
    .category{

        padding: 16px;
        display: flex;
        flex-direction: column;
        background-color: #1f3c5b;
        border-radius: 12px;
        gap: 28px;
        transition: all 0.3s;
    }
    .category:hover{
        transform: scale(1.05);
    }

    .pic{   
        width: 240px;
        height: 240px;
        border-radius: 4px;
    }
    .name{
        font-size: 20px;
        width: 240px;
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        -webkit-line-clamp: 1;
        line-height: 1.3em;
        height: 1.8em;
        text-align: center;
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
