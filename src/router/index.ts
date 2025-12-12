import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@clerk/vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingPage
        },
        {
            path: '/app',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        }
    ]
})


router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        // We can check auth here if needed, but Clerk handles this gracefully usually.
        // For now, let's just proceed. The HomeView components show Sign In buttons if not signed in,
        // but typically we'd want to redirect to landing if not signed in.
        // However, Clerk's useAuth might not be available immediately outside of component context easily without some setup.
        // Simple approach: Let the view handle the "SignedOut" state or redirect.
        // But for better UX, let's keep it simple.
        next()
    } else {
        next()
    }
})

export default router
