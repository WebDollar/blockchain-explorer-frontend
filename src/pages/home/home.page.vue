<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> WebDollar Blockchain Explorer
                        <div class="page-title-subheading">WebDollar operates on the WebDollar native blockchain. You can explore the WebDollar blockchain using this tool.</div>
                        <div class="page-title-subheading">See most <router-link to="/known-addresses">known addresses</router-link>.</div>
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
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                            Status Blockchain
                        </div>
                    </div>
                    <div class="no-gutters row">
                        <div class="col-sm-6 col-md-3 col-xl-3">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                                    <i class="fa fa-cubes text-dark opacity-8"></i>
                                </div>
                                <div class="widget-chart-content text-truncate">
                                    <div class="widget-subheading">Blocks</div>
                                    <div class="widget-numbers">{{chain.height}}</div>
                                </div>
                            </div>
                            <div class="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div class="col-sm-6 col-md-3 col-xl-3">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                                    <i class="fa fa-cube text-white"></i>
                                </div>
                                <div class="widget-chart-content text-truncate">
                                    <div class="widget-subheading">Last Block Hash</div>
                                    <div class="widget-numbers"><span>...{{chain.hash.substr(chain.hash.length-5)}}</span></div>
                                </div>
                            </div>
                            <div class="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div class="col-sm-6 col-md-3 col-xl-3">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                                    <i class="fa fa-coins text-white"></i>
                                </div>
                                <div class="widget-chart-content text-truncate">
                                    <div class="widget-subheading">Supply</div>
                                    <div class="widget-numbers"><span>{{ Math.floor( chain.circulatingSupply/10000/1000/1000/100)/10 }} b</span></div>
                                </div>
                            </div>
                            <div class="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div class="col-sm-6 col-md-3 col-xl-3">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                                    <i class="fa fa-credit-card text-white"></i>
                                </div>
                                <div class="widget-chart-content text-truncate">
                                    <div class="widget-subheading">Transactions</div>
                                    <div class="widget-numbers"><span>{{chain.transactionsCount}}</span></div>
                                </div>
                            </div>
                            <div class="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                    </div>

                </div>


                <div class="card mb-3">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-laptop-phone mr-3 text-muted opacity-6"> </i>
                            WebDollar Blocks
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="table-responsive">
                                <table class="align-middle text-truncate mb-0 table table-borderless table-hover">
                                    <thead>
                                        <tr role="row">
                                            <th class="text-center" style="width:70px">Height</th>
                                            <th class="text-center" style="width: 140px;" >Hash</th>
                                            <th class="text-center" style="width: 140px;" >TXs</th>
                                            <th class="text-center" style="width: 80px" >Timestamp</th>
                                            <th class="text-center" style="width: 60px">Reward</th>
                                            <th class="text-center" style="width: 180px" >Miner</th>
                                            <th class="text-center" style="width: 180px" >Resolved by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(block, index) in blocks"
                                            :key="`tr_block_${index}`" role="row" :class="`${index % 2 === 0 ? 'odd': ''}`">
                                            <td class="text-center" style="width:70px" >
                                                <router-link :to="`/block/${block.height}`">
                                                    {{block.height}}
                                                </router-link>
                                            </td>
                                            <td class="text-center" style="width: 140px;">
                                                <router-link :to="`/block/${block.hash}`">
                                                    {{ subtract( block.hash, 6 )}}
                                                </router-link>
                                            </td>
                                            <td class="text-center" style="width: 140px;" >
                                                <div v-for="(tx, index) in block.data.data.transactions"
                                                      :key="`tx_block_${index}`"
                                                       class="text-truncate"
                                                       style="display: block">
                                                    <router-link :to="`/tx/${tx.txId}`">
                                                        {{ tx.txId }}
                                                    </router-link>
                                                </div>
                                            </td>
                                            <td class="text-center"  style="width: 80px">{{ timeSince(block.data.timeStamp*1000 + 1524742312*1000) }}</td>
                                            <td class="text-center"  style="width: 60px">{{block.data.reward/10000}}</td>
                                            <td class="text-center text-truncate"  style="width: 180px">
                                                <template v-if="block.data.data.minerAddress">
                                                    <router-link :to="`/address/${convertAddress(block.data.data.minerAddress)}`" :title="convertAddress(block.data.data.minerAddress)" >
                                                        {{ displayAddress( convertAddress(block.data.data.minerAddress) ) }}
                                                    </router-link>
                                                </template>
                                            </td>
                                            <td class="text-center text-truncate" style="width: 180px" >
                                                <template v-if="block.data.posMinerAddress">
                                                    <router-link :to="`/address/${convertAddress(block.data.posMinerAddress)}`" :title=" convertAddress(block.data.posMinerAddress) ">
                                                        {{ displayAddress( convertAddress(block.data.posMinerAddress)  ) }}
                                                    </router-link>
                                                </template>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row" style="padding-top: 20px">
                            <div class="col-sm-12 col-md-5">
                                <div class="dataTables_info" id="example_info" role="status" aria-live="polite">
                                    Showing {{this.start}} to {{this.end}} of {{height}} entries
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-7">
                                <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
                                    <ul class="pagination">

                                        <li class="paginate_button page-item previous" v-if="page != pages">
                                            <router-link :to="`/blocks/${pages}`" class="page-link"><<</router-link>
                                        </li>
                                        <li class="d-none d-sm-block paginate_button page-item" v-if="page < pages-2">
                                            <router-link :to="`/blocks/${page+2}`"  class="page-link">{{ page+2 }}</router-link>
                                        </li>
                                        <li class="paginate_button page-item" v-if="page < pages -1 ">
                                            <router-link :to="`/blocks/${page+1}`" class="page-link">{{ page+1}}</router-link>
                                        </li>
                                        <li class="paginate_button page-item active">
                                            <router-link :to="`/blocks/${page}`" class="page-link">{{ page }}</router-link>
                                        </li>
                                        <li class="paginate_button page-item" v-if="page>1">
                                            <router-link :to="`/blocks/${page-1}`" class="page-link">{{ page-1 }}</router-link>
                                        </li>
                                        <li class="d-none d-sm-block paginate_button page-item " v-if="page>2">
                                            <router-link :to="`/blocks/${page-2}`" class="page-link">{{ page-2 }}</router-link>
                                        </li>
                                        <li class="paginate_button page-item next" v-if="page >0">
                                            <router-link :to="`/blocks/0`" class="page-link">>></router-link>
                                        </li>
                                    </ul>
                                </div>
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
import StringHelper from "src/utils/string-helper"

