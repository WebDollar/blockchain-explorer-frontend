<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> Block
                        <div class="page-title-subheading text-truncate"> Viewing block: {{this.$route.params.param}}</div>
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

                <div class="row">
                    <div class="col-lg-12">
                        <div class="main-card mb-3 card">
                            <div class="card-body">
                                <h5 class="card-title">Block</h5>
                                <table class="mb-0 table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row"><b>Height</b></th>
                                            <td>{{block.height}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Hash</b></th>
                                            <td>{{block.hash}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>POW/POS</b></th>
                                            <td>todo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Version</b></th>
                                            <td>{{block.data.version}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Hash Prev</b></th>
                                            <td>
                                                <router-link :to="`/block/${block.data.hashPrev}`">
                                                    {{block.data.hashPrev}}
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Hash Chain Prev</b></th>
                                            <td>{{block.data.hashChainPrev}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Miner Address</b></th>
                                            <td class="wordwrap">
                                                <router-link :to="`/address/${convertAddress(block.data.data.minerAddress)}`">
                                                    {{convertAddress(block.data.data.minerAddress)}}
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Nonce</b></th>
                                            <td>{{block.data.nonce}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Timestamp</b></th>
                                            <td>{{timeSince(block.data.timeStamp *1000 + 1524742312*1000) }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Difficulty</b></th>
                                            <td>{{block.data.difficulty}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Hash Chain</b></th>
                                            <td>{{block.data.hashChain}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Reward</b></th>
                                            <td>{{block.data.reward/10000}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Resolved by</b></th>
                                            <td class="wordwrap">
                                                <template v-if="block.data.posMinerAddress">
                                                    <router-link :to="`/address/${convertAddress(block.data.posMinerAddress)}`">
                                                        {{convertAddress(block.data.posMinerAddress)}}
                                                     </router-link>
                                                </template>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Transactions</b></th>
                                            <td>
                                                <span v-for="(tx, index) in block.data.data.transactions"
                                                      :key="`tx_index_${index}`">
                                                    <router-link :to="`/tx/${tx.txId}`">
                                                        {{tx.txId}}
                                                    </router-link> <br/>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

export default {

    components: {Layout},

    data(){
        return {
            loading: true,
            error: "",

            block: null,
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
        timeSince: (...args) => StringHelper.timeSince(...args),

        async load(){

            try{
                this.loading = true;
                this.error = ""

                const param = this.$route.params.param
                if (!param) throw "Argument is missing"

                const block = await HttpHelper.get(consts.server + "/block/" + param )
                this.block = block

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
