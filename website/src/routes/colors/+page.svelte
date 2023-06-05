<script>
import range from '$lib/range'

const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'ruby']
const min = 2
const max = 8
const width = 5
const height = 4

const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
    .join('')}`

function initColor(node) {
  node.textContent = rgb2hex(getComputedStyle(node).getPropertyValue('background-color'))
}
</script>

<svelte:head>
  <title>Colors &ndash; Abrusco</title>
</svelte:head>

<main class="span1">
  <section class="px1 py3 md:px2 ld:p3">
    <div class="py2">
      <div class="row gap025">
        {#each colors as color}
          <div class="col gap025">
            <div class="f2 ac mt05" style="width: {width}rem; line-height: 1.5rem;">{color}</div>
            {#each range(min, max) as i}
              <div
                class="border-radius2 f2 white ac bg-{color} bg-lum{i * 10}"
                style="width: {width}rem; line-height: {height}rem;"
                use:initColor>&nbsp;</div
              >
            {/each}
          </div>
        {/each}
        <div class="col gap025">
          <div style="width: 3rem; height: 2rem;" />
          {#each range(min, max) as i}
            <div class="f2 ac" style="width: 3rem; line-height: {height}rem;">{i * 10}%</div>
          {/each}
        </div>
      </div>
    </div>
  </section>
</main>
