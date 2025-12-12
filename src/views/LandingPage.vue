<script setup lang="ts">
import { SignInButton, SignedIn, SignedOut } from '@clerk/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToApp = () => {
    router.push('/app');
};
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex flex-col font-display">
        <header class="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div class="flex items-center gap-2">
                <h1
                    class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                    Small Fe
                </h1>
            </div>
            <nav class="flex gap-4">
                <SignedOut>
                    <SignInButton
                        class="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition" />
                </SignedOut>
                <SignedIn>
                    <button @click="navigateToApp"
                        class="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition">
                        Go to App
                    </button>
                </SignedIn>
            </nav>
        </header>

        <main class="flex-grow">
            <section class="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-8">
                    <h2 class="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                        Ideas that <br />
                        <span class="text-purple-600">Spark Joy</span>
                    </h2>
                    <p class="text-xl text-slate-600 leading-relaxed max-w-lg">
                        Curated feeds of inspiration, tailored just for you. specific, detailed, and always fresh.
                    </p>
                    <div class="flex gap-4">
                        <SignedOut>
                            <SignInButton
                                class="px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-full hover:bg-purple-700 transition shadow-lg hover:shadow-purple-200">
                                Get Started
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <button @click="navigateToApp"
                                class="px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-full hover:bg-purple-700 transition shadow-lg hover:shadow-purple-200">
                                Open Dashboard
                            </button>
                        </SignedIn>
                    </div>
                </div>
                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-purple-200 to-blue-100 rounded-full blur-3xl opacity-50 -z-10">
                    </div>
                    <div class="bg-white/50 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-xl">
                        <div class="flex flex-col gap-4">
                            <div class="h-4 w-1/3 bg-slate-200 rounded animate-pulse"></div>
                            <div class="h-32 bg-slate-100 rounded-xl"></div>
                            <div class="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                            <div class="h-32 bg-slate-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-white py-20">
                <div class="max-w-7xl mx-auto px-6">
                    <h3 class="text-3xl font-bold text-center text-slate-900 mb-12">Features</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="p-6 rounded-xl bg-slate-50 border border-slate-100">
                            <h4 class="text-xl font-bold text-purple-600 mb-2">Curated Topics</h4>
                            <p class="text-slate-600">Select what you love, and we'll do the rest.</p>
                        </div>
                        <div class="p-6 rounded-xl bg-slate-50 border border-slate-100">
                            <h4 class="text-xl font-bold text-blue-500 mb-2">Daily Freshness</h4>
                            <p class="text-slate-600">New ideas generated every single day.</p>
                        </div>
                        <div class="p-6 rounded-xl bg-slate-50 border border-slate-100">
                            <h4 class="text-xl font-bold text-teal-500 mb-2">Instant Feedback</h4>
                            <p class="text-slate-600">Like or dislike to tune your personal algorithm.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="py-8 text-center text-slate-500 text-sm">
            &copy; 2024 Small Fe. All rights reserved.
        </footer>
    </div>
</template>
