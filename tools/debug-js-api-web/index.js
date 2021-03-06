import pulseApi from "pulse-javascript";
import { registerDebugGlobals } from "./debugGlobals.js";
import { debugMap } from "./debugMap.js";


let pre = document.createElement('pre');
let code = document.createElement('code');
pre.appendChild(code);
document.body.appendChild(pre);

window.NativeCheck = (window.location.hash.replace("#", "").trim().toUpperCase() == "NATIVE");
window.Displays = {};

function renderDisplay(object){
  let s = (typeof object === 'string') ? object : JSON.stringify(object);
  let span = document.createElement('span');
  span.innerHTML = s + "<!--- --->";
  span.appendChild(document.createTextNode('\n'));
  code.appendChild(span);
}

renderDisplay("====================================================");
renderDisplay("PULSE DEBUG: js-api");
renderDisplay("Test will be executed in the following Enviornment:");
renderDisplay(navigator.userAgent);
renderDisplay("====================================================");

fillNativeApifunctions();

const DEBUG_GLOBALS = {
  PlatformPathSeperator:  "/",
  AppDataPath: "pulse://data/",
  Api: pulseApi.api
}

registerDebugGlobals(DEBUG_GLOBALS);


function createDisplay(content = ""){
  let span = document.createElement('span');
  span.innerHTML = content + "<!--- --->";
  span.appendChild(document.createTextNode('\n'));
  code.appendChild(span);
  return span;
}
//very ugly implementation lol :D
function updateDisplay(key, content, append = true){
  if(key in Displays){
    if(append){
      Displays[key].innerHTML = Displays[key].innerHTML + content + "<!--- --->";
      Displays[key].appendChild(document.createTextNode('\n'));
    } else {
      Displays[key].innerHTML = content + "<!--- --->";
      Displays[key].appendChild(document.createTextNode('\n'));
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toLowerCamelCaseFromLow(input){
  return input.split(/(?=[A-Z])/).map(e => e.toUpperCase()).join("_");
}

function toLowerCamelCase(input){
  var split = input.split("_");
  var output = split.shift().toLowerCase();
  split.forEach((item, i) => {
    output += capitalizeFirstLetter(item.toLowerCase())
  });
  return output;
}

function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

function arrayEquals(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1)
    || !Array.isArray(_arr2)
    || _arr1.length !== _arr2.length
    ) {
      return false;
    }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
       }
  }

  return true;
}

function valueEquals(one, two){
  if(one == undefined) {
    if(two != undefined){
      return false;
    }
  }
  if (typeof one === 'object' && !Array.isArray(one) && one !== null){
    if(typeof two === 'object' && !Array.isArray(two) && two !== null){
      for(var key in one){
        if(!valueEquals(one[key], two[key])){
          return false;
        }
      }
    } else {
      return false;
    }
  } else {
    if(Array.isArray(one) && one !== null){
      if(Array.isArray(two) && two !== null){
        return arrayEquals(one, two);
      } else {
        return false;
      }
    } else {
      return (one === two);
    }
  }
  return true;
}

