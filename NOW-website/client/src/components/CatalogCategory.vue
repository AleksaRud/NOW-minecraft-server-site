<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { products, sortProducts, updateProductRates, fetchProducts, fetchProductsByCategory } from './products';
    import { onMounted, ref, watch, computed } from 'vue';
    import { reviews, fetchReviews } from './review';
    import { categories, fetchCategories } from './categories';

    /*onMounted(() => {
        fetchCategories();
        fetchProducts();
        fetchReviews();
    });*/
    let route = useRoute();
    const currentCategoryId = route.params.category_id as string;


    onMounted(async () => {
        await fetchCategories();
        await fetchProductsByCategory(currentCategoryId);
    });

    const currentCategory = computed(() =>
        categories.value.find((cat) => cat.category_id === currentCategoryId)
    );

    const productsByCategory = computed(() =>
        products.value.filter((prod) => prod.category_id === currentCategoryId)
    );
    /*
    const selected_category = ref(categories.value.find((item) => item.category_id == route.params.category_id));
    
    const category_catalog = ref(products.value.filter((item) => item.category_id == route.params.category_id));
    sortProducts(category_catalog.value)*/
    let product_status = [...new Set(productsByCategory.value.map((item) => item.status))];
    const filter_status = computed(() => product_status.map((status, is_checked) => {return {status: status, is_checked: false}}));
    const filtered_catalog = computed(() => productsByCategory.value);

    function UpdateCatalog(e:Event){
        if(filter_status.value.every((item) => item.is_checked == false)){
            filtered_catalog.value = productsByCategory.value.filter((item) => item.price <= price.value[1] && item.price >= price.value[0]);
        }else{
            filtered_catalog.value = productsByCategory.value.filter((item) => filter_status.value.some(status_obj =>
                status_obj.status === item.status && status_obj.is_checked === true
            ) && item.price <= price.value[1] && item.price >= price.value[0]);
        }
    }

    const formatter = (value: number) => {
        return `${value} BYN`;
    };
    const price = ref<[number, number]>([0, 100]);

    const onChange = (value: number) => {

    };

    const onAfterChange = (value: number) => {
        //filtered_catalog.value = category_catalog.value.filter((item) => item.price <= price.value[1] && item.price >= price.value[0]);
        if(filter_status.value.every((item) => item.is_checked == false)){
            filtered_catalog.value = productsByCategory.value.filter((item) => item.price <= price.value[1] && item.price >= price.value[0]);
        }else{
            filtered_catalog.value = productsByCategory.value.filter((item) => filter_status.value.some(status_obj =>
                status_obj.status === item.status && status_obj.is_checked === true
            ) && item.price <= price.value[1] && item.price >= price.value[0]);
        }
    };
    onMounted(() => {
        updateProductRates();
    });

    // Если список отзывов меняется динамически, можно следить за изменениями
    watch(
        () => reviews.value,
        () => {
            updateProductRates();
        },
        { deep: true }
    );
</script>
<template>
    <div class="catalog-page">
        <a-breadcrumb>
            <a-breadcrumb-item><RouterLink to="/catalog">Каталог</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>{{ currentCategory?.name }}</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="category-name">
            {{ currentCategory?.name }}
        </div>
        <div class="category-catalog">
            <div class="filters">
                <div class="hint">Статус</div>
                <div class="checkboxes">
                    <a-checkbox v-model:checked="status.is_checked" v-for="status in filter_status" @change = "UpdateCatalog">
                        {{ status.status }}
                    </a-checkbox>
                </div>
                <div class="hint">Цена</div>
                <a-slider v-model:value="price" range :step="1" :tip-formatter="formatter" @change="onChange" @afterChange="onAfterChange" class="price-slider"/>
                <div class="price-inputs">
                    <a-input-number :controls="false" :formatter="formatter" v-model:value="price[0]" :min="50" :max="100" class="price-input"/>
                    <a-input-number :controls="false" :formatter="formatter" v-model:value="price[1]" :min="0" :max="50" class="price-input"/>
                </div>

            </div>
            <div class="catalog">    
                <div v-for="product in filtered_catalog">
                    <RouterLink :to="{
                        name: 'Product',
                        params: {
                            category_id: product.category_id,
                            product_id: product.product_id
                        }
                    }" class="product-card" >
                        <div class="pic" v-bind:style="{ background: 'url(' + product.pic + '), #D5EAFFDE', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }"></div>
                        <div class="group">
                            <div class="name">
                                {{ product.name }}
                            </div>

                            <div class="rate">
                                <div>{{ product.rate }}</div>
                                <div class="star"></div>
                            </div>
                        </div>
                        <div class="status"> {{ product.status }}</div>
                        <div class="price"> {{ product.price }}</div> 
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
 .category-catalog a{
    box-sizing: border-box;
    text-decoration: none;
    color: #FFFFFF;
  }
  .category-catalog a:active, .category-catalog a:hover, .category-catalog a:focus{
    text-decoration: none;
    color: #FFFFFF;
  }
  .catalog-page{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px 100px 100px 100px;
  }
  .category-name{
    font-size: 1.8em;
    font-weight: 600;
  }
    .category-catalog{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
        box-sizing: border-box;
    }
    .filters{
        width: 220px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 20px;
        padding: 32px 36px;
        border: #1f3c5b solid 2px;
        border-radius: 12px;
    }
    .filters .hint{
        font-size: 1.4em;
        font-weight: 600;
    }
    .filters .price-slider{
        width: 95%;
    }
    .filters .price-inputs{
        display: flex;
        flex-direction: row;
        gap: 8px;
    }
    .filters .price-inputs .price-input{
        width: 100px;
    }
    .catalog{
        width: 70%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 40px;
        /*padding: 0px 40px;*/
    }
    .product-card{

        padding: 16px;
        display: flex;
        flex-direction: column;
        background-color: #1f3c5b;
        border-radius: 12px;
        gap: 20px;
        transition: all 0.3s;
    }
    .product-card:hover{
        transform: scale(1.05);
    }
    .pic{   
        width: 260px;
        height: 260px;
        border-radius: 4px;
    }
    .product-card .group, .price, .status{
        font-size: 20px;
        width: 260px;
    }
    .product-card .group{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
    }
    .name{
        width: 240px;
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        -webkit-line-clamp: 2;
        line-height: 1.3em;
        height: 2.6em;
    }
    .product-card .group .rate{
        display: flex;
        flex-direction: row;
        align-items:flex-end;
    }
    .star{
        width: 24px;
        height: 24px;
        background-image: url('../assets/star.svg');
        background-size: contain;
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