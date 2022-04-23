# NET.Url

[Function]

## getUrlRoot(String)
Get the Root of an given Url

### Parameter
> *url* String **url to get root**

### Returns
> String **Root of the given url**
> undefined `if not root found`

```js
Url.getUrlRoot("<url>")
```

##### Example with example Url
```js
Url.getUrlRoot("https://www.example.domain/some/sub/folders/index.html")
// Returns:
// https://www.example.domain/
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## getUrlProtocol(String)
Get the Protocol of an given Url

### Parameter
> *url* String **url to get protocol**

### Returns
> String **Protocol of the given url**
> undefined `if not protocol found`

```js
Url.getUrlProtocol("<url>")
```

##### Example with example Url
```js
Url.getUrlProtocol("https://www.example.domain/")
// Returns:
// https
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## getUrlHostName(String)
Get the Hostname of an given Url

### Parameter
> *url* String **url to get Hostname**

### Returns
> String **Hostname of the given url**

```js
Url.getUrlHostName("<url>")
```

##### Example with example Url
```js
Url.getUrlHostName("https://www.example.domain/")
// Returns:
// example
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## getUrlFileName(String)
Get the Filename of an given Url

### Parameter
> *url* String **url to get Filename**

### Returns
> String **Filename of the given url**
> undefined `if not Filename found`

```js
Url.getUrlFileName("<url>")
```

##### Example with example Url
```js
Url.getUrlFileName("https://www.example.domain/example.html")
// Returns:
// example.html
```

### Compatibility
[Supports(*)]

[/Function]


[Function]

## getUrlDirectory(String)
Get the current Directory of an given Url

### Parameter
> *url* String **url to get current Directory**

### Returns
> String **Current directory of the given url**

```js
Url.getUrlDirectory("<url>")
```

##### Example with example Url
```js
Url.getUrlDirectory("https://www.example.domain/folder/index.html")
// Returns:
// https://www.example.domain/folder/
```

### Compatibility
[Supports(*)]

[/Function]
