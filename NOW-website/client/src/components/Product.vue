<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getStatusColor, product, fetchProductById } from './products';
import { categories, fetchCategories } from './categories';
import { ref, onMounted, computed, watch } from 'vue';
import { reviews, fetchReviews } from './review';
import { users } from './users';

const route = useRoute();

async function loadProduct() {
  const id = route.params.product_id as string;
  await fetchProductById(id);
}
onMounted(loadProduct);
watch(() => route.params.id, loadProduct);

const currentCategoryId = ref(route.params.category_id as string);
onMounted(async () => {
  await fetchCategories();
});
const selected_category = computed(() => 
  categories.value.find(item => item.category_id === currentCategoryId.value)
);

onMounted(async () => {
  await fetchReviews();
});

const product_reviews = computed(() => {
  return [...reviews.value.filter((rev) => rev.product_id === route.params.product_id)]
         .sort((a, b) => b.date.diff(a.date));
});

const value = ref<number>(0);
function updateQuantity(flag: string) {
  switch (true) {
    case flag === 'incr':
      if (value.value < 10) {
        value.value++;
      }
      break;
    case flag === 'decr':
      if (value.value >= 1) {
        value.value--;
      }
      break;
  }
}

const picStyle = ref({
  background: product.value ? `url(${product.value.pic}) #a5b8e3` : '',
  backgroundPosition: 'calc(50% + 0px) calc(50% + 0px)',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat'
});
watch(product, (newProduct) => {
  if (newProduct) {
    picStyle.value.background = `url(${newProduct.pic}) #a5b8e3`;
  }
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

const stars = [5, 4, 3, 2, 1];
const distribution = computed<Record<number, number>>(() => {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  product_reviews.value.forEach((review) => {
    const star = Math.round(review.rate);
    if (star >= 1 && star <= 5) {
      counts[star] += 1;
    }
  });
  return counts;
});
const totalReviews = computed(() => product_reviews.value.length);
function percentFor(star: number): number {
  if (totalReviews.value === 0) return 0;
  return Math.round((100 * (distribution.value[star] || 0)) / totalReviews.value);
}

const sendEmail = async () => {
  const emailPayload = {
    from: 'fake@nonexistent.com',
    to: 'test.email@nonexistent.com',
    subject: 'Тестовое уведомление',
    text: 'Спасибо. Мы уведомим вас, когда товар поступит в продажу'
  };

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке письма');
    }
    const data = await response.json();
    console.log('Письмо отправлено успешно', data);
    if (data.previewUrl) {
      console.log('Preview URL:', data.previewUrl);
      window.open(data.previewUrl, '_blank');
    }
  } catch (error) {
    console.error('Ошибка при отправке письма: ', error);
  }
};
async function addToCart() {
  if (!product.value) return;
  // Собираем данные о товаре и выбранном количестве
  const payload = {
    product_id: product.value.product_id,
    name: product.value.name,
    pic: product.value.pic,
    price: product.value.price,
    quantity: value.value
  };

  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('Обновленная корзина на сервере:', data.cart);
  } catch (error) {
    console.error('Ошибка при добавлении товара в корзину:', error);
  }
}
</script>

