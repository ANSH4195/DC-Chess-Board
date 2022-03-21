function ChessBoard(el) {
  const n = 8;

  const element = document.querySelector(el);
  setGridStyles();
  const fragment = document.createDocumentFragment();
  let nexti = 0,
    nextj = 1;
  for (let idx1 = 0; idx1 < n; idx1++) {
    for (let idx2 = 0; idx2 < n; idx2++) {
      const newChild = document.createElement("div");
      newChild.className = "grid-item";
      newChild.id = `${idx1 + 1}${idx2 + 1}`;
      if (nexti === idx1 && nextj === idx2) {
        newChild.className += " black-tile";
        if (nextj >= 6) {
          nexti += 1;
          nextj = nextj === 6 ? 1 : 0;
        } else {
          nextj += 2;
        }
      }
      newChild.dataset.position = [idx1 + 1, idx2 + 1];
      fragment.appendChild(newChild);
    }
  }
  element.appendChild(fragment);

  element.addEventListener("click", clickHandler);

  let modifiedDOMNodes = [];

  function clickHandler(e) {
    if (modifiedDOMNodes.length > 0) {
      for (const node of modifiedDOMNodes) {
        const upd = node.className.split(" ").slice(0, -1).join(" ");
        node.className = upd;
      }
      modifiedDOMNodes = [];
    }
    const target = e.target;
    const coord = target.dataset.position.split(",");
    target.className += " red-tile";
    modifiedDOMNodes.push(target);
    let i = parseInt(coord[0], 10),
      j = parseInt(coord[1], 10),
      ci,
      cj;
    ci = i - 1;
    cj = j - 1;
    while (ci > 0 && cj > 0) {
      const id = parseInt(`${ci}${cj}`, 10);
      const domNode = document.getElementById(id);
      domNode.className += " red-tile";
      modifiedDOMNodes.push(domNode);
      ci -= 1;
      cj -= 1;
    }
    ci = i - 1;
    cj = j + 1;
    while (ci > 0 && cj <= 8) {
      const id = parseInt(`${ci}${cj}`, 10);
      const domNode = document.getElementById(id);
      domNode.className += " red-tile";
      modifiedDOMNodes.push(domNode);
      ci -= 1;
      cj += 1;
    }
    ci = i + 1;
    cj = j - 1;
    while (ci <= 8 && cj > 0) {
      const id = parseInt(`${ci}${cj}`, 10);
      const domNode = document.getElementById(id);
      domNode.className += " red-tile";
      modifiedDOMNodes.push(domNode);
      ci += 1;
      cj -= 1;
    }
    ci = i + 1;
    cj = j + 1;
    while (ci <= 8 && cj <= 8) {
      const id = parseInt(`${ci}${cj}`, 10);
      const domNode = document.getElementById(id);
      domNode.className += " red-tile";
      modifiedDOMNodes.push(domNode);
      ci += 1;
      cj += 1;
    }
  }

  function setGridStyles() {
    element.style.gridTemplateRows = `repeat(${n}, 12vh)`;
    element.style.gridTemplateColumns = `repeat(${n}, 12vw)`;
  }
}

new ChessBoard("#chess");
