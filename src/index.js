import HTML from 'html-parse-stringify';

module.exports = function(html, _limit) {
  const limit = _limit || 100;

  let ast;

  try {
    ast = HTML.parse(html); // throws on "text text <a href="#whatever">link</a> text" input

    if (ast.length !== 1) {
      throw new Error();
    }
  } catch (e) {
    ast = HTML.parse(`<div>${html}</div>`);
  }

  modifyAst(ast[0], 0, limit);
  return HTML.stringify(ast[0].children);
};

function modifyAst(node, _acc, limit) {
  if (node.type === 'text') {
    const point = limit - _acc - 1;

    for (let i = point ; i < node.content.length ; i++) {
      if (/\s/.test(node.content[i])) {
        node.content = node.content.slice(0, i);
        return;
      }
    }

    return;
  }

  let acc = _acc;

  for (let i = 0 ; i < node.children.length ; i++) {
    const child = node.children[i];
    const length = textLength(child);

    if (acc + length >= limit) {
      node.children = node.children.slice(0, i + 1);

      if (acc + length > limit && child.type !== 'tag' || child.name !== 'a') {
        modifyAst(child, acc, limit);
      }

      return;
    } else {
      acc = acc + length;
    }
  }
}

function textLength(node) {
  const result = node.type === 'text' ? node.content.length : 0;
  return (node.children || []).reduce((total, curr) => total + textLength(curr), result);
}