<template>
  <div class="product-page">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <RouterLink to="/catalog">Каталог</RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink :to="`/catalog/${selected_category?.category_id}`">
          {{ selected_category?.name }}
        </RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ product?.name }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div v-if="product" class="product">
      <div class="pic" id="pic" ref="picElement" :style="picStyle"
           @mouseenter="mouseenterHandler"
           @mousemove="mousemoveHandler"
           @mouseleave="mouseleaveHandler">
      </div>
      <div class="product-info">
        <div>
          <div class="name">{{ product.name }}</div>
          <a-rate :value="product.avgRating" disabled allow-half class="rate"/>
        </div>
        <div v-html="product.description" class="text"></div>
        <div class="characteristics">{{ product.characteristics }}</div>
        <div class="price-block">
          <div class="price">{{ product.price }} BYN</div>
          <div class="status" :style="{ color: getStatusColor(product.status).color, backgroundColor: getStatusColor(product.status).background_color }">
            {{ product.status }}
          </div>
        </div>
        <div class="add-to-cart">
          <div class="input-quantity">
            <a-button class="btn" @click="updateQuantity('decr')">-</a-button>
            <a-input class="input" :controls="false" v-model:value="value" disabled/>
            <a-button class="btn" @click="updateQuantity('incr')">+</a-button>
          </div>
          <a-button class="add-btn" v-if="product.status === 'В наличии'" @click="addToCart">
            Добавить в корзину
          </a-button>
          <a-button class="add-btn" v-else @click="sendEmail">
            Узнать о поступлении
          </a-button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Товар не найден.</p>
    </div>
    <div class="reviews-block">
      <div class="title">Отзывы покупателей</div>
      <div class="review-statistics">
        <div v-for="star in stars" :key="star" class="stat-row">
          <a-rate :value="star" disabled allow-half class="rate"/>
          <a-progress
            :percent="percentFor(star)"
            class="progress-bar"
            status="active"
            :show-info="false"
            trailColor="#1f3c5b6e"
          />
          <div class="count-label">{{ distribution[star] }}</div>
        </div>
      </div>
      <div class="reviews">
        <div class="review" v-for="review in product_reviews" :key="review.review_id">
          <div class="row-group">
            <div class="user-info">
              <div class="avatar" :style="{ 
                  background: 'url(' + users.find(user => user.user_id == review.user_id)?.avatar + '), #D5EAFFDE',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }">
              </div>
              <div class="nickname">
                {{ users.find(user => user.user_id == review.user_id)?.nickname }}
              </div>
            </div>
            <div class="date-rate">
              <div class="date">{{ review.date.format('DD.MM.YYYY') }}</div>
              <a-rate :value="review.rate" disabled allow-half class="rate"/>
            </div>
          </div>
          <div class="review-text">{{ review.text }}</div>
          <div class="review-text">
            <b>Плюсы: </b>{{ review.advantages }}
          </div>
          <div class="review-text">
            <b>Минусы: </b>{{ review.disadvantages }}
          </div>
        </div>
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
        transition: background-size 0.3s ease-out, background-position 0.5s ease-out;
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
    .reviews-block{
        display: flex;
        flex-direction: column;
        gap: 40px;
        background-color: #1f3c5b62;
        border-radius: 20px;
        padding: 36px 40px;
    }
    .reviews-block .title{
        font-size: 1.6em;
        font-weight: 600;
    }
    .review-statistics{
        box-sizing: border-box;
        width: 48%;
    }
    .progress-bar{
        width: 60%;
    }
    .stat-row{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .reviews{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 40px;
    }
    .review{
        box-sizing: border-box;
        background-color: #1f3c5b;
        padding: 28px;
        border-radius: 16px;
        width: 48%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .review .row-group{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 48px;
    }
    .user-info, .date-rate{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
        height: 100%;
    }
    .date-rate .rate{
        height: 40px;
    }
    .date-rate .date{
        opacity: 0.8;
    }
    .avatar{
        width: 48px;
        height: 48px;
        border-radius: 24px;
    }
    .user-info .nickname{
        font-size: 1.2em;
    }
    .review-text{
        font-size: 1.1em;
        font-weight: 100;
        color: #ffffffd8;
    }
    .review-text b{
        color: #FFFFFF;
    }
    @media(max-width: 425px) {
        .product-page{
            padding: 40px 20px 40px 20px;
            margin: 0;
			gap: 36px;
        }
        .product-page .product{
            flex-direction: column;
        }
        .product .pic{
            width: 372px;
            height: 372px;
        }
        .product-info{
            width: 372px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }
        .name{
            font-size: 20px;
        }
        .reviews-block{
            padding: 16px 20px;
        }
        .rate{
            font-size: 16px;
        }
        .review-statistics{
            width: 100%;
        }
        .review-statistics .rate{
            width: 120px;
        }
        .progress-bar{
            width: 50%;
        }
        .review{
            width: 100%;
            padding: 12px;
        }
        .review .row-group{
            height: fit-content;
        }
        .date-rate{
            flex-direction: column;
            align-items: flex-end;
            gap: 0;
        }
    }

</style>