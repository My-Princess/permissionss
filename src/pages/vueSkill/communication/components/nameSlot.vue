<template>
  <div>
    <template>
      <slot>默认插槽内容</slot>
      <slot name="content">插槽后备的内容</slot>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
