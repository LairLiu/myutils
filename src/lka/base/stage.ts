module lka {
    export class stage {

        /**
         * 初始化设备相关
         * 开启对浏览器的屏幕大小监听
         * 与对设备的方向监听
         * 
         * @static
         * @memberof stage
         */
        public static init(): void {

            // 浏览器舞台
            window.onresize = function () {

                console.log(`resize:{width:${this.innerWidth},height:${this.innerHeight}}`);
            }

            // 设备方向改变
            window.onorientationchange = function () {
                let orientation = window.orientation;
                console.log(`onorientationchange:{orientation:${orientation}}`);
            }
        }


        /**
         * 屏幕宽度
         * px单位
         * 
         * @readonly
         * @static
         * @type {number}
         * @memberof stage
         */
        public static get innerWidth(): number {
            const innerWidth: number = window.innerWidth;

            return innerWidth;
        }


        /**
         * 屏幕高度
         * px单位
         * 
         * @readonly
         * @static
         * @type {number}
         * @memberof stage
         */
        public static get innerHeight(): number {
            const innerHeight: number = window.innerHeight;

            return innerHeight;
        }
    }
}