<template>
    <span :class="(pin?.description.length ?? 0) > 0?'pin clicky':'pin'" :style="pinStyle" @click="onPinClick(pin)">
        <img :src="pin?.iconUrl" draggable="false" />
        <p class="mapTitle">{{pin?.title}}</p>
    </span>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { PinOutput } from "../types/validators";
import {OnPinClickedEvent, types} from "../store/data";
import { currentArea } from "../store/app";
import { eventBus } from "../store/data";

const props = defineProps({
    pin: {
        type: Object as PropType<PinOutput>,
    }
});

const pinType = computed(() => types.value.find((t) => t.id === props.pin?.typeId));
const visible = computed(() => pinType.value?.visible && currentArea.value === props.pin?.area);

function onPinClick(pin: PinOutput | undefined) {
    if (pin && pin.description.length > 0) {
        const eventData : OnPinClickedEvent =  {
            title: pin.title,
            description: pin.description,
            url: pin.imageUrl ?? ""
        };
        eventBus.emit('pinClicked', eventData);
    }
}

const pinStyle = computed(() => ({
    "left": `${props.pin?.x ?? 0}px`,
    "top": `${props.pin?.y ?? 0}px`,
    "z-index": props.pin?.z ?? 0,
    display: visible.value ? "initial" : "none",
}));

</script>

<style scoped lang="scss">
@import "../assets/_variables.scss";

.pin {
    position: absolute;

    .headerBtns {
        display: flex;
        grid-gap: 10px;
        flex-direction: row;
    }

    .details {
        width: max-content;
        max-width: 500px;
        position: absolute;
        z-index: 120;
        background-color: $backgroundColor;
        border-radius: 6px;
        transform: translate(calc(-50% + 18px), -100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);

        .detailsHeader {
            display: flex;
            grid-gap: 10px;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 2px solid black;
            > * {
                height: 24px;
            }

            .pinTitle {
                text-overflow: ellipsis;
                overflow-x: hidden;
                white-space: nowrap;
            }
        }

        .detailsContent {
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            padding: 12px;
            max-width: 400px;
            width: max-content;

            .imageContainer {
                width: 100%;
                height: 100%;

                img {
                    border-radius: 6px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}

.clicky {
    position: absolute;
    cursor: pointer;

    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    &:hover {
        filter: brightness(1.5) drop-shadow(0px 3px 3px #877355);
        -webkit-filter: brightness(1.5) drop-shadow(0px 3px 3px #877355);
        -moz-filter: brightness(1.5) drop-shadow(0px 3px 3px #877355);
        -o-filter: brightness(1.5) drop-shadow(0px 3px 3px #877355);
        -ms-filter: brightness(1.5) drop-shadow(0px 3px 3px #877355);
        -webkit-transition: all 0.25s;
        transition: all 0.25s;
    }
}

.pin p {
    font-size: 16px;
    color: #beb9a2;
    margin: -5px 0 0 0;
    text-align: center;
    transition: 0.2s linear;
    text-shadow: 0 2px 2px rgb(0 0 0);
}

.pin img {
    display: block;
    width: auto;
    height: auto;
    margin: auto;
    align-self: center;
    flex-shrink: 0;
}

</style>