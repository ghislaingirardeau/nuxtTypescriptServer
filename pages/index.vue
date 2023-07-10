<template>
  <div>
    <h2>Hello Typescript</h2>
    <p>Counter : {{ count }}</p>
    <p>{{ name("gigi").toUpperCase() }}</p>
    <h2>{{ useToUpperCase2("i'm from composable") }}</h2>
    <button @click="loadPromesse">Promise</button>
    <p>{{ result }}</p>
    <TShelper />
  </div>
</template>

<script setup lang="ts">
import TShelper from "~/components/TShelper.vue";

interface User {
  firstName: string;
  lastName?: string;
}

type Test = string;
type StrictWord = "strict";

const use = reactive({
  firstName: "Ghislain",
}) satisfies User;

const count = ref(0);
let countNotRef: StrictWord = "strict";
const name = (params: string): Test => {
  return count.value + params;
};

interface APIBody {
  Response?: string;
  Search?: {}[];
  Title: string;
}

const { data } = await useFetch<APIBody>(
  "http://www.omdbapi.com/?apikey=8e3f600b&i=tt1877830"
);
const result = ref(0);

const resolveAfter2Seconds = (x: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 3);
    }, 3000);
  });
};

const loadPromesse = async (): Promise<void> => {
  const x = await resolveAfter2Seconds(10);
  console.log(x); // 10
  result.value = x;
};
</script>

<style lang="scss" scoped></style>
