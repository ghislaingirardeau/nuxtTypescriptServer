<template>
  <div>
    <h2>Fonction génératrice</h2>
    <button @click="showNextValue">Next</button>
    <pre>{{ resultGen }}</pre>
  </div>
  <div>
    <h2>2D binary search</h2>
    <p>{{ linearSearch(arr, 12) }}</p>
  </div>
  <div>
    <pre>{{ temp }}</pre>
  </div>
</template>

<script setup lang="ts">
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const temp = await reponse.json();

//2D binary search
const linearSearch = (arr: number[][], target: number) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == target) {
        return "Target founded " + arr[i][j];
      }
    }
  }
  return "Target not founded";
};
let arr = [
  [3, 12, 9],
  [5, 2, 89],
  [90, 45, 22],
];

// FONCTION GENERATRICE
import { useFibonacci, useAsyncGenerator } from "@/composables/fctGenerator";

let gen = useFibonacci();
const resultGen: any = ref([]);

const showNextValue = () => {
  let i = 10;
  for (let index = 0; index < i; index++) {
    resultGen.value.push(gen.next().value);
  }
};

(async function () {
  for await (let num of useAsyncGenerator()) {
    console.log(num);
  }
})();

/*  */
</script>

<style scoped></style>
