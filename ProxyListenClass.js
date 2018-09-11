var NormalArrayMethod = class {
  constructor(array) {
    this.array = array
  }
  method(fn, thisArgs, args, name) {
    if (!this.array['_proxyListen']._validate || this.array['_proxyListen']._methCollect.methArray.length === 0) {
      return fn.apply(thisArgs, args);
    } else {
      if (this.array['_proxyListen']._validate({ locatePath: this.array['_proxyListen']._objPath, method: name }) !== false) {
        var change = {}
        if (this.array['_proxyListen']._isPassOldValue) {
          change['oldValue'] = JSON.parse(JSON.stringify(this.array))
        }
        var ret = fn.apply(thisArgs, args);
        this.array['_proxyListen']._objPathAssign(this.array, this.array['_proxyListen']._objPath, this.array['_proxyListen']._level)
        //console.log(this['_proxyListen']._methCollect.methArray.length);
        change['newValue'] = this.array
        change['glob'] = this.array.glob()
        change['method'] = name
        change['locatePath'] = this.array['_proxyListen']._objPath
        this.array['_proxyListen']._methCollect.methArray.length = 0
        //this['_proxyListen']._clearMethArray()
        this.array.setObs.next(change)
        return ret
      } else {
        this.array['_proxyListen']._methCollect.methArray.length = 0
        if (this.array.setObs && this.array['_proxyListen']._isTrigger === true) {
          this.array.setObs.next(this.array['_proxyListen']._defaultValue)
        }
        return undefined
      }
    }
  }
}

var NewArrayMethod = class {
  constructor(array) {
    this.array = array
  }
  method(fn, thisArgs, args, name) {
    if (this.array['_proxyListen']._methCollect.methArray.length === 0) {
      return fn.apply(thisArgs, args);
    } else {
      if (args) {
        var val = [].slice.apply(args)
      } else {
        var val = []
      }
      if (this.array['_proxyListen']._validate({ method: name, val: val }) !== false) {
        var change = {}
        if (this.array['_proxyListen']._isPassOldValue) {
          change['oldValue'] = JSON.parse(JSON.stringify(this.array))
        }
        var ret = fn.apply(thisArgs, args);
        this.array['_proxyListen']._objPathAssign(this.array, null, this.array['_proxyListen']._level)
        change['method'] = name
        change['glob'] = this.array.glob()
        change['newValue'] = this.array
        this.array['_proxyListen']._methCollect.methArray.length = 0
        this.array.setObs.next(change)
        return ret
      } else {
        this.array['_proxyListen']._methCollect.methArray.length = 0
        if (this.array.setObs && this.array['_proxyListen']._isTrigger === true) {
          this.array.setObs.next(this.array['_proxyListen']._defaultValue)
        }
        return undefined
      }
    }
  }
}

