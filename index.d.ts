type Subscribe = {
/**
 * 
 * 
 * @param {(passing: any) => any} callback 
 * @returns {*} 
 */
subscribe(callback: (passing: any) => any): any;
}

declare module 'proxylistenerjs' {
  /**
   * 
   * 
   * @export
   * @class ProxyListener
   */
  export default class ProxyListener {
    /**
     * Creates an instance of ProxyListener.
     * @param {*} [Subject] 
     * @memberof ProxyListener
     */
    constructor(Subject?: any)
    /**
     * 
     * 
     * @param {Object} object  target's parent object.
     * @param {String} address target's location
     * @param {{
     *         exePos?: String;
     *         funRepListen?: Boolean;
     *         isAsync?: Boolean;
     *       }} [funSet] settings for function type target.
     * @param {({
     *         thisArgs?: Object;
     *         validator?: (passing: any) => any;
     *         isTrigger?: Boolean;
     *         change?: {
     *           isPassOldValue?: Boolean;
     *           defaultValue?: String;
     *         };
     *         deepListenLv?: Number | String;
     *         coverSet?: {
     *           isCanCover: Boolean;
     *           errFunc?: Function;
     *         };
     *         funcListenSet?: {
     *           listenOn: Boolean;
     *           exePos?: String;
     *           isAsync: Boolean;
     *         }
     *       })} [propSet] general listening settings.
     * @returns {Subscribe} 
     * @memberof ProxyListener
     */
    proxyListen(
      object: Object,
      address: String,
      funSet?: {
        exePos?: String;
        funRepListen?: Boolean;
        isAsync?: Boolean;
      },
       propSet?: {
        thisArgs?: Object;
        validator?: (passing: any) => any;
        isTrigger?: Boolean;
        change?: {
          isPassOldValue?: Boolean;
          defaultValue?: String;
        };
        deepListenLv?: Number | String;
        coverSet?: {
          isCanCover: Boolean;
          errFunc?: Function;
        };
        funcListenSet?: {
          listenOn: Boolean;
          exePos?: String;
          isAsync: Boolean;
        }
      }): Subscribe;
  }
}
//export = proxylistenerjs;



