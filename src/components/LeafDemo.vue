<template>

    <div>
        <h1>树形案例</h1>
        <!--        <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps">
                </el-tree>-->
        <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :default-checked-keys="[11]"
                highlight-current
                :props="defaultProps">
        </el-tree>

        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "LeafDemo",
        methods: {
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
  /*              this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]);*/
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([1]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            }
        },

        data() {
            return {
                data: [
                    {
                        "id": 1,
                        "label": "打车",
                        "children": [
                            {
                                "id": 1,
                                "label": "快车"
                            },
                            {
                                "id": 2,
                                "label": "专车"
                            },
                            {
                                "id": 3,
                                "label": "送机拼车"
                            },
                            {
                                "id": 4,
                                "label": "接机拼车"
                            },
                            {
                                "id": 5,
                                "label": "送机专车"
                            },
                            {
                                "id": 6,
                                "label": "送机专车"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "label": "公交出行",
                        "children": [
                            {
                                "id": 7,
                                "label": "公交出行"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "label": "包车",
                        "children": [
                            {
                                "id": 8,
                                "label": "包车"
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "label": "周边游",
                        "children": [
                            {
                                "id": 9,
                                "label": "周边游"
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "label": "热点美食",
                        "children": [
                            {
                                "id": 10,
                                "label": "热点美食"
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "label": "民宿酒店",
                        "children": [
                            {
                                "id": 11,
                                "label": "民宿酒店"
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "label": "租车",
                        "children": [
                            {
                                "id": 12,
                                "label": "租车"
                            }
                        ]
                    },
                    {
                        "id": 8,
                        "label": "充电",
                        "children": [
                            {
                                "id": 13,
                                "label": "充电"
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "label": "城际",
                        "children": [
                            {
                                "id": 14,
                                "label": "城际"
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "label": "代驾",
                        "children": [
                            {
                                "id": 15,
                                "label": "代驾"
                            }
                        ]
                    },
                    {
                        "id": 11,
                        "label": "穿梭巴士",
                        "children": [
                            {
                                "id": 16,
                                "label": "穿梭巴士"
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "label": "跨城顺风车",
                        "children": [
                            {
                                "id": 17,
                                "label": "跨城顺风车"
                            }
                        ]
                    },
                    {
                        "id": 13,
                        "label": "商务VIP",
                        "children": [
                            {
                                "id": 18,
                                "label": "商务VIP"
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        }
    };
</script>

<style scoped>

</style>
