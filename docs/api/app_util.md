# App.Util

[ContentTable]

[Function]

## versionGreaterThan(String, String)
Check if an version is greater than another


### Parameter
> *version* String

> *otherVersion* String

### Returns
> Boolean **If arg[0] version is greater than arg[1] version**

```js
var isGreater = Util.versionGreaterThan("<version>", "<otherVersion>");
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## versionLowerThan(String, String)
Check if an version is lower than another


### Parameter
> *version* String

> *otherVersion* String

### Returns
> Boolean **If arg[0] version is lower than arg[1] version**

```js
var isLower = Util.versionLowerThan("<version>", "<otherVersion>");
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## versionGreaterOrEqualsThan(String, String)
Check if an version is greater or equals than another


### Parameter
> *version* String

> *otherVersion* String

### Returns
> Boolean **If arg[0] version is greater or equals than arg[1] version**

```js
var isGreaterOrEquals = Util.versionGreaterOrEqualsThan("<version>", "<otherVersion>");
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Class]

# Version

[Function]

## CONSTRUCTOR(String)

*CONSTRUCTOR*

### Parameter
> *version* String

```js
var myVersion = new Util.Version("<version>")
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## isGreaterThan(String)

Check if the version is higher than the given version in the argument

### Parameter
> *version* String or VersionClass

### Returns
> Boolean **True if is higher than the given version**

```js
var myVersionIsGreater = myVersion.isGreaterThan("<other_version>")
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## isLowerThan(String)

Check if the version is lower than the given version in the argument

### Parameter
> *version* String or VersionClass

### Returns
> Boolean **True if is lower than the given version**

```js
var myVersionIsLower = myVersion.isLowerThan("<other_version>")
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[Function]

## isGreaterOrEqualsThan(String)

Check if the version is higher or equals the given version in the argument

### Parameter
> *version* String or VersionClass

### Returns
> Boolean **True if is higher or equals than the given version**

```js
var myVersionIsGreaterOrEquals = myVersion.isGreaterOrEqualsThan("<other_version>")
```

### Compatibility
[Supports(JSAPI)]

[/Function]

[/Class]
