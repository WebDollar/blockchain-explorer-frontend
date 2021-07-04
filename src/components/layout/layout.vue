<template>
    <div>
        <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">

            <div class="app-header header-shadow">
                <div class="logo">
                    <router-link :to="`/`">
                        <span>WebDollar EXPLORER</span>
                    </router-link>
                    <div class="header__pane ml-auto">
                    </div>
                </div>
                <div class="app-header__toolbar">
                    <div class="app-header-left">
                        <div class="search-wrapper active">
                            <div class="input-holder">
                                <input type="text" class="search-input" placeholder="Type to search">
                                <button class="search-icon"><span></span></button>
                            </div>
                        </div>
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
export default {

}
</script>

<style scoped>
    .logo{
        padding-left: 40px;
    }
    .app-header__toolbar{
        padding-left: 50px;
    }
</style>
