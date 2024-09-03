<template>
  <div>
    <header class="row my-4 text-center">
      <NuxtLink to="/" class="col-2"> home </NuxtLink>
      <NuxtLink to="/bindComponent" class="col-2"> Component Bind </NuxtLink>
      <NuxtLink to="/server" class="col-2"> server </NuxtLink>
      <NuxtLink to="/ws" class="col-2"> websocket </NuxtLink>
      <NuxtLink to="/memoJs" class="col-2"> JS memo </NuxtLink>
      <NuxtLink to="/memoTs" class="col-2"> TS memo </NuxtLink>
      <NuxtLink to="/spa" class="col-2"> Spa </NuxtLink>
      <NuxtLink to="/swr" class="col-2"> Swr </NuxtLink>
      <NuxtLink to="/static" class="col-2"> Static </NuxtLink>
      <div class="col-2">
        <button @click="switchTheme">
          {{ appConfig.theme.dark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const switchTheme = (): void => {
  const r: any = document.querySelector(':root')
  appConfig.theme.dark = !appConfig.theme.dark
  if (appConfig.theme.dark) {
    r.style.setProperty('--colorSecond', appConfig.theme.lighten.primary)
    r.style.setProperty('--colorPrimary', appConfig.theme.darken.secondary)
  } else {
    r.style.setProperty('--colorSecond', appConfig.theme.darken.secondary)
    r.style.setProperty('--colorPrimary', appConfig.theme.lighten.primary)
  }
}
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
