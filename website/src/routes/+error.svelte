<script>
import { page } from '$app/stores'
</script>

<svelte:head>
  <title>Abrusco Error {$page.status}</title>
</svelte:head>

<main class="span1">
  <section class="px1 py3 md:px2 ld:p3">
    <h2 class="h3 sd:h1 lh2 fw600 lsh">Error {$page.status}</h2>
    <div class="mt2 max32">
      <p class="sd:h6 lh4">{$page.error.message}</p>
    </div>
    <div class="mt2 row gap1">
      <a class="button button--outlined block border p1b lh4 min8 ac fw500" href="/"
        ><span class="button__label white">Home</span></a
      >
    </div>
  </section>
</main>
