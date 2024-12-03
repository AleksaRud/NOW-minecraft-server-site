<script lang="ts" setup>
import { projects } from './projects'

</script>

<template>
    <div class="projects">
        <div class="grid-container">
            <div v-for="project in projects" class="building" v-bind:style="{ background: 'url(' + project.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '540px', height: project.height }">
                <div class="info">
                    <div class="title">{{ project.title }}</div>
                    <div class="description">{{ project.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .projects{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .grid-container {
        margin: 80px 0;
        column-count: 2;
        column-gap: 40px;
    }

    .building{
        margin-bottom: 40px;
        transition: all 0.6s ease;
    }
    .building:hover {
        transform: scale(1.05);
    }
    .info{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 8px;
        font-size: 18px;
        padding: 32px 20px;
        box-sizing: border-box;
        color: aliceblue;
        background:linear-gradient(#3f3d3d00 18%,#070707ce 90%);
        opacity: 0;
        transition: all 0.6s ease;
        
    }
    .info:hover{
        opacity: 1;
    }
</style>
