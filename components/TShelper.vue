<template>
  <div class="container">
    <h1>Compteur</h1>
    <button id="compteur">Incrémenter <span>0</span></button>

    <button @click="enumSteps">{{ step }}</button>
  </div>
</template>

<script setup lang="ts">
let user: User1 = {
  name: "gigi",
  age: 123,
};
let user2: UserExt = {
  name: "gigi",
  id: 123,
  age: 654,
};
const d: null = null;
const objWithDynKey: { [key: string]: string } = {
  name: "gigi",
  age: "35",
};
const date = new Date();
const fct: (params: number) => number = (params: number): number => {
  console.log(params);
  return params + 2;
};

const test = (params: number): number => {
  //void = is no return value to this fct
  return params * 2;
};

console.log(test(10));

//GENERICS EXEMPLE
// POUR DONNER UN TYPE AU RESULTAT D'UNE FONCTION PAR EXEMPLE EN FONCTION DE SON ARGUMENT
function generics<ArgType extends string>(arg: ArgType): string {
  /* if (typeof arg === "number") {
    return arg * 3;
  } */
  return arg.toUpperCase();
}

console.log(generics("test generic"));

const add = (a: number[]): number[] => {
  return a.map((x) => x * 2);
};

const arrayReadOnly = <Type>(params: readonly Type[]): Type[] => {
  // readonly si on ne veut pas modifier la propriété
  return [...params].reverse();
};

const result = arrayReadOnly([1, 2, 3]);
const res = add([5, 8]);

console.log(res);

// CLASS
class CollectionTest<T> {
  constructor(public items: T[]) {}
  first(): T | null {
    return this.items[0] || null;
  }
  add(item: T): this {
    this.items.push(item);
    return this;
  }
} //public or private (private not accessible outside the instance)

const a = new CollectionTest([1, 2, 3]);
a.add(15);
console.log(a, a.first());

//OTHER KIND OF TYPE
// unknow est comme any, on ne sait pas le type de suite
// mais plus tard avec le narrowing
function unknown(params: unknown) {
  if (params instanceof HTMLInputElement) {
    params.value = "hello";
  }
}

// as const = on ne pourra pas changer la valeur de object ou du array
const readOnlyObj = { private: true, public: false } as const;

// arrray strict to 2 items for example, TUPLE : array fixed length
type List1 = [string, string];
type List2 = [number, number];

const arrayLimitLength1: List1 = ["hello", "world"];
const arrayLimitLength2: List2 = [123, 45];

function merge<T extends unknown[], U extends unknown[]>(a: T, b: U) {
  return [...a, ...b] as const;
}

const arrayMerge = merge(arrayLimitLength1, arrayLimitLength2);

// STEPS

enum STEPS {
  Intro = "Intro",
  Selection = "Selection",
  Panier = "Panier",
  Payment = "Payment",
}

let step: Ref<STEPS> = ref(STEPS.Intro);

let countStep = ref(0);
const enumSteps = () => {
  countStep.value++;
  switch (countStep.value) {
    case 1:
      step.value = STEPS.Selection;
      break;
    case 2:
      step.value = STEPS.Panier;
      break;
    case 3:
      step.value = STEPS.Payment;
      break;
  }
};

// AVEC INTERFACE, CAN ADD PROPERTY TO WINDOW FOR EXAMPLE
interface Window {
  testInterface: string;
}
/* (window as any).testInterface = "hello window"; */

// TYPE CONDITIONNEL
class Poisson {
  cri() {
    return false;
  }
}
class Chat {
  cri() {
    return "miaou";
  }
}

type AnimalCri<T> = T extends { cri: () => infer U } ? U : never;

type A = AnimalCri<Poisson>; // return type de la methode dans la class
type B = AnimalCri<Chat>;
type C = ReturnType<Poisson["cri"]>;
const infer: C = true;

//Type utilitaire
// https://www.typescriptlang.org/docs/handbook/utility-types.html
interface TypeUtilitaire {
  name: string;
  last?: string;
}

const utilitaire: Required<TypeUtilitaire> = {
  name: "gigi",
  last: "test",
};

const tesla = ["model 3", "model 3", "model X", "model Y"];
type Length<T> = T extends { length: infer Length } ? Length : never;
type First<T extends any[]> = T extends { length: 0 } ? never : T[0];

type teslaLength = Length<typeof tesla>;
type teslaFirst = First<typeof tesla>;

const arrayLenght: teslaLength = tesla.length;
const arrayFirst: teslaFirst = tesla[0];

// satisfies
type RGB = [red: number, green: number, blue: number];
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ~~~~ The typo is now correctly detected
} satisfies Record<string, string | RGB>;
// But we now have an undesirable error here - 'palette.red' "could" be a string.
const redComponent = palette.red.map((v) => v / 2);

//DYNAMIC TYPE
type HTMLAttr = {
  img: {
    alt: string;
  };
  input: {
    name: string;
    type: "number" | "text";
  };
  textarea: {
    cols: number;
  };
};

type HTMLNode<T> = {
  tagName: T;
  class?: string;
  attributes: T extends keyof HTMLAttr ? HTMLAttr[T] : never;
};

type HTMLForm<T> = HTMLNode<T>;

const img: HTMLNode<"img"> = {
  tagName: "img",
  class: ".demo",
  attributes: {
    alt: "demo",
  },
};

const input: HTMLNode<"input"> = {
  tagName: "input",
  class: ".demo",
  attributes: {
    name: "demo",
    type: "number",
  },
};

const textarea: HTMLNode<"textarea"> = {
  tagName: "textarea",
  attributes: {
    cols: 12,
  },
};
</script>

<style lang="scss" scoped></style>
