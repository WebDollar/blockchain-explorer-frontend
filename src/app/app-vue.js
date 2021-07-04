import Vue from "vue";
import Loading from './app';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from "src/router/router.index"

export default (params) => {

    return window.Frontend = new Vue({
        el: '#app',
        router,
        render: (createElement) => {

            return createElement( Loading, {
                props: {
                }
            });

        }
    });

}
