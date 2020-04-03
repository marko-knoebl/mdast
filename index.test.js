const parse = require("./index.js").parse;
const stringify = require("./index.js").stringify;

it("parses markdown to mdast", () => {
  const inputString = "# heading";
  const parsed = parse(inputString);
  expect(parsed.type).toEqual("root");
  expect(parsed.children.length).toEqual(1);
  expect(parsed.children[0].type).toEqual("heading");
});

it("parses markdown based on options", () => {
  const inputString = "go to https://google.com";
  // no options
  const parsedGfm = parse(inputString);
  expect(parsedGfm.children[0].children[1].type).toEqual("link");
  // parse as commonmark - with position information
  const parsedCommonmark = parse(inputString, {
    commonmark: true,
    gfm: false,
    position: true
  });
  expect(parsedCommonmark.children[0].children.length).toEqual(1);
  expect(parsedCommonmark.position).toBeDefined();
});

it("stringifies mdast to a markdown string", () => {
  const input = {
    type: "root",
    children: [
      {
        type: "heading",
        depth: 1,
        children: [{ type: "text", value: "simple heading" }]
      }
    ]
  };
  const mdString = stringify(input);
  expect(mdString).toEqual("# simple heading\n");
});

it("stringifies mdast to a markdown string based on options", () => {
  const input = {
    type: "root",
    children: [
      { type: "emphasis", children: [{ type: "text", value: "emphasized" }] }
    ]
  };
  const defaultMdString = stringify(input);
  expect(defaultMdString).toEqual("_emphasized_\n");
  const customMdString = stringify(input, { emphasis: "*" });
  expect(customMdString).toEqual("*emphasized*\n");
});
