<template>
  <div>
    <h1>Use Fetch</h1>
    <pre> {{ data }} </pre>
    <button @click="execute">Refresh data</button>
  </div>
</template>

<script setup lang="ts">
// bloquant, le navigateur ne charge pas de suite la page
// const { data, error } = await useFetch('/api/5000');

// not block
const { data, error, execute } = useFetch<{ title: string }>('/api/2000', {
  lazy: true,
  pick: ['title'],
});
</script>

<style scoped></style>
