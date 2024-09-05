
function createBlock(name, value, contents){
  let item = elem(
    'div',
    {"class": "block", draggable: true, "data-name": name},
    [name]
  );

  if (typeof value === 'number'){
    item.appendChild(elem('input', {"type": "number", value}));
  }

  if (Array.isArray(contents)){
    item.appendChild(elem(
      'div',
      {"class": "container"},
      contents.map(block => createBlock(...block))
    ))
  } else if (typeof contents == 'string') {
    item.appendChild(document.createTextNode(contents));
  }

  return item;
}

function blockContents(block){
  let container = block.querySelector('.container');
  return container? Array.from(container.children): null;
}

function blockValue(block){
  let input = block.querySelector('input');
  return input? Number(input.value): null;
}

function blockUnits(block){
  if (block.childNodes.length > 1 &&
      block.lastChild.nodeType == Node.TEXT_NODE) {
        return block.lastChild.textContent;
      }
}

function blockScript(block){
  let script = [block.dataset.name];

  let value = blockValue(block);
  if (value) script.push(value);

  let contents = blockContents(block);
  let units = blockUnits(block);

  if (contents) script.push(contents.map(blockScript));
  if (units) script.push(units);

  return script;
}