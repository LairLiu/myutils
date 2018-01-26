module lka {
    export class base {
        /**
         * 初始化框架
         * 
         * @static
         * @memberof base
         */
        public static init() {

        }

    }
    export function init(): void {

        stage.init();
        base.init();
    }
}