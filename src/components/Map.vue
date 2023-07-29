<template>
    <div>
        <div class="map" ref="componentRef" :style="mapStyle"
            @mousedown="onMouseDown"
            @mouseup="moving = false"
            @mousemove.prevent="onMouseMove"
            @wheel="zoom">
            <div class="mapContent" :style="mapPositionStyle" ref="mapRef">
                <img :src="`${currentMapImageSrc}`" alt="" class="image" ref="image" />
                <Pin v-for="pin in pins" :key="pin.id" :pin="pin"></Pin>
            </div>
        </div>
        <div id="zoom"><ul><li @click="zoomIn()" data-zoom="up">+</li><li @click="zoomOut()" data-zoom="down">-</li></ul></div>
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Pin from "./Pin.vue";
import { addAlert, currentMapImageSrc } from "../store/app";
import { pins } from "../store/data";
import {IAlert} from "../types/Data";

const moving = ref(false);
const mapPosition = reactive({
    x: -1500,
    y: -1200,
});
const mouseDownPosition = reactive({
    x: 0,
    y: 0,
});
const prevMapPosition = reactive({
    x: 0,
    y: 0,
});
const canMove = ref(true);
const mapScale = ref(0.3);
const mapRef = ref<Element | null>(null);
const componentRef = ref<Element | null>(null);

// COMPUTED

const mapPositionStyle = computed(() => ({
    transform: `scale(${mapScale.value}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
}));

const mapStyle = computed(() => ({
    cursor: canMove.value ? (moving.value ? "grabbing" : "grab") : "crosshair",
}));

// METHODS

const onMouseDown = (event: MouseEvent) => {
    if (!canMove.value) return;
    moving.value = true;
    mouseDownPosition.x = event.clientX;
    mouseDownPosition.y = event.clientY;
    prevMapPosition.x = mapPosition.x;
    prevMapPosition.y = mapPosition.y;
};

const onMouseMove = (event: MouseEvent) => {
    if (canMove.value && moving.value) moveMap(event);
};

const moveMap = (event: MouseEvent) => {
    mapPosition.x = Math.min(Math.max(prevMapPosition.x + (event.clientX - mouseDownPosition.x) / mapScale.value, -3500), 800);
    mapPosition.y = Math.min(Math.max(prevMapPosition.y + (event.clientY - mouseDownPosition.y) / mapScale.value, -3500), 800);
};

const zoomIn = () => {
    if (canMove.value) {
        mapScale.value = Math.min(mapScale.value * 1.1, 1.0);
    }
}

const zoomOut = () => {
    if (canMove.value) {
        mapScale.value = Math.max(mapScale.value * 0.9, 0.3);
    }
}

const zoom = (event: WheelEvent) => {
    if (event.deltaY > 0) zoomOut(); else zoomIn();
};

</script>
<style scoped lang="scss">
@import "../assets/_variables.scss";

.map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;

    background-image: url("/sea.jpg");
    background-color: $mapBackgroundColor;
    background-repeat: no-repeat;
    background-size: cover;

    .mapContent {
        height: 100%;
        width: 100%;
    }
}

.image {
    position: absolute;
    pointer-events: none;
    width: 3591px;
}

.addBtn {
    position: fixed;
    bottom: 12px;
    right: 12px;
}

#zoom {
  position: absolute;
  bottom: 20px;
  left: 320px;
  z-index: 1000;
  border-radius: 20px;
  overflow: hidden;
  background: #D7CEC3;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  li {
    cursor: pointer;
    font-size: 30px;
    color: #000;
    font-weight: 500;
    width: 44px;
    height: 48px;
    line-height: 48px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  li:last-child {
    background: #EAE6E1;
  }
}

</style>
