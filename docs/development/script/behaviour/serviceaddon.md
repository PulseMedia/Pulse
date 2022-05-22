# Service Addon
```javascript
... extends Addon.Behaviour.ServiceAddon {

  get Library(){ ... }

  get Widgets(){ ... }

  get Submission(){ ... }

}

```
| |
| ------------- |
| Serves: *```Library```* *```Widgets```* *```Submission```* |

---

[Serve]

# Serve: **Library**  

*Getter*

Libraries that will be served by the addon

> *Return* GUI.Element.LibraryItem[]

```js
get Library(){
  return [ <GUI.Element.LibraryItem>, ... ];
}
```

[/Serve]

[Serve]

# Serve: **Widgets**  

*Getter*

Widgets that will be served by the addon

> *Return* GUI.Widget.WIDGET_TYPE[]

```js
get Widgets(){
  return [ <GUI.Widget.WIDGET_TYPE>, ... ];
}
```

[/Serve]

[Serve]

# Serve: **Submission**  

*Getter*

... Undocumented ...

[/Serve]

---
