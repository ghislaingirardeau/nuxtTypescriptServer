<template>
  <div>
    <h1 id="mytitle">WebSocket Tutorial</h1>
    <div>
      <h2>Set chat</h2>
      <label for="name">Name:</label>
      <input type="text" v-model="clientName" id="name" name="name" required />
    </div>
    <div>
      <button @click="startWs">Open the chat</button>
    </div>
    <div v-if="messageNewConnection.length > 0">
      <p>{{ messageNewConnection }} is connected</p>
    </div>
    <div>
      <h2>Send message</h2>
      <label for="message">message:</label>
      <input
        type="text"
        v-model="messageWS"
        id="message"
        name="message"
        required
      />
      <button @click="sendMsg">Send a message</button>
    </div>
    <div>
      <h2>Chat</h2>
      <div v-for="(user, i) in response" :key="i">
        {{ user.name }} : {{ user.message }}
      </div>
    </div>
    <div>
      <button @click="closeWS">Close chat</button>
      <p v-if="messageDisconnect.length > 0">{{ messageDisconnect }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
let ws: Ref<null | WebSocket> = ref(null);
const clientName = ref("gigi");
const messageWS = ref("");
const messageDisconnect = ref("");
const messageNewConnection = ref("");
const response: Ref<RESWS[]> = ref([]);
const uid = ref(uuidv4());

interface RESWS {
  name?: String;
  message?: String | null;
  new?: Boolean;
}

/*
Store the chat inside an array
pour chaque elt de chaque, affiche son nom et son message
AU CLICK DE SEND MESSAGE = mon nom et mon message apparait
soit un push dans le array chat
onMessage du sw, push le nom et message dans le array chat pour le faire apparaitre

*/

const startWs = () => {
  ws.value = new WebSocket("ws://webpushapi-production.up.railway.app/");
  ws.value.onopen = (event) => {
    console.log("Successfully connected");
    const client = {
      action: "newConnection",
      id: uid.value,
      name: clientName.value,
    };
    console.log(client);
    ws.value?.send(JSON.stringify(client));
  };
  // GET THE MESSAGE FROM SERVER
  ws.value.onmessage = (event) => {
    const res = JSON.parse(event.data);
    switch (res.action) {
      case "newConnection":
        messageNewConnection.value = res.name;
        break;
      case "chat":
        response.value.push(res);
        break;
      case "close":
        messageDisconnect.value = `${res.name} leave the chat`;
        break;
    }
  };
};

const sendMsg = () => {
  const datas = {
    action: "chat",
    id: uid.value,
    message: messageWS.value,
  };
  ws.value?.send(JSON.stringify(datas)); // send the data to the server
};

const closeWS = () => {
  const datas = {
    action: "close",
    id: uid.value,
  };
  ws.value?.send(JSON.stringify(datas));
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
