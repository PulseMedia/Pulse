# Addon Development

---

Before you are getting startet to create your first pulse addon, you need to know how an addon is structured:  

### Addon Structure
An addon consists of one Main folder which contains all the addon files.  
Each addon should have his own individual and unique addonId. ([more informations](/development/misc/addonid.md))  
The main folder should always have the same name as the addonId.  

Depending on the addon-type (skin, script, etc..) you want to create, the folder structure differ.  
An `addon.json` file is always required:

- 📁 [`<addonId>`](/development/misc/addonid.md)
  - 📰 [`addon.json`](/development/addon/addonjson.md) *required*
  - . . .

More information about the `addon.json` can you find [here](/development/addon/addonjson.md)

---
### Quick Start (Github-Template)
If you have an Github Account you can use our Github-Template to start creating an addon.  
It already contains and `addon.json`, LICENSE (GPL-3.0) file and more..  
[**USE TEMPLATE**](https://github.com/PulseMedia/PulseAddonTemplate/generate)

alternatively you can download the template here:  
[**DOWNLOAD TEMPLATE**](https://github.com/PulseMedia/PulseAddonTemplate/archive/refs/heads/main.zip)

---
### List your addon (Github topic)
If you are creating an public open source addon we strongly recommend to add the following *tag* to your Github-Repository:  
`pulse-player-addon`  

All Repositories with this tag can be found [here](https://github.com/topics/pulse-player-addon)

---
### Translate your addon
More informations about Addon translations can be found [here](/development/addon/addonLang.md)
