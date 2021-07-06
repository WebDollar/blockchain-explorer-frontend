<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> WebDollar Blockchain Explorer
                        <div class="page-title-subheading">WebDollar operates on the WebDollar native blockchain. You can explore the WebDollar blockchain using this tool or <a href="https://webdollar.network" target="_blank">webdollar.network</a>.</div>
                    </div>
                </div>
            </div>
        </div>

        <i  v-if="loading" class="fa fa-spinner fa-spin fa-3x" > </i>
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
                        <div class="col-sm-6 col-md-6 col-xl-6">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                                    <i class="lnr-database text-dark opacity-8"></i>
                                </div>
                                <div class="widget-chart-content">
                                    <div class="widget-subheading">Blocks</div>
                                    <div class="widget-numbers">{{height}}</div>
                                </div>
                            </div>
                            <div class="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-xl-6">
                            <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                                    <i class="lnr-book text-white"></i>
                                </div>
                                <div class="widget-chart-content">
                                    <div class="widget-subheading">Last Block Hash</div>
                                    <div class="widget-numbers"><span>{{hash.substr(0,4)}}...{{hash.substr(hash.length-4)}}</span></div>
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
                        <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table style="width: 100%;"
                                           class="table table-hover table-striped table-bordered dataTable dtr-inline"
                                           role="grid" aria-describedby="example_info">
                                        <thead>
                                            <tr role="row">
                                                <th style="width:80px">Height</th>
                                                <th >Hash</th>
                                                <th >TXs</th>
                                                <th style="width: 80px" >Timestamp</th>
                                                <th style="width: 60px">Reward</th>
                                                <th >Miner</th>
                                                <th >Resolved by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(block, index) in blocks"
                                                :key="`tr_block_${index}`" role="row" :class="`${index % 2 === 0 ? 'odd': ''}`">
                                                <td>
                                                    <router-link :to="`/block/${block.height}`">
                                                        {{block.height}}
                                                    </router-link>
                                                </td>
                                                <td>
                                                    <router-link :to="`/block/${block.hash}`">
                                                        {{ subtract( block.hash, 6 )}}
                                                    </router-link>
                                                </td>
                                                <td>
                                                    <span v-for="(tx, index) in block.data.data.transactions"
                                                          :key="`tx_block_${index}`">
                                                        <router-link :to="`/tx/${tx}`">
                                                            {{ subtract( tx) }}
                                                        </router-link>
                                                        <br/>
                                                    </span>
                                                </td>
                                                <td>{{ timeSince(block.data.timeStamp*1000 + 1524742312*1000) }}</td>
                                                <td>{{block.data.reward/10000}}</td>
                                                <td>
                                                    <template v-if="block.data.data.minerAddress">
                                                        <router-link :to="`/address/${convertAddress(block.data.data.minerAddress)}`">
                                                            {{ subtract( convertAddress(block.data.data.minerAddress), 8 ) }}
                                                        </router-link>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template v-if="block.data.posMinerAddress">
                                                        <router-link :to="`/address/${convertAddress(block.data.posMinerAddress)}`">
                                                            {{subtract( convertAddress(block.data.posMinerAddress), 8 ) }}
                                                        </router-link>
                                                    </template>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                    <div class="dataTables_info" id="example_info" role="status" aria-live="polite">
                                        Showing {{this.start}} to {{this.end}} of {{height}} entries
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
                                        <ul class="pagination">

                                            <li class="paginate_button page-item previous" v-if="page != pages">
                                                <router-link :to="`/blocks/${pages}`" class="page-link">{{ pages }} << </router-link>
                                            </li>
                                            <li class="paginate_button page-item" v-if="page < pages-2">
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
                                            <li class="paginate_button page-item " v-if="page>2">
                                                <router-link :to="`/blocks/${page-2}`" class="page-link">{{ page-2 }}</router-link>
                                            </li>
                                            <li class="paginate_button page-item next" v-if="page >0">
                                                <router-link :to="`/blocks/0`" class="page-link">>> 0</router-link>
                                            </li>
                                        </ul>
                                    </div>
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

            height: "",
            hash: "",
            blocks: [],

            start: 0,
            end: 0,

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
            if (this.height===0) return 0
            return Math.floor(this.height/10)
        }
    },

    methods:{

        subtract(s, letters = 6){
            return s.substr(0, letters) + '...'+s.substr(s.length-letters)
        },

        convertAddress: (a) => AddressHelper.convertAddress(a) ,
        timeSince: (a) => StringHelper.timeSince(a),

        async load(){

            try{
                this.loading = true
                this.error = ""

                const out = await HttpHelper.get(consts.server+"/chain")
                this.height = out.height
                this.hash = out.hash

                if (this.page === null )
                    this.pageSet = Math.floor(this.height / 10)

                await this.getBlocks()

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loading = false
            }

        },

        async getBlocks(){

            this.start = Math.min(this.page * 10, this.height-10);
            this.end = this.start + 10

            const outBlocks = await HttpHelper.get(consts.server+"/blocks", {
                start: this.start,
                end: this.end,
            })
            this.blocks = outBlocks

        }

    }

}
</script>

<style scoped>
</style>
