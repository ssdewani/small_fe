<script lang="ts" setup>
import { ref } from 'vue';
const content = ref('');
const emits = defineEmits<{
    submitFeedback: [feedback: string];
}>()

const submitAndClear = () => {
    if (content.value.trim() !== '') {
        emits('submitFeedback', content.value);
        content.value = '';
    }
};
</script>


<template>
    <div class="p-4 border-b border-purple-200 ">
        <div class="flex gap-4">
            <div class="w-full">
                <textarea v-model="content"
                    class="w-full bg-transparent p-2 text-xl focus:outline-none focus:ring-1 focus:ring-purple-400 hover:ring-1 hover:ring-purple-200  resize-none  placeholder-slate-500 "
                    placeholder="Post your feedback"></textarea>
                <div class="flex justify-end items-center mt-2">
                    <button class="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700"
                        @click="submitAndClear">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>