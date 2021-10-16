<template>
    <div class="row">
        <div class="col-md-1">
            <router-link :to="`/block/${tx.blockHeight}`">
                {{tx.blockHeight}}
            </router-link>
        </div>
        <div class="col-md-1">
            <td>{{timeSince(tx.timestamp *1000 + 1524742312*1000) }}</td>
        </div>
        <div class="col-md-5">
            <span v-for="(from, index) in tx.data.from.addresses" class="input"
                  :key="`tx_from_${index}`">
                <router-link :to="`/address/${from.address}`">
                    {{from.address}}
                </router-link>
                <b class="text-danger">-{{formatMoney(from.amount/10000, 4)}}</b>
            </span>
        </div>
        <div class="col-md-5">
            <span v-for="(to, index) in tx.data.to.addresses" class="output"
                  :key="`tx_to_${index}`">
                <router-link :to="`/address/${to.address}`">
                    {{to.address}}
                </router-link>
                <b class="text-primary">+{{formatMoney( to.amount/10000, 4) }}</b>
            </span>
        </div>
    </div>
</template>

<script>
import StringHelper from "src/utils/string-helper"
export default {
    props: {
        tx: null,
    },
    methods:{
        timeSince: (...args) => StringHelper.timeSince(...args),
        formatMoney: (...args) => StringHelper.formatMoney(...args),
    }
}
</script>

<style scoped>


    .row-odd{
        background-color: rgba(0,0,0,0.03)
    }

    .output, .input{
        display: block
    }

</style>