(async function(){

  for(var mainCategory in pulseApi.api){
    if(!(mainCategory in debugMap)){
      continue;
    }
    for(var subCategory in pulseApi.api[mainCategory]){
      if(!(subCategory in debugMap[mainCategory])){
        continue;
      }
      for(var func in pulseApi.api[mainCategory][subCategory]){
        let functionName = toLowerCamelCaseFromLow(func);
        let updateKey = `${mainCategory}.${subCategory}.${functionName}`;
        if(isClass(pulseApi.api[mainCategory][subCategory][func])){
          let errors = [];
          let count = 0;

          debugMap[mainCategory][subCategory][functionName].forEach((item, i) => {
            count++;
            if(item.constructor){
              var created = undefined;
              try {
                created = new pulseApi.api[mainCategory][subCategory][func](...item.constructor);
              } catch (e) {
                errors.push({ id: i, type: "CONSTRUCTOR", error: e });
                return;
              }

              if(item.call){
                if(item.args){
                  let valGot = undefined;
                  try {
                    valGot = created[item.call].apply(created, item.args);
                  } catch (e) {
                    errors.push({ id: i, type: "CALL", error: e });
                    return;
                  }
                  if(!(valueEquals(valGot, item.expected))){
                    errors.push({
                      id: i,
                      type: "WRONGVALUE",
                      got: valGot,
                      should: item.expected,
                      callee: item.call
                    });
                  }
                } else {
                  errors.push({
                    id: i,
                    type: "RAW",
                    name: "DebugClassError",
                    message: "Missing 'args' key"
                  });
                }
              } else {
                errors.push({
                  id: i,
                  type: "RAW",
                  name: "DebugClassError",
                  message: "Missing 'call' key"
                });
              }

            } else {
              errors.push({
                id: i,
                type: "RAW",
                name: "DebugClassError",
                message: "Missing 'constructor' key"
              });
            }
          });
          if(errors.length > 0){
            updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style='color: #e3b129; font-weight: 700; font-size: 14px;'>CLASS</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">(${count  - errors.length}/${count} class tests passed)</span>`, false);
            errors.forEach((item, i) => {
                switch (item.type) {
                  case "CONSTRUCTOR":
                  case "CALL":
                    updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Class Test "${item.id + 1}" results in:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.error.name}:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.error.message}</span><br/>`);
                    break;
                  case "WRONGVALUE":
                    updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Class Test "${item.id + 1}" (${item.callee}) returns:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.got} <span style="color: #ba3c3c;">(${typeof item.got})</span></span>`);
                    updateDisplay(updateKey, `           <span style="font-size: 14px; color: #fc7474;">But expected the following value:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.should} <span style="color: #ba3c3c;">(${typeof item.should})</span></span><br/>`);
                    break;
                  case "RAW":
                    updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Class Test "${item.id + 1}" results in:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.name}:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.message}</span><br/>`);
                    break;

                }
            });

          } else {
            updateDisplay(updateKey, `    ?????? <span style='color: #3ff25d'>${func}</span> <span style='color: #e3b129; font-weight: 700; font-size: 14px;'>CLASS</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">(${count  - errors.length}/${count} class tests passed)</span>`, false);
          }
        } else {

          if(!(functionName in debugMap[mainCategory][subCategory])){
            if(!(functionName in pulseApi.map[mainCategory][subCategory])){
              updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">(...)</span>`, false);
              updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Missing api map data</span><br/>`);
              continue;
            }

            let hasAfter = pulseApi.map[mainCategory][subCategory][functionName].after != undefined;
            let hasBefore = pulseApi.map[mainCategory][subCategory][functionName].before != undefined;
            if(pulseApi.api[mainCategory][subCategory][func] === "UNSUPPORTED"){
              updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style='color: #da7af0; font-weight: 700; font-size: 14px;'>?Native?</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""}(...)</span>`, false);
              updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Missing debug data</span><br/>`);
            } else {
              updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""}(...)</span>`, false);
              updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Missing debug data</span><br/>`);

            }

          } else {

            if(pulseApi.api[mainCategory][subCategory][func] === "CALLONLY"){
              if(window.NativeCheck == true){ continue; }
              //Check was executed without exception
              updateDisplay(updateKey, `    ?????? <span style='color: #3ff25d'>${func}</span> <span style='color: #aa2af5; font-weight: 700; font-size: 14px;'>NATIVE CALL</span>`, false);
              continue;
            }
            if(pulseApi.api[mainCategory][subCategory][func].native === true){
              if(window.NativeCheck == true){ continue; }
              let errorsB = [];
              let countB = 0;

              let errorsA = [];
              let countA = 0;

              let hasAfter = pulseApi.map[mainCategory][subCategory][functionName].after != undefined;
              let hasBefore = pulseApi.map[mainCategory][subCategory][functionName].before != undefined;

              debugMap[mainCategory][subCategory][functionName].forEach((item, i) => {
                if(hasBefore){
                  countB++;
                  if(item.input){
                    if(item.args){
                      let valGot = undefined;
                      try {
                        valGot = pulseApi.map[mainCategory][subCategory][functionName].before(item.input);
                      } catch (e) {
                        errorsB.push({ id: i, type: "CALL", error: e });
                      }
                      if(valGot != undefined){
                        if(!arrayEquals(valGot, item.args)){
                          errorsB.push({
                            id: i,
                            type: "WRONGBEFORE",
                            got: valGot,
                            should: item.args
                          });
                        }
                      }
                    } else {
                      errorsB.push({
                        id: i,
                        type: "RAW",
                        name: "DebugMapError",
                        message: "Missing 'args' key"
                      });
                    }

                  } else {
                    errorsB.push({
                      id: i,
                      type: "RAW",
                      name: "DebugMapError",
                      message: "Missing 'input' key"
                    });
                  }
                }

                if(hasAfter){
                  countA++;
                  if(item.output){
                    if(item.expected){
                      let valShould = undefined;
                      try {
                        valShould = pulseApi.map[mainCategory][subCategory][functionName].after(item.output);
                      } catch (e) {
                        errorsA.push({ id: i, type: "CALL", error: e });
                        return;
                      }
                      if(!(valueEquals(valShould, item.expected))){
                        errorsA.push({
                          id: i,
                          type: "WRONGAFTER",
                          got: valShould,
                          should: item.expected
                        });
                      }
                    } else {
                      errorsA.push({
                        id: i,
                        type: "RAW",
                        name: "DebugMapError",
                        message: "Missing 'expected' key"
                      });
                    }
                  } else {
                    errorsA.push({
                      id: i,
                      type: "RAW",
                      name: "DebugMapError",
                      message: "Missing 'output' key"
                    });
                  }
                }
              });
              if(errorsB.length > 0 || errorsA.length > 0){
                updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style='color: #aa2af5; font-weight: 700; font-size: 14px;'>NATIVE</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""} (${countB  - errorsB.length}/${countB} before tests passed) (${countA  - errorsA.length}/${countA} after tests passed)</span>`, false);
                errorsB.forEach((item, i) => {
                  switch (item.type) {
                    case "RAW":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'Before' Test "${item.id + 1}" results in:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.name}:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.message}</span><br/>`);
                      break;
                    case "WRONGBEFORE":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'Before' Test "${item.id + 1}" returns:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.got} <span style="color: #ba3c3c;">(${typeof item.got})</span></span>`);
                      updateDisplay(updateKey, `           <span style="font-size: 14px; color: #fc7474;">But expected the following value:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.should} <span style="color: #ba3c3c;">(${typeof item.should})</span></span><br/>`);
                      break;
                    case "CALL":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'Before' Test "${item.id + 1}" results in:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.error.name}:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.error.message}</span><br/>`);
                      break;
                    default:
                      break;
                  }
                });
                errorsA.forEach((item, i) => {
                  switch (item.type) {
                    case "RAW":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'After' Test "${item.id + 1}" results in:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.name}:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.message}</span><br/>`);
                      break;
                    case "WRONGAFTER":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'After' Test "${item.id + 1}" returns:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.got} <span style="color: #ba3c3c;">(${typeof item.got})</span></span>`);
                      updateDisplay(updateKey, `           <span style="font-size: 14px; color: #fc7474;">But expected the following value:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.should} <span style="color: #ba3c3c;">(${typeof item.should})</span></span><br/>`);
                      break;
                    case "CALL":
                      updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">'After' Test "${item.id + 1}" results in:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.error.name}:</span>`);
                      updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.error.message}</span><br/>`);
                      break;
                    default:
                      break;
                  }
                });

              } else {
                updateDisplay(updateKey, `    ?????? <span style='color: #3ff25d'>${func}</span> <span style='color: #aa2af5; font-weight: 700; font-size: 14px;'>NATIVE</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""} (${countB}/${countB} before tests passed) (${countA}/${countA} after tests passed)</span>`, false);
              }
              continue;
            }
            let errors = [];
            let count = 0;
            debugMap[mainCategory][subCategory][functionName].forEach((item, i) => {
              count++;
              let output = undefined;
              try {
                output = pulseApi.api[mainCategory][subCategory][func].apply(window, item.args);
              } catch (e) {

                if(item.exception === true){
                  return;
                }

                errors.push({ id: i, type: "CALL", error: e });
                return;
              }
              if(!(valueEquals(output, item.expected))){
                errors.push({ id: i, type: "RETURN", got: output, should: item.expected });
              }
            });
            let hasAfter = pulseApi.map[mainCategory][subCategory][functionName].after != undefined;
            let hasBefore = pulseApi.map[mainCategory][subCategory][functionName].before != undefined;
            if(errors.length > 0){
              updateDisplay(updateKey, `    ??? <span style='color: #e81e30'>${func}</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""} (${count - errors.length}/${count} full tests passed)</span>`, false);
              errors.forEach((item, i) => {
                switch (item.type) {
                  case "CALL":
                    updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Test "${item.id + 1}" results in:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474; font-weight: 700;">${item.error.name}:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.error.message}</span><br/>`);
                    break;
                  case "RETURN":
                    updateDisplay(updateKey, `        -  <span style="font-size: 14px; color: #fc7474;">Test "${item.id + 1}" returns:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.got} <span style="color: #ba3c3c;">(${typeof item.got})</span></span>`);
                    updateDisplay(updateKey, `           <span style="font-size: 14px; color: #fc7474;">But expected the following value:</span>`);
                    updateDisplay(updateKey, `              <span style="font-size: 14px; color: #fc7474;">${item.should} <span style="color: #ba3c3c;">(${typeof item.should})</span></span><br/>`);
                    break;
                  default:
                    break;
                }
              });
            } else {
              updateDisplay(updateKey, `    ?????? <span style='color: #3ff25d'>${func}</span> <span style="font-size: 14px; margin-left: 3px; color: #8f8c8d;">${hasBefore ? " (+before)" : ""}${hasAfter ? " (+after)" : ""} (${count}/${count} full tests passed)</span>`, false);
            }
          }
        }
      }
    }
  }

}())