var Assign = class {
  constructor(nameArray, objectPath, globObj, setObs, defaultStr, isPassOldValue, isTrigger, isCanCover, _setObs, errFunc) {
    this.nameArray = nameArray
    this.objectPath = objectPath
    this.globObj = globObj
    this.setObs = setObs
    this.defaultStr = defaultStr
    this.isPassOldValue = isPassOldValue
    this.isTrigger = isTrigger
    this.isCanCover = isCanCover
    this._setObs = _setObs
    this.errFunc = errFunc
  }
  objPathAssign(obj, key, objPath, level) {
    var that = this
    if (obj[key]['_proxyListen'] && this.nameArray.indexOf(obj[key]['_proxyListen']._ClassName)) {
      var target = obj[key]['_proxyListen']
    } else {
      if (!obj[key]['_proxyListen']) {
        Object.defineProperty(obj[key], "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      var target = obj[key]['_proxyListen']
    }
    Object.defineProperty(target, "_ClassName", {
      value: 'ObjPathObj',
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(target, "_objPath", {
      value: objPath + '/' + key,
      writable: true,
      enumerable: false,
      configurable: true
    })
    Object.defineProperty(target, "_level", {
      value: level,
      writable: true,
      enumerable: false,
      configurable: true
    })
    if (!target["_objectPath"]) {
      Object.defineProperty(target, "_objectPath", {
        value: this.objectPath,
        writable: true,
        enumerable: false,
        configurable: true
      })
      Object.defineProperty(obj[key], "glob", {
        value: function () {
          return that.globObj.globChange
        },
        writable: true,
        enumerable: false,
        configurable: true
      })
    }
  }
  normalArrayAssign(array, objPathAssign, level, validator, name, methCollect) {
    var that = this
    Object.defineProperty(array, "glob", {
      value: function () {
        return that.globObj.globChange
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(array, "setObs", {
      value: this.setObs,
      writable: true,
      enumerable: false,
      configurable: true
    });
    var target = array['_proxyListen']
    Object.defineProperties(target, {
      "_level": {
        value: level,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objPathAssign": {
        value: objPathAssign,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_defaultValue": {
        value: this.defaultStr,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_isPassOldValue": {
        value: this.isPassOldValue,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_isTrigger": {
        value: this.isTrigger,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_methCollect": {
        value: function () {
          return methCollect
        }(),
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objPath": {
        value: name,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objectPath": {
        value: this.objectPath,
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
    if (validator) {
      Object.defineProperty(target, "_validate", {
        value: validator,
        writable: true,
        enumerable: false,
        configurable: true
      });
    } else {
      Object.defineProperty(target, "_validate", {
        value: function () {
          return true
        },
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
  firstAssign(origin, realTimePath, level) {
    var that = this
    if (origin['_proxyListen'] && this.nameArray.indexOf(origin['_proxyListen']._ClassName)) {
      var target = origin['_proxyListen']
    } else {
      if (!origin['_proxyListen']) {
        Object.defineProperty(origin, "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      var target = origin['_proxyListen']
    }
    Object.defineProperty(origin, "glob", {
      value: function () {
        return that.globObj.globChange
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(target, {
      "_ClassName": {
        value: 'ObjectPathObj',
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_level": {
        value: level,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objectPath": {
        value: this.objectPath,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objPath": {
        value: realTimePath,
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
  }
  objectPathAssign(origin, num, realTimePath, level) {
    var that = this
    if (this.nameArray.indexOf(origin[num]['_proxyListen']._ClassName)) {
      var target = origin[num]['_proxyListen']
    } else {
      if (!origin[num]['_proxyListen']) {
        Object.defineProperty(origin[num], "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      var target = origin[num]['_proxyListen']
    }
    Object.defineProperty(origin[num], "glob", {
      value: function () {
        return that.globObj.globChange
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(target, "_ClassName", {
      value: 'ObjectPathObj',
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(target, {
      "_level": {
        value: level,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objectPath": {
        value: this.objectPath,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_objPath": {
        value: realTimePath + '/' + num,
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
  }
  arrayAssign(array, objPathAssign, methCollect, validator) {
    var that = this
    var target = array['_proxyListen']
    Object.defineProperty(array, "glob", {
      value: function () {
        return that.globObj.globChange
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(array, "setObs", {
      value: this.setObs,
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(target, {
      "_objPathAssign": {
        value: objPathAssign,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_defaultValue": {
        value: this.defaultStr,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_isPassOldValue": {
        value: this.isPassOldValue,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_methCollect": {
        value: function () {
          return methCollect
        }(),
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
    if (!validator) {
      Object.defineProperty(target, "_validate", {
        value: function (x) {
          return true
        },
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
  proxyAssign(obj, string, level, validator) {
    var that = this
    if (obj['_proxyListen'] && this.nameArray.indexOf(obj['_proxyListen']._ClassName)) {
      var target = obj['_proxyListen']
    } else {
      if (!obj['_proxyListen']) {
        Object.defineProperty(obj, "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      var target = obj['_proxyListen']
    }
    Object.defineProperty(obj, "glob", {
      value: function () {
        return that.globObj.globChange
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(obj, "_setObs", {
      value: this._setObs,
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(target, "_ClassName", {
      value: 'ProxyObj',
      writable: true,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(target, {
      "_level": {
        value: level,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_isProxy": {
        value: true,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_path": {
        value: string,
        writable: true,
        enumerable: false,
        configurable: true
      },
      "_isCanCover": {
        value: this.isCanCover,
        writable: true,
        enumerable: false,
        configurable: true
      }
    })
    Object.defineProperty(target, 'errFunc', {
      value: this.errFunc,
      writable: true,
      enumerable: false,
      configurable: true
    });
    if (!Array.isArray(obj)) {
      delete target['_validate']
    }
    if (validator) {
      Object.defineProperty(target, "_validate", {
        value: validator,
        writable: true,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(target, "_isTrigger", {
        value: this.isTrigger,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
  charListenAssign(obj, string) {
    if (obj['_proxyListen'] && obj['_proxyListen']._isCharListen) {
      obj['_proxyListen']._isCharListen[string] = string
      Object.defineProperty(obj['_proxyListen']._isCharListen, 'errFunc', {
        value: this.errFunc,
        writable: true,
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(obj['_proxyListen']._isCharListen['_isCanCover'], string, {
        value: this.isCanCover,
        writable: true,
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(obj['_proxyListen']._isCharListen['_setObs'], string, {
        value: this._setObs,
        writable: true,
        enumerable: true,
        configurable: true
      });
    } else {
      if (!obj['_proxyListen']) {
        Object.defineProperty(obj, "_proxyListen", {
          value: {},
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
      Object.defineProperty(obj['_proxyListen'], "_isCharListen", {
        value: {
          _isCharListen: ['_isCharListen'],
          [string]: string,
          errFunc: this.errFunc,
          _isCanCover: {
            [string]: this.isCanCover,
          },
          _setObs: {
            [string]: this._setObs
          }
        },
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
}

var HandlerDefineGet = class {
  constructor(_isNull, _isUndefiend, _isNaN) {
    this._isNull = _isNull
    this._isUndefiend = _isUndefiend
    this._isNaN = _isNaN
  }
  exe(that, valueobj, bind, string) {
    if (that['_proxyListen'] && that['_proxyListen'][string + '_getter'] && that['_proxyListen'][string + '_getter'].name !== 'reactiveGetter') {
      var ret = that['_proxyListen'][string + '_getter'].apply(that)
    } else {
      var ret = bind[`_${string}`];
    }
    if (ret && ret !== this._isNull &&
      ret !== this._isUndefiend && ret !== this._isNaN) {
      return ret
    } else if (ret === this._isNull) {
      return null
    } else if (ret === this._isUndefiend) {
      return undefined
    } else if (ret === this._isNaN) {
      return NaN
    }
    else {
      return valueobj
    }
  }
}

var HandlerDefineSet = class {
  constructor(_isNull, _isUndefiend, _isNaN) {
    this._isNull = _isNull
    this._isUndefiend = _isUndefiend
    this._isNaN = _isNaN
  }
  changeexe(change, getterRet, isPassOldValue, bind, setObs, val, valueobj) {
    if (getterRet) {
      if (getterRet === this._isNull || getterRet === this._isUndefiend) {
        if (getterRet === this._isNull) {
          change['oldValue'] = null
        } else {
          change['oldValue'] = undefined
        }
      }
      else {
        if (typeof getterRet === 'function') {
          var oldValue = []
          oldValue.push(getterRet)
          if (isPassOldValue === true) {
            change['oldValue'] = oldValue[0]   //change['oldValue'] = oldValue[0]
          }
        } else {
          if (isPassOldValue === true) {
            change['oldValue'] = JSON.parse(JSON.stringify(getterRet))   //_.cloneDeep(bind[`_${string}`])
          }
          //change['oldValue'] = JSON.parse(JSON.stringify(bind[`_${string}`]))   //_.cloneDeep(bind[`_${string}`])
        }
      }
    }
    else if (!val ||
      val && typeof val !== 'object' && typeof val !== 'function' ||
      val && typeof val === 'object' && !val['_proxyListen'] || (val['_proxyListen'] && !val['_proxyListen']._isProxy)
    ) {
      if (isPassOldValue === true) {
        change['oldValue'] = valueobj
      }
    }
  }
  charexe(val, change) {
    if (val === this._isNull || val === this._isUndefiend || val === this._isNaN) {
      if (val === this._isNull) {
        change['newValue'] = null
      } else if (val === this._isUndefiend) {
        change['newValue'] = undefined
      } else {
        change['newValue'] = NaN
      }
    } else {
      change['newValue'] = val
    }
    change['method'] = 'assign'
  }
  deleteexe(that, string) {
    if (that['_proxyListen'] && that['_proxyListen']['_isCharListen'] && that['_proxyListen']['_isCharListen'][string]) {
      delete that['_proxyListen']['_isCharListen'][string]
      delete that['_proxyListen']['_isCharListen']['_isCanCover'][string]
      delete that['_proxyListen']['_isCharListen']['_setObs'][string]
    }
  }
}


var SetProcess = class {
  constructor(objectPath, address, normalArrayAssign, objectPathAssign,
    objPathAssign, methCollect, isTrigger, defaultStr) {
    this.objectPath = objectPath
    this.address = address
    this.normalArrayAssign = normalArrayAssign
    this.objectPathAssign = objectPathAssign
    this.objPathAssign = objPathAssign
    this.methCollect = methCollect
    this.isTrigger = isTrigger
    this.defaultStr = defaultStr
  }
  exe(target, key, value, globChange, change, validator, levelLimt, setObs) {
    var status = false
    status = (function (status) {
      if (target['_proxyListen']['_isProxy']) {
        if (target['_proxyListen']['_path'] === this.objectPath) {
          status = true
        } else {
          if (Array.isArray(target)) {
            status = 'arrayMain'
          } else if (typeof target === 'object') {
            status = 'objectMain'
          }
        }
      } else {
        status = true
      }
      return status
    }).call(this, status)
    status = (function (status) {
      if (status === true) {
        status = false
        if (Array.isArray(target)) {
          status = 'array'
        } else if (typeof target === 'object') {
          status = 'object'
        }
      }
      return status
    }).call(this, status)
    status = (function (status) {
      if (status && status === 'object') {
        if (target['_proxyListen']['_isCharListen'] && target['_proxyListen']['_isCharListen'][key] &&
          !(key in target)) {
          delete target['_proxyListen']['_isCharListen'][key]
          delete target['_proxyListen']['_isCharListen']['_isCanCover'][key]
          delete target['_proxyListen']['_isCharListen']['_setObs'][key]
        }
        if (target['_proxyListen']['_isCharListen'] && target['_proxyListen']['_isCharListen'][0] === '_isCharListen' && key === value) {
          target[key] = value
        }
        else if (target[key] && target[key]['_proxyListen'] && target[key]['_proxyListen']['_isProxy']) {
          target[key] = value
        }
        else if (target['_proxyListen']['_isCharListen'] && target['_proxyListen']['_isCharListen'][key]) {
          target[key] = value
        }
        else {
          if (!validator ||
            target['_proxyListen']['_objectPath'] !== this.objectPath && target['_proxyListen']['_path'] !== this.objectPath) {
            var vali = true  //不被监听,没有验证器
          }
          else if (validator) {
            if (target['_proxyListen']['_isProxy'] || ((target['_proxyListen']['_level'] <= levelLimt || levelLimt === 'max') && target['_proxyListen']['_objPath'])) {
              if (target['_proxyListen']['_isProxy']) {
                var vali = validator({ method: 'assign', locatePath: this.address + '/' + key, val: value }) //不被监听,有验证器
              } else {
                var vali = validator({ method: 'assign', locatePath: target['_proxyListen']['_objPath'] + '/' + key, val: value }) //不被监听,有验证器
              }
            } else {
              var vali = validator({ method: 'assign', val: value }) //不被监听,有验证器
            }
          }
          if (vali !== false) {
            target[key] = value
            if (target['_proxyListen']['_objectPath'] === this.objectPath ||
              target['_proxyListen']['_path'] === this.objectPath
            ) {
              if (!value || typeof value === 'object' ||
                typeof value === 'function'
              ) {
                if ((typeof value === 'object' || typeof value === 'function') && value['_proxyListen']) {
                } else {
                  if (levelLimt && target['_proxyListen']['_level'] < levelLimt || levelLimt === 'max') {
                    if (value && (typeof value === 'object' || typeof value === 'function') && value !== null) {
                      if (!value['_proxyListen']) {
                        Object.defineProperty(value, "_proxyListen", {
                          value: {},
                          writable: true,
                          enumerable: false,
                          configurable: true
                        });
                      }
                      Object.defineProperty(value['_proxyListen'], "_objectPath", {
                        value: this.objectPath,
                        writable: true,
                        enumerable: false,
                        configurable: true
                      });
                      if (value && !Array.isArray(value)) {
                        if (target['_proxyListen']['_isProxy']) {
                          this.objectPathAssign(value, this.objectPath, this.address + '/' + key, true, target['_proxyListen']['_level'] + 1)  //realTimePath + '/' + key
                        } else {
                          this.objectPathAssign(value, this.objectPath, target['_proxyListen']['_objPath'] + '/' + key, true, target['_proxyListen']['_level'] + 1)  //realTimePath + '/' + key
                        }
                      }
                      else if (value && Array.isArray(value)) {
                        if (target['_proxyListen']['_isProxy']) {
                          this.normalArrayAssign(value, setObs, 'single', this.address + '/' + key, target['_proxyListen']['_level'] + 1) //null //realTimePath + '/' + key
                          this.objectPathAssign(value, this.objectPath, this.address + '/' + key, null, target['_proxyListen']['_level'] + 1)
                        } else {
                          this.normalArrayAssign(value, setObs, 'single', target['_proxyListen']['_objPath'] + '/' + key, target['_proxyListen']['_level'] + 1) //null //realTimePath + '/' + key
                          this.objectPathAssign(value, this.objectPath, target['_proxyListen']['_objPath'] + '/' + key, null, target['_proxyListen']['_level'] + 1)
                        }
                      }
                    }
                  }
                }
                //realTimePath = realTimePath + '/' + key
                change['newValue'] = target
                change['glob'] = globChange
                change['method'] = 'assign'
                if (target['_proxyListen']['_isProxy']) {
                  change['locatePath'] = this.address + '/' + key
                } else {
                  change['locatePath'] = target['_proxyListen']['_objPath'] + '/' + key
                }
                setObs.next(change)
              }
              else if (!target['_proxyListen']['_isCharListen'] ||
                target['_proxyListen']['_isCharListen'] && !target['_proxyListen']['_isCharListen'][key]) {
                change['newValue'] = target
                change['glob'] = globChange
                change['method'] = 'assign'
                if (target['_proxyListen']['_isProxy']) {
                  change['locatePath'] = this.address + '/' + key
                } else {
                  change['locatePath'] = target['_proxyListen']['_objPath'] + '/' + key
                }
                setObs.next(change)
              }
            }
          }
          else if (this.isTrigger === true && setObs) {
            setObs.next(this.defaultStr)
          }
        }

      }
      return status
    }).call(this, status)
    status = (function (status) {
      if (status && status === 'objectMain') {
        target[key] = value
      }
      return status
    }).call(this, status)
    status = (function (status) {
      if (status && status === 'arrayMain') {
        target[key] = value
      }
      return status
    }).call(this, status)
    status = (function (status) {
      if (status && status === 'array') {    //数组更新 需要参数及不需要参数
        if (this.methCollect.methArray.length > 0) {
          target[key] = value
        }
        else if (this.methCollect.methArray.length === 0) {
          target[key] = value
          if (!validator || target['_proxyListen']['_objectPath'] !== this.objectPath && target['_proxyListen']['_path'] !== this.objectPath) {
            var vali = true  //不被监听,没有验证器、或是被监听
          }
          else if (target['_proxyListen']['_validate']) {
            if (target['_proxyListen']['_isProxy'] || ((target['_proxyListen']['_level'] <= levelLimt || levelLimt === 'max') && target['_proxyListen']['_objPath'])) {
              if (target['_proxyListen']['_isProxy']) {
                var vali = target['_proxyListen']['_validate']({ method: 'update', locatePath: this.address + '/' + key })
              } else {
                var vali = target['_proxyListen']['_validate']({ method: 'update', locatePath: target['_proxyListen']['_objPath'] + '/' + key })
              }
            } else {
              var vali = target['_proxyListen']['_validate']({ method: 'update' })
            }
          }
          else if (validator) {
            if (target['_proxyListen']['_isProxy'] || ((target['_proxyListen']['_level'] <= levelLimt || levelLimt === 'max') && target['_proxyListen']['_objPath'])) {
              if (target['_proxyListen']['_isProxy']) {
                var vali = validator({ method: 'update', locatePath: this.address + '/' + key }) //不被监听,有验证器
              } else {
                var vali = validator({ method: 'update', locatePath: target['_proxyListen']['_objPath'] + '/' + key }) //不被监听,有验证器
              }
            } else {
              var vali = validator({ method: 'update' }) //不被监听,有验证器
            }

            // if (!validator || validator({ method: 'update' }))
          }
          // 数组被监听
          // 数组没有被监听
          if (vali !== false) {
            if ((typeof value === 'object' || typeof value === 'function') && value['_proxyListen'] && value['_proxyListen']['_objectPath'] === this.objectPath) {
              value = Object.create(Object.getPrototypeOf(value), Object.getOwnPropertyDescriptors(value));
            }
            target[key] = value
            if (target['_proxyListen']['_isProxy']) {
              if (levelLimt && target['_proxyListen']['_level'] < levelLimt || levelLimt === 'max') {
                if ((typeof value === 'object' || typeof value === 'function') && value !== null && (!value['_proxyListen'] || (!value['_proxyListen']['_path'] && !value['_proxyListen']['_objectPath']))) {
                  if (Array.isArray(value)) {
                    this.normalArrayAssign(value, setObs, 'single', this.address + '/' + key, target['_proxyListen']['_level'] + 1)//realTimePath + '/' + key
                    this.objectPathAssign(value, this.objectPath, this.address + '/' + key, null, target['_proxyListen']['_level'] + 1)
                  } else {
                    this.objectPathAssign(value, this.objectPath, this.address + '/' + key, true, target['_proxyListen']['_level'] + 1)
                  }
                }
              }
              change['locatePath'] = this.address + '/' + key
            } else {
              if (levelLimt && target['_proxyListen']['_level'] < levelLimt || levelLimt === 'max') {
                if ((typeof value === 'object' || typeof value === 'function') && value !== null && (!value['_proxyListen'] || (!value['_proxyListen']['_path'] && !value['_proxyListen']['_objectPath']))) {
                  if (Array.isArray(value)) {
                    this.normalArrayAssign(value, setObs, 'single', target['_proxyListen']['_objPath'] + '/' + key, target['_proxyListen']['_level'] + 1)//realTimePath + '/' + key
                    this.objectPathAssign(value, this.objectPath, target['_proxyListen']['_objPath'] + '/' + key, null, target['_proxyListen']['_level'] + 1)
                  } else {
                    this.objectPathAssign(value, this.objectPath, target['_proxyListen']['_objPath'] + '/' + key, true, target['_proxyListen']['_level'] + 1)
                  }
                }
              }
              change['locatePath'] = target['_proxyListen']['_objPath'] + '/' + key
            }
            this.objPathAssign(target, target['_proxyListen']['_objPath'], target['_proxyListen']['_level'])
            change['newValue'] = target
            change['method'] = 'update'
            if (globChange) {
              change['glob'] = globChange
            }
            if (key !== '__proto__' && (target['_proxyListen']['_objectPath'] === this.objectPath || target['_proxyListen']['_path'] === this.objectPath)) {
              setObs.next(change)
              //console.log(arrs);
            }
          }
          else if (this.isTrigger === true) {
            setObs.next(this.defaultStr)
          }
        }
      }
      return status
    }).call(this, status)
  }
}


var FuncBaseProxy = class {
  constructor() {

  }
  exe(target, thisArg, argumentsList, exePos, validator, isAsync, isTrigger, defaultStr, getObs) {
    if (!validator || validator && validator({ thisArg: thisArg }) !== false) {
      if (exePos) {
        if (exePos === 'front') {
          getObs.next({ thisArg: thisArg, pos: 'front', res: defaultStr })
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              return res
            })
          } else {
            return ret
          }
        }
        else if (exePos === 'both') {
          getObs.next({ thisArg: thisArg, pos: 'front', res: defaultStr })
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              getObs.next({ thisArg: thisArg, pos: 'back', res: res })
              return res
            })
          } else {
            getObs.next({ thisArg: thisArg, pos: 'back', res: ret })
            return ret
          }
        } else {
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              getObs.next({ thisArg: thisArg, pos: 'back', res: res })
              return res
            })
          } else {
            //await target.apply(thisArg, argumentsList)
            getObs.next({ thisArg: thisArg, pos: 'back', res: ret })
            return ret
          }
        }
      } else {
        var ret = target.apply(thisArg, argumentsList)
        getObs.next({ thisArg: thisArg, pos: 'back', res: ret })
        return ret
      }
    } else {
      if (isTrigger === true) {
        getObs.next(defaultStr)
      }
    }
  }
}


var FunNormalProxy = class {
  constructor(address) {
    this.address = address
  }
  exe(target, thisArg, argumentsList, exePos, validator, isAsync, isTrigger, defaultStr, setObs, globChange) {
    if (thisArg['_proxyListen'] && !target['_proxyListen']) {
      var locatePath = thisArg['_proxyListen']['_objPath'] + '/' + target.name || this.address + '/' + target.name
    } else {
      var locatePath = target['_proxyListen']['_objPath']
    }
    if (!validator || validator && validator({ locatePath: locatePath, thisArg: thisArg }) !== false) {
      if (exePos) {
        if (exePos === 'front') {
          setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'front', glob: globChange, res: defaultStr })
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              return res
            })
          } else {
            return ret
          }
        }
        else if (exePos === 'both') {
          setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'front', glob: globChange, res: defaultStr })
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'back', glob: globChange, res: res })
              return res
            })
          } else {
            setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'back', glob: globChange, res: ret })
            return ret
          }
        } else {
          var ret = target.apply(thisArg, argumentsList)
          if (isAsync === false && (target.constructor.name === 'AsyncFunction' ||
            String(ret) === '[object Promise]')) {
            return ret.then(res => {
              setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'back', glob: globChange, res: res })
              return res
            })
          } else {
            //await target.apply(thisArg, argumentsList)
            setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'back', glob: globChange, res: ret })
            return ret
          }
        }
      } else {
        var ret = target.apply(thisArg, argumentsList)
        setObs.next({ method: 'function', locatePath: locatePath, thisArg: thisArg, pos: 'back', glob: globChange, res: ret })
        return ret
      }
    } else {
      if (isTrigger === true) {
        setObs.next(defaultStr)
      }
    }
  }
}

var ObjectHandlerProxy = class {
  constructor(methCollect, isInstanceMethod) {
    this.methCollect = methCollect
    this.isInstanceMethod = isInstanceMethod
    if (isInstanceMethod && isInstanceMethod.include) {
      this.includeArray = []
      for (var i = 0; i < isInstanceMethod.include.length; i++) {
        if (typeof isInstanceMethod.include[i] === 'string' || isInstanceMethod.include[i].class) {
          this.includeArray.push(isInstanceMethod.include[i].class || isInstanceMethod.include[i])
        }
      }
    }
    if (isInstanceMethod && isInstanceMethod.notInclude) {
      this.notIncludeArray = []
      for (var i = 0; i < isInstanceMethod.notInclude.length; i++) {
        if (typeof isInstanceMethod.notInclude[i] === 'string' || isInstanceMethod.notInclude[i].class) {
          this.notIncludeArray.push(isInstanceMethod.notInclude[i].class || isInstanceMethod.notInclude[i])
        }
      }
    }
  }
  findClassMethod(cons, name) {
    var orginClass = Object.getPrototypeOf(cons.prototype)
    var arrs = Object.keys(Object.getOwnPropertyDescriptors(orginClass))
    if (arrs.indexOf(name) > -1) {
      return true
    } else if (Object.getPrototypeOf(orginClass.constructor).name) {
      return this.findClassMethod(orginClass.constructor, name)
    } else {
      return false
    }
  }
  findInstanceMethod(ins, name) {
    var cons = Object.getPrototypeOf(ins).constructor
    if (['Array', 'Date', 'Object', 'Map', 'Set'].indexOf(cons.name) < 0) {
      var arrs = Object.keys(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(ins)))
      if (arrs.indexOf(name) > -1) {
        return true
      } else if (Object.getPrototypeOf(Object.getPrototypeOf(ins).constructor).name) {
        return this.findClassMethod(Object.getPrototypeOf(ins).constructor, name)
      } else {
        return false
      }
    }
  }
  checkExist(className, method) {
    if (this.includeArray) {
      if (this.includeArray.indexOf(className) > -1) {
        for (var i = 0; i < this.isInstanceMethod.include.length; i++) {
          if (this.isInstanceMethod.include[i] === className) {
            return true
          } else if (this.isInstanceMethod.include[i].class && this.isInstanceMethod.include[i].class === className) {
            var methods = this.isInstanceMethod.include[i].method
            if (methods.indexOf(method) > -1 || methods === method) {
              return true
            } else {
              return false
            }
          }
        }
      } else if (this.notIncludeArray) {
        if (this.notIncludeArray.indexOf(className) > -1) {
          for (var i = 0; i < this.isInstanceMethod.notInclude.length; i++) {
            if (this.isInstanceMethod.notInclude[i] === className) {
              return false
            } else if (this.isInstanceMethod.notInclude[i].class && this.isInstanceMethod.notInclude[i].class === className) {
              var methods = this.isInstanceMethod.notInclude[i].method
              if (methods.indexOf(method) > -1 || methods === method) {
                return false
              } else {
                return true
              }
            }
          }
        } else {
          return true
        }
      } else {
        return false
      }
    } else if (this.notIncludeArray) {
      if (this.notIncludeArray.indexOf(className) > -1) {
        for (var i = 0; i < this.isInstanceMethod.notInclude.length; i++) {
          if (this.isInstanceMethod.notInclude[i] === className) {
            return false
          } else if (this.isInstanceMethod.notInclude[i].class && this.isInstanceMethod.notInclude[i].class === className) {
            var methods = this.isInstanceMethod.notInclude[i].method
            if (methods.indexOf(method) > -1 || methods === method) {
              return false
            } else {
              return true
            }
          }
        }
      } else {
        return true
      }
    }
  }
  exe(target, key, receiver, levelLimt, objectPath, objectHandlerProxy, funNormalProxy, isFuncListen, isInstanceMethod) {
    //console.log(Object.keys(target).indexOf(key));
    if (target[key] && typeof target[key] === 'object') {  //&& target[key].propertyIsEnumerable(key)
      if (levelLimt && (target['_proxyListen'] && target['_proxyListen']['_level'] < levelLimt || levelLimt === 'max')) {
        if (Array.isArray(target)) {
          if (this.methCollect.methArray.length === 0) {
            if (target[key]['_proxyListen'] && target[key]['_proxyListen']['_objectPath'] && target[key]['_proxyListen']['_objectPath'] === objectPath) {
              return new Proxy(target[key], objectHandlerProxy())
              //return target[key]//new Proxy(target[key], objectHandlerProxy())
            } else {
              return target[key]//target[key]
            }
          } else {
            return target[key]
          }
        } else {
          if (target[key]['_proxyListen'] && target[key]['_proxyListen']['_isProxy']) {
            return target[key]
          } else {
            return new Proxy(target[key], objectHandlerProxy())
          }
          //return new Proxy(target[key], objectHandlerProxy())
        }
      } else {
        return target[key]
      }
    } else {
      if (typeof target[key] === 'function' && target instanceof Date) {
        return target[key].bind(target);
      }
      else if (typeof target[key] === 'function' && (String(target) === '[object Set]' ||
        String(target) === '[object Map]'
      )) {
        return target[key].bind(target);
      }
      else if (typeof target[key] === 'function' &&
        Array.isArray(target) &&
        key !== 'constructor' &&
        (['pop', 'reverse', 'shift', 'copyWithin', 'fill', 'sort', 'push', 'splice', 'unshift'].indexOf(key) > -1)
      ) {
        if (key !== this.methCollect.methArray[0]) {
          this.methCollect.methArray = []
        }
        if (this.methCollect.methArray.length < 1) {
          this.methCollect.methArray.push(key)
        }
        return target[key]
      }
      else if (typeof target[key] === 'function' && (target[key]['_proxyListen'] || Object.getPrototypeOf(target))) {//&& target[key]['_proxyListen'] //&& Object.getPrototypeOf(target)[key] === target[key]
        if (isFuncListen) {
          if (target[key]['_proxyListen'] && target[key]['_proxyListen']['_objectPath'] === objectPath) {
            return new Proxy(target[key], funNormalProxy())
          }
          else if (
            isInstanceMethod &&
            key !== 'constructor' &&
            ['Array', 'Date', 'Object', 'Map', 'Set'].indexOf(Object.getPrototypeOf(target).constructor.name) < 0 &&
            Object.getPrototypeOf(target)[key] === target[key]) {
            if (isInstanceMethod === true) {
              return new Proxy(target[key], funNormalProxy())
            } else if (isInstanceMethod.include || isInstanceMethod.notInclude) {
              var checkResult = this.checkExist(Object.getPrototypeOf(target).constructor.name, key)
              if (checkResult === true) {
                var findResult = this.findInstanceMethod(target, key)
                if (findResult === true) {
                  return new Proxy(target[key], funNormalProxy())
                }
              }
            }
          }
        }
        return target[key]
      }
      else {
        return target[key]//.bind(target);
      }
    }
  }
}

module.exports = {    //export default  //module.exports
  NormalArrayMethod,
  NewArrayMethod,
  Assign,
  HandlerDefineGet,
  HandlerDefineSet,
  SetProcess,
  FunNormalProxy,
  FuncBaseProxy,
  ObjectHandlerProxy
};