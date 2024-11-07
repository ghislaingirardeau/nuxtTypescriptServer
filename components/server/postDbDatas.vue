<template>
  <div class="row my-5">
    <form
      @submit.prevent="MysqlPostData"
      class="row justify-content-center">
      <h1>Fetch dabatabse Mysql with POST</h1>
      <input
        type="number"
        name="idCode"
        id="idCode"
        class="col-5" />
      <div class="w-100"></div>
      <input
        type="text"
        name="denomination"
        id="denomination"
        class="col-5 my-3" />
      <div class="w-100"></div>
      <button
        type="submit"
        class="col-3 btn btn-primary">
        Post DB
      </button>
    </form>
  </div>

  <div class="row">
    <pre>{{ resultsFromDb }}</pre>
    <p>{{ errorFromDb }}</p>
  </div>

  <form
    @submit.prevent="sendForm"
    class="row justify-content-center">
    <h1 class="my-3">Form log with server</h1>
    <input
      type="email"
      name="email"
      id="email"
      class="col-5" />
    <div class="w-100"></div>
    <input
      type="password"
      name="password"
      id="password"
      class="col-5 my-3" />
    <div class="w-100"></div>
    <button
      type="submit"
      class="col-3 btn btn-primary">
      Login
    </button>
  </form>
  <div class="row">
    <p class="col-6">Data from api: {{ fromApi }}</p>
  </div>
</template>

<script setup lang="ts">
const fromApi = ref();
const resultsFromDb: Ref<any> = ref([]);
const errorFromDb: Ref<string | undefined> = ref('');
let ws: Ref<null | WebSocket> = ref(null);

const MysqlPostData = async (e: Event) => {
  resultsFromDb.value = [];
  const { idCode, denomination } = e.target as HTMLFormElement;

  const body = {
    id: idCode.value,
    name: denomination.value,
  };
  const { data, error } = await useFetch('/api/sql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'haveAtoken', // IF I WANT TO ADD A TOKEN FOR A USER
    },
    body,
  });
  if (data.value) {
    console.log(data.value);
    resultsFromDb.value = data.value;
  } else {
    errorFromDb.value = error.value?.statusMessage;
  }
};

const sendForm = async (e: Event) => {
  const { email, password } = e.target as HTMLFormElement;

  // GET FROM ROUTE
  /* const { data } = await useFetch("/hello"); */

  // SEND A DYNAMIC ROUTE
  /* const { data } = await useFetch("/api/user/gigi");
  fromApi.value = data; */

  // POST METHOD WITH BODY
  const body = {
    email: email.value,
    password: password.value,
  };
  const { data, error } = await useFetch('/api/login', {
    method: 'POST',
    body,
  });
  if (data.value) {
    fromApi.value = data;
    // ON LOGIN
    // STORE THE USER DATA + THE TOKEN TO USE IT
  } else {
    fromApi.value = error.value?.statusMessage;
  }

  // QUERY METHODS
  /* const { data, error } = await useFetch("/api/query", {
    method: "GET",
    query: {
      email: email.value,
      password: password.value,
    },
  });
  if (data.value) {
    fromApi.value = data;
  } else {
    fromApi.value = error.value?.statusMessage;
  } */

  // REDIRECT FROM SERVER
  /* const { data } = await useFetch("/api/redirect"); */
};
</script>

<style lang="scss" scoped></style>
