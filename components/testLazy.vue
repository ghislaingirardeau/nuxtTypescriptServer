<template>
  <div>
    <h1>Test 1</h1>
    <form>
      First name:<br />
      <input type="text" name="firstname" v-model="firstname" /><br />
      Last name:<br />
      <input type="text" name="lastname" />
    </form>
    <p>name {{ firstname }}</p>
  </div>
</template>

<script setup>
const firstname = ref("");
onMounted(() => console.log("lazy 1 mounted"));
onUnmounted(() => console.log("lazy 1 unmounted"));
</script>

<style lang="scss" scoped></style>
