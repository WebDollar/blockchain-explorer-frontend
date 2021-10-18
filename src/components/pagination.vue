<template>
    <div class="row" style="padding-top: 20px">
        <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="example_info" role="status" aria-live="polite">
                Showing {{ Math.max(0, this.start) }} to {{this.end}} of {{total}} entries
            </div>
        </div>
        <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate" id="pagination">
                <ul :class="`pagination ${rightToLeft ? 'rtl' : ''} `">

                    <li class="paginate_button page-item previous" v-if="page !== pages">
                        <router-link :to="`/${prefix}/${pages}`" class="page-link"><<</router-link>
                    </li>
                    <li class="d-none d-sm-block paginate_button page-item" v-if="page < pages-2">
                        <router-link :to="`/${prefix}/${page+2}`"  class="page-link">{{ page+2 }}</router-link>
                    </li>
                    <li class="paginate_button page-item" v-if="page < pages -1 ">
                        <router-link :to="`/${prefix}/${page+1}`" class="page-link">{{ page+1}}</router-link>
                    </li>
                    <li class="paginate_button page-item active">
                        <router-link :to="`/${prefix}/${page}`" class="page-link">{{ page }}</router-link>
                    </li>
                    <li class="paginate_button page-item" v-if="page>1">
                        <router-link :to="`/${prefix}/${page-1}`" class="page-link">{{ page-1 }}</router-link>
                    </li>
                    <li class="d-none d-sm-block paginate_button page-item " v-if="page>2">
                        <router-link :to="`/${prefix}/${page-2}`" class="page-link">{{ page-2 }}</router-link>
                    </li>
                    <li class="paginate_button page-item next" v-if="page >0">
                        <router-link :to="`/${prefix}/0`" class="page-link">>></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pages: {default: 0},
        page: {default: 0},
        start: {default: 0},
        end: {default: 0},
        total: {default: 0},
        prefix: {default: ''},
        rightToLeft: {default: false}
    }
}
</script>

<style>
.rtl{
    direction: rtl;
}
</style>