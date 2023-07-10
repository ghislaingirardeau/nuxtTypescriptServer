<template>
  <div>
    <h1>Test 2</h1>
    <div>
      <label for="test">One</label>
      <input type="radio" name="test" id="test" />
      <label for="test">two</label>
      <input type="radio" name="test" id="test" />
      <input type="text" name="fromChild" v-model="fromChild" />
    </div>
    <button @click="sendNotification">subscribe</button>
    <button @click="showNotification('after subscribing')">send</button>
  </div>
</template>

<script setup>
const foo = ref("foo");
const fromChild = ref("");
defineExpose({
  foo,
  fromChild,
});

const sendNotification = async () => {
  if (Notification.permission === "granted") {
    showNotification("Hi, this is a notification");
  } else {
    if (Notification.permission !== "denied") {
      console.log("request");
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        showNotification("Hi, this is a notification");
        console.log("permission granted");
      }
    }
  }
};

const registration = await navigator.serviceWorker.getRegistration();
const showNotification = (body) => {
  const title = "What PWA Can Do Today";

  const payload = {
    body,
  };

  if ("showNotification" in registration) {
    registration.showNotification(title, payload);
  } else {
    new Notification(title, payload);
  }
};
</script>

<style lang="scss" scoped></style>
