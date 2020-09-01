# PostCSS Color Match

This is a postCSS plugin used to reduce the colors used in a CSS file down to a set of "valid" colors. This is not a published postcss plugin, and it's intended to be used from this repo directly, and run on other CSS files via command line. In this case, the set of colors used is the [brand-colors-new.json](https://github.com/ryelle/wp-core-color-list/blob/main/src/colors/brand-colors-new.json). To run this on all relevant WordPress CSS files, run:

```bash
npx postcss --config ./postcss --replace /full-path-to-wp/src/wp-admin/css/*.css /full-path-to-wp/src/wp-includes/css/*.css
```

The `--config` flag should point to this directory, the above command assumes it's running from the root of this repo. The `--replace` flag means the CSS files will be overwritten with the changes. And lastly, the two file paths catch CSS in wp-admin and wp-includes, without going into subfolders (like the color schemes or gutenberg theme colors). By running this on the `src` directory, this _should_ avoid running on minified or RTL files, instead those will be built with the new colors when `npm run build` is run.

Files with the comment `/* @no-color-match */` as the first item in the file will be skipped. In WordPress, we want this for the about.css file, since those colors are intentionally unique per release.

---------------------------------

The plugin is fully configured for the above use case, but for reference, the options are documented below.

## Options

### `colors`

- Type: `Object`
- Default: `{}`

A list of colors in key -> value pairs. The keys are not used currently, but are required by the `getClosestColor` matching function. Example:

```json
{
    "white": "#fff",
    "black": "#000",
    "red": "#8c1717",
    "blue": "#0ebfe9"
}
```

## Usage

```js
const options = {
	colors: {
		"white": "#fff",
		"black": "#000",
		"red": "#8c1717",
		"blue": "#0ebfe9"
	},
};
postcss( [ require( 'index.js' )( options ) ] )
```

## Example

```css
.foo {
  /* Input example */
  color: #f00;
  background-image: linear-gradient(to bottom right, #eee, #111);
}
```

```css
.foo {
  /* Output example */
  color: #8c1717;
  background-image: linear-gradient(to bottom right, #fff, #000);
}
```
