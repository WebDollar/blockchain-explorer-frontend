<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>
                        <span>Address</span>
                        <div class="d-block">
                            <div class="address ">
                                <img :src="gravatar" :alt="this.addr" />
                                <div class="page-title-subheading text-truncate"> {{ this.addr }} </div>
                            </div>
                        </div>
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
                                <h5 class="card-title">Tx</h5>
                                <table class="mb-0 table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row"><b>Address</b></th>
                                            <td class="fw-bolder"> {{address.address}} </td>
                                        </tr>
                                        <tr v-if="displayAddress(address.address) !== address.address">
                                            <th scope="row">Address name</th>
                                            <td class="fw-bolder"> {{ displayAddress(address.address) }} </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><b>Final Balance</b></th>
                                            <td><b>{{ formatMoney( address.balance / 10000, 4) }}</b></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Sent</th>
                                            <td>{{ formatMoney( address.totalSent / 10000, 4) }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Received</th>
                                            <td>{{ formatMoney( address.totalReceived / 10000, 4) }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Mined Solo</th>
                                            <td>{{ formatMoney( address.totalMinedSolo / 10000, 4) }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Mined for Pools (blocks won in pools)</th>
                                            <td>{{ formatMoney( address.totalMinedPool / 10000, 4) }}</td>
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

                                <div v-if="loadingTxs" style="text-align: center">
                                    <i class="fa fa-spinner fa-spin fa-3x" > </i>
                                </div>
                                <template v-else>
                                    <show-tx v-for="(addressTx, index) in txs"  :class="`addressTx ${index % 2 ? 'row-odd' : ''} `"
                                             :key="`addr_tx_${index}`"
                                             :tx="addressTx.tx"
                                             :address="addr">

                                    </show-tx>
                                    <pagination :pages="pages" :page="page" :start="start" :end="end" :total="address.txs" :prefix="`address/${this.addr}`"  :right-to-left="true" />
                                </template>

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
import consts from "consts/consts"
import AddressHelper from "src/utils/address-helper"
import ShowTx from "../../components/show-tx";
import CryptoHelper from "src/utils/crypto-helper"
import StringHelper from "src/utils/string-helper"
import Pagination from "src/components/pagination"

export default {

    components: {ShowTx, Layout, Pagination},

    data(){
        return {
            loading: true,
            loadingTxs: true,

            error: "",

            address: null,
            txs: null,
            pageSet: 0,

            refreshInterval: null,
        }
    },

    computed:{
        page(){

            const addr = ( this.$route.params.address+this.$route.hash+(this.$route.params.page ? '/'+this.$route.params.page : '')).trim().replace("%23","#")
            if (addr.indexOf('/') > 0)
                return Number.parseInt( addr.slice(addr.indexOf('/')+1  ) )

            return this.pageSet
        },

        pages(){
            if (!this.address) return 0
            if (this.address.txs===0) return 0
            return Math.floor(this.address.txs/10)
        },

        addr(){
            const addr = ( this.$route.params.address+this.$route.hash+ (this.$route.params.page ? '/'+this.$route.params.page : '')).trim().replace("%23","#")
            if (addr.indexOf('/') > 0)
                return addr.slice(0, addr.indexOf('/') )
            return addr
        },

        gravatar(){
            const address = CryptoHelper.SHA256(this.addr)
            return `https://www.gravatar.com/avatar/${ address.toString("hex") }?d=retro&f=y`
        },
    },

    async mounted(){
        if (!this.refreshInterval)
            this.refreshInterval = setInterval(()=>this.loadTxs(), 45 * 1000)

        return this.load()
    },

    watch:{
        $route (to, from){

            if (!this.refreshInterval)
                this.refreshInterval = setInterval(()=>this.loadTxs(), 45 * 1000)

            return this.load()
        }
    },

    beforeDestroy() {
        if (this.refreshInterval)
            clearInterval(this.refreshInterval)
    },

    methods: {

        convertAddress: (a) => AddressHelper.convertAddress(a),
        formatMoney: (...args) => StringHelper.formatMoney(...args),
        displayAddress: (...args) => AddressHelper.displayAddress(...args),

        async load(){

            try{
                this.loading = true;
                this.error = ""

                const addr = this.addr
                if (!addr) throw "Argument is missing"

                const address = await HttpHelper.get(consts.server + "/address", { address: addr} )
                this.address = address

                this.pageSet =  Math.floor(address.txs / 10)

                await this.loadTxs()

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loading = false
            }

        },

        async loadTxs(){
            try{
                this.loadingTxs = true

                this.start = Math.min(this.page * 10, this.address.txs-10);
                this.end = this.start + 10

                const txs = await HttpHelper.get(consts.server + "/address-txs", { address: this.addr, start: this.start, end: this.end} )

                if (this.txs && JSON.stringify(this.txs) !== JSON.stringify(txs)){
                    var audio = new Audio('https://soundbible.com/mp3/Police%20Siren%203-SoundBible.com-553177907.mp3');
                    audio.play();
                }

                this.txs = txs

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loadingTxs = false
            }
        }

    }

}

</script>

<style scoped>

    .addressTx{
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .address{
        display: grid;
        grid-template-columns: 70px 1fr;
        grid-column-gap: 10px;
        align-items: center;
    }

    .address img{
        display: inline-block;
        width: 64px;
        border-radius: 50%;
    }

    .address .page-title-subheading{
        display: inline-block;
    }

</style>
