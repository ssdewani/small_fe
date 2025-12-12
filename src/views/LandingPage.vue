<script setup lang="ts">
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const navigateToApp = () => {
    router.push('/app');
};

const steps = ref([
    {
        icon: '📍',
        title: '1. Set Your Scene',
        desc: 'Tell us your location (e.g., London) and select your interests from topics like #Sports, #Tech, or #Lifestyle.'
    },
    {
        icon: '📩',
        title: '2. Get the Daily Brief',
        desc: 'Every morning, receive a clean email with 5 fresh, witty conversation starters tailored just for you.'
    },
    {
        icon: '💬',
        title: '3. Spark Conversation',
        desc: 'Use your ready-made openers at the coffee machine, in meetings, or at dinner. No more awkward pauses.'
    }
])

const examples = ref([
    {
        title: 'Weekend match bet (no money, lots of banter)',
        body: '‘Big Premier League weekend — who are you backing to cause the chaos: the title favourite or the underdog with the scrappy manager?’ — sports-focused, playful, and easy to follow.',
        tags: ['#Sports']
    },
    {
        title: 'Weather small talk with a twist',
        body: '‘Brimful of umbrellas or stocking up on wellies? London’s been flirting with rain, wind and even a bit of snow — what’s your emergency winter item?’ — casual, relatable and invites a joke.',
        tags: ['#Weather', '#Local']
    }
])
</script>

<template>
    <div class="font-sans text-gray-900 bg-white">
        <nav class="bg-[#F3E8FF] py-5">
            <div class="container mx-auto px-6 flex justify-between items-center">
                <div class="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <div class="w-8 h-8 bg-[#8A56EC] rounded-lg flex items-center justify-center text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="text-white">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="currentColor" fill-opacity="0.2" />
                            <path d="M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M9 9H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M10 15H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </div>
                    <span>Small Talk</span>
                </div>

                <div class="hidden md:flex items-center gap-8">
                    <a href="#how-it-works" class="text-gray-600 hover:text-[#8A56EC] font-medium transition">How it
                        Works</a>
                    <a href="#examples" class="text-gray-600 hover:text-[#8A56EC] font-medium transition">Examples</a>
                    <SignInButton mode="modal">
                        <button class="text-gray-900 hover:text-[#8A56EC] font-semibold transition">Log In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button
                            class="bg-[#8A56EC] hover:bg-[#7340d3] text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-sm">
                            Sign Up for Free
                        </button>
                    </SignUpButton>
                </div>
            </div>
        </nav>

        <header class="bg-[#F3E8FF] pt-16 pb-24 overflow-hidden">
            <div class="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div class="flex-1 text-center md:text-left z-10">
                    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                        Never run out of <br /><span class="text-[#8A56EC]">things to say</span> again.
                    </h1>
                    <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Effortlessly interesting. We send you 5 curated, witty small talk topics every morning based on
                        your location and interests.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <SignUpButton mode="modal">
                            <button
                                class="bg-[#8A56EC] hover:bg-[#7340d3] text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl">
                                Sign Up for Free
                            </button>
                        </SignUpButton>
                    </div>
                    <p class="text-sm text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
                </div>

                <div class="flex-1 w-full flex justify-center relative">
                    <div
                        class="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob">
                    </div>

                    <div
                        class="bg-white rounded-[2.5rem] p-5 shadow-2xl border-[8px] border-[#E8DAFF] max-w-sm w-full relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                        <div
                            class="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 mb-5 shadow-sm">
                            <span class="text-2xl">✉️</span>
                            <div class="flex flex-col text-sm">
                                <strong class="text-gray-900">Small Talk Daily Briefing</strong>
                                <span class="text-gray-500 text-xs">Your 5 topics for today are ready...</span>
                            </div>
                        </div>

                        <div class="bg-white border border-gray-100 rounded-xl p-6 shadow-md">
                            <span class="text-[#8A56EC] font-bold text-sm mb-3 block">Today's Top Pick</span>
                            <h3 class="font-bold text-gray-900 mb-3 leading-snug">Quick take: AI — helpful assistant or
                                courtroom guest?</h3>
                            <p class="text-gray-600 text-sm leading-relaxed mb-4">
                                ‘Quick thought — did you see that US state AGs have warned big AI chatbots about
                                breaking laws? If you had to pick: should AI get a lawyer or a therapist first?’
                            </p>
                            <div class="flex gap-2">
                                <span
                                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">#Tech</span>
                                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">#World
                                    News</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section id="how-it-works" class="py-24 bg-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SmallTalk Works</h2>
                <p class="text-gray-500 text-lg mb-16 max-w-2xl mx-auto">Three simple steps to becoming the most
                    interesting person in the room.</p>

                <div class="grid md:grid-cols-3 gap-10">
                    <div v-for="(step, index) in steps" :key="index"
                        class="p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
                        <div
                            class="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center text-2xl mb-6 mx-auto text-[#8A56EC]">
                            {{ step.icon }}
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
                        <p class="text-gray-600 leading-relaxed">{{ step.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="examples" class="py-24 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Witty, Topical, & Ready-to-Use</h2>
                    <p class="text-gray-500 text-lg max-w-2xl mx-auto">We don't just send news; we send the actual lines
                        you can say. See what our users received today:</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <div v-for="(topic, index) in examples" :key="index"
                        class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">{{ topic.title }}</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            {{ topic.body }}
                        </p>
                        <div class="flex justify-between items-center pt-6 border-t border-gray-100">
                            <div class="flex gap-2">
                                <span v-for="tag in topic.tags" :key="tag"
                                    class="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                                    {{ tag }}
                                </span>
                            </div>
                            <span class="text-sm font-medium text-gray-400">Use this today</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#8A56EC] text-white text-center">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your social skills?</h2>
                <p class="text-xl opacity-90 mb-10">Join thousands of others using SmallTalk to connect better every
                    day.</p>
                <SignUpButton mode="modal">
                    <button
                        class="bg-white text-[#8A56EC] hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition shadow-lg">
                        Sign Up for Free
                    </button>
                </SignUpButton>
            </div>
        </section>

        <footer class="bg-white border-t border-gray-100 py-12">
            <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="font-bold text-[#8A56EC] text-xl">Small Talk</div>
                <div class="flex gap-8 text-sm text-gray-500">
                    <a href="#" class="hover:text-[#8A56EC] transition">Privacy Policy</a>
                    <a href="#" class="hover:text-[#8A56EC] transition">Terms of Service</a>
                    <a href="#" class="hover:text-[#8A56EC] transition">Contact</a>
                </div>
                <div class="text-sm text-gray-400">© 2025 SmallTalk. All rights reserved.</div>
            </div>
        </footer>
    </div>
</template>
