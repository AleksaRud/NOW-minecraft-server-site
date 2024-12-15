<script lang="ts" setup>
import { ref } from 'vue';
import { projects } from './projects'
const pageWidth = document.documentElement.scrollWidth;

const buildingInfo = ref({
    pic: '',
    title: '',
    description: '',
})
function openModal(pic : string, title : string, description : string){
    buildingInfo.value.pic = pic;
    buildingInfo.value.title = title;
    buildingInfo.value.description = description;
    const modal = document.getElementById('modal');
    modal!.style.right = '0px';
}
function closeModal(){
    const modal = document.getElementById('modal');
    modal!.style.right = '-450px';
}
</script>

<template>
    <div class="projects">
        <div class="columns" v-if="pageWidth > 425">
            <div v-for="project in projects" class="building" v-bind:style="{ background: 'url(' + project.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '540px', height: (project.height + 'px') }">
                <div class="info">
                    <div class="title">{{ project.title }}</div>
                    <div class="description">{{ project.description }}</div>
                </div>
            </div>
        </div>
        <div class="columns" v-if="pageWidth <= 425">
            <div v-for="project in projects" @click="openModal(project.pic, project.title, project.description)" class="building" v-bind:style="{ background: 'url(' + project.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '180px', height: (project.height/3 + 'px') }">
                
            </div>
        </div>
        
    </div>
    <div class="modal" id="modal" @click="closeModal()">
        <div class="close-btn"></div>
        <div class="pic"  v-bind:style="{ background: 'url(' + buildingInfo.pic + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '360px', height: '360px'}"></div>
        <div class="title">{{ buildingInfo.title }}</div>
        <div class="description">{{ buildingInfo.description }}</div>
    </div>
</template>

<style scoped>
    .projects{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 100px 0;
    }
    .columns{
        margin: 80px 0;
        column-count: 2;
        column-gap: 40px;
    }

    .building{
        margin-bottom: 40px;
        transition: all 0.6s ease;
        break-inside:avoid;
        border-radius: 20px;
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
        border-radius: 20px;
    }
    .info:hover{
        opacity: 1;
    }
    .modal{
        display: none;
    }
    @media(max-width: 425px) {
        .projects{
            padding: 80px 0 40px 0;
        }
        .columns{
            margin: 40px 0;
            column-count: 2;
            column-gap: 16px;
        }

        .building{
            margin-bottom: 16px;
            transition: all 0.6s ease;
            border-radius: 16px;
        }
        .building:hover {
            transform: scale(1);
        }
        .modal{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
            padding: 30px 20px;
            width: 380px;
            min-height: 100vh;
            position:fixed;
            right: -450px;
            z-index: 9999;
            background-color: #121619;
            transition: all 0.3s ease;
        }
        .close-btn{
            background-image: url('../assets/close.svg');
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-size: contain;
        }
        .pic{
            border-radius: 24px;
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
    }
</style>