function fillNativeApifunctions(){
  let newApi = pulseApi.api;
  for(var key in pulseApi.map){
    if(!(key in newApi)){
      newApi[key] = {};
    }
    if(!(key in debugMap)){
      debugMap[key] = {};
    }
    Displays[key] = createDisplay(`> <span style='color: #2b89ed'>${key}</span>`);
    for(var sub in pulseApi.map[key]){
      if(!(sub in newApi[key])){
        newApi[key][sub] = {};
      }
      if(!(sub in debugMap[key])){
        debugMap[key][sub] = {};
      }
      Displays[key + "." + sub] = createDisplay(`  - <span style='color: #2bc6ed'>${sub}</span>`);
      for(var func in pulseApi.map[key][sub]){
        Displays[key + "." + sub + "." + func] = createDisplay(`    <span class='loader'></span>  <span style='color: #82aaf5; opacity: 0.75;'>${toLowerCamelCase(func)}</span>`);
        if(capitalizeFirstLetter(toLowerCamelCase(func)) in newApi[key][sub]){
          continue;
        }
        if(!(toLowerCamelCase(func) in newApi[key][sub])){
          newApi[key][sub][toLowerCamelCase(func)] = "UNSUPPORTED";
          if(func in debugMap[key][sub]){

            if(Array.isArray(debugMap[key][sub][func]) && debugMap[key][sub][func].length > 0 && debugMap[key][sub][func][0].callOnly === true){
              newApi[key][sub][toLowerCamelCase(func)] = "CALLONLY";
            } else {
              debugMap[key][sub][func].forEach((item, i) => {
                if(item.output){
                  let _data = item;
                  let _mapData = pulseApi.map[key][sub][func];
                  newApi[key][sub][toLowerCamelCase(func)] = (...args) => {
                    if(arrayEquals(args, _data.args)){
                      if(_mapData.after != undefined){
                        return _mapData.after(_data.output);
                      }
                      return _data.output;
                    }
                  }
                  newApi[key][sub][toLowerCamelCase(func)].native = true;
                }
              });
            }
          }
        } else {
          let _mapData = pulseApi.map[key][sub][func];
          let _func = newApi[key][sub][toLowerCamelCase(func)];
          newApi[key][sub][toLowerCamelCase(func)] = (...args) => {
            if(_mapData.before != undefined){
              args = _mapData.before(args);
            }
            if(_mapData.after != undefined){
              return _mapData.after(_func.apply(undefined, args));
            }
            return _func.apply(undefined, args);
          }
        }
      }
    }
  }
  pulseApi.api = newApi;
  window.API = pulseApi.api;
}