export default {
    components: { Layout },

    data(){
        return{
            loading: true,
            error: "",

            chain: null,
            blocks: [],

            start: 0,
            end: 0,
            height: 0,

            pageSet: null,
        }
    },

    watch:{
        $route (to, from){
            return this.load()
        }
    },

    mounted(){
        return this.load()
    },

    computed: {

        page(){
            if (typeof this.$route.params.page === "string")
                return Number.parseInt(this.$route.params.page)

            return this.pageSet
        },

        pages(){
            if (!this.chain) return 0
            if (this.chain.height===0) return 0
            return Math.floor(this.chain.height/10)
        }
    },

    methods:{

        subtract(s, letters = 6){
            return s.substr(0, letters) + '...'+s.substr(s.length-letters)
        },

        convertAddress: (a) => AddressHelper.convertAddress(a) ,
        timeSince: (...args) => StringHelper.timeSince(...args),
        displayAddress: (...args) => AddressHelper.displayAddress(...args),

        async load(){

            try{
                this.loading = true
                this.error = ""

                const out = await HttpHelper.get(consts.server+"/chain")
                this.chain = out

                if (this.page === null )
                    this.pageSet = Math.floor(this.chain.height / 10)

                await this.getBlocks()

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loading = false
            }

        },

        async getBlocks(){

            this.start = Math.min(this.page * 10, this.chain.height-10);
            this.end = this.start + 10
            this.height = this.chain.height

            const outBlocks = await HttpHelper.get(consts.server+"/blocks", {
                start: this.start,
                end: this.end,
            })
            this.blocks = outBlocks.sort((a,b) => b.height - a.height)

        }

    }

}
</script>

<style scoped>
    .widget-numbers{
        font-size: 2rem;
    }
</style>
