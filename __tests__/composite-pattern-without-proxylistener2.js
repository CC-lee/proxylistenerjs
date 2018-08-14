class MacroCommand {
  constructor() {
    this.commandsList = []
  }
  add(command) {
    this.commandsList.push(command);
  }
  execute() {
    for (var i = 0, command; command = this.commandsList[i++];) {
      command.execute();
    }
  }
};
class Create {
  constructor(para) { 
    this.para = para
  }
  execute() {
    console.log(`command-${this.para}`);
  }
}
var macroCommand = new MacroCommand();
var macroCommand1 = new MacroCommand();
var macroCommand11 = new MacroCommand();
var macroCommand12 = new MacroCommand();
var macroCommand2 = new MacroCommand();
var macroCommand3 = new MacroCommand();
macroCommand1.add(new Create('command1'))
macroCommand11.add(new Create('command1.1'))
macroCommand12.add(new Create('command1.2'))
macroCommand2.add(new Create('command2'))
macroCommand3.add(new Create('command3'))
macroCommand1.add(macroCommand11)
macroCommand1.add(macroCommand12)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)
macroCommand.add(macroCommand3)
test('composite-pattern-without-proxylistener2', () => {
  console.time();
  expect(macroCommand.execute()).toBe(undefined);
  console.timeEnd();
});