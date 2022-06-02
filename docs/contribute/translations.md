# I18N Contribution
The complete app can be translated through this repository or via an addon.  
All official translations are available in our public github repository.  

___
### Official Translations
The Official translations can be found here:  
- 📁 [github.com/PulseMedia/Pulse/i18n](https://github.com/PulseMedia/Pulse/tree/main/i18n)  
**Note**: the `main` branch is equal to the current app release, there already might be language changes in another branch

The folder of the official translations contains the following files:

- 📁 lang
- 📰 collection.json
- 📰 flags.js


#### 📰 collection.json:

Json file which holds all available languages that can be selected in the app without any extra addons.  

The Json File contains one root key called `languages`, which is an array that holts all available languages.  
The array contains objects which has the following keys:

> `name` **string** Name of the Language  
> `code` **string** Code of the Language

We recommend to build the code in this format:
> `<ISO-639-1(Alpha-2)>_<ISO 3166-1(Alpha-2)>` **eg: `en_US`**

```json
{
   "languages":[
     ...
      {
         "name":"English (BuiltIn)",
         "code":"en_US"
      }
      ...
   ]
}
```

#### 📁 lang:

The `lang` folder contains all translation-files.  
An translation is regcocnized by his file name, which always is the same as the `code` defined in the `collection.json`-file.  

The translation file for the above example has the following name: `en_US.json`.

The structure of the json file can you find [here](/development/misc/i18n.md).

**Note**: All language files should have the same keys & structure like the `en_US.json` file.  
The `en_US.json` file is the default language of the app and is included in the app build,  
that means this language is also available on startup if the user has no active internet connection.  
keys that are missing in other languages will fallback to the `en_US.json` file.

#### 📰 flags.js:

This JavaScript file holts the flag for the translations.  
Note that this file is BuiltIn and used internally, we want to reduce traffic and improve the loading time of the language switch dialog.  

This is also the reason why it can happen that new languages that are available have no flag, because the app has not been updated yet or no flag is available for the language.  
In this case the `fallback` object is used, which displays a neutral flag.


This file `exports` an JavaScript objects, the keys of this Object should be the same as the `Code` defined above.

___
### Language Addons
Language-Addons are independent and are maintained by the addon creator.  
Currently not supported

___
### Addon Specific translations
Addons that require special translations that are not present in the public translations, can implement their own translations.  
