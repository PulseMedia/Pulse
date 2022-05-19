export function createDisplay(){
  let pre = document.createElement('pre');
  let code = document.createElement('code');
  pre.appendChild(code);
  document.body.appendChild(pre);
  return (object) => {
    let s = (typeof object === 'string') ? object : JSON.stringify(object);
    let span = document.createElement('span');
    span.innerHTML = s + "<!--- --->";
    span.appendChild(document.createTextNode('\n'));
    code.appendChild(span);
  }
}
