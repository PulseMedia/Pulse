# Script Addon
---
### AddonJson Properties
Extra properties that are available if your are using the `script`-value as the type in your addon.json file

| Key | Type |
| ------------- | ------------- |
| [`script` *Required*](#propertie-script) | **string** |

Look at the [Scripting](/development/script/structure.md) section for more script related informations.
___
#### **Propertie:** script
`string` Used to determine the name of the main script

Example: (`addon.json`)
```
{
  ...
  "script": "index.js",
  ...
}
```
---
### Addon Structure

- 📁 [`<addonId>`](/development/misc/addonid.md)
  - 📰 [`addon.json`](/development/addon/addonjson.md) *required*
  - 📰 [`index.js`](/development/addon/addonjson.md) *required*

Look at the [Scripting](/development/script/structure.md) section for more informations.
