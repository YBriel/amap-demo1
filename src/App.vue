<template>
    <div >
        <h1>哈哈哈</h1>

        <router-view></router-view>
    </div>

</template>

<script>
export  default {
    mounted(){
        this.$router.push({ path: '/GOOGList' })
    }
}
</script>

<style>

</style>
