<script lang="ts" setup>

const props = defineProps<{
    preferredTopics: string[];
    suggestedTopics: string[];
}>();

const emits = defineEmits<{
    addTopic: [topic: string];
    removeTopic: [topic: string];
    regenerate: [];
}>()

</script>

<template>
    <aside class="p-6">
        <div class="sticky top-0 py-4">
            <div class="bg-purple-100  rounded-lg p-4 mb-2">
                <h3 class="text-xl font-bold mb-4 text-slate-900 ">Your Topics</h3>
                <div class="space-y-3">
                    <a v-for="topic in props.preferredTopics" @click="emits('removeTopic', topic)"
                        class="block hover:bg-purple-200  p-2 rounded-lg" href="#"><span
                            class="font-bold text-slate-900 ">#{{ topic }}</span> </a>
                </div>
            </div>
        </div>
        <div class="sticky top-0 py-1">
            <div class="bg-blue-100  rounded-lg p-4 mb-2">
                <h3 class="text-xl font-bold mb-4 text-slate-900 ">Suggested Topics</h3>
                <div class="space-y-3">
                    <a v-for="topic in props.suggestedTopics" @click="emits('addTopic', topic)"
                        class="block hover:bg-blue-200  p-2 rounded-lg" href="#"><span
                            class="font-bold text-slate-900 ">#{{ topic }}</span> </a>
                </div>
            </div>
        </div>
        <button @click="emits('regenerate')"
            class=" bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 mt-6">
            Regenerate Feed
        </button>

    </aside>
</template>