<template>
  <div>
    <header class="row my-4 text-center">
      <NuxtLink to="/" class="col-3">home</NuxtLink>
      <NuxtLink to="/test" class="col-3">test</NuxtLink>
      <NuxtLink to="/server" class="col-3">server</NuxtLink>
      <NuxtLink to="/ws" class="col-3">websocket</NuxtLink>
      <div class="col-3">
        <button @click="switchTheme">
          {{ appConfig.theme.dark ? "Light" : "Dark" }}
        </button>
      </div>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

const switchTheme = (): void => {
  const r: any = document.querySelector(":root");
  appConfig.theme.dark = !appConfig.theme.dark;
  if (appConfig.theme.dark) {
    r.style.setProperty("--colorSecond", appConfig.theme.lighten.primary);
    r.style.setProperty("--colorPrimary", appConfig.theme.darken.secondary);
  } else {
    r.style.setProperty("--colorSecond", appConfig.theme.darken.secondary);
    r.style.setProperty("--colorPrimary", appConfig.theme.lighten.primary);
  }
};
</script>

<style lang="scss">
$colorPrimary: var(--colorPrimary);
$colorSecond: var(--colorSecond);
:root {
  --colorPrimary: white;
  --colorSecond: black;
}
body {
  color: $colorPrimary;
  background-color: $colorSecond;
}
</style>
