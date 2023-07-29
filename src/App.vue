<template>
    <div class="home">
        <LeftSidebar></LeftSidebar>
        <Map></Map>
        <RightSidebar></RightSidebar>
    </div>
    <div class="alerts">
        <Alert v-for="alert in alerts" :key="alert.id" :alert="alert"></Alert>
    </div>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Alert from "./components/Alert.vue";
import LeftSidebar from "./components/sidebar/LeftSidebar.vue";
import RightSidebar from "./components/sidebar/RightSidebar.vue";
import { alerts } from "./store/app";
import { initialize } from "./store/data";
import { onMounted } from "vue";

onMounted(() => {
    initialize();
});
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "./fonts/Roboto/stylesheet.css";

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Roboto",serif;
    font-weight: 500;
    color: $textColor;
}

body {
    overflow: hidden;
    background-color: $backgroundColor;
}

.horizontalFlex {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.right {
        justify-content: flex-end;
    }

    &.left {
        justify-content: flex-start;
    }

    &.gap10 {
        grid-gap: 10px;
    }
}

.alerts {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
    padding: 10px;
}

// HOME styles

.home {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "leftsidebar map rightsidebar";

    &.authenticated {
        grid-template-rows: 56px 1fr;
        grid-template-areas:
            "leftsidebar map rightsidebar"
    }

    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .leftsidebar {
        grid-area: leftsidebar;
    }

    .map {
        grid-area: map;
    }

    .rightsidebar {
        grid-area: rightsidebar;
    }
}
</style>
