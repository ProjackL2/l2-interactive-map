<template>
    <div class="sidebar" v-if="opened">
        <div id="side-hide" @click="close()"></div>
        <div id="side-image">
            <img :src="url" :alt="title"/>
        </div>
        <div id="side-content">
            <p id="location-name">{{title}}</p>
            <div id="side-text" v-html="description"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {eventBus, OnPinClickedEvent} from "../../store/data";

const opened = ref<boolean>(false);
const title = ref<string>('None');
const description = ref<string>('');
const url = ref<string>('');

const close = () => {
    opened.value = false;
    title.value = 'None';
    description.value = '';
    url.value = '';
}

eventBus.on<string>('pinClicked', (e) => {
    const evt: OnPinClickedEvent = e as OnPinClickedEvent;
    if (evt) {
        opened.value = title.value != evt.title;
        if (opened.value) {
            title.value = evt.title;
            description.value = evt.description;
            url.value = evt.url;
        }
        else {
            title.value = 'None';
            description.value = '';
            url.value = '';
        }
    }
});
</script>

<style scoped lang="scss">
@import "../../assets/_variables.scss";

.sidebar {
    background: $backgroundColor url("/bg-texture.png");
    position: absolute;
    width: 22%;
    top: 0;
    left: 78%;
    height: 100%;
    z-index: 1000;
    alignment: right;
    overflow-y: auto;

    #side-hide {
        background: url("/close.png");
        background-size: 100%;
        filter: drop-shadow(0px 0px 2px #000);
        top: 32px;
        left: 32px;
        width: 18px;
        height: 18px;
        position: absolute;
        cursor: pointer;
    }

    #side-image {
        display: flex;
        flex-direction: column;
    }

    #side-content {
        background: url("/side.png") no-repeat bottom center;
        background-size: 100% 100%;
        height: calc(100% - 227px);
        width: 100%;
        padding: 80px 0 35px 35px;
        display: flex;
        flex-direction: column;
        margin-top: -73px;
    }

    #location-name {
        text-align: center;
        font-size: 32px;
        line-height: 42px;
        padding-right: 35px;
    }
    #location-name::after {
        position: relative;
        display: block;
        content: "";
        width: 36px;
        height: 1px;
        background: #000;
        top: 8px;
        left: 50%;
        margin-left: -20px;
    }

    #side-text {
        position: relative;
        padding-right: 35px;
        font-family: 'Roboto', serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 25px;
        margin: 20px 0;
        color: #3a3934;
    }
}

</style>