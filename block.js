
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
  let script = [
    block.dataset.name,
    blockValue(block)
  ]
  contents = blockContents(block);
  if (contents != null){
    let inner_script = [];
    contents.forEach(block => inner_script.push(blockScript(block)))
    script.push(inner_script)
  } else {
    script.push(blockUnits(block))
  }
  return script;
}