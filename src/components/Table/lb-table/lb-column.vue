<template>
  <el-table-column
    v-bind="$attrs"
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    show-overflow-tooltip
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue"
    v-on="$listeners"
  >
    <template slot="header" slot-scope="scope">
      <lb-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader" />

      <el-tooltip v-else-if="scope.column.label.length > 6" :content="scope.column.label">
        <span slot>{{ scope.column.label }}</span>
      </el-tooltip>
      <!-- </span> -->
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <lb-render :scope="scope" :render="column.render" />
    </template>

    <template v-if="column.children" >
    
      <template v-for="(col) in column.children" >
        <lb-column :key="col.prop" v-if="col.label !== '支局'" :column="col" />
        <lb-column :key="col.prop" v-else-if="isDg === true" :column="col" />
      </template>

      <!-- 嵌套表头排序混乱方案二 -->
       <!-- <lb-column v-for="(col) in column.children" :key="col.prop" :column="col" />
       <lb-column v-for="(col) in column.children1" :key="col.prop" :column="col" /> -->

    </template>
  </el-table-column>
</template>

<script>
import LbRender from './lb-render'
import forced from './forced.js'
export default {
  name: 'LbColumn',
  components: {
    LbRender
  },
  props: {
    column: Object,
    headerAlign: String,
    align: String,
    isDg: {   //是否是支局
      type: Boolean,
      default: false
    },
  },
  watch: {
    column: {
      handler() {
        
        this.setColumn()
      },
      immediate: true
    }
  },
  computed:{
    columnChil:function(){
      return this.column.children.filter(function (item){
        return item.label !== '支局'
      })
    }, 
    columnChil1:function(){
      return this.column.children.filter(function (item){
        return isDg === true
      })
    }
  },
  mounted() {
  },

  methods: {
    setColumn() {
      if (this.column.type) {
        this.column.renderHeader = forced[this.column.type].renderHeader
        this.column.render = this.column.render || forced[this.column.type].renderCell
      }
      if (this.column.formatter) {
        console.log('formatter')
        this.column.render = (h, scope) => {
          console.log('触发formatter', scope)
          return <span>{scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)}</span>
        }
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          return <span>{scope.row[scope.column.property]}</span>
        }
      }
    }
  }
}
</script>
