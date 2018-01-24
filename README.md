# Abrusco

Hackable CSS toolbox. <http://abrusco.lemmonjuice.com>

## Install

```sh
npm install abrusco --save-dev
```

## Features

* Mobile first and responsive
* Reusable and hackable
* Works with plain html or framework of your choice
* Built with Postcss

## CLI

```
Usage
  $ abrusco <input.css>

Options
  -o, --output Output file
  -m, --minify Minify the output stylesheet
  -w, --watch Watch CSS source directory for changes

Example
  $ abrusco src/master.css -o dist/bundle.css
  $ abrusco src/master.css -o dist/bundle.css --minify
  $ abrusco src/master.css -o dist/bundle.css --watch
```

## Example

`master.css`:

```css
@import 'abrusco';

/* my custom variables */
:root {
  --text-color: var(--indigo); /* affect Abrusco's internals */
}

/* my custom styles */
.hello {
  color: var(--orange);
}
```

```sh
abrusco master.css > bundle.css
```

## Modules

* **reset** - CSS reset
* **normalize** - normalize certain html elements
* **variables** - define global variables
* **page**
* **links**
* **type** - typography
* **visibility**
* **grid**
* **spacing**
* **colors**
* **borders**
* **background**
* **debug** - debugging utilities
