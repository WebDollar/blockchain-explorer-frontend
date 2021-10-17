<template>
    <div class="search-wrapper active">
        <div class="input-holder">
            <input type="text" class="search-input" placeholder="Block Height/Hash, Tx Hash, Address" v-model="search" v-on:keyup.enter="handleSearch" >
            <button class="search-icon" @click="handleSearch">
                <span></span>
            </button>
        </div>
    </div>
</template>

<script>
import HttpHelper from "src/utils/http-helper"
import consts from "../../../consts/consts";
export default {

    data(){
        return{
            search: "",
            loading: false,
            error: ""
        }
    },

    methods: {
        async handleSearch(){
            try{
                this.loading = true
                this.error = ""

                const search = (this.search || "").trim()

                const out = await HttpHelper.get(consts.server+"/search", {param: search })
                if (!out || !out.result) throw "Result was not received"

                if (out.result === "block") this.$router.push('/block/'+search)
                if (out.result === "tx") this.$router.push('/tx/'+search)
                if (out.result === "address") this.$router.push('/address/'+search)

            }catch(err){
                this.error = err.toString()
                this.$router.push('/not-found')
            }finally{
                this.loading = false
            }
        }
    },
}
</script>

<style scoped>
    .search-wrapper{
        width: 100%;
    }
    .input-holder{
        width: 100% !important;
    }
</style>
