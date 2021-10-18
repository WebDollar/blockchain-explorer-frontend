<template>
    <div>
        <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">

            <div class="app-header header-shadow">
                <router-link to="/">
                    <div>
                        <img class="logo" :src="require('src/assets/WebDollar-logo.jpg').default" alt="WebDollar Explorer" />
                    </div>
                </router-link>
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
        margin-left: 20px;
        margin-right: 10px;
        width: 50px;
    }
    .app-header__toolbar{
        width: 100%;
    }
</style>
