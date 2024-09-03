<template>
  <div>
    <h1>SWR: exemple product page</h1>
    <h2>{{ new Date() }}</h2>
    <h3>
      page generated on demand, revalidates in background, cached until API
      response changes
    </h3>
    <p>
      Ouvrir le code source pour voir les différences <br />
      La date ne se rafraichit pas meme que je reload le navigateur
    </p>
  </div>
</template>
