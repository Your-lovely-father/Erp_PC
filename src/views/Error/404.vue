<template>
    <div class="no-funcion">
        <img src="../../assets/images/404.jpg" alt="">
        <div class="image">
            <img src="../../assets/images/fan.png" alt="" @click="fan()" style="cursor:pointer">
        </div>
    </div>
</template>
<script>

    export default {

        components: {},
        data() {
            return {}
        },
        methods: {
            fan() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .no-funcion {
        width: 100%;
        height: 100%
        background #dad8d9;
        text-align center;
        position: relative;
    }

    .no-funcion > img {
        margin-top: 100px
    }
    .image {
        position: absolute;
        top: 75%
        left: 50%;
        transform: translate(-50%, -50%)
    }
</style>
