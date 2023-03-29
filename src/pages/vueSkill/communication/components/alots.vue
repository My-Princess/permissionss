<template>
  <div>
    <template>
      <slot name="footer" testProps="子组件的值">
        <h3>没传footer插槽</h3>
      </slot>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
