export default defineEventHandler(async (event) => {
  await sleep(2000);
  // NEVER USE USEFETCH OR USEASYNCDATA INSIDE SERVER!
  return await $fetch('https://dummyapi.online/api/pokemon');
});
