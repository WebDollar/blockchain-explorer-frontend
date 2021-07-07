import VueRouter from "vue-router"
import Vue from "vue";

import HomePage from "src/pages/home/home.page"
import BlockPage from "src/pages/blocks/block.page"
import TxPage from "src/pages/txs/tx.page"
import AddressPage from "src/pages/addresses/address.page"
import NotFoundPage from "src/pages/not-found/not-found.page"

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/blocks/:page', component: HomePage },

    { path: '/block/:param', component: BlockPage },
    { path: '/tx/:hash', component: TxPage },
    { path: '/address/:address', component: AddressPage },
    { path: '/not-found', component: NotFoundPage },
];

const router = new VueRouter({
    base: '/',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {

        try{
            if (to.hash) return { selector: to.hash }
            else if (savedPosition) return savedPosition;
            else return { x: 0, y: 0 }
        }catch(err){

        }
    },
    routes // short for `routes: routes`
});

export default router;
