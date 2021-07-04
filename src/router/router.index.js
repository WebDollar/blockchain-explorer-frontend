import VueRouter from "vue-router"
import Vue from "vue";

import HomePage from "src/pages/home/home.page"
import BlockPage from "src/pages/blocks/block.page"
import TxPage from "src/pages/txs/tx.page"
import AddressPage from "src/pages/addresses/address.page"

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/block/:param', component: BlockPage },
    { path: '/tx/:hash', component: TxPage },
    { path: '/address/:address', component: AddressPage },
];

const router = new VueRouter({
    base: '/',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { selector: to.hash }
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes // short for `routes: routes`
});

export default router;