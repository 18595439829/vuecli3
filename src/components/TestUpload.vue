<template>
    <div>
        <div>
            <Button @click="add">添加</Button>
        </div>
        <div v-for="(item, index) in dataArr" :key="index">
            <div>
                {{item}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataArr: []
        }
    },
    methods: {
        add() {
            this.dataArr.push('111');
            this.$emit('on-add')
        }
    }
}
</script>
<style lang="less">

</style>