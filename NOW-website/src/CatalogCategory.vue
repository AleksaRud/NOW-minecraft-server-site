<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { products } from './components/products';
    import { ref } from 'vue';
    let route = useRoute();
    const category_catalog = ref(products.value.filter((item) => item.category_id == route.params.category));
    let product_status = [...new Set(category_catalog.value.map((item) => item.status))];
    const filter_status = ref(product_status.map((status, is_checked) => {return {status: status, is_checked: true}}));
    const filtered_catalog = ref(category_catalog.value);

    function UpdateCatalog(e:Event){
        filtered_catalog.value = category_catalog.value.filter((item) => filter_status.value.some(status_obj =>
            status_obj.status === item.status && status_obj.is_checked === true
        ));
    }

    const formatter = (value: number) => {
        return `${value} BYN`;
    };
    const price = ref<[number, number]>([0, 100]);

    const onChange = (value: number) => {

    };

    const onAfterChange = (value: number) => {
        filtered_catalog.value = category_catalog.value.filter((item) => item.price <= price.value[1] && item.price >= price.value[0]);
    };
</script>
<template>
        <div class="category-catalog">
            {{ $route.params.category }}
            <div class="filters">
                <div class="checkboxes">
                    <a-checkbox v-model:checked="status.is_checked" v-for="status in filter_status" @change = "UpdateCatalog">
                        {{ status.status }}
                    </a-checkbox>
                </div>
                <a-slider v-model:value="price" range :step="1" :tip-formatter="formatter" @change="onChange" @afterChange="onAfterChange" />
                <a-input-number :formatter="formatter" v-model:value="price[0]" :min="50" :max="100"/>
                <a-input-number :formatter="formatter" v-model:value="price[1]" :min="0" :max="50"/>

            </div>
            <div class="catalog">
                <div v-for="product in filtered_catalog" class="product-card">

                    <div class="pic" v-bind:style="{ background: 'url(' + product.pic + '), #D5EAFFDE', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }"></div>
                    <div class="name">{{ product.name }}</div>
                    <div class="status"> {{ product.status }}</div>
                    <div class="price"> {{ product.price }}</div> 

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
    .category-catalog{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 100px 0;
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