<template>
  <div>
    <h1>Test 2</h1>
    <div>
      <label for="test">One</label>
      <input id="test" type="radio" name="test" />
      <label for="test">two</label>
      <input id="test" type="radio" name="test" />
      <input v-model="fromChild" type="text" name="fromChild" />
    </div>
  </div>
</template>

<script setup>
const foo = ref('foo')
const fromChild = ref('')
defineExpose({
  foo,
  fromChild,
})
</script>

<style lang="scss" scoped></style>
