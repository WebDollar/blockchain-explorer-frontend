<template>
    <div>
        <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">

            <div class="app-header header-shadow">
                <div class="logo">
                    <router-link to="/">
                        <span>WebDollar EXPLORER</span>
                    </router-link>
                    <div class="header__pane ml-auto"></div>
                </div>
                <div class="app-header__toolbar">
                    <div class="app-header-left">
                        <search-bar></search-bar>
                    </div>
                </div>
            </div>

            <div class="app-main">
                <div class="app-main__inner">
                    <slot></slot>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import common from "src/assets/common.css"
import SearchBar from "./search-bar"
export default {
    components: {SearchBar},

}
</script>

<style scoped>
    .logo{
        padding-left: 40px;
    }
    .app-header__toolbar{
        padding-left: 50px;
        width: 100%;
    }
</style>
