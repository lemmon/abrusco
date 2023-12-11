<script>
import '../css/index.css'
import { dev } from '$app/environment'
import Logo from '$lib/Logo.svg.svelte'
</script>

<svelte:head>
  {#if !dev}
    <script defer data-domain="abrusco.com" src="https://plausible.io/js/plausible.js"></script>
  {/if}
</svelte:head>

<header class="max54 py2 md:px1 ld:p2">
  <div class="p025 ruby lum30">
    <figure class="p075">
      <Logo />
    </figure>
    <h1 class="p075 d1 lsh">abrusco.css</h1>
  </div>
</header>

<slot />

<footer class="py2 md:px1 ld:p2">
  <nav class="h6 sd:h5 lh2">
    <ul class="row flex-wrap py05">
      <li class="px1 py05">
        <a class="ul" href="https://github.com/lemmon/abrusco">github</a>
      </li>
      <li class="px1 py05">
        <a class="ul" href="https://www.npmjs.com/package/abrusco">npm</a>
      </li>
      <li class="px1 py05">
        created by <a class="ul" href="http://www.lemmonjuice.com/">lemmon</a>
      </li>
    </ul>
  </nav>
</footer>
