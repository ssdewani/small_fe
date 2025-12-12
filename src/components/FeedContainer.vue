<script setup lang="ts">
import type { Feed } from "../types";

const props = defineProps<{
    feed: Feed
}>();


const emits = defineEmits<{
    tapLike: [index: number];
    tapDislike: [index: number];
}>()



</script>

<template>
    <div class="divide-y divide-purple-200 dark:divide-purple-900">
        <div class="p-4 flex gap-4 hover:bg-purple-100 " v-for="(idea, index) in props.feed.ideas">
            <div class="w-full">
                <div class="flex items-center gap-2">
                    <p class="font-bold text-slate-900 ">{{ idea.title }}</p>
                </div>
                <p class="mt-1 ">{{ idea.description }}</p>
                <div class="mt-4 flex justify-end gap-4 text-slate-500 ">
                    <button class="flex items-center gap-2 hover:text-primary" @click="emits('tapLike', index)">
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{
                            'icon-filled': idea.liked === 'YES',
                            'icon-outlined': idea.liked !== 'YES'
                        }" width="24" height="24" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                    </button>
                    <button class="flex items-center gap-2 hover:text-primary" @click="emits('tapDislike', index)">
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{
                            'icon-filled': idea.liked === 'NO',
                            'icon-outlined': idea.liked !== 'NO'
                        }" width="24" height="24" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M1 3h4v12H1V3zm22 11c0 1.1-.9 2-2 2h-6.31l.95 4.57.03.32c0 .41-.17.79-.44 1.06L14.17 23l-6.59-6.59C7.22 16.05 7 15.55 7 15V5c0-1.1.9-2 2-2h9c.83 0 1.54.5 1.84 1.22l3.02 7.05c.09.23.14.47.14.73v2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.icon-filled {
    fill: currentColor;
    /* Solid primary color */
    stroke: none;
    /* No outline */
}

/* --- OUTLINED STATE --- */
.icon-outlined {
    fill: none;
    /* Transparent or no fill */
    stroke: currentColor;
    /* Use the text color for the outline */
    stroke-width: 2;
    /* Make the outline visible */
}
</style>