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
const mobileTopicsOpen = ref(false);

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
      <div class="flex items-center gap-2">
        <button @click="mobileTopicsOpen = !mobileTopicsOpen" class="lg:hidden p-2 text-slate-900">
          <svg v-if="!mobileTopicsOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <SignedOut>
          <SignInButton class="text-l text-slate-900" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  </header>
  <div class="grid grid-cols-12 max-w-7xl mx-auto font-display text-slate-800">
    <LeftBar />
    <main class="col-span-12 lg:col-span-6 border-r border-purple-200" v-show="!mobileTopicsOpen">
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

    </main>

    <!-- Mobile Topics View -->
    <div v-if="mobileTopicsOpen" class="col-span-12 lg:hidden">
      <RightBar :preferredTopics="preferredTopics" :suggestedTopics="suggestedTopics" @remove-topic="removeTopic"
        @add-topic="addTopic" @regenerate="regenerateFeed" />
    </div>

    <!-- Desktop RightBar -->
    <RightBar class="col-span-3 hidden lg:block" :preferredTopics="preferredTopics" :suggestedTopics="suggestedTopics"
      @remove-topic="removeTopic" @add-topic="addTopic" @regenerate="regenerateFeed" />
  </div>
</template>

<style>
.icon {
  width: 24px;
  height: 24px;
}
</style>
