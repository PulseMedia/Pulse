# Skin Addon
---
### AddonJson Properties
Extra properties that are available if your are using the `skin`-value as the type in your addon.json file

| Key | Type |
| ------------- | ------------- |
| [`views` *Required*](#propertie-view) | **string[]** |

Look at the [Skinning](/development/skin/structure.md) section for more skinning related informations.
___
#### **Propertie:** view
`string[]` Used to determine which views are supported in this skin

note that not every platform can display each view,  
eg: Portrait is not available/selectable on an TV also if the skin supports it

| Available values in the array | |
| ------------- | ------------- |
| `string` **"portrait"** | Allows the useage of the `views/portrait` if portrait is supported on the user platform |
| `string` **"landscape"** | Allows the useage of the `views/landscape` if landscape is supported on the user platform |

Example: (`addon.json`)
```
{
  ...
  "view": [ "portrait", "landscape" ],
  ...
}
```
---
### Addon Structure
Skin addons are not like other "script"-addons, they have his own structures and files.  
Look at the [Skinning](/development/skin/structure.md) section for more informations.
