<script>
import Home from './Index.svx'
</script>

<svelte:head>
  <title>Abrusco &ndash; Hackable CSS Toolbox</title>
  <meta
    name="description"
    content="Utility-first CSS library that is not trying to be everything. Merely a set of tools that you always bring along. Responsive, lightweight, and customizable at its core."
  />
</svelte:head>

<main class="span1">
  <section class="px1 py3 md:px2 ld:p3">
    <div class="py2">
      <h2 class="max32 d1 sd:d2 lh1 lsh">Prototype Fast,<br />Deploy at Once</h2>
    </div>
    <div class="py2 h5 sd:h4 lh2 max40">
      <p
        >Utility-first CSS library that is not trying to be everything. Merely a set of tools that you always bring
        along. Responsive, lightweight, and customizable at its core.</p
      >
    </div>
    <div class="py2 row gap1">
      <a
        class="button button--outlined block border p1b ruby lum30 lh4 min8 ac fw500"
        href="https://github.com/lemmon/abrusco"><span class="button__label white">GitHub</span></a
      >
      <a
        class="button button--outlined block border p1b ruby lum30 lh4 min8 ac fw500"
        href="https://www.npmjs.com/package/abrusco"><span class="button__label white">NPM</span></a
      >
    </div>
  </section>

  <Home />
</main>
