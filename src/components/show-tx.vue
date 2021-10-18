<template>
    <div class="row">
        <div class="col-md-1">
            <router-link :to="`/block/${tx.blockHeight}`">
                {{tx.blockHeight}}
            </router-link>
        </div>
        <div class="col-md-1" :title="new Date(tx.timestamp *1000 + 1524742312*1000)">
            <td>{{timeSince(tx.timestamp *1000 + 1524742312*1000) }}</td>
        </div>
        <div class="col-md-2 text-truncate">
            <router-link :to="`/tx/${tx.txId}`">
                {{tx.txId}}
            </router-link>
        </div>
        <div class="col-md-4">
            <span v-for="(from, index) in tx.data.from.addresses" class="input"
                  :key="`tx_from_${index}`">
                <div class="text-truncate">
                    <router-link :to="`/address/${from.address}`" :title="from.address">
                        {{displayAddress(from.address)}}
                    </router-link>
                </div>
                <b class="text-danger">-{{formatMoney(from.amount/10000, 4)}}</b>
            </span>
        </div>
        <div class="col-md-4">
            <span v-for="(to, index) in tx.data.to.addresses" class="output"
                  :key="`tx_to_${index}`">
                <div class="text-truncate">
                    <router-link :to="`/address/${to.address}`" :title="to.address">
                        {{displayAddress(to.address)}}
                    </router-link>
                </div>
                <b class="text-primary">+{{formatMoney( to.amount/10000, 4) }}</b>
            </span>
        </div>
    </div>
</template>

<script>
import StringHelper from "src/utils/string-helper"
import AddressHelper from "src/utils/address-helper";

export default {
    props: {
        tx: null,
    },
    methods:{
        timeSince: (...args) => StringHelper.timeSince(...args),
        formatMoney: (...args) => StringHelper.formatMoney(...args),
        displayAddress: (...args) => AddressHelper.displayAddress(...args),
    }
}
</script>

<style scoped>


    .row-odd{
        background-color: rgba(0,0,0,0.03)
    }

    .output, .input{
        display: grid;
        grid-template-columns: 1fr auto;
        grid-column-gap: 10px;
    }

</style>
