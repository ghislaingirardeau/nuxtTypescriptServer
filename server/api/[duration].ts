export default defineEventHandler(async (event) => {
  const duration = getRouterParam(event, 'duration');
  await sleep(Number(duration));
  return await $fetch('https://jsonplaceholder.typicode.com/posts/1');
});

function sleep(milliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
