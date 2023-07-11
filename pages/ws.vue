<template>
  <div class="container">
    <div class="row my-5">
      <h1>Connect to WebSocket</h1>
      <div class="col-6">
        <button type="button" @click="connectToWS" class="btn btn-primary">
          Primary
        </button>
      </div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
let ws: Ref<null | WebSocket> = ref(null);
const message = ref("");
const connectToWS = async () => {
  /*  wss = new WebSocket("ws://webpushapi-production.up.railway.app/"); */
  ws.value = new WebSocket(`ws://localhost:8080`);

  ws.value.onopen = (event: any) => {
    console.log("Successfully connected");
  };
  ws.value.onmessage = (event) => {
    console.log(event.data);
    message.value = event.data;
  };
};
</script>

<style scoped></style>
