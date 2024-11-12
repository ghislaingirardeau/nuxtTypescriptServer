# Fetching Data Vue School

## 3 manières fetch

```js
useFetch();
$fetch();
useAsyncData();
```

- useFetch:
  En SSR, useFetch permet de faire l'appel à l'API, coté serveur, et de faire le rendu coté client (hydratation) en envoyant un payload (les datas comme résultat)

- $fetch:
  Va faire l'appel coté client seulement (donc pas dans le code source) => utilise si on veut récupérer des données seulement lors d'un clique

- useAsyncData:
  Peut s'utiliser en l'associant avec $fetch
  `useAsyncData(async() => await $fetch(url))` => cette écriture revient au meme résultat qu'écrire `useFetch()`
  Va surtout etre utilise pour récupérer des données non via une url mais via une API third party (ex: supabase, firebase...)

## UseFetch

Lors du fetch, 2 types de navigation sont possibles : **bloquant ou non-bloquant**

### Bloquant

la route est de suite affichée, et les données sont mise à jour en fonction du résultat

Pour cela on ajoute le `await`

```js
const { data, error } = await useFetch('/api/mysql');
```

### non-Bloquant

l'utilisateur coté client doit attendre d'avoir le résultat du fetch pour affciher la page

En non bloquant les données sont mise en cache lors de la navigation, au retour sur la page, celle-ci sont affiché en attendant la MAJ des données
Plusieurs possibilités:

```js
const { data, error } = useFetch('/api/mysql');
// ou
const { data, error } = useLazyFetch('/api/mysql');
// ou
const { data, error } = useFetch('/api/mysql', {
  lazy: true,
});
```

### Params et fonctionnalité

**/!\ si je passe une computed data dans les params, le seul changement de la data computed trigger le useFetch !**

```js
const querySearch = computed(() => {
    return 'hello'
})

const { data, error } = useFetch('/api/mysql', {
    query: computedData // si la donnée est changé, useFetch est ré-activé => fonctionne comme un watcher
}, {//options})
```

### Les options

```js
const { data, error } = useFetch('/api/mysql', {
  lazy: true, // si bloquant ou non
  pick: ['lastname'], // ne va récupérer que la propriété dans la data /!\ cela ne fonctionne que si data renvoie un objet
  key: 'clé pour chaque url appelé', // pour la mise en cache notamment, clé unique associé à url. Si on passe une query et que celle-ci change c'est une nouvelle clé qui est associé => 1 url spécifique  = 1 clé
  server: false, // si je veux faire le fecth seulement coté client (les données ne seront donc pas dans le code source)
  immediate: false, // fetch ne sera pas déclenché immédiatement
  default: (data) => {
    // une fonction qui permet d'afficher des données avant que celle-ci ne provienne de l'API, un genre de placeholder de donnée fecth
    return data;
  },
  transform: (data) => {
    // une fonction qui permet de transformer les datas reçus (payload) AVANT hydratation. Utile pour pick des données d'un array
    return data.map((user) => user.lastname);
  },
  getCachedData: () => {
    // une fonction qui retourne les data en cache, si return undefined alors se sont les résulats du fetch qui sont affiché
  },
  dedupe: 'cancel', //ou 'defer' => sur defer, si cliques plein de fois, cela évite de faire un fetch à chaque fois ('cancel' le fetch) => en defer, il ne va faire l'appel que pour le dernier clique
});
```

**/!\ avec data et pick, on pourra avoir une erreur Typescript, puisqu'on ne lui précise pas quel sera la valeur de retour**

Dans le cas de pick, on pourra alors typer et préciser le type de donnée attendus

```js
interface User {
  lastname: string;
  firstname: string;
}

const { data, error } =
  useFetch <
  User >
  ('/api/mysql',
  {
    lazy: true,
    pick: ['lastname', 'firstname'], // en précisant User, l'erreur typescript disparait
  });
```

### Les valeurs de retour

```js
const {
  data, // les datas renvoyé par le serveur
  error, // l'erreur du serveur
  execute, // pour ré-éxécuter la fonction au besoin, sera une fonction
  status, // pour avoir les status pending, success
} = useFetch('/api/mysql');

execute();
```

## UseAsync

Par défaut cela bloque la navigation, mais là aussi on peut utiliser `useLazyAsyncData`

## Error

Comme vu, on peut extraire `error` de la requete useFetch(), pour gérer l'erreur il va falloir utiliser `watchEffect`

Pourquoi ?
Parce que si tout se passe bien au chargement, error sera null, mais si on rappelle fetch via execute() et que cette fois-ci il y a une erreur
celle-ci restera à sa valeur null dans js. `watchEffect` permet d'éviter cela

```js
watchEffect(()=>{
  if(error.value){
    throw createError({...error.value,fatal: true}) // createError affiche une page erreur par défaut
  }
```

## Advanced

### Pour faire plusieurs requetes en parallèle sans avoir à attendre

en combinant asyncData avec promise.all

```js
console.timeEnd();

const { data } = await useAsyncData(() => {
  return Promise.all([
    $fetch('/api/sleep/2000'), // la 1ere requete renvoie une liste d'auteur qui prend 2s
    $fetch('/api/sleep/3000'), // la 2eme requete renoie la liste de comment qui prend 3s
  ]);
});
const author = computed(() => data.value?.[0]);
const comments = computed(() => data.value?.[1]);
console.timeEnd();
```

La requete prendra ainsi (3s, la plus longue) au lieu de 5s !

### Interceptor

A définir sur le call local ou en global dans un plugins

```js
const { data, status, error, refresh, clear } = await useFetch(
  '/api/auth/login',
  {
    onRequest({ request, options }) {
      // Set the request headers
      // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
      options.headers.set('Authorization', '...');
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      localStorage.setItem('token', response._data.token);
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  }
);
```
