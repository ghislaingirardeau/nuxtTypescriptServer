<template>
  <div>
    <h2>Hello Nuxt3 & Typescript</h2>
    <h1>SSR par default</h1>
    <h2>{{ new Date() }}</h2>
    <h2>{{ useToUpperCase2("i'm function from composable") }}</h2>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
