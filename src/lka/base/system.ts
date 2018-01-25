module lka {
    /**
     * 系统类，用于判断包括操作系统，使用环境等一系列变量
     * 
     * @author lka
     * @version 0.0.1
     * @export
     * @class system
     */
    export class system {
        /**
         * 判断是否为打开的是否是微信
         * 
         * @static
         * @returns {boolean} 返回是否是微信环境
         * @memberof system
         */
        public static isWeixin(): boolean {
            var ua = navigator.userAgent.toLowerCase();
            if (String(ua.match(/MicroMessenger/i)) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 判断设备系统是否是IOS
         * 
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @returns {boolean}  
         * @memberof video
         */
        public static systemIsiOS(): boolean {
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端          
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log("system is :", isiOS ? "ios" : "android");

            let result = isiOS ? true : false;
            return result;
        }
    }
}