<template>
    <div>
        <Input v-model="text" style="width: 200px;"  @on-enter="search" />
        <Tree :data="data" show-checkbox></Tree>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                text: '',
                data: [],
                data2: [
                    {
                        title: '系统',
                        expand: true,
                        children: [
                            {
                                title: '管理员',
                                expand: true,
                                children: [
                                    {
                                        title: '张三'
                                    },
                                    {
                                        title: '李四'
                                    }
                                ]
                            },
                            {
                                title: '用户',
                                expand: true,
                                children: [
                                    {
                                        title: '张龙'
                                    },
                                    {
                                        title: '赵虎',
                                        children: [
                                            {
                                                title: '赵四',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
            this.data = [...this.data2];
        },
        methods: {
            search() {
                this.data = this.getShowHTML(this.text, this.data2);
            },
            // 给每个分支上有所匹配的设置isNeed
            setFlag (data, keyword) {
                return data.map(item => {
                    item.isNeed = this.isNeedBranch(item, keyword)
                    if(item.children && item.children.length) {
                        this.setFlag(item.children, keyword)
                    }
                    return item
                })
            },
            // 判断这条分支上有没有匹配到的
            isNeedBranch (item, keyword) {
                let flag1 = false,
                    flag2 = false
                if(item.title.indexOf(keyword) > -1) {
                    flag1 = true
                } else if(item.children && item.children.length) {
                    item.children.forEach(child => {
                        if(this.isNeedBranch(child, keyword)) {
                            flag2 = true
                        }
                    })
                }
                return flag1 || flag2
            },
            // 过滤掉分支上isNeed为false的元素
            treeFilter (data) {
                return data.filter((item, index) => {
                    if(item && item.children && item.children.length) {
                        item.children = this.treeFilter(item.children)
                    }
                    return item.isNeed
                })
            },
            // 获得最终的数组
            getShowHTML(val, data) {
                if(!val) return ''
                let dataCopy = JSON.parse(JSON.stringify(data)) // 一个简单的deepCopy
                let filterTree = this.treeFilter(this.setFlag(dataCopy, val))
                return (filterTree && filterTree.length) ? filterTree : [];
            }
        }
    }
</script>
