<script setup lang="ts">

import type { Feed } from "./types";
import { ref, onMounted } from "vue";
import LeftBar from "./components/LeftBar.vue";
import FeedbackBox from "./components/FeedbackBox.vue";
import FeedContainer from "./components/FeedContainer.vue";
import RightBar from "./components/RightBar.vue";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue';
import { useApi } from './useApi'


const currentFeed = ref<Feed>({
  id: 1001,
  ideas: [],
  createdAt: new Date(),
});


const preferredTopics = ref<string[]>([]);
const suggestedTopics = ref<string[]>([]);
const loading = ref<boolean>(true);
const noFeed = ref<boolean>(false);
const api = useApi()

const selectedDate = ref(new Date().toISOString().split('T')[0]);

const fetchHome = async () => {
  try {
    const response = await api.get('/home', {
      params: {
        date: selectedDate.value
      }
    });
    if (response.data.ideas.length === 0) {
      noFeed.value = true;
      loading.value = false;
      return;
    }
    currentFeed.value.ideas = response.data.ideas;
    console.log("response data: ", response.data);
    currentFeed.value.id = response.data.feedId;
    loading.value = false;
    noFeed.value = false;
  } catch (err) {
    noFeed.value = true;
    loading.value = false;
    console.error('Failed to load ideas', err);
  }
};

const fetchTopics = async () => {
  try {

    const response = await api.get('/topics');
    preferredTopics.value = response.data.preferredTopics;
    suggestedTopics.value = response.data.suggestedTopics;
  } catch (err) {
    console.error('Failed to load topics');
  }
};

onMounted(() => {
  fetchTopics();
  fetchHome();
});

function removeTopic(t: string) {
  const index = preferredTopics.value.indexOf(t);
  if (index > -1) {
    preferredTopics.value.splice(index, 1);
    suggestedTopics.value.push(t);
  }
  api.patch('/topics', preferredTopics.value);
}

function addTopic(t: string) {
  const index = suggestedTopics.value.indexOf(t);
  if (index > -1) {
    suggestedTopics.value.splice(index, 1);
    preferredTopics.value.push(t);
  }
  api.patch('/topics', preferredTopics.value);
}

const regenerateFeed = async () => {
  try {
    loading.value = true;
    const response = await api.get('/regen');
    currentFeed.value.ideas = response.data.ideas;
    currentFeed.value.id = response.data.feedId;

    loading.value = false;
  } catch (err) {
    console.error('Failed to load ideas');
  }
}

const toggleLike = async (index: number) => {
  try {
    const idea = currentFeed.value.ideas[index];
    if (idea) {
      idea.liked = idea.liked === 'YES' ? 'UNFILLED' : 'YES';
      await api.patch('/idealike', { index: index, feedId: currentFeed.value.id, liked: idea.liked });
    }
  } catch (err) {
    console.error(err);
  }

}

const toggleDisLike = async (index: number) => {
  try {
    const idea = currentFeed.value.ideas[index];
    if (idea) {
      idea.liked = idea.liked === 'NO' ? 'UNFILLED' : 'NO';
      await api.patch('/idealike', { index: index, feedId: currentFeed.value.id, liked: idea.liked });
    }
  } catch (err) {
    console.error(err);
  }
}

const submitFeedback = async (feedback: string) => {
  await api.post('/feedback', { feedback: feedback });
}

</script>



<template>
  <header class="p-2">
    <div class="flex justify-between top-0 bg-background-light/80 backdrop-blur-sm p-4 border-b border-purple-200">
      <h2 class="text-xl font-bold text-slate-900">Home</h2>
      <SignedOut>
        <SignInButton class="text-l text-slate-900" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
  <div class="grid grid-cols-12 max-w-7xl mx-auto font-display text-slate-800">
    <LeftBar />
    <main class="col-span-12 lg:col-span-6 border-r border-purple-200">
      <FeedbackBox @submit-feedback="submitFeedback" />
      <div class="mt-4 font-bold text-slate-900 text-xl p-4">
        <input type="date" v-model="selectedDate" @change="fetchHome"
          class="border border-purple-300 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-purple-500" />
      </div>
      <div v-if="loading" class="p-4 flex items-center gap-2">
        <h1 class="font-bold text-slate-900 text-2xl">Loading ...</h1>
      </div>
      <div v-if="noFeed" class="p-4 flex items-center gap-2">
        <h1 class="font-bold text-slate-900 text-2xl">No feed found</h1>
      </div>
      <FeedContainer v-if="!loading && !noFeed" :feed="currentFeed" @tap-like="toggleLike"
        @tap-dislike="toggleDisLike" />
      <div v-if="!loading" class="flex justify-end items-center mt-4 p-4">
        <button @click="regenerateFeed"
          class="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700">Regenerate</button>
      </div>
    </main>
    <RightBar :preferredTopics="preferredTopics" :suggestedTopics="suggestedTopics" @remove-topic="removeTopic"
      @add-topic="addTopic" @regenerate="regenerateFeed" />
  </div>
</template>

<style>
.icon {
  width: 24px;
  height: 24px;
}
</style>
