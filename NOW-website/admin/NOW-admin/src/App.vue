<script setup lang="ts">
import {theme} from './theme'
</script>

<template>
	<a-config-provider :theme = "theme">
		<div class="navigation">
			<RouterLink to="/news" class="link">Новости</RouterLink>
			<RouterLink to="/seasons" class="link">Сезоны</RouterLink>
			<RouterLink to="/players" class="link">Игроки</RouterLink>
			<RouterLink to="/projects" class="link">Проекты</RouterLink>
			<RouterLink to="/categories" class="link">Категории</RouterLink>
			<RouterLink to="/products" class="link">Товары</RouterLink>
			<RouterLink to="/reviews" class="link">Отзывы</RouterLink>
		</div>
		<div class="view">
			<RouterView />
		</div>
	</a-config-provider>
</template>

<style scoped>

	.navigation{
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 15%;
		background-color: #3d84bd;
		position: fixed;
		padding: 40px 0;
	}
	.link{
		font-size: 20px;
		padding: 20px 40px;
		transition: all 0.3s ease;
	}
	.link:hover{
		background-color: #7bb3dc;
	}
	.link:active, .link:focus{
		background-color: #7bb3dc;
	}
	.view{
		position: absolute;
		width: 85%;
		right: 0;
	}
</style>
