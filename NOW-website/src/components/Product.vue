<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { products } from './products';
    
    import { categories } from './categories';
    import { ref } from 'vue';
    let route = useRoute();
    const product = ref(products.value.find((item) => item.product_id == route.params.product_id && item.category_id == route.params.category_id))
    
    const selected_category = ref(categories.value.find((item) => item.category_id == route.params.category_id));
</script>
<template>
    <div class="product-page">
        <a-breadcrumb>
            <a-breadcrumb-item><RouterLink to="/catalog">Каталог</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item><RouterLink :to="`/catalog/${selected_category?.category_id}`">{{ selected_category?.name }}</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>{{ product?.name }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="category-catalog">
            <div v-if="product">
                <div class="pic" v-bind:style="{ background: 'url(' + product.pic + '), #D5EAFFDE', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }"></div>
                <div class="name">{{ product.name }}</div>
                <div class="status"> {{ product.status }}</div>
                <div class="price"> {{ product.price }}</div> 
            </div>
            <div v-else>
                <p>Товар не найден.</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
 /*a{
    box-sizing: border-box;
    text-decoration: none;
    color: #FFFFFF;
  }
  a:active, a:hover, a:focus{
    text-decoration: none;
    color: #FFFFFF;
  }*/
  .product-page{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px 60px;
  }
    .category-catalog{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

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
    .name, .price, .status{
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