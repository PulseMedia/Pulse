# App.I18N

[ContentTable]

[Function]

## getCode()
Get the current used language code

> **Language code format: `<ISO-639-1(Alpha-2)>_<ISO 3166-1(Alpha-2)>`** **eg: `en_US`**


### Returns
> String **Current App language code**

```js
I18N.getCode()
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## getName()
Get the current used language name

### Returns
> String **Current App language name**

```js
I18N.getName()
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## translate(String, Object)
Get the translation of the given lang-key,  
optionally pass an langData-object to translate variables/plurals.

### Parameter
> *langKey* String

> *langData* Object `Optional`

### Returns
> String **Translation**

```js
I18N.translate("langKey");
```
```js
I18N.translate("langKeyData", { variable: "value", ... });
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## createBBCode(String, Object)
Create an BBCode string for the given lang-key  
optionally pass an langData-object to add data to the BBcode  

The BBcode string can than be used to create language-friendly dialogs, popus etc..

### Parameter
> *langKey* String

> *langData* Object `Optional`

### Returns
> String **BBcode string**

```js
I18N.createBBCode("langKey");
```
```js
I18N.createBBCode("langKeyData", { variable: "value", ... });
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## translateAddon(String, String, Object)
Get the translation from an addon, by the given addonId and lang-key,  
optionally pass an langData-object to translate variables/plurals.

### Parameter
> *addonId* String

> *langKey* String

> *langData* Object `Optional`

### Returns
> String **Translation**

```js
I18N.translateAddon("my.addon.id", "langKey");
```
```js
I18N.translate("my.addon.id", "langKeyData", { variable: "value", ... });
```

### Compatibility
[Supports(*)]

[/Function]

[Function]

## createBBCodeAddon(String, String, Object)
Create an BBCode string from the given addon, by the given addonId and lang-key,  
optionally pass an langData-object to add data to the BBcode  

The BBcode string can than be used to create language-friendly dialogs, popus etc..

### Parameter
> *addonId* String

> *langKey* String

> *langData* Object `Optional`

### Returns
> String **BBcode string**

```js
I18N.createBBCodeAddon("my.addon.id", "langKey");
```
```js
I18N.createBBCodeAddon("my.addon.id", "langKeyData", { variable: "value", ... });
```

### Compatibility
[Supports(*)]

[/Function]
