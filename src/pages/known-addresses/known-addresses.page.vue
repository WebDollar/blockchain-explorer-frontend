<template>
    <layout>

        <div class="app-page-title">
            <div class="page-title-wrapper pd-bottom-20">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-diamond icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div> WebDollar Known Addreses
                        <div class="page-title-subheading">Here is a list of the most known addreses.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Known Addresses</h5>
                        <table class="mb-0 table table-bordered">
                            <tbody>
                                <tr v-for="(name, address) in knownAddresses">
                                    <th scope="row">
                                        <router-link :to="`/address/${address}`" :title="address">
                                            {{address}}
                                         </router-link>
                                    </th>
                                    <td class="fw-bolder"> {{name}} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </layout>
</template>

<script>

import AddressHelper from "src/utils/address-helper"
import Layout from "../../components/layout/layout";

export default {
    components: { Layout },

    computed:{
        knownAddresses(){
            return AddressHelper.knownAddresses
        }
    }

}
</script>