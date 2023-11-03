import {createRouter, createWebHistory} from 'vue-router'
import {authStore} from '@/stores/auth'
import Songs from "@/views/Songs.vue";
import Login from "@/views/Login.vue";
import Album from "@/views/Album.vue";
import About from "@/views/About.vue";


const router = createRouter({
    history: createWebHistory(), routes: [{
        path: '/', component: Songs,
    }, {
        path: '/login', component: Login,
    }, {
        path: '/album', component: Album,
    },{
        path: '/about', component: About,
    },
    ]
})

router.beforeEach((to, from, next) => {
    const store = authStore();
    const isAuthenticated = store.isLogged;

    if (!isAuthenticated && to.path !== '/login') {
        next('/login');
    } else if (isAuthenticated && to.path === '/login') {
        next('/');
    } else {
        next();
    }
})


export default router
