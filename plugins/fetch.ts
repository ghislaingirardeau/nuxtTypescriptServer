export default defineNuxtPlugin((nuxtApp) => {
  const session = {
    value: {
      token: '123',
    },
  };
  // Pour configurer fetch et par exemple les headers par default pour chaque requete
  const api = $fetch.create({
    baseURL: 'https://api.nuxt.com',
    onRequest({ request, options, error }) {
      if (session.value?.token) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options?.headers?.set(
          'Authorization',
          `Bearer ${session.value?.token}`
        );
      }
    },
    // Peut aussi configurer un retour vers une page spécifique si erreur
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
