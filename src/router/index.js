import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Puzzle from '@/views/Puzzle.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/puzzle/:id?',
        name: 'Puzzle',
        component: Puzzle
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
export default router