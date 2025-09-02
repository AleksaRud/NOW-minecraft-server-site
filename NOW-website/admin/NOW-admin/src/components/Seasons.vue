<script setup lang="ts">
import { ref, reactive, onMounted, type Ref } from 'vue';
import { news_cards, fetchNews, type Card } from './news';

const isEditing = ref(false);
const editingId = ref<string | null>(null);

const form = reactive({
  title: '',
  dateInput: '',
  discription: '',
  btn_link: '',
  btn_tytle: '',
  pic: ''
});

const selectedFile = ref<File | null>(null);
const previewImage = ref('');

onMounted(() => {
  fetchNews();
});

const isModalVisible = ref(false);

const resetForm = () => {
  form.title = '';
  form.dateInput = '';
  form.discription = '';
  form.btn_link = '';
  form.btn_tytle = '';
  form.pic = '';
  selectedFile.value = null;
  previewImage.value = '';
  isEditing.value = false;
  editingId.value = null;
};

// Обновлённый обработчик выбора файла. Добавлены логи для отладки.
const handleFileChange = (info: any) => {
  console.log("a-upload change event:", info);
  // Пытаемся получить объект файла из originFileObj или используем сам info.file
  const file = info.file?.originFileObj || info.file;
  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
    console.log("Selected file:", file);
  } else {
    console.warn("Файл не найден в событии a-upload");
  }
};

const submitNews = async () => {
  try {
    if (selectedFile.value) {
      const fileData = new FormData();
      fileData.append('file', selectedFile.value);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: fileData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Ошибка загрузки изображения');
      }
      
      const uploadResult = await uploadResponse.json();
      form.pic = uploadResult.filename;
      console.log("Upload result:", uploadResult);
    }
    
    const payload = {
      title: form.title,
      date: form.dateInput,
      discription: form.discription,
      btn_link: form.btn_link,
      btn_tytle: form.btn_tytle,
      pic: form.pic,
    };
    
    if (isEditing.value && editingId.value) {
      const putResponse = await fetch(`/api/news/${editingId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!putResponse.ok) {
        throw new Error('Ошибка обновления новости');
      }
    } else {
      const postResponse = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!postResponse.ok) {
        throw new Error('Ошибка создания новости');
      }
    }
    
    resetForm();
    isModalVisible.value = false;
    fetchNews();
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
  }
};

const handleOk = async () => {
  await submitNews();
};

const handleCancel = () => {
  resetForm();
  isModalVisible.value = false;
};

const editNews = (item: Card & { _id: string }) => {
  form.title = item.title;
  form.dateInput = item.date.format('YYYY-MM-DD');
  form.discription = item.discription;
  form.btn_link = item.btn_link;
  form.btn_tytle = item.btn_tytle;
  form.pic = item.pic;
  isEditing.value = true;
  editingId.value = item._id;
  previewImage.value = item.pic;
  isModalVisible.value = true;
};

const showModalForAdd = () => {
  resetForm();
  isModalVisible.value = true;
};

const deleteNews = async (id: string) => {
  try {
    const deleteResponse = await fetch(`/api/news/${id}`, { method: 'DELETE' });
    if (!deleteResponse.ok) {
      throw new Error('Ошибка удаления новости');
    }
    fetchNews();
  } catch (error) {
    console.error('Ошибка при удалении новости:', error);
  }
};

const columns = [
  {
    title: 'Заголовок',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    width: '160px',
  },
  {
    title: 'Описание',
    dataIndex: 'discription',
    key: 'discription',
  },
  {
    title: 'Изображение',
    dataIndex: 'pic',
    key: 'pic',
  },
  {
    title: 'Кнопка',
    dataIndex: 'btn_link',
    key: 'btn_link',
  },
  {
    title: 'Действия',
    key: 'actions',
  },
];
</script>

<template>
  <div class="news-admin">
    <h1>Управление новостями</h1>
    <a-button type="primary" @click="showModalForAdd" style="margin-bottom: 16px">
      Создать новость
    </a-button>

    <a-table bordered :dataSource="news_cards" :columns="columns" rowKey="_id">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'title'">
          {{ text }}
        </template>
        <template v-else-if="column.dataIndex === 'date'">
          {{ text.format('YYYY-MM-DD') }}
        </template>
        <template v-else-if="column.dataIndex === 'discription'">
          {{ text }}
        </template>
        <template v-else-if="column.dataIndex === 'pic'">
          <img :src="text" alt="Изображение" width="100" class="img" />
        </template>
        <template v-else-if="column.dataIndex === 'btn_link'">
          <a :href="record.btn_link" target="_blank">{{ record.btn_tytle }}</a>
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-button type="primary" @click="editNews(record)" style="margin-right: 8px">
            Редактировать
          </a-button>
          <a-popconfirm title="Вы уверены, что хотите удалить?" @confirm="deleteNews(record._id)">
            <template #default>
              <a-button type="primary" danger>Удалить</a-button>
            </template>
          </a-popconfirm>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="isModalVisible"
      :title="isEditing ? 'Редактировать новость' : 'Создать новость'"
      :okText="isEditing ? 'Обновить' : 'Добавить'"
      style="top: 20px"
      @ok="handleOk"
      @cancel="handleCancel"
      destroyOnClose
    >
      <a-form layout="vertical">
        <a-form-item label="Заголовок" required>
          <a-input v-model:value="form.title" placeholder="Введите заголовок" />
        </a-form-item>

        <a-form-item label="Дата" required>
          <a-date-picker
            v-model:value="form.dateInput"
            value-format="YYYY-MM-DD"
            style="width: 100%;"
            placeholder="Выберите дату"
          />
        </a-form-item>

        <a-form-item label="Описание" required>
          <a-textarea v-model:value="form.discription" rows="4" placeholder="Введите описание" />
        </a-form-item>

        <a-form-item label="Ссылка кнопки">
          <a-input v-model:value="form.btn_link" placeholder="(опционально)" />
        </a-form-item>

        <a-form-item label="Текст кнопки">
          <a-input v-model:value="form.btn_tytle" placeholder="(опционально)" />
        </a-form-item>

        <a-form-item label="Изображение">
          <a-upload 
            :show-upload-list="false" 
            :beforeUpload="() => false"
            @change="handleFileChange"
          >
            <a-button>Выбрать файл</a-button>
          </a-upload>
          <div v-if="previewImage" style="margin-top: 8px;">
            <img :src="previewImage" alt="Превью" width="100" />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.news-admin {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
.img {
  border-radius: 4px;
}
</style>
