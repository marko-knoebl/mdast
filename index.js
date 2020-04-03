const remarkParse = require("remark-parse");
const remarkStringify = require("remark-stringify");
const vfile = require("vfile");

const parse = (value, options = {}) => {
  // default of options.position = false
  if (options.position === undefined) {
    options = { ...options, position: false };
  }
  // first argument (document) is ignored by Parser
  const parser = new remarkParse.Parser(null, vfile({ contents: value }));
  parser.setOptions(options);
  const tree = parser.parse();
  return tree;
};

const stringify = (tree, options) => {
  const compiler = new remarkStringify.Compiler(
    tree,
    vfile({ contents: tree })
  );
  compiler.setOptions(options);
  const string = compiler.compile();
  return string;
};

module.exports.parse = parse;
module.exports.stringify = stringify;
