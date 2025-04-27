<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { products, getStatusColor } from './products';
    
    import { categories } from './categories';
    import { ref, onMounted, onBeforeUnmount } from 'vue';
import { review } from './review';
    let route = useRoute();
    const product = ref(products.value.find((item) => item.product_id == route.params.product_id && item.category_id == route.params.category_id))
    
    const selected_category = ref(categories.value.find((item) => item.category_id == route.params.category_id));

    const value = ref<number>(0);
    function updateQuantity(flag: string){
        switch(true){
            case flag == 'incr':
                if(value.value < 10){
                    value.value++;
                }
                break;
            case flag == 'decr':
                if(value.value >=1){
                    value.value--;
                }
                break;
            }
    }
    const product_reviews = ref(review.value.filter((item) => item.product_id == route.params.product_id));



const picStyle = ref({
  background: product.value ? `url(${product.value.pic}) #a5b8e3` : '',
  backgroundPosition: 'calc(50% + 0px) calc(50% + 0px)',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat'
});

const picElement = ref<HTMLElement | null>(null);

const mouseenterHandler = (event: Event) => {
  picStyle.value.backgroundSize = '150%';
};

const mousemoveHandler = (event: Event) => {
  const mouseEvent = event as MouseEvent;
  if (!picElement.value) return;
  
  const rect = picElement.value.getBoundingClientRect();
  const mouseX = mouseEvent.clientX - rect.left;
  const mouseY = mouseEvent.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const diffX = mouseX - centerX;
  const diffY = mouseY - centerY;
  
  const factor = 1;
  let offsetX = -diffX * factor;
  let offsetY = -diffY * factor;
  
  const maxOffsetX = rect.width * 0.25;
  const maxOffsetY = rect.height * 0.25;
  offsetX = Math.min(Math.max(offsetX, -maxOffsetX), maxOffsetX);
  offsetY = Math.min(Math.max(offsetY, -maxOffsetY), maxOffsetY);
  
  picStyle.value.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
};

const mouseleaveHandler = (event: Event) => {
  picStyle.value.backgroundSize = '100%';
  picStyle.value.backgroundPosition = 'calc(50% + 0px) calc(50% + 0px)';
};

onMounted(() => {
  if (!picElement.value) {
    return;
  }
  
  picElement.value.addEventListener('mouseenter', mouseenterHandler);
  picElement.value.addEventListener('mousemove', mousemoveHandler);
  picElement.value.addEventListener('mouseleave', mouseleaveHandler);
});

onBeforeUnmount(() => {
  if (!picElement.value) return;
  picElement.value.removeEventListener('mouseenter', mouseenterHandler);
  picElement.value.removeEventListener('mousemove', mousemoveHandler);
  picElement.value.removeEventListener('mouseleave', mouseleaveHandler);
});

</script>
<template>
    <div class="product-page">
        <a-breadcrumb>
            <a-breadcrumb-item><RouterLink to="/catalog">Каталог</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item><RouterLink :to="`/catalog/${selected_category?.category_id}`">{{ selected_category?.name }}</RouterLink></a-breadcrumb-item>
            <a-breadcrumb-item>{{ product?.name }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div v-if="product" class="product">
            <div class="pic" id="pic" ref="picElement" :style="picStyle" ></div>
            <div class="product-info">
                <div class="name">{{ product.name }}</div>
                <div v-html="product.description" class="text"></div>
                <div class="characteristics">{{ product.characteristics }}</div>
                <div class="price-block">
                    <div class="price"> {{ product.price }} BYN</div> 
                    <div class="status" v-bind:style="{ color: getStatusColor(product.status).color, backgroundColor: getStatusColor(product.status).background_color}"> {{ product.status }}</div>
                </div>
                <div class="add-to-cart">
                    <div class="input-quantity">
                        <a-button class="btn" @click="updateQuantity('decr')">-</a-button>
                        <a-input class="input" :controls="false" v-model:value="value" disabled/>
                        <a-button class="btn" @click="updateQuantity('incr')">+</a-button>
                    </div>
                    <a-button type="primary" class="add-btn">Добавить в корзину</a-button>
                </div>
            </div>

        </div>
        <div v-else>
            <p>Товар не найден.</p>
        </div>
        <div class="reviews">
            <div class="review" v-for="review in product_reviews">
                <a-rate :value="review.rate" disabled allow-half/>
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
        padding: 20px 100px 100px 100px;
    }
    .product-page .product{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
    }
    .product .pic{   
        width: 640px;
        height: 640px;
        border-radius: 4px;
        transition: background-size 0.3s, background-position 0.3s;
        overflow: hidden;
    }
    .product-info{
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 48px;
    }
    .name{
        font-size: 1.9em;
        font-weight: 600;
    } 

    .product-info .text, .product-info .characteristics{
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-size: 18px;
        opacity: 0.8;
    }
    .price-block{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .price-block .price{
        font-size: 2.4em;
        font-weight: 600;
        color: #a3d9e0;
    }
    .price-block .status{
        font-size: 1.5em;
        font-weight: 100;
        padding: 8px 12px;
        border-radius: 8px;
    }
    .input-quantity{
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .input-quantity .input{
        width: 48px;
        height: 100%;
        text-align: center;
    }
    .input-quantity .btn{
        height: 100%;
        width: 36px;
        box-sizing: border-box;
        text-align: center;
        padding: 0;
    }
    .add-to-cart{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 48px;
        gap: 40px;
    }
    .add-to-cart .add-btn{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        padding: 0;
    }
    @media(max-width: 425px) {

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