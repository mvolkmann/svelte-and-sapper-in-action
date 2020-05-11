<script>
  import sanitizeHtml from 'sanitize-html';

  const SAFE = true;

  const SANITIZE_OPTIONS = {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {img: ['alt', 'src']}
  };

  function buildScript(content) {
    const s = 'script';
    return `<${s}>${content}</${s}>`;
  }

  function sanitize(markup) {
    // sanitizeHtml is a global function loaded in index.html.
    // See https://github.com/apostrophecms/sanitize-html.
    // By default only these tags are allowed:
    // 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    // 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    // 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'
    // These tags can have any attributes, except
    // the a tag can only have href, name, and target attributes.
    // So by default img tags are not allowed.
    // But we can configure sanitizeHTML to allow them.
    // We can also configure which img attributes are allowed.
    // sanitizeHTML will remove other img attributes such as onerror and onload.
    return SAFE ? sanitizeHtml(markup, SANITIZE_OPTIONS) : markup;
  }

  // sanitizeHtml removes script tags.
  // Without sanitizing, Svelte will add this script tag to innerHTML.
  // The HTML5 spec says "script elements inserted using innerHTML
  // do not execute when they are inserted."
  // However, it's still advisable to remove script tags so someone
  // inspecting the elements on the page won't assume it was executed.
  const markup1 = buildScript('console.log("pwned by script")');

  // With specified options, sanitizeHTML will keep this.
  const markup2 = '<img alt="star" src="star.png" />';

  // With specified options, sanitizeHTML will keep this
  // but remove the onload attribute.
  const markup3 = '<img alt="star" src="star.png" onload="console.log(\'pwned by onload\')" />';

  // With specified options, sanitizeHTML will keep this
  // but remove the onerror attribute.
  // It will appear as a broken image since missing.png does not exist.
  const markup4 = '<img alt="missing" src="missing.png" onerror="console.log(\'pwned by onerror\')" />';

  const markups = [markup1, markup2, markup3, markup4];
</script>

<h1>Check the console.</h1>
{#each markups as markup}
  {@html sanitize(markup)}
{/each}
