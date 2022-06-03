# App.Util

[ContentTable]



[Class]

# Version

[Function]

## CONSTRUCTOR(String)

*CONSTRUCTOR*

### Parameter
> *path* String

```js
var myVersion = new Util.Version("<version>")
```

[/Function]

[Function]

## isHigherThan(String)

Check if the version is higher than the given version in the argument

### Parameter
> *version* String or VersionClass

### Returns
> Boolean **True if is higher than the given version**

```js
var myVersionIsHigher = myVersion.isHigherThan("<other_version>")
```

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

[/Function]

[Function]

## isHigherOrEqualsThan(String)

Check if the version is higher or equals the given version in the argument

### Parameter
> *version* String or VersionClass

### Returns
> Boolean **True if is higher or equals than the given version**

```js
var myVersionIsHigherOrEquals = myVersion.isHigherOrEqualsThan("<other_version>")
```

[/Function]

[/Class]
