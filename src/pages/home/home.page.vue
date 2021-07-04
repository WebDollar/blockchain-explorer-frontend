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
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Height</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Hash</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >TXs</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Timestamp</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Reward</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Miner</th>
                                                <th tabindex="0" aria-controls="example" rowspan="1" colspan="1" >Resolved by</th>
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
                                                <td>{{block.data.timeStamp}}</td>
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
                                            <li class="paginate_button page-item previous disabled"
                                                id="example_previous"><a href="#" aria-controls="example"
                                                                         data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                            </li>
                                            <li class="paginate_button page-item active"><a href="#"
                                                                                            aria-controls="example"
                                                                                            data-dt-idx="1" tabindex="0"
                                                                                            class="page-link">1</a></li>
                                            <li class="paginate_button page-item "><a href="#" aria-controls="example"
                                                                                      data-dt-idx="2" tabindex="0"
                                                                                      class="page-link">2</a></li>
                                            <li class="paginate_button page-item "><a href="#" aria-controls="example"
                                                                                      data-dt-idx="3" tabindex="0"
                                                                                      class="page-link">3</a></li>
                                            <li class="paginate_button page-item "><a href="#" aria-controls="example"
                                                                                      data-dt-idx="4" tabindex="0"
                                                                                      class="page-link">4</a></li>
                                            <li class="paginate_button page-item "><a href="#" aria-controls="example"
                                                                                      data-dt-idx="5" tabindex="0"
                                                                                      class="page-link">5</a></li>
                                            <li class="paginate_button page-item "><a href="#" aria-controls="example"
                                                                                      data-dt-idx="6" tabindex="0"
                                                                                      class="page-link">6</a></li>
                                            <li class="paginate_button page-item next" id="example_next"><a href="#"
                                                                                                            aria-controls="example"
                                                                                                            data-dt-idx="7"
                                                                                                            tabindex="0"
                                                                                                            class="page-link">Next</a>
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

    methods:{

        subtract(s, letters = 6){
            return s.substr(0, letters) + '...'+s.substr(s.length-letters)
        },

        convertAddress: (a) => AddressHelper.convertAddress(a) ,

        async load(){

            try{
                this.loading = true
                this.error = ""

                const out = await HttpHelper.get(consts.server+"/chain")
                this.height = out.height
                this.hash = out.hash

                await this.getBlocks(this.height-10)

            }catch(err){
                this.error = err.toString()
            }finally{
                this.loading = false
            }

        },

        async getBlocks(start){

            this.start = start;
            this.end = start + 10

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
