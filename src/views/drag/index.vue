<template>
  <div class="drag">
    <div class="dragParent">
      <div class="dragChild">
        <div class="child" v-for="item in leftDragArr">
          {{`${item.id}---${item.label}`}}
        </div>
      </div>
      <div class="dragChild">
        <div class="child" v-for="item in rightDragArr">
          {{`${item.id}---${item.label}`}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'drag',
  data() {
    return {
      leftDragArr: [
        {
          id: '001',
          label: '一号宇宙飞船'
        },
        {
          id: '002',
          label: '二哥洛溪'
        },
        {
          id: '003',
          label: '三沙发公开课'
        },
        {
          id: '004',
          label: '四更省道加深入'
        },
        {
          id: '005',
          label: '五电费124卡立方'
        },
        {
          id: '006',
          label: '六fsf地方'
        }
      ],
      rightDragArr: [
        {
          id: '100',
          label: '100三季度福克斯是'
        },
        {
          id: '200',
          label: '200dfs大师傅'
        }
      ]
    }
  }
}
</script>
<style lang="less">
.drag{
  margin: 10px
}
  .dragParent{
    display: flex ;
    width: 400px;
  }
    .dragChild{
      flex: 1;
      width: 200px;
      height: 300px;
      margin: 0 10px;
      border: solid  1px black ;
    }
      .child {
        cursor: pointer;
        height: 20px;
        margin: 5px;
        padding: 0 5px;
        border: solid  1px gray;
        border-radius: 2px;
      }
</style>

