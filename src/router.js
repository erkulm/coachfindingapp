import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches', },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration, meta: { authRequired: true } },
        { path: '/requests', component: RequestsReceived, meta: { authRequired: true } },
        { path: '/auth', component: UserAuth, meta: { noAuthRequired: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach(function (to, _, next) {
    if (to.meta.authRequired && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.noAuthRequired && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;