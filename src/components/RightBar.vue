<script lang="ts" setup>

const props = defineProps<{
    preferredTopics: string[];
    suggestedTopics: string[];
}>()

const emits = defineEmits<{
    addTopic: [topic: string];
    removeTopic: [topic: string];
    regenerate: [];
}>()

</script>

<template>
    <aside class="col-span-3 p-6 hidden lg:block">
        <div class="sticky top-0 py-4">
            <div class="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 mb-2">
                <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">Your Topics</h3>
                <div class="space-y-3">
                    <a v-for="topic in preferredTopics" @click="emits('removeTopic', topic)"
                        class="block hover:bg-purple-200 dark:hover:bg-purple-800 p-2 rounded-lg" href="#"><span
                            class="font-bold text-slate-900 dark:text-white">#{{ topic }}</span> </a>
                </div>
            </div>
        </div>
        <div class="sticky top-0 py-1">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-2">
                <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">Suggested Topics</h3>
                <div class="space-y-3">
                    <a v-for="topic in suggestedTopics" @click="emits('addTopic', topic)"
                        class="block hover:bg-blue-200 dark:hover:bg-purple-800 p-2 rounded-lg" href="#"><span
                            class="font-bold text-slate-900 dark:text-white">#{{ topic }}</span> </a>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center mt-2">
            <button @click="emits('regenerate')"
                class="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700">Regenerate</button>
        </div>
    </aside>
</template>