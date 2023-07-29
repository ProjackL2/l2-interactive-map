<template>
    <div class="foldableSection">
        <div class="sectionHeader" @click="open = !open">
            <slot name="header" :open="open">
                <p class="title">
                    <img :src="icon" alt="" class="imgicon">
                    {{ title }}
                </p>
                <Icon name="md-expandless-round" v-if="open" />
                <Icon name="md-expandmore-round" v-else></Icon>
            </slot>
        </div>
        <div class="content" v-if="open">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

const open = ref(true);
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.foldableSection {
    display: flex;
    flex-direction: column;

    .sectionHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px 12px 12px 4px;
        cursor: pointer;
        height: 42px;
        background-color: $blue;
        border: 1px solid $lightBlue;
        z-index: 30;

        .title {
            line-height: 32px;
            color: $titleTextColor;
            display: flex;
            grid-gap: 8px;
            align-items:center;

            .imgicon {
                height: 28px;
                filter: brightness(0) invert(1);
            }
        }

        .headerBtns {
            display: flex;
            align-items: center;
            grid-gap: 4px;
        }
    }

    .content {
        z-index: 20;
        padding: 12px;
        margin: -6px 6px 6px;
        background-color: $paperColor;
        border: 1px solid $paperBorderColor;
        * {
            color: $backgroundColor;
        }
    }
}
</style>