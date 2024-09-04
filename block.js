
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
