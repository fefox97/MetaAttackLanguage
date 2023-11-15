<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
    background: {
        // random image from a curated Unsplash collection by Anthony
        default: 'https://source.unsplash.com/collection/94734566/1920x1080',
    },
})

const style = computed(() => handleBackground(props.background, true))
</script>

<style>
.cover {
    /* box-shadow: inset 0 0 0 2000px rgba(3, 9, 30, 0.55); */
    background: rgba(3, 9, 30, 0.8);
    background-blend-mode: darken;
}
</style>

<template>
    <div class="slidev-layout cover text-center" :style="style">
        <!-- <img src="/logo.svg" h-15 right-10 fixed c-white> -->
        <div class="my-auto w-full">
            <slot />
        </div>
        <div absolute mt-100 w-full>
            <alert type="info" font-bold>Use arrows to move <typcn-arrow-left-thick /><typcn-arrow-right-thick /></alert>
        </div>
    </div>
</template>
