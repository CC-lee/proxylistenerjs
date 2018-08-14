class Node {
  constructor(name, type) {
    if (type !== 'main') {
      this.node = name
      this.children = {}
    }
  }
  main(node) {
    this[node['node']] = node
  }
  add(node) {
    this.children[node['node']] = node
  }
  execute(node) {
    console.log(`command-${node}`);
  }
}
function loopAll(macroTree) {
  for (var key in macroTree) {
    macroTree[key]['execute'](macroTree[key]['node'])
    if (macroTree[key]['children']) {
      loopAll(macroTree[key]['children'])
    }
  }
}
var object = { macroTree: new Node(null, 'main') }
var command1 = new Node('command1')
var command2 = new Node('command2')
var command3 = new Node('command3')
command1.add(new Node('command1.1'))
command1.add(new Node('command1.2'))
object.macroTree.main(command1)
object.macroTree.main(command2)
object.macroTree.main(command3)
test('composite-pattern-without-proxylistener', () => {
  console.time();
  expect(loopAll(object.macroTree)).toBe(undefined);
  console.timeEnd();
});