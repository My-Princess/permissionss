import API from "@/api/index";
export const myMixin = {
    data() {
        return {
            cityOptions: [],
            substOptions: [], // 区县
            branchOptions: [], // 营服
            areaOptions: [], // 片区
            gridOptions: [], // 网格单元
            stationOptions: [], // 支局
            isDg: false,
            userInfo: JSON.parse(localStorage.getItem("user")),
        }
    },
    created() {
        console.log('created')
        if (this.userInfo.isHuaXiao === true) {
            this.isDg = true;
        }
        this.queryGisRegionForUsername();
    },
    methods: {
        getGegion(object, id, grade) {
            if (id === null || id.length === 0) {
                object = [];
            } else {
                API.regionSelect({
                    username: this.userInfo.username,
                    cityId: this.userInfo.loginCityId,
                    xid: id,
                })
                    .then((response) => {
                        const data = response.data;
                        for (const index in data) {
                            const parame = {
                                label: data[index].name,
                                value: data[index].id,
                                level: data[index].level,
                            };
                            object.push(parame);
                            if (id === 1) {
                                // 全省账号，回填地市级别
                                this.editForm.cityId = data[index].id;
                                this.getGegion(this.substOptions, data[index].id, "2");
                            }
                        }
                    })
                    .catch((response) => {
                        // error callback
                        this.$message({
                            showClose: true,
                            message: "机构加载数据有错，请重试。",
                            type: "warning",
                        });
                        // object = [];
                        console.log("error:", response);
                    });
            }
        },
        getGegionBuild(object, id, grade) {
            if (id === null || id.length === 0) {
                object = [];
            } else {
                API.regionBuildingSelect({
                    username: this.userInfo.username,
                    cityId: this.userInfo.loginCityId,
                    xid: id,
                })
                    .then((response) => {
                        const data = response.data;
                        for (const index in data) {
                            const parame = {
                                label: data[index].name,
                                value: data[index].id,
                                level: data[index].level,
                            };
                            object.push(parame);
                            if (id === 1) {
                                // 全省账号，回填地市级别
                                this.editForm.cityId = data[index].id;
                                this.getGegion(this.substOptions, data[index].id, "2");
                            }
                        }
                    })
                    .catch((response) => {
                        // error callback
                        this.$message({
                            showClose: true,
                            message: "机构加载数据有错，请重试。",
                            type: "warning",
                        });
                        object = [];
                        console.log("error:", response);
                    });
            }
        },
        // 获取地市权限
        queryGisRegionForUsername() {
            API.queryGisRegionForUsername({
                username: this.userInfo.username,
                cityId: this.userInfo.loginCityId,
            })
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    this.userLevel = Number(data.grade);
                    console.log(this.userLevel, data.cityId);
                    if (data.cityId === "93") {
                        this.getGegion(this.cityOptions, 1, 0);
                    } else if (data.grade === "1") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        this.getGegion(this.substOptions, data.cityId, "2");
                    } else if (data.grade === "2") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        this.getGegion(this.branchOptions, data.substId, "3");
                    } else if (data.grade === "3") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        // 判断是否有支局字段，有支局字段时，请求支局参数，没有时，请求片区参数
                        if (this.isDg) {
                            this.getGegion(this.stationOptions, data.branchId, "4");
                        } else {
                            this.getGegion(this.areaOptions, data.branchId, "4");
                        }
                        // this.getGegion(this.areaOptions, data.branchId, '4')
                    } else if (data.grade === "4" && this.isDg) {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        const stationParame = {
                            label: data.stationName,
                            value: data.stationId,
                            level: "4",
                        };
                        this.stationOptions.push(stationParame);
                        this.editForm.stationId = data.stationId;
                        this.getGegion(this.areaOptions, data.stationId, "5");
                    } else if (data.grade === "4") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        const areaParame = {
                            label: data.areaName,
                            value: data.areaId,
                            level: "4",
                        };
                        this.areaOptions.push(areaParame);
                        this.editForm.areaId = data.areaId;
                        this.getGegion(this.gridOptions, data.areaId, "5");
                    } else if (data.grade === "5" && this.isDg) {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        const stationParame = {
                            label: data.stationName,
                            value: data.stationId,
                            level: "4",
                        };
                        this.stationOptions.push(stationParame);
                        this.editForm.stationId = data.stationId;
                        const areaParame = {
                            label: data.areaName,
                            value: data.areaId,
                            level: "5",
                        };
                        this.areaOptions.push(areaParame);
                        this.editForm.areaId = data.areaId;
                        this.getGegion(this.gridOptions, data.areaId, "6");
                    } else if (data.grade === "5") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        const areaParame = {
                            label: data.areaName,
                            value: data.areaId,
                            level: "4",
                        };
                        this.areaOptions.push(areaParame);
                        const gridParame = {
                            label: data.name,
                            value: data.id,
                            level: "5",
                        };
                        this.gridOptions.push(gridParame);
                    } else if (data.grade === "6") {
                        const cityParame = {
                            label: data.cityName,
                            value: data.cityId,
                            level: "1",
                        };
                        this.cityOptions.push(cityParame);
                        this.editForm.cityId = data.cityId;
                        const subParame = {
                            label: data.substName,
                            value: data.substId,
                            level: "2",
                        };
                        this.substOptions.push(subParame);
                        this.editForm.substId = data.substId;
                        const branchParame = {
                            label: data.branchName,
                            value: data.branchId,
                            level: "3",
                        };
                        this.branchOptions.push(branchParame);
                        this.editForm.branchId = data.branchId;
                        const stationParame = {
                            label: data.stationName,
                            value: data.stationId,
                            level: "4",
                        };
                        this.stationOptions.push(stationParame);
                        this.editForm.stationId = data.stationId;
                        const areaParame = {
                            label: data.areaName,
                            value: data.areaId,
                            level: "5",
                        };
                        this.areaOptions.push(areaParame);
                        this.editForm.areaId = data.areaId;
                        const gridParame = {
                            label: data.name,
                            value: data.id,
                            level: "6",
                        };
                        this.areaOptions.push(gridParame);
                    }
                })
                .catch((response) => {
                    // error callback
                    this.$message({
                        showClose: true,
                        message: "机构加载数据有错，请重试。",
                        type: "warning",
                    });
                    console.log("error:", response);
                });
        },
        // 获取片区
        selectArea(id, grade) {
            let object = {};
            if (this.isDg) {
                if (grade === 1) {
                    this.editForm.cityId = id;
                    this.substOptions = [];
                    this.branchOptions = [];
                    this.stationOptions = [];
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.substId = "";
                    this.editForm.branchId = "";
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.substOptions;
                } else if (grade === 2) {
                    this.editForm.substId = id;
                    this.branchOptions = [];
                    this.stationOptions = [];
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.branchId = "";
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.branchOptions;
                } else if (grade === 3) {
                    this.editForm.branchId = id;
                    this.stationOptions = [];
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.stationId = "";
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.stationOptions;
                } else if (grade === 4 && this.isDg) {
                    this.editForm.stationId = id;
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.areaOptions;
                } else if (grade === 5) {
                    this.editForm.areaId = id;
                    this.gridOptions = [];
                    this.editForm.gridId = "";
                    object = this.gridOptions;
                }
            } else {
                if (grade === 1) {
                    this.editForm.cityId = id;
                    this.substOptions = [];
                    this.branchOptions = [];
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.substId = "";
                    this.editForm.branchId = "";
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.substOptions;
                } else if (grade === 2) {
                    this.editForm.substId = id;
                    this.branchOptions = [];
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.branchId = "";
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.branchOptions;
                } else if (grade === 3) {
                    this.editForm.branchId = id;
                    this.areaOptions = [];
                    this.gridOptions = [];
                    this.editForm.areaId = "";
                    this.editForm.gridId = "";
                    object = this.areaOptions;
                } else if (grade === 5) {
                    this.editForm.areaId = id;
                    this.gridOptions = [];
                    this.editForm.gridId = "";
                    object = this.gridOptions;
                }
            }
            this.getGegion(object, id, grade);
        },
        handleSizeChange(val) {
            this.tableData.pageSize = val;
            this.handleFilter();
        },
        handleCurrentChange(val) {
            this.tableData.currentPage = val;
            this.handleFilter();
        },
        handleCheckAllChange(e) {
            // this.isSelectAll = e;
            this.changeTableByISelectAll();
        },
        // 表格选择框
        changeFun(val) {
            this.multipleSelection = val;
            this.$nextTick(() => {
                if (this.isSelectAll) {
                    // console.log("222",this.tableData.pageSize,'jjj',)
                    let pagenum  = this.tableData.pageSize.lenth <= this.tableData.data.length ? this.tableData.pageSize.lenth : this.tableData.data.length;
                    if (this.multipleSelection.length != pagenum) this.isSelectAll = false;
                }
            })
        },
    
        // 配置表头数据（前端导出）
        dealData(tableTitleData) {
            // 数组的深拷贝
            var tableDates = JSON.parse(JSON.stringify(tableTitleData));
            var tHeader = [];
            var filterVal = [];
            var sHeader = [];
            // tableDates.shift();
            // 如果表头超过1行需要做进一步处理
            for (var i = 1; i < tableDates.length; i++) {
                let k = tHeader.length; //先获取tHeader的长度，每次添加都从数组的最后添加
                tHeader[k] = tableDates[i].label; // 获取一级表头
                if ("children" in tableDates[i]) {
                    for (let j = 0; j < tableDates[i].children.length - 1; j++) {
                        tHeader.push(" "); // 一级表头占多列时，需要将其他列设为空
                    }
                    for (let j = 0; j < tableDates[i].children.length; j++) {
                        sHeader.push(tableDates[i].children[j].label);
                        filterVal.push(tableDates[i].children[j].prop);
                    }
                } else {
                    sHeader.push(" ");
                    filterVal[i - 1] = tableDates[i].prop;
                }
            }
            return {
                tHeader: tHeader,
                filterVal: filterVal,
                sHeader: sHeader
            };
        },
        // 生成word文档时，设置列，有多级表头时，设置表头的位置
        merayLen() {
            let tab = this.tabColumn.column;
            let len = 0; // tab中children的长度
            let lens = []; // tab中各个children的长度集，如果没有children，则为0
            let meray = []; // 导出时，word文档的各列
            let k = 0;
            let char = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "AA",
                "AB",
                "AC",
                "AD",
                "AE",
                "AF",
                "AG",
                "AH",
                "AI",
                "AJ",
                "AK",
                "AL",
                "AM",
                "AN",
                "AO",
                "AP",
                "AQ",
                "AR",
                "AS",
                "AT",
                "AU",
                "AV",
                "AW",
                "AX",
                "AY",
                "AZ",
                "BA",
                "BB",
                "BC",
                "BD",
                "BE",
                "BF",
                "BG",
                "BH",
                "BI",
                "BJ",
                "BK",
                "BL",
                "BM",
                "BN",
                "BO",
                "BP",
                "BQ",
                "BR",
                "BS",
                "BT",
                "BU",
                "BV",
                "BW",
                "BX",
                "BY",
                "BZ"
            ];
            for (let i = 1; i < tab.length; i++) {
                if ("children" in tab[i]) {
                    len = tab[i].children.length;
                    lens.push(len);
                } else {
                    len = 0;
                    lens.push(len);
                }
            }
            for (let j = 0; j < lens.length; j++) {
                // console.log("j", j);
                if (lens[j] === 0) {
                    meray.push(char[j] + "1:" + char[j] + "2");
                } else {
                    meray.push(char[k] + "1:" + char[k + lens[j] - 1] + "1");
                    k = k + lens[j];
                }
            }
            // console.log("meray", meray);
            return meray;
        },
        formatJson(filterVal, jsonData) {
            // 如果表头超过2行还要做进一步处理
            return jsonData.map(v => filterVal.map(j => v[j]));
        },

    }
}