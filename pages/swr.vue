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
      Lors du reload, la date ne se rafraichit pas car mise en cache suivant les
      conditions dans le nuxt config. Si par exemple, mise en cache de 60
      secondes, la date se rafraihira après 60 secondes
    </p>
  </div>
</template>
