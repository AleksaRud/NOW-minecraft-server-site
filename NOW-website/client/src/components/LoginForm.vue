<script lang="ts" setup>
  import { reactive } from 'vue';
  
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = (values: any) => {
    if(formState.remember){
        
    }
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

</script>

<template>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item
            label="Логин"
            name="username"
            :rules="[{ required: true, message: 'Введите логин' }]"
        >
            <a-input v-model:value="formState.username" />
        </a-form-item>
    
        <a-form-item
            label="Пароль"
            name="password"
            :rules="[{ required: true, message: 'Введите пароль' }]"
        >
            <a-input-password v-model:value="formState.password" />
        </a-form-item>
    
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Запомнить меня</a-checkbox>
        </a-form-item>
    
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Войти</a-button>
        </a-form-item>
    </a-form>
</template>  

<style scoped>

    @media (max-width: 425px) {
        
    }
</style>

