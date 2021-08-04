<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> Address
                        <div class="page-title-subheading"> Viewing Address: {{this.addr}}</div>
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
                                        <th scope="row"><b>Address</b></th>
                                        <td>{{address.address}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Balance</b></th>
                                        <td>{{address.balance / 10000 }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><b>Nonce</b></th>
                                        <td>{{address.nonce}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div class="col-lg-12">

                    <div class="main-card mb-3 card">
                        <div data-v-14623592="" data-v-f3e19b62="" class="card-header-tab card-header"><div data-v-14623592="" data-v-f3e19b62="" class="card-header-title font-size-lg text-capitalize font-weight-normal"><i data-v-14623592="" data-v-f3e19b62="" class="header-icon lnr-laptop-phone mr-3 text-muted opacity-6"></i>
                            Transfers {{address.txs}}
                        </div></div>

                        <div class="card-body">

                            <show-tx v-for="(addressTx, index) in txs"  :class="`addressTx ${index % 2 ? 'row-odd' : ''} `"
                                     :key="`addr_tx_${index}`"
                                     :tx="addressTx.tx">

                            </show-tx>

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
import consts from "consts/consts"
import AddressHelper from "src/utils/address-helper"
import ShowTx from "../../components/show-tx";

export default {

    components: {ShowTx, Layout},

    data(){
        return {
            loading: true,
            error: "",

            address: null,
            txs: null,
        }
    },

    computed:{
        addr(){
            return this.$route.params.address+this.$route.hash
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

        async load(){

            try{
                this.loading = true;
                this.error = ""

                const addr = this.addr
                if (!addr) throw "Argument is missing"

                const address = await HttpHelper.get(consts.server + "/address", { address: addr} )
                this.address = address

                const txs = await HttpHelper.get(consts.server + "/address-txs", { address: addr} )
                this.txs = txs

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

    .addressTx{
        padding-top: 10px;
        padding-bottom: 10px;
    }

</style>
