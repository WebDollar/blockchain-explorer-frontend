<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> Transaction
                        <div class="page-title-subheading"> Viewing Tx: {{this.$route.params.hash}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" style="text-align: center">
            <i class="fa fa-spinner fa-spin fa-3x" > </i>
        </div>
        <template v-else>

            <div v-if="error" class="alert alert-danger fade show" role="alert">{{error}}</div>
            <template v-else>

                <div class="col-lg-12">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Tx</h5>
                            <table class="mb-0 table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row"><b>Hash</b></th>
                                        <td>{{tx.txId}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Nonce</b></th>
                                        <td>{{tx.data.nonce}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Version</b></th>
                                        <td>{{tx.data.version}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>TimeLock</b></th>
                                        <td>{{tx.data.timeLock}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Timestamp</b></th>
                                        <td>{{timeSince(tx.timestamp *1000 + 1524742312*1000) }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Block</b></th>
                                        <td>
                                            <router-link :to="`/block/${tx.blockHeight}`">
                                                {{tx.blockHeight}}
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div class="col-lg-12">

                    <div class="main-card mb-3 card">
                        <div data-v-14623592="" data-v-f3e19b62="" class="card-header-tab card-header"><div data-v-14623592="" data-v-f3e19b62="" class="card-header-title font-size-lg text-capitalize font-weight-normal"><i data-v-14623592="" data-v-f3e19b62="" class="header-icon lnr-laptop-phone mr-3 text-muted opacity-6"></i>
                            Transfers
                        </div></div>
                        <div class="card-body">

                            <show-tx :tx="tx" />

                        </div>
                    </div>

                </div>

            </template>

        </template>


    </layout>
</template>

<script>

import Layout from "src/components/layout/layout"
import HttpHelper from "src/utils/http-helper"
import StringHelper from "src/utils/string-helper"
import consts from "consts/consts"
import AddressHelper from "src/utils/address-helper"
import ShowTx from "../../components/show-tx";

export default {

    components: {ShowTx, Layout},

    data(){
        return {
            loading: true,
            error: "",

            tx: null,
        }
    },

    async mounted(){
        return this.load()
    },

    watch:{
        $route (to, from){
            return this.load()
        }
    },

    methods: {

        convertAddress: (a) => AddressHelper.convertAddress(a),
        timeSince: (a) => StringHelper.timeSince(a),

        async load(){

            try{
                this.loading = true;
                this.error = ""

                const hash = this.$route.params.hash
                if (!hash) throw "Argument is missing"

                const tx = await HttpHelper.get(consts.server + "/tx/" + hash )
                this.tx = tx

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loading = false
            }

        },

    }

}

</script>

<style scoped>

</style>
