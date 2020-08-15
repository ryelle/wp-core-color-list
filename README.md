# WordPress Color Matches

This project takes a list of color vales extracted from WordPress 5.5, and matches those colors against a given palette of brand colors. The distance between each color is measured, and the color is matched to the closest brand color. If a given color is too "far away" from any palette color, it's set aside, and all unmatched colors are shown at the end of the page.

[View the color matches here](https://inspiring-stonebraker-7fc5ed.netlify.app/)

## Technical details

This uses the `Lab` color space to calculate [color difference.](https://en.wikipedia.org/wiki/Color_difference#CIE76) I found this method (CIE76) worked better than distance in RGB, while still being simple enough to implement in JS.

For more information on the colors used, [check out the docs for colors.](src/colors)
