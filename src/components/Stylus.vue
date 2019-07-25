<template>
    <div :class="$style['container']">
        <span>测试h3</span>
        <div :class="$style['box']"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" module>
$fontSize = 16px;
color = red
.container {
    span {
        font-size: $fontSize
        color: color
    }
    .box {
        width: 100px
        height: 100px
        border: (@height / 10) solid black
        margin (@height / 10)
    }
}
</style>
