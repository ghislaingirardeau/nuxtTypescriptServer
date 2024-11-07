<template>
  <div class="row my-5">
    <h1>Fetch from dabatabse Mysql with GET</h1>
    <div class="col-6">
      <button
        type="button"
        @click="MysqlData"
        class="btn btn-primary">
        Fetch
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const MysqlData = async (e: Event) => {
  const { data, error } = await useFetch('/api/mysql');
  if (data.value) {
    console.log(data.value);
  } else {
    console.log(error.value);
  }
};
</script>

<style lang="scss" scoped></style>
