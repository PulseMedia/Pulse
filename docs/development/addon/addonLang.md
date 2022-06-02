# Addon Languages
Addons that require special translations that are not present in the public translations, can implement their own translations.  
**Note**: This section is only for Script & Skin Addons, if you want to create an Language-Addon see the corresponding addonType, [here](/development/addon/type/language.md)

___
#### **1.** Add Languages to your addon
To add languages to your addon you need to define an fallback language that will be used if the current language of the user is not implemented in your addon.  
Just add the `fallbackLanguage`-key to the `extends`-object in the `addon.json`-file.

Example: (`addon.json`)
```
{
  ...
  "extends": {
    "fallbackLanguage": "en_US",
  },
  ...
}
```

___
#### **2.** Add Languages folder
Now add an `lang`-folder to your addon directory, it should now look like something like this:  

- 📁 `<addonId>`
  - 📁 `lang`
  - 📰 `addon.json`
  - . . .

---
#### **3.** Add Language files
You can now put language files to your `lang`-folder,  
please note that your defined `fallbackLanguage` must always be in that folder.

For the above example create an `en_US.json`-file in the `lang`-folder of your addon.

Your addon folder should now look similar to this example:
- 📁 `<addonId>`
  - 📁 `lang`
    - 📰 `en_US.json`
    - . . .
  - 📰 `addon.json`
  - . . .

___
#### **4.** Translate your addon
Now you can add the translations to your language file.  
We will now create an small example `en_US.json`-file.  

For advanced useage, visit the [Miscellaneous/I18N](/development/misc/i18n.md) section  

Your `en_US.json`-file should now have the following content:
```json
{
  "translation": {
    "myKey": "This is the translation for myKey."
  }
}
```

___
#### **4.** Access the translations
To access the translations you can use the following methods:

| Useage | |
| ------------- | ------------- |
| BBCode | `[localize]my.addon.id@myKey[/localize]` |
| Api | `I18N.translateAddon("my.addon.id", "myKey");` |
| Addon Interface | `interface.translate("myKey");` |

**Note**: Translations are available AFTER the `SERVE-CONTENT`-Phase!  
In script addons you can translate only in the `Ready()`-Lifecylce function or later.
