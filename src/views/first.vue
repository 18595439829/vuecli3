<template>
  <div>
    <Button type="primary"
            @click="modal1 = true">Display dialog box</Button> |
    <Button @click="modal11 = true">全屏</Button> |
    <Button @click="modal12 = true">可拖动第一个modal</Button> |
    <Button @click="modal13 = true">可拖动第二个modal</Button>
    <Modal v-model="modal1"
           title="Common Modal dialog box title">
      <Table :columns="columns1"
             :data="data1"></Table>
    </Modal>
    <Modal v-model="modal11"
           fullscreen
           title="Fullscreen Modal">
      <div>This is a fullscreen modal</div>
    </Modal>
    <Modal v-model="modal12"
           draggable
           scrollable
           title="Modal 1">
      <div>This is the first modal</div>
      <Input v-model="modal1Ipt"></Input>
    </Modal>
    <Modal style="background"
           v-model="modal13"
           draggable
           scrollable
           title="Modal 2">
      <div>This is the second modal</div>
    </Modal>
    <hr/>
    <div>
      <h3>ES6字符串扩展</h3>
      <div id="list">
        {{b}}
      </div>
    </div>

    <div class="robot">
      <Row>
        <Col span="10">
        <Form :label-width="40">
          <FormItem label="我:"
                    v-for="(item, index) in myList"
                    :key="index">
            <Input v-model="item.iptValue">
            </Input>
          </FormItem>
        </Form>
        </Col>
        <Col
             span="10">
        <Form :label-width="40">
          <FormItem label="图灵:"
                    v-for="(item, index) in robotList"
                    :key="index">
            <Input v-model="item.iptValue">
            </Input>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <div class="tuling">
        <Input v-model="formIpt"
                   @on-enter="tulingRobot">
            </Input>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Axios from 'axios'
export default {
  data() {
    return {
      a: 'foobar',
      b: `foo${1 + 1}bar`,
      modal1: false,
      modal11: false,
      modal12: false,
      modal13: false,
      modal1Ipt: '',
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address',
          render: (h, params) => {
            return h('div', [
              h(
                'Tooltip',
                {
                  attrs: {
                    content: params.row.address
                  },
                  props: {
                    always: true
                  },
                  style: {
                    // maxWidth: 140,
                    // background: 'red',
                    whiteSpace: 'normal',
                    wordBreak: 'break-all'
                  }
                },
                [
                  h(
                    'div',
                    {
                      style: {
                        // background: 'yellow',
                        width: '140px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      },
                      props: {
                        type: 'text',
                        size: 'small'
                      }
                    },
                    params.row.address
                  )
                ]
              )
            ])
          }
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address:
            'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address:
            'London No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address:
            'Sydney No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address:
            'Ottawa No. 2 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
          date: '2016-10-04'
        }
      ],
      tmpl: '意义',
      arr: ['1', '2', '3', '4', '5'],
      user: {
        id: '001',
        num: '1234',
        name: '解构赋值'
      },
      params: {},
      formIpt: '',
      myList: [],
      robotList: []
    }
  },
  methods: {
    getFullName({ id, name, num }) {
      console.log(id, name, num)
    },
    tulingRobot() {
      // this.params.perception.audition.text = this.formIpt
      this.params = {
        key: '8197672cf9664021b436d3e36c4a6622',
        info: this.formIpt
      }
      this.myList.push({ iptValue: this.formIpt })
      this.getRobot(this.params)
    },
    getRobot(data) {
      this.$api.tulingPOST(data).then(res => {
        console.log(res, res.data.code)
        if (res.data.code === 100000) {
          // console.log(res.data.text)
          this.robotList.push({ iptValue: res.data.text })
        }
      })
    }
  },
  created() {
    // const [first, , second] = this.arr
    // console.log(first, second)
    // console.log(this.arr)
    // const mapArr = [...this.arr]
    // mapArr[1] = '啦啦'
    // console.log(mapArr, this.arr)
    // this.getFullName(this.user)
  }
}
</script>
<style>
.robot {
  width: 400px;
  height: 500px;
  border: 2px gray solid;
  border-radius: 5px;
  position: relative;
}
.tuling {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: rgb(221, 217, 217);
  padding: 5px 10px;
}
.ivu-tooltip-inner {
  white-space: normal;
}
</style>
