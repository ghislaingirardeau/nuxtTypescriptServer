<template>
  <div>
    <div>test page</div>

    <Icon
      name="mdi:arrow-left-drop-circle-outline"
      size="34px"
      @click="backBtn"
      class="header-icons"
    />
    <button @click="doError">create error</button>

    <h2>{{ child ? child.fromChild : "" }}</h2>
    <button @click="componentToLoad = testLazy">testLazy</button>
    <button @click="componentToLoad = testLazy2">testLazy2</button>
    <TestLazy2 ref="child" />
    <!-- <KeepAlive>
      <component :is="componentToLoad" ref="child" />
    </KeepAlive> -->
    <component :is="componentToLoad" />
  </div>
</template>

<script setup>
import testLazy from "@/components/testLazy.vue";
import testLazy2 from "@/components/testLazy2.vue";

definePageMeta({
  layout: "default",
});
const componentToLoad = shallowRef(testLazy2);
const doError = () => {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
};

const child = ref(null);

onMounted(() => {
  console.log(child.value.foo);
  console.log(child.value.fromChild);
});
</script>

<style lang="scss" scoped></style>
