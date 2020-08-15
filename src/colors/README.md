# Colors

This folder holds the color lists used in the main application.

## Brand Colors

The `brand-colors*` files are lists of `key: value` pairs using proposed color palettes. `brand-colors.json` uses the list of colors collected by Hugo Baeta in 2015-2017 on [this codepen.](https://codepen.io/hugobaeta/full/RNOzoV) `brand-colors-new.json` uses the colors [proposed by Dave Whitley in 2019,](https://make.wordpress.org/design/2019/11/26/proposal-a-new-color-palette-for-wordpress/) listed out in [this codepen.](https://codepen.io/drw158/pen/oNNarbq)

## Color Lists

Color lists are matched against brand colors. These are simple arrays of colors, the color values should be unique. `list-core-css.json` is a list extracted from WP core, using version 5.5.

The steps I followed to collect this list:

- Download a zip of WordPress
- Copy over the `wp-admin/css` & `wp-includes/css` folders
- Remove all `*.min.css`, `*-rtl.css`, and `*.scss` files, any colors here would be found in other files
- Remove `wp-admin/css/colors`, to exclude any other color schemes
- Remove `wp-includes/css/dist`, which appears to be Gutenberg CSS, including theme-related CSS (this could be audited separately, as part of Gutenberg, if necessary)
- Run the CSS audit using the JSON format to get an array of all colors.
	```
	yarn run css-audit --colors 5.5/*.css --format=json
	```
- The full list of unique colors is in "List of all colors"
