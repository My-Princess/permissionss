<template>
  <div>
    <h2>$attrs 和 $listeners</h2>
    <A></A>
    <div>具名插槽</div>
    <name-slot>
        <template v-slot:default>具名插槽</template>
    <!-- 具名插槽⽤插槽名做参数 -->
    <template v-slot:content>内容...</template>
    </name-slot>
    <hr>
    <div>作用域插槽</div>
    <slots>
    <!-- <template v-slot:footer="eee">内容...{{eee.testProps}}</template> -->

      <!-- <template v-slot:default="slotProps">
        来⾃⼦组件数据：{{ slotProps.testProps }}
      </template> --> 
      <template #default="slotProps">
        来⾃⼦组件数据：{{ slotProps.testProps }}
      </template>
      <!-- <template #footer='{testProps}'>
        来⾃⼦组件数据：{{testProps}}
      </template> -->
    </slots>
  </div>
</template>

<script>
import A from "./components/A.vue";
import slots from "./components/alots.vue";
import nameSlot from './components/nameSlot.vue';
export default {
  components: { A, slots,nameSlot },
};
</script>

<style></style>
