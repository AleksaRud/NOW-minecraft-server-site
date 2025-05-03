<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { products, fetchProductsByCategory, sortProducts } from './products';
import { categories, fetchCategories } from './categories';

const route = useRoute();

const currentCategoryId = ref(route.params.category_id as string);

onMounted(async () => {
  await fetchCategories();
  await fetchProductsByCategory(currentCategoryId.value);
});

watch(
  () => route.params.category_id,
  async (newId) => {
    if (newId) {
      currentCategoryId.value = newId as string;
      await fetchProductsByCategory(currentCategoryId.value);
    }
  },
  { immediate: true }
);

const selected_category = computed(() =>
  categories.value.find(item => item.category_id === currentCategoryId.value)
);

const category_catalog = computed(() =>
  products.value.filter(item => item.category_id === currentCategoryId.value)
);

watch(category_catalog, (newCatalog) => {
  sortProducts(newCatalog);
}, { immediate: true });

const product_status = computed(() => {
  return [...new Set(category_catalog.value.map(item => item.status))];
});

const filter_status = ref(
  product_status.value.map(status => ({ status, is_checked: false }))
);
watch(product_status, (newStatuses) => {
  filter_status.value = newStatuses.map(status => ({ status, is_checked: false }));
}, { immediate: true });

const filtered_catalog = ref(category_catalog.value);
watch(category_catalog, (newCatalog) => {
  filtered_catalog.value = newCatalog;
}, { immediate: true });

function UpdateCatalog(e: Event) {
  if (filter_status.value.every(item => !item.is_checked)) {
    filtered_catalog.value = category_catalog.value.filter(item =>
      item.price >= price.value[0] && item.price <= price.value[1]
    );
  } else {
    filtered_catalog.value = category_catalog.value.filter(item =>
      filter_status.value.some(status_obj => status_obj.status === item.status && status_obj.is_checked) &&
      item.price >= price.value[0] && item.price <= price.value[1]
    );
  }
}

const price = ref<[number, number]>([0, 100]);
const formatter = (value: number) => `${value} BYN`;

const onChange = (value: number) => {
};
const onAfterChange = (value: number) => {
  UpdateCatalog(new Event('change'));
};

</script>

<template>
  <div class="catalog-page">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <RouterLink to="/catalog">Каталог</RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ selected_category?.name || 'Загрузка...' }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="category-name">
      {{ selected_category?.name || 'Загрузка...' }}
    </div>
    <div class="category-catalog">
      <div class="filters">
        <div class="hint">Статус</div>
        <div class="checkboxes">
          <a-checkbox 
            v-for="status in filter_status" 
            :key="status.status" 
            v-model:checked="status.is_checked" 
            @change="UpdateCatalog">
            {{ status.status }}
          </a-checkbox>
        </div>
        <div class="hint">Цена</div>
        <a-slider 
          v-model:value="price" 
          range 
          :step="1" 
          :tip-formatter="formatter" 
          @change="onChange" 
          @afterChange="onAfterChange" 
          class="price-slider" />
        <div class="price-inputs">
          <a-input-number 
            :controls="false" 
            :formatter="formatter" 
            v-model:value="price[0]" 
            :min="0" 
            :max="price[1]" 
            class="price-input" />
          <a-input-number 
            :controls="false" 
            :formatter="formatter" 
            v-model:value="price[1]" 
            :min="price[0]" 
            class="price-input" />
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
          }" class="product-card">
            <div class="pic" :style="{
                background: 'url(' + product.pic + ') no-repeat center/contain, #D5EAFFDE'
              }"></div>
            <div class="group">
              <div class="name">
                {{ product.name }}
              </div>
              <div class="rate">
                <div>{{ product.avgRating }}</div>
                <div class="star"></div>
              </div>
            </div>
            <div class="status">{{ product.status }}</div>
            <div class="price">{{ product.price }}</div>
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