# Skin Addon Structure

The folder structure of an skin addon is similar to any other addon, except that it has no script files.  
Additionally, it contains some skinning related folders & files.

- 📁 [`<addonId>`](/development/misc/addonid.md)
  - 📰 [`addon.json`](/development/addon/addonjson.md) **type="skin"**
  - 📁 [`audio`](#audio-folder)
  - 📁 [`fonts`](#fonts-folder)
  - 📁 [`themes`](#themes-folder)
  - 📁 [`views`](#views-folder)

___
### audio Folder
The audio folder contains UI Sounds used by the skin.

The following file names are used: (If file doesnt exists, nothing is been played)  

| 📁 audio | |
| ------------- | ------------- |
| `click.mp3` | |
| `context.mp3` | |
| `notification.mp3` | |

**Note**: Currently only `.mp3` is supported, this will be changed in the future
___
### fonts Folder

The fonts folder contains all used fonts of the skin.  
All fonts gets loaded from an `@Font.css`-file.

- 📁 fonts
  - 📰 `@Font.css` **required**
  - 📰 `Roboto-Light.ttf` *example*
  - 📰 `Roboto-Medium.ttf` *example*
  - 📰 `Roboto-Black.ttf` *example*

@Font.css Example:
```css
@font-face {
  font-family: 'Roboto';
  src: url('Roboto-Light.ttf');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('Roboto-Medium.ttf');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('Roboto-Black.ttf');
  font-weight: 700;
  font-style: normal;
}

```
The font can then be used in skin with the `font-family` property.  
`font-family` values are defined in the font-face of the `@Font.css`-file.  
eg: `font-family: 'Roboto';`  
For more informations about visit the [mdn web docs (@font-face)](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
___
### themes Folder
...
___
### views Folder
...
