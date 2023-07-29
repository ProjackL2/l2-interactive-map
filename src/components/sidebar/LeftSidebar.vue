<template>
    <div class="sidebar">
        <div class="sections">
            <p class="title">Interactive Map</p>
            <FoldableSection class="category" v-for="category in categories" :key="category.id" :title="category.title" :icon="category.icon">
                <template #content>
                    <div class="toggleWrapper" v-for="pinType in getCategoryTypes(category)" :key="pinType.id">
                        <ToggleSwitch
                            :model-value="pinType.visible"
                            @update:model-value="toggleType(pinType)"
                            :label="`${pinType.title} (${getTypePins(pinType).length})`"
                        ></ToggleSwitch>
                    </div>
                </template>
            </FoldableSection>
        </div>
    </div>
</template>
<script setup lang="ts">
import { categories, getCategoryTypes, getTypePins, toggleType } from "../../store/data";
import ToggleSwitch from "../ToggleSwitch.vue";
import FoldableSection from "./FoldableSection.vue";

</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.sidebar {
    background: $backgroundColor url("/bg-texture.png");
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow-y: auto;

    .sections {
        .title {
            color: $textColor;
            font-size: x-large;
        }
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .locations {
        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 2px;
        position: sticky;
        top: 0;
        background-color: $backgroundColor;
        z-index: 200;
    }

    .toggleWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .toggleBtn {
            color: white;
            display: none;
            cursor: pointer;
        }

        &:hover > .toggleBtn {
            display: initial;
        }
    }

    .sectionHeader {
        > * > .editBtn {
            display: none;
        }

        &:hover {
            > * > .editBtn {
                display: initial;
            }
        }
    }
}
</style>