var ProxyListenClass = require('./ProxyListenClass')
class Subject {
  constructor(subscriber) {
    this.fn = null
    this.subscriber = subscriber
  }
  subscribe(fn) {
    this.fn = fn
    var self = this
    this.subscriber.closed = false
    return {
      unsubscribe: function () {
        self.subscriber.closed = true
        self.fn = null
        this.unsubscribe = function () { }
      }
    }
  }
  next(para) {
    return this.fn(para)
  }
}

var isHasObservable = false

class ProxyListener {
  constructor(init) {
    if (init && init.create) {
      Subject = init
      isHasObservable = true
    }
  }
  proxyListen(obj, address, funSet, propSet) {
    return proxyListen(obj, address, funSet, propSet)
  }
  proxyListenGroup(obj, address, funSet, propSet) {
    return proxyListenGroup(obj, address, funSet, propSet)
  }
}


function NormalArray(array, type) {
  if (array['_proxyListen'] && array['_proxyListen']._ClassName === 'NormalArrayName') {

  } else {
    var arryObj = Object.create(Object.getPrototypeOf(array))
    if (!array['_proxyListen']) {
      Object.defineProperty(array, "_proxyListen", {
        value: {},
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
    Object.defineProperty(array['_proxyListen'], "_ClassName", {
      value: 'NormalArrayName',
      writable: true,
      enumerable: false,
      configurable: true
    });
    if (type === 'single') {
      var prop = array//array['_proxyListen']
    } else {
      var prop = array.__proto__
    }
    var normalObj = new ProxyListenClass.NormalArrayMethod(array)
    Object.defineProperties(prop, {
      'push': {
        value: function () {
          return normalObj.method(arryObj.push, this, arguments, 'push')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'copyWithin': {
        value: function () {
          return normalObj.method(arryObj.copyWithin, this, arguments, 'copyWithin')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'shift': {
        value: function () {
          return normalObj.method(arryObj.shift, this, null, 'shift')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'pop': {
        value: function () {
          return normalObj.method(arryObj.pop, this, null, 'pop')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'reverse': {
        value: function () {
          return normalObj.method(arryObj.reverse, this, [], 'reverse')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'fill': {
        value: function () {
          return normalObj.method(arryObj.fill, this, arguments, 'fill')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'sort': {
        value: function () {
          return normalObj.method(arryObj.sort, this, arguments, 'sort')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'splice': {
        value: function () {
          return normalObj.method(arryObj.splice, this, arguments, 'splice')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'unshift': {
        value: function () {
          return normalObj.method(arryObj.unshift, this, arguments, 'unshift')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
    });
  }
}


function NewArray(array) {
  if (array['_proxyListen'] && array['_proxyListen']._ClassName === 'ArrayObjName') {

  } else {
    var arryObj = Object.create(Object.getPrototypeOf(array))
    if (!array['_proxyListen']) {
      Object.defineProperty(array, "_proxyListen", {
        value: {},
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
    Object.defineProperty(array['_proxyListen'], "_ClassName", {
      value: 'ArrayObjName',
      writable: true,
      enumerable: false,
      configurable: true
    });
    var newArrayObj = new ProxyListenClass.NewArrayMethod(array)
    Object.defineProperties(array, {
      'push': {
        value: function (...args) {
          return newArrayObj.method(arryObj.push, this, arguments, 'push')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'copyWithin': { // return Array.prototype.copyWithin.apply(this, arguments);
        value: function (target, start, end) {
          return newArrayObj.method(arryObj.copyWithin, this, arguments, 'copyWithin')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'shift': { //shift.apply(this);
        value: function () {
          return newArrayObj.method(arryObj.shift, this, null, 'shift')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'pop': { // return pop.apply(this);
        value: function () {
          return newArrayObj.method(arryObj.pop, this, null, 'pop')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'reverse': { //return reverse.apply(this);
        value: function () {
          return newArrayObj.method(arryObj.reverse, this, null, 'reverse')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'fill': {
        value: function (value, start, end) {
          return newArrayObj.method(arryObj.fill, this, arguments, 'fill')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'sort': {//sort.apply(this, arguments);
        value: function (compareFn) {
          return newArrayObj.method(arryObj.sort, this, arguments, 'sort')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'splice': {//splice.apply(this, arguments);
        value: function (start, deleteCount) {
          return newArrayObj.method(arryObj.splice, this, arguments, 'splice')
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'unshift': { //unshift.apply(this, arguments);
        value: function (...args) {
          return newArrayObj.method(arryObj.unshift, this, arguments, 'unshift')
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
  }
}


function bindFun(that, fn) {
  return function () {
    return fn.apply(that, arguments)
  }
}

function funcHandler(target, key, handler) {
  if (target[key] && typeof target[key] === 'object') {
    return new Proxy(target[key], handler())
  } else {
    if (typeof target[key] === 'function' && target instanceof Date) {
      return target[key].bind(target);
    }
    else {
      return target[key]//.bind(target);
    }
  }
}

function objPathAssignFunc(obj, objPath, level, address, isFuncListen, levelLimt, assi, normalArrayAssign, setObs) {
  if (!objPath) {
    var objPath = address
  }
  var ars = Object.keys(obj)
  level = level + 1
  for (var i = 0, len = ars.length; i < len; i++) {
    var key = ars[i]
    if ((typeof obj[key] === 'object' || (typeof obj[key] === 'function' && isFuncListen)) && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        normalArrayAssign(obj[key], setObs, 'single', objPath + '/' + key, level)
        var upLevel = level + 1
        if (levelLimt === 'max' || upLevel <= levelLimt) {
          objPathAssignFunc(obj[key], objPath + '/' + key, level, address, isFuncListen, levelLimt, assi, normalArrayAssign, setObs)
        }
      } else {
        assi.objPathAssign(obj, key, objPath, level)
        var upLevel = level + 1
        if (levelLimt === 'max' || upLevel <= levelLimt) {
          objPathAssignFunc(obj[key], objPath + '/' + key, level, address, isFuncListen, levelLimt, assi, normalArrayAssign, setObs) //realTimePath + '/' + num
        }
      }
    }
  }
}

function objectPathAssignFunc(origin, address, realTimePath, first, level, setObs, isFuncListen, setting, normalArrayAssign, assi, levelLimt) {
  var ars = Object.keys(origin)
  level = level + 1
  for (var i = 0; i < ars.length; i++) {
    var num = ars[i]
    if ((typeof origin[num] === 'object' || (typeof origin[num] === 'function' && isFuncListen)) && origin[num] !== null) {
      if (!origin[num]['_proxyListen']) {
        Object.defineProperty(origin[num], "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    }
    if (origin[num] && origin[num]['_proxyListen'] && !origin[num]['_proxyListen']['_isProxy'] && (typeof origin[num] === 'object' || (typeof origin[num] === 'function' && (isFuncListen || setting === true))) && origin[num] !== null) {
      if (Array.isArray(origin[num])) {
        if (setting === true && origin[num]['_proxyListen']['_objectPath']) {
          var isProcessed = true
        }
        var upLevel = level + 1
        normalArrayAssign(origin[num], setObs, 'single', realTimePath + '/' + num, level) //realTimePath + '/' + num
        if (levelLimt === 'max' || upLevel <= levelLimt || (setting === true && isProcessed)) {
          objectPathAssignFunc(origin[num], address, realTimePath + '/' + num, null, level, setObs, isFuncListen, setting, normalArrayAssign, assi, levelLimt) //realTimePath + '/' + num

        }
      } else {
        if (setting === true && origin[num]['_proxyListen']['_objectPath']) {
          var isProcessed = true
        }
        assi.objectPathAssign(origin, num, realTimePath, level)
        //origin[num].__proto__ = Obj.prototype
        var upLevel = level + 1
        if (levelLimt === 'max' || upLevel <= levelLimt || (setting === true && isProcessed)) {
          objectPathAssignFunc(origin[num], address, realTimePath + '/' + num, null, level, setObs, isFuncListen, setting, normalArrayAssign, assi, levelLimt) //realTimePath + '/' + num
        }
      }
    }
  }
}

function handlerDefineSetFunc({ val, address, objectPath, that, whole, bind, string, globChange,
  setting, deepListen, isPassOldValue, setObs, getObs,
  valueobj, subscriber, validator, handlerDefineSet,
  isTrigger, methCollect, funRepListen, defaultStr, charListenAssign, proxyAssign,
  arrayAssign, objectPathAssign, objectHandlerProxy, funcRepHandlerProxy,
  funcHandlerProxy }) {
  if (that['_proxyListen'] && that['_proxyListen'][string + '_getter'] && that['_proxyListen'][string + '_getter'].name !== 'reactiveGetter') {
    var getterRet = that['_proxyListen'][string + '_getter'].apply(that)
  } else {
    var getterRet = bind[`_${string}`]
  }
  //if (subscriber.closed === false || setting === true) {
  if (subscriber.closed === true) {
    var valid = true
  }
  else if (!validator) {
    var valid = true
  }
  else if (validator && !val || validator && !val['_proxyListen'] || (val['_proxyListen'] && !val['_proxyListen']._isProxy)) {
    var valid = validator({ method: 'assign', val: val })
  } else {
    var valid = true
  }
  var change = {}
  if (valid !== false) {
    if (subscriber.closed === false || setting === true) {
      handlerDefineSet.changeexe(change, getterRet, isPassOldValue, bind, setObs, val, valueobj)
    }
    if (!val) {
      if (val === null) {
        val = handlerDefineSet._isNull
      }
      else if (val === undefined) {
        val = handlerDefineSet._isUndefiend
      }
      else if (String(val) === 'NaN') {
        val = handlerDefineSet._isNaN
      }
    }
    //bind[`_${string}`] = val;
    if (that['_proxyListen'] && that['_proxyListen'][string + '_setter'] && that['_proxyListen'][string + '_setter'].name !== 'reactiveSetter') {
      that['_proxyListen'][string + '_setter'].call(that, val)
    } else {
      bind[`_${string}`] = val
    }
    if (val && typeof val !== 'object' && typeof val !== 'function' || !val) {
      if (subscriber.closed === false || setting === true) {
        handlerDefineSet.charexe(val, change)
        if (globChange) {
          change['glob'] = globChange
        }
      }
      charListenAssign(whole, string)
      if (getObs) {
        setObs = getObs
      }
      if (setObs) {
        setObs.next(change)
      }
    } else {
      handlerDefineSet.deleteexe(that, string)
      if (!val['_proxyListen'] || (val['_proxyListen'] && !val['_proxyListen']._isProxy) && !setting) {
        if (Array.isArray(val)) {
          //val = arrayAssign(val, setObs, 0)
          arrayAssign(val, setObs, 0)
          if (deepListen) {
            objectPathAssign(val, objectPath, address + '/' + string, null, 0)
          }
        }
        if (typeof val === 'object' && !Array.isArray(val) && val !== null && deepListen) {
          objectPathAssign(val, objectPath, address + '/' + string, null, 0)
        }
        proxyAssign(val, objectPath, 0)
        if (typeof val !== 'function') {
          delete val['_objectPath']
          methCollect.methArray = []
          Object.assign(whole, { [`${string}`]: new Proxy(val, objectHandlerProxy()) })
          if (getObs) {
            setObs = getObs
          }
        }
        else {
          if (funRepListen) {
            delete val['_objectPath']
            Object.assign(whole, { [`${string}`]: new Proxy(val, funcRepHandlerProxy()) })
            if (setObs) {
              getObs = setObs
            }
          } else {
            delete val['_objectPath']
            Object.assign(whole, { [`${string}`]: new Proxy(val, funcHandlerProxy()) })
            if (setObs) {
              getObs = setObs
              var cancelsetObs = true
            }
          }
        }

        if (subscriber.closed === false || setting === true) {
          change['newValue'] = val
          if (globChange) {
            change['glob'] = globChange
          }
          change['method'] = 'assign'
          if (setObs) {
            setObs.next(change)
            if (cancelsetObs) {
              cancelsetObs = false
              setObs = null
            }
          }
        }
        //whole[string]._isFinish = false
      } else if (val['_proxyListen'] && val['_proxyListen']._isProxy && !setting && val['_proxyListen']._path !== objectPath) {
        if (subscriber.closed === false || setting === true) {
          change['newValue'] = val
          if (globChange) {
            change['glob'] = globChange
          }
          change['method'] = 'assign'
          if (setObs) {
            setObs.next(change)
          }
        }
      }
      if (setting) {
        setting = null
      }
    }
  } else {
    if (isTrigger === true && setObs) {
      setObs.next(defaultStr)
    }
  }
}

function proxyListen(obj, address, funSet, propSet) {
  var objectPath = address + '-' + Date.now()
  var validator,
    exePos
  if (funSet && propSet) {
    if (funSet) {
      var { exePos, funRepListen, isAsync } = funSet
    }
    if (propSet) {
      var { thisArgs, validator, isTrigger, change, deepListenLv, coverSet, funcListenSet } = propSet
      if (validator) {
        if (thisArgs) {
          validator = bindFun(thisArgs, validator)
        } else {
          validator = bindFun(this, validator)
        }
      }
      if (change) {
        var { isPassOldValue, defaultValue } = change
      }
    }
  } else {
    if (funSet) {
      var { exePos, funRepListen, isAsync } = funSet
      if (!exePos && !funRepListen && !isAsync) {
        propSet = funSet
        var { thisArgs, validator, isTrigger, change, deepListenLv, coverSet, funcListenSet } = propSet
        if (validator) {
          if (thisArgs) {
            validator = bindFun(thisArgs, validator)
          } else {
            validator = bindFun(this, validator)
          }
        }
        if (change) {
          var { isPassOldValue, defaultValue } = change
        }
      }
    }
  }
  if (!exePos) {
    exePos = 'back'
  }
  if (defaultValue) {
    var defaultStr = defaultValue
  } else {
    var defaultStr = undefined
  }
  if (!isPassOldValue) {
    var isPassOldValue = undefined
  }
  if (funcListenSet) {
    if (funcListenSet.listenOn === true) {
      var isFuncListen = true
      var isFuncExePos = funcListenSet.exePos
      var isFuncIsAsync = funcListenSet.isAsync
      var isInstanceMethod = funcListenSet.instanceMethodOn
      if (!isFuncExePos) {
        isFuncExePos = 'back'
      }
    } else {
      var isFuncListen = false
    }
  } else {
    var isFuncListen = false
  }
  if (isTrigger === true) {
    var isTrigger = true
  } else {
    var isTrigger = false
  }
  if (isAsync === true) {
    var isAsync = true
  } else {
    var isAsync = false
  }
  if (deepListenLv) {
    if ((typeof deepListenLv === 'number' && deepListenLv > 0) || deepListenLv === 'max') {
      var levelLimt = deepListenLv
      var deepListen = true
    } else {
      var deepListen = false
    }
  } else {
    var deepListen = false
  }
  if (coverSet) {
    var { isCanCover, errFunc } = coverSet
  }
  if (coverSet && isCanCover === false) {
    if (!errFunc || typeof errFunc !== 'function') {
      throw new Error('errFunc is not a function');
    }
    var isCanCover = false
    var errFunc = errFunc
  } else {
    var isCanCover = true
    var errFunc = function () {
      return true
    }
  }

  var whole = obj;
  var setObs,
    getObs

  if (address) {
    var ars = address.split('/')
    var string = ars[ars.length - 1]
    if ((whole !== null && whole !== undefined) && whole['glob'] && whole['_proxyListen'] && whole['_proxyListen']['_isProxy']) {
      whole = whole['glob']()
    }
    while (ars.length - 1) {
      whole = whole[ars.shift()]
      if ((whole !== null && whole !== undefined) && whole['glob'] && whole['_proxyListen'] && whole['_proxyListen']['_isProxy']) {
        whole = whole['glob']()
      }
    }

    var valueobj = whole[string]

  } else {
    throw "address is not defined";
  }

  var subscriber = { closed: true }

  if (typeof valueobj === 'function') {
    if (funRepListen) {
      if (isHasObservable) {
        setObs = new Subject()
        setObs.subscribe = function (observerOrNext, error, complete) {
          subscriber = Subject.prototype.subscribe.apply(setObs, arguments)
          return subscriber
        }
      } else {
        setObs = new Subject(subscriber)
      }
      getObs = setObs
    } else {
      if (isHasObservable) {
        getObs = new Subject()
        getObs.subscribe = function (observerOrNext, error, complete) {
          subscriber = Subject.prototype.subscribe.apply(getObs, arguments)
          return subscriber
        }
      } else {
        getObs = new Subject(subscriber)
      }
    }
  }


  if (typeof valueobj !== 'function') {
    if (isHasObservable) {
      setObs = new Subject()
      setObs.subscribe = function (observerOrNext, error, complete) {
        subscriber = Subject.prototype.subscribe.apply(setObs, arguments)
        return subscriber
      }
    } else {
      setObs = new Subject(subscriber)
    }
  }


  var methCollect = { methArray: [] }


  if ((valueobj !== null && valueobj !== undefined) && valueobj['glob'] && valueobj['_isProxy']) {
    var globChange = valueobj['glob']()
  } else {
    var globChange = valueobj//valueobj //null
  }

  var globObj = { globChange: globChange }

  var setting = true

  var ObjPathObjName = 'ObjPathObj',
    ProxyObjName = 'ProxyObj',
    ObjectPathName = 'ObjectPathObj',
    NormalArrayName = 'NormalArrayName',
    ArrayObjName = 'ArrayObjName'

  var nameArray = [ObjPathObjName, ProxyObjName, ArrayObjName, ObjectPathName, NormalArrayName]

  function _setObs(x) {
    if (x === 'delete') {
      if (getObs) {
        getObs = undefined
        setObs = undefined
      } else {
        setObs = undefined
      }
    } else {
      if (getObs) {
        return getObs
      } else {
        return setObs
      }
    }
  }

  if (setObs) {
    var assi = new ProxyListenClass.Assign(nameArray, objectPath, globObj,
      setObs, defaultStr, isPassOldValue, isTrigger, isCanCover, _setObs, errFunc)
  } else {
    var assi = new ProxyListenClass.Assign(nameArray, objectPath, globObj, getObs,
      defaultStr, isPassOldValue, isTrigger, isCanCover, _setObs, errFunc)
  }
  var objPathAssign = function (obj, objPath, level) {
    objPathAssignFunc(obj, objPath, level, address, isFuncListen, levelLimt, assi, normalArrayAssign, setObs)
  }



  function normalArrayAssign(array, setObs, type, name, level) {
    if (type) {
      NormalArray(array, type);
    } else {
      NormalArray(array);
    }
    //Object.defineProperties(obj[path], )
    assi.normalArrayAssign(array, objPathAssign, level, validator, name, methCollect)
    //array.__proto__ = Obj.prototype
  }

  function objectPathAssign(origin, address, realTimePath, first, level) {
    if (deepListen || setting === true) {
      if (first === true || (typeof origin === 'function' && isFuncListen)) {
        assi.firstAssign(origin, realTimePath, level)
        //origin.__proto__ = FirstObj.prototype
      }
      if (typeof origin === 'object') {
        objectPathAssignFunc(origin, address, realTimePath, first, level, setObs, isFuncListen, setting, normalArrayAssign, assi, levelLimt)
      }
    }
  }

  function arrayAssign(array, setObs, level) {
    //array = new NewArray(...array);
    NewArray(array)
    assi.arrayAssign(array, objPathAssign, methCollect, validator)

  }

  /** 
    if (whole[string] && typeof whole[string] === 'object' && whole[string] !== null) {  //&& deepListen //whole[string] && typeof whole[string] === 'object' && !Array.isArray(whole[string])
      objectPathAssign(whole[string], objectPath, address, null, 0)
    }
  
    if (Array.isArray(valueobj)) {
      valueobj = arrayAssign(valueobj, setObs, 0)
    }
  **/

  function proxyAssign(obj, string, level) {
    assi.proxyAssign(obj, string, level, validator)
  }

  function charListenAssign(obj, string) {
    assi.charListenAssign(obj, string)
  }

  var bind = {};
  //var _isNull = '_isNull'
  //var _isUndefiend = '_isUndefiend'
  var _isNull = '_isNull' + '-' + Date.now()
  var _isUndefiend = '_isUndefiend' + '-' + Date.now()
  var _isNaN = '_isNaN' + '-' + Date.now()

  var handlerDefineGet = new ProxyListenClass.HandlerDefineGet(_isNull, _isUndefiend, _isNaN)
  var handlerDefineSet = new ProxyListenClass.HandlerDefineSet(_isNull, _isUndefiend, _isNaN)

  var handlerDefine = function () {
    return {
      get: function () {
        return handlerDefineGet.exe(this, valueobj, bind, string)
      },
      set: function (val) {
        var that = this
        handlerDefineSetFunc({
          val, address, objectPath, that, whole, bind, string, globChange,
          setting, deepListen, isPassOldValue, setObs, getObs,
          valueobj, subscriber, validator, handlerDefineSet,
          isTrigger, methCollect, funRepListen, defaultStr, charListenAssign, proxyAssign,
          arrayAssign, objectPathAssign, objectHandlerProxy, funcRepHandlerProxy,
          funcHandlerProxy
        })
      }
    }
  }

  var setProcessFunc = new ProxyListenClass.SetProcess(objectPath, address, normalArrayAssign, objectPathAssign,
    objPathAssign, methCollect, isTrigger, defaultStr)

  var setProcess = function (target, key, value, receiver, change) {
    setProcessFunc.exe(target, key, value, globChange, change, validator, levelLimt, setObs)
  }

  var setProxySet = function (target, key, value, receiver) {
    if (subscriber.closed === false || setting === true) {
      if (isPassOldValue === true) {
        var change = {
          oldValue: JSON.parse(JSON.stringify(target))
        }
        delete change.oldValue['setObs']
        delete change.oldValue['_isTrigger']
      } else {
        var change = {
          //oldValue: {}//_.cloneDeep(target) JSON.parse(JSON.stringify(target))
        }
      }
    }
    //console.log(setObs);
    if (value && value['_proxyListen'] && value['_proxyListen']._isProxy) {
      target[key] = value
      return true
    } else {
      if (subscriber.closed === false || setting === true) {
        setProcess(target, key, value, receiver, change)
      } else {
        target[key] = value
      }
      return true
    }

  }

  var funNormalProxyApply = new ProxyListenClass.FunNormalProxy(address)

  var funNormalProxy = function () {
    return Object.assign({}, {
      apply: function (target, thisArg, argumentsList) {
        if (subscriber.closed === false) {
          return funNormalProxyApply.exe(target, thisArg, argumentsList, isFuncExePos, validator, isFuncIsAsync, isTrigger, defaultStr, setObs, globChange)
        } else {
          return target.apply(thisArg, argumentsList)
        }
      }
    })
  }

  var funcBaseProxyApply = new ProxyListenClass.FuncBaseProxy()

  var funcBaseProxy = {
    apply: function (target, thisArg, argumentsList) {
      if (subscriber.closed === false) {
        return funcBaseProxyApply.exe(target, thisArg, argumentsList, exePos, validator, isAsync, isTrigger, defaultStr, getObs)
      } else {
        return target.apply(thisArg, argumentsList)
      }
    },
    set: null
  }

  var funcHandlerProxy = function () {
    return Object.assign(funcBaseProxy, {
      get: function (target, key) {
        if (subscriber.closed === false) {
          if (target['_proxyListen'] && target['_proxyListen']['_path'] === objectPath) {
            globChange = target
          }
          return funcHandler(target, key, funcHandlerProxy)
        } else {
          return target[key]
        }
      },
      set: function (target, key, value, receiver) {
        if (!validator || validator && validator() !== false) {
          target[key] = value
        }
        return true
      }
    })
  }

  var funcRepHandlerProxy = function () {
    return Object.assign(funcBaseProxy, {
      get: function (target, key) {
        if (subscriber.closed === false) {
          if (target['_proxyListen'] && target['_proxyListen']['_path'] === objectPath) {
            globChange = target
          }
          return funcHandler(target, key, funcRepHandlerProxy)
        } else {
          return target[key]
        }
      },
      set: setProxySet
    })
  }



  var objectHandlerProxyGet = new ProxyListenClass.ObjectHandlerProxy(methCollect, isInstanceMethod)

  var objectHandlerProxy = function () {
    return Object.assign({}, {
      get: function (target, key, receiver) {
        if (subscriber.closed === false && target['_proxyListen'] && target['_proxyListen']['_level'] > -1) {
          if (target['_proxyListen']['_path'] === objectPath) {
            globChange = target
            globObj.globChange = globChange
          }
          //console.log(Object.keys(target).indexOf(key));
          return objectHandlerProxyGet.exe(target, key, receiver, levelLimt, objectPath, objectHandlerProxy, funNormalProxy, isFuncListen, isInstanceMethod)
        } else {
          return target[key]
        }
      },
      set: setProxySet
    })
  }


  if (whole[string] && whole[string]['_proxyListen'] && whole[string]['_proxyListen']['_isProxy'] ||
    whole[string] && whole[string]['_proxyListen'] && whole[string]['_proxyListen']['_isCharListen'] ||
    (whole['_proxyListen'] && whole['_proxyListen']['_isCharListen'] && whole['_proxyListen']['_isCharListen'][string])) {
    if (whole[string] && whole[string]['_proxyListen']['_isCanCover'] ||
      whole[string] && whole[string]['_proxyListen']['_isCharListen'] && whole['_proxyListen']['_isCharListen']['_isCanCover'][string] ||
      whole['_proxyListen'] && whole['_proxyListen']['_isCharListen'] && whole['_proxyListen']['_isCharListen'][string] && whole['_proxyListen']['_isCharListen']['_isCanCover'][string]
    ) {
      if (whole[string] && typeof whole[string] === 'object' && whole[string] !== null) {  //&& deepListen //whole[string] && typeof whole[string] === 'object' && !Array.isArray(whole[string])
        delete valueobj.glob()['setObs']
        valueobj.glob()['_setObs']('delete')
        objectPathAssign(whole[string].glob(), objectPath, address, null, 0)
      }
      else if (typeof whole[string] === 'function') {
        valueobj.glob()['_setObs']('delete')
      }
      else {
        if (whole['_proxyListen']['_isCharListen'] && whole['_proxyListen']['_isCharListen']['_setObs'][string]) {
          whole['_proxyListen']['_isCharListen']['_setObs'][string]('delete')
        }
        else if (whole[string]['_proxyListen']['_isCharListen'] && whole[string]['_proxyListen']['_isCharListen']['_setObs'][string]) {
          whole[string]['_proxyListen']['_isCharListen']['_setObs'][string]('delete')
        }
      }
      if (Array.isArray(valueobj)) {
        //valueobj.glob() = arrayAssign(valueobj.glob(), setObs, 0)
        arrayAssign(valueobj.glob(), setObs, 0);
      }
      Object.defineProperty(whole, string, handlerDefine())
      if (!valueobj || typeof valueobj !== 'object' && typeof valueobj !== 'function') {
        charListenAssign(whole, string)
        if (setting) {
          setting = null
        }
      }
      if (valueobj && typeof valueobj === 'object' || valueobj && typeof valueobj === 'function') {
        //var orj = proxyAssign(valueobj.glob(), objectPath, 0)
        proxyAssign(valueobj.glob(), objectPath, 0)
        if (typeof valueobj !== 'function') {
          delete valueobj.glob()['_proxyListen']['_objectPath']
          delete valueobj.glob()['_proxyListen']['_objPath']
          Object.assign(whole, { [`${string}`]: new Proxy(valueobj.glob(), objectHandlerProxy()) })
        } else {
          if (funRepListen) {
            delete valueobj.glob()['_proxyListen']['_objectPath']//valueobj.glob()
            Object.assign(whole, { [`${string}`]: new Proxy(valueobj.glob(), funcRepHandlerProxy()) })
          } else {
            delete valueobj.glob()['_proxyListen']['_objectPath']
            Object.assign(whole, { [`${string}`]: new Proxy(valueobj.glob(), funcHandlerProxy()) })
          }
        }
      }
      if (string && typeof valueobj === 'function') {
        return getObs
      } else {
        return setObs
      }
    } else {
      if (whole[string] && whole[string]['_proxyListen']['_isProxy']) {
        whole[string]['_proxyListen']['errFunc']()
      }
      else if (whole[string] && whole[string]['_proxyListen']['_isCharListen']) {
        whole[string]['_proxyListen']['_isCharListen']['errFunc']()
      }
      else if (whole['_proxyListen']['_isCharListen'] && whole['_proxyListen']['_isCharListen'][string]) {
        whole['_proxyListen']['_isCharListen']['errFunc']()
        //console.log(whole['_proxyListen']['_isCharListen']['errFunc']);
      }
    }
  } else {
    if (whole[string] && typeof whole[string] === 'object' && whole[string] !== null) {  //&& deepListen //whole[string] && typeof whole[string] === 'object' && !Array.isArray(whole[string])
      objectPathAssign(whole[string], objectPath, address, null, 0)
    }
    if (Array.isArray(valueobj)) {
      //valueobj = arrayAssign(valueobj, setObs, 0)
      arrayAssign(valueobj, setObs, 0)
    }
    var descriptor = Object.getOwnPropertyDescriptor(whole, string);
    if (descriptor) {
      var getter = descriptor.get
      var setter = descriptor.set
    }

    if (getter) {
      if (!whole['_proxyListen']) {
        Object.defineProperty(whole, "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      Object.defineProperty(whole['_proxyListen'], string + '_setter', {
        value: setter,
        writable: true,
        enumerable: false,
        configurable: true
      })
    }
    if (setter) {
      if (!whole['_proxyListen']) {
        Object.defineProperty(whole, "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      Object.defineProperty(whole['_proxyListen'], string + '_getter', {
        value: getter,
        writable: true,
        enumerable: false,
        configurable: true
      })
    }
    Object.defineProperty(whole, string, handlerDefine())
    if (!valueobj || typeof valueobj !== 'object' && typeof valueobj !== 'function') {
      charListenAssign(whole, string)
      if (setting) {
        setting = null
      }
    }
    if (valueobj && typeof valueobj === 'object' || valueobj && typeof valueobj === 'function') {
      proxyAssign(valueobj, objectPath, 0)
      if (typeof valueobj !== 'function') {
        delete valueobj['_proxyListen']['_objectPath']
        delete valueobj['_proxyListen']['_objPath']
        Object.assign(whole, { [`${string}`]: new Proxy(valueobj, objectHandlerProxy()) })
      } else {
        if (funRepListen) {
          delete valueobj['_proxyListen']['_objectPath']
          Object.assign(whole, { [`${string}`]: new Proxy(valueobj, funcRepHandlerProxy()) })
        } else {
          delete valueobj['_proxyListen']['_objectPath']
          Object.assign(whole, { [`${string}`]: new Proxy(valueobj, funcHandlerProxy()) })
        }
      }
    }
    if (string && typeof valueobj === 'function') {
      return getObs
    } else {
      return setObs
    }
  }
}


function proxyListenGroup(obj, addressArray, funSet, propSet) {
  var listener = []
  var listener$ = []
  if (Array.isArray(addressArray)) {
    for (var i = 0, len = addressArray.length; i < len; i++) {
      listener.push(proxyListen(obj, addressArray[i], funSet, propSet))
    }
  } else {
    listener.push(proxyListen(obj, addressArray, funSet, propSet))
  }
  return {
    subscribeGroup: function (fn) {
      if (listener$.length !== listener.length) {
        for (var i = 0, len = listener.length; i < len; i++) {
          listener$.push(listener[i].subscribe(fn))
        }
      }
    },
    unsubscribeGroup: function () {
      for (var i = 0, len = listener$.length; i < len; i++) {
        listener$[i].unsubscribe()
      }
      listener$.length = 0
    }
  }
}
module.exports = ProxyListener
