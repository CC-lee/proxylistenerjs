# ProxyListener.js

## About

ProxyListener.js is a library for observing changes for any data types of object properties, such as object, array, function, etc .

It uses [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) method, you can detect changes easily by  creating a listener.

## Compatibility

By using [proxy-polyfill](https://github.com/GoogleChrome/proxy-polyfill), it can works with IE9+, Chrome5+, Firefox4+, Opera11.6+, Node.js.

# Index

[Installing](#installing)

[Usage](#usage)

&nbsp;&nbsp;&nbsp;&nbsp;[Basic](#basic)

&nbsp;&nbsp;&nbsp;&nbsp;[Advanced](#advanced)

 [Examples](#examples)



# Installing

#### HTML Script TAG

```html
<script src="proxylistener.min.js" type="text/javascript"></script>
```

#### Via NPM

```
npm install proxylistenerjs
```

Import as ECMA2015 module

```javascript
import ProxyListener from '.proxylistenerjs/proxylistener.js' //import es2015 version
import ProxyListener from '.proxylistenerjs/proxylistener.min.js' //import compatible version
```

Require

```javascript
var ProxyListener = require("proxylistenerjs/proxylistener.js") //require es2015 version
var ProxyListener = require("proxylistenerjs/proxylistener.min.js") //require compatible version
```



# Usage

## Basic

#### Initialization

```javascript
var pListener = new ProxyListener()
```

#### Create an object which contains listening target 

```javascript
var object = {
  word: 'word' //the listening target is word property
}
```

#### Create a listener

```javascript
var objectListener = pListener.proxyListen(object,'word')
```

#### Define callback function

```javascript
var objectSubscription = objectListener.subscribe(x => {
  console.log('detect changes');
})
```

#### Trigger callback function

```
object.word = 'new'
/**
 * console output:  detect changes
 */
```



## Advanced

### new ProxyListener().proxyListen (object, address, funSet,propSet).subscribe(callback(passing))

- ### proxyListen (object, address, funSet,propSet)

#### Options:

- object: : `object` : ***necessary*** —  target's parent object.

- address: `string` : ***necessary*** — target's location. (example: 'path', 'path1/path2')

- funSet: `object` : ***optional*** — settings for  function type target.

  - sub options:

    - exePos: `string` (default value: 'after') — position for callback function executing .

      ​	--values:

      ​	---'before':  callback function execute before the target function's execution.

      ​	---'after':  callback function execute after the target function's execution.

      ​	---'both':   callback function execute before and after the target function's execution.

    - funRepListen: `boolean` (default value: false) — whether to execute  callback function after the target function is replaced by another function.

    - isAsync: `boolean`  (default value: false)  — whether to execute  callback function asynchronously after the target function's execution when  target function is asynchronous.

- propSet:`object`:***optional*** — general listening settings.

  - sub options:

    - thisArgs: `object`—  the this argument for validator function's execution. 

    - validator: `function:boolean` — a function for intercepting the target's changes  or the target function's execution by returning a boolean.

       Listener will pass an object when validator function is excuted, the object contains:

      ​	---locatePath :  the location of the target's changing property.

      ​	---method: the way that the target changes.

      ​	---val: the data that will be added to the target's changing property.

      ​	*For more detail, see the description of  `Passing Object's Properties`*

    - isTrigger:  `boolean`  (default value: false) — whether to execute listener's callback function when validator function return false.

    - change: `object`—  setting for listener passing object when callback function execute.
      - sub options:
        - isPassOldValue:  `boolean` (default value: false) —  whether to pass old value when execute callback function.    Notice: The true value setting may lower performance.
        - defaultValue: `string`(default value: undefined)  — custom  value for listener passing when callback function execute.

    - deepListenLv : `number`|`string` (default value: 0)  — the additional levels for enumerable properties listening for the target , by default, 1 level nested properties can be listened for the target.

      ​	--values:

      ​	---1~?`number`:  add additional levels for the target's properties  listening.

      ​	---'max'`string` : listen all level of nested enumerable properties of the target

    - coverSet: `object` — settings for the listener's  reaction when the listener is covered, by default, a target's listener can be covered by creating  duplicately.

      - sub options:
        - isCanCover:`boolean` (default value: true) —  whether the listener can be covered, if not,   error function will execute when the listener is being covered.
        - errFunc: `function` — a function for throwing error when `isCanCover`'s  value is false.

    - funcListenSet: `object` — settings for  the listener's  reaction when

      - sub options:
        - listenOn: `boolean` (default value: false) 

        - exePos: `string` (default value: 'after') — position for callback function executing .

          ​	--values:

          ​	---'before':  callback function execute before the target's  function type properties's execution.

          ​	---'after':  callback function execute after the target's  function type properties's execution.

          ​	---'both':   callback function execute before and after the target function's execution.

        - isAsync:`boolean`  (default value: false)  — whether to execute  callback function asynchronously after the target's asynchronous function type properties's execution.

          

- ### subscribe(callback(passing))

When callback function execute, listener will pass a parameters object . According to  listener options and situation of target's changes, the passing object's properties will change responsively:

#### Passing Object's Properties:

- passing.glob:`object`| `function`|`array`|`string` |`null`|`boolean` |`number `|`undefined` —  access the primitive target which without detecting changes.

- passing.locatePath : `string` —  whatever a property is existing or new in target object or target array, listener will pass the location of this property  when callback function execute.

- passing.method : `string` — ('assign'|'update'|'function'|array method's name) — the way that the target changes.

  ​	--values:

  ​	---'assign': target or target's properties is replaced.

  ​	---'update' : detect changes of properties of target's array type properties.

  ​	---'function': target's function type properties

  ​	---array method's name: detect changes of array type target or  target's array type properties with array methods.

- passing.oldValue :`object`| `function`|`array`|`string` |`null`|`boolean` |`number `|`undefined`—  when `isPassOldValue`'s value is true, listener will pass the past status of  target or target's properties.

- passing.newValue :`object`| `function`|`array`|`string` |`null`|`boolean` |`number `|`undefined`—  listener will pass the undated status of  target or target's properties.



### Delete & Redefine callback function

When create listener and define callback function separately, you can keep the listener and delete callback function with unsubscribe function.

When you need to detect changes for the same target again, just redefine callback function without creating a listener duplicately.

#### Delete callback function

```javascript
objectSubscription.unsubscribe()
```

#### Redefine callback function

```javascript
var objectReSubscription = objectListener.subscribe(x => {
  console.log('detect changes again');
})
```



### Create multiple listeners at once

If you want to create multiple listeners quickly, you can use `proxyListenGroup` function after initialization.

#### new ProxyListener().proxyListenGroup(object, addressArray, funSet,propSet).subscribeGroup (callback(passing))

#### Options:

- addressArray: `array` — array of  targets's locations.
- other options are equal to proxyListen function.

#### Delete callback function

use `unsubscribeGroup` function to delete multiple  listener's callback function

```javascript
objectSubscription.unsubscribeGroup()
```



### Combine with Rxjs

You can add a Observable callback function to listener using [Rxjs](https://github.com/ReactiveX/rxjs).

```javascript
import { Subject, of } from 'rxjs'
import ProxyListener from '.proxylistenerjs/proxylistener.js'
import { concatMap } from 'rxjs/operators';
// initialize with rxjs
var pListener = new ProxyListener(Subject)
var control = {
  listen: {
    word: 'word',
  }
}
// setting callback function with Observable methods
pListener.proxyListen(control, 'listen')
  .pipe(concatMap(x => {
    console.log(`print ${x.locatePath} changes once`);
    return of(x)
  }))
  .subscribe(x => {
    console.log(`print ${x.locatePath} changes twice`);
  })
// trigger listener's detection
control.listen.word = 'new'
/* console output:
 * print listen/word changes once
 * print listen/word changes twice
 */ 
```



### Compatible with target's getter/setter

If taeget has getter/setter before creating listener, the listener will keep them rather than covering them.



# Examples

## Using ProxyListener.js with HTML script tag

```
<script type="text/javascript" src="proxylistener.min.js"></script>
<script>
    var pListener = new ProxyListener()
    var object = {
      word: 'word' //the listening target is word property
    }
    var objectListener = pListener.proxyListen(object, 'word')
    var objectSubscription = objectListener.subscribe(function (x) {
      console.log('detect changes');
    })
    object.word = 'new'
</script>
```



## Avoid infinite Loop

If you change the object, array, function type target in it's callback function but don't want to execute the callback function again , just access target's glob property to change target

```javascript
    var pListener = new ProxyListener()
    var object = {
      target: { word: 'word' }
    }
    var objectListener = pListener.proxyListen(object, 'target')
    var objectSubscription = objectListener.subscribe(function (x) {
      // use target's glob function to return primitive target   
      object.target.glob().word = 'change'
      // use passing object's glob property to access primitive target
      x.glob.word = 'second change' 
      // callback function won't execute when the target changes using glob property
      console.log('detect cahnges'); 
    })
    object.target.word = 'new'
    console.log(object.target.word); //second change
    /**
     * console output:  
     * detect cahnges
     * second change
     */
```



## Detect  changes or execution for asynchronous function type target

```javascript
    var pListener = new ProxyListener()
    var object = {
      asyncFunctionOne: function () {
        console.log('asyncFunctionOne');
        return new Promise((resolve, reject) => {
          resolve();
        }).then(x => {
          console.log(`asyncFunctionOne is still executing`);
        })
      },
      asyncFunctionTwo: function () {
        console.log('asyncFunctionTwo');
        return new Promise((resolve, reject) => {
          resolve();
        }).then(x => {
          console.log(`asyncFunctionTwo is still executing`);
        })
      }
    }
    var oneListener = pListener.proxyListen(object, 'asyncFunctionOne')
    var twoListener = pListener.proxyListen(object, 'asyncFunctionTwo', {
      isAsync: true
    })
    //execute callback function synchronously 
    oneListener.subscribe(x => {
      console.log(`asyncFunctionOne's execution is finish`);
    })
    //execute callback function asynchronously 
    twoListener.subscribe(x => {
      console.log(`asyncFunctionTwo's execution is finish`);
    })
    object.asyncFunctionTwo()
    object.asyncFunctionOne()
    /* console output:
    * asyncFunctionTwo
    * asyncFunctionTwo's execution is finish
    * asyncFunctionOne
    * asyncFunctionTwo is still executing
    * asyncFunctionOne is still executing
    * asyncFunctionOne's execution is finish
    */
```



## Deeply Detect  changes for array type target

```javascript
    var pListener = new ProxyListener()
    var object = {
      array: [[0, 1, 2, 3], [3, 2, 1], [0]]
    }
    var arrayListener = pListener.proxyListen(object, 'array', {
      deepListenLv: "max"
    })
    var arraySubscription = arrayListener.subscribe(x => {
      console.log('location is' + ' ' + x.locatePath);
      console.log('method is' + ' ' + x.method);
    })
    // change target by array method
    object.array[0].reverse()
    // change target by property assignment
    object.array[3] = [1, 2, 3]
    /* console output:
    * location is array/0
    * method is reverse
    * location is array/3
    * method is update
    */
```



## Deeply detect changes for object type target

```javascript
    var pListener = new ProxyListener()
    var object = {
      targetZero: {
        func: function () {
          console.log('this is targetZero');
        },
        array: [[0, 1, 2, 3], [3, 2, 1], [0]]
      },
      targetMax: {},
      targetMultiple: {
        targetOne: {
          word: 'One'
        },
        targetTwo: {
          word: 'Two'
        }
      }
    }
    var lvZeroListener = pListener.proxyListen(object, 'targetZero', {
      validator: function (x) {
        if (x.val.content) {
          console.log('validator return false');
          return false
        } else {
          console.log('validator return true');
          return true
        }
      }
    })
    var lvMaxListener = pListener.proxyListen(object, 'targetMax', {
      deepListenLv: "max"
    })
    lvZeroListener.subscribe(x => {
      console.log('location is' + ' ' + x.locatePath)
      console.log('method is' + ' ' + x.method);
    })
    lvMaxListener.subscribe(x => {
      console.log('location is' + ' ' + x.locatePath)
      console.log('method is' + ' ' + x.method);
    })

    var multipleListener = pListener.proxyListenGroup(object, ['targetMultiple/targetOne', 'targetMultiple/targetTwo'])
    multipleListener.subscribeGroup(x => {
      console.log('location is' + ' ' + x.locatePath)
      console.log('execute the same callback function');
    })
    object.targetZero.func()
    object.targetZero.array.reverse()
    object.targetZero.nested = { content: 'nested' } 
    // new property can't be added to target because validator return false
    object.targetMax.nested = { content: 'nested' } 
    console.log(object.targetZero.nested);  // undefined
    // new property can be added to target because validator return true
    object.targetZero.nested = { word: 'nested' } 
    // callback function can be triggered because taget's listen level is max
    object.targetMax.nested.content = 'new'; 
    // callback function can't be triggered because taget's listen level is 0
    object.targetZero.nested.word = 'new';  
    object.targetMultiple.targetOne.word = 'new';
    //execute the same callback function as targetOne
    object.targetMultiple.targetTwo.word = 'new'; 
    /* console output:
    * this is targetZero
    * validator return false
    * location is targetMax/nested
    * method is assign
    * undefined
    * validator return true
    * location is targetZero/nested
    * method is assign
    * location is targetMax/nested/content
    * method is assign
    * location is targetMultiple/targetOne/word
    * execute the same callback function
    * location is targetMultiple/targetTwo/word
    * execute the same callback function
    */
```



## Detect  data changes  in Vue component

```

```



## Application in Composite pattern

You can execute specific marco tree nodes's commands rather than executing all nodes's commands.

### static marcoTree 

```javascript
    var pListener = new ProxyListener()
    // organize the macroTree
    var object = {
      macroTree: {
        command1: {
          node: 'command1',
          children: {
            'command1.1': {
              node: 'command1.1'
            },
            'command1.2': {
              node: 'command1.2'
            }
          }
        },
        command2: {
          node: 'command2'
        },
        command3: {
          node: 'command3'
        }
      }
    }
    class Create {
      constructor(para) {
        this.para = para
      }
      execute() {
        console.log(`command execution from node path: ${this.para}`);
      }
    }
    var funcObj = {}
    function loopAll(macroTree) {
      for (var key in macroTree) {
        macroTree[key]['node'] = key
        if (macroTree[key]['children']) {
          loopAll(macroTree[key]['children'])
        }
      }
    }
    var macrotreeListerner = pListener.proxyListen(object, 'macroTree', { deepListenLv: "max" })
    macrotreeListerner.subscribe(x => {
      if (!funcObj[x.locatePath]) {
        funcObj[x.locatePath] = new Create(x.locatePath)
      } else {
        // execute specific marco tree nodes's commands
        if (x.locatePath.search('command1') > -1) { 
          funcObj[x.locatePath].execute()
        }
      }
    })
    // add functions to funcObj
    loopAll(object.macroTree)
    // execute specific node command's in macro commands
    loopAll(object.macroTree)
    /* console output:
    * command execution from node path: macroTree/command1/node
    * command execution from node path: macroTree/command1/children/command1.1/node
    * command execution from node path: macroTree/command1/children/command1.2/node
    */
```

### dynamic marcoTree 

```javascript
    // dynamic marcoTree
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
	// organize the macroTree
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
      validator: function (x) {
        if (x.val.node){
          // when adding new node after creating a listener
          x.val.added = 'new node' 
        }
      },
      deepListenLv: "max"
    })
    macrotreeListerner.subscribe(x => {
      // execute specific marco tree nodes's commands
      if (x.locatePath.search('command1') > -1 && x.newValue.execute) { 
        x.newValue.execute(x.locatePath)
      }
      if (!x.newValue.execute) {
        // output an inform when adding new node after creating a listener
        console.log('new node is added'); 
      }
    })
    loopAll(object.macroTree)
    // add new node after creating a listener
    object.macroTree.command1.add(new Node('command1.3'))
    /* console output:
    * command execution from node path: macroTree/command1/node
    * command execution from node path: macroTree/command1/children/command1.1/node
    * command execution from node path: macroTree/command1/children/command1.2/node
    * new node is added
    */
```

