import ProxyListener from '../proxylistener'
var pListener = new ProxyListener()
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
  execute(path) {
    console.log(`command execution from node path: ${path}`);
  }
}
function loopAll(macroTree) {
  for (var key in macroTree) {
    macroTree[key]['node'] = key
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
var macrotreeListerner = pListener.proxyListen(object, 'macroTree', {
  deepListenLv: 'max'
})
macrotreeListerner.subscribe(x => {
  x.newValue.execute(x.locatePath)
})
test('composite-pattern-with-proxylistener', () => {
  console.time();
  expect(loopAll(object.macroTree)).toBe(undefined);
  console.timeEnd();
});