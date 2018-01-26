module lka {
    /**
     * 音效类，用于播放没有图标的音乐
     * 在进入时进行初始化
     * 播放时调用play()方法
     * 
     * 
     * @example let sound1: lka.sound = new lka.sound("../resource", "sound1"); sound1["sound1"].play();
     * @export
     * @class sound
     */
    export class sound {

        /**
         * 音乐名字列表
         * 
         * @type {string[]}
         * @memberof sound
         */
        private soundNameList: string[];

        /**
         * 音乐dom列表
         * 
         * @type {any}
         * @memberof sound
         */
        private soundList;

        /**
         * 存放所有音频的Div
         * 
         * @private
         * @type {HTMLDivElement}
         * @memberof sound
         */
        public audioParent: HTMLDivElement;

        /**
         * Creates an instance of sound.
         * @param {string} sourcePath 路径
         * @param {...string[]} soundName 名字列表
         * @memberof sound
         */
        constructor(sourcePath: string, ...soundName: string[]) {
            // 初始化两个参数
            this.soundNameList = [...soundName];
            this.soundList = {};

            // 创建存放audio的仓库
            // this.audioParent = new HTMLDivElement();
            this.audioParent = <HTMLDivElement>document.createElement("div");
            this.audioParent.id = "audioParent";
            document.body.appendChild(this.audioParent);

            // 判断是否是微信环境，是的话需要执行
            if (lka.system.isWeixin) {
                console.log("lka.sound 微信环境");
                if (window['wx'] && window['is_weixin']()) {
                    window['wx'].getNetworkType({
                        success: function (res) {
                            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                        }
                    });
                } else {
                    console.log("lka.sound 微信环境调用微信请求失败");
                }
            }

            this.createSound(sourcePath, ...soundName);
        }
        /**
         * 创建audio
         * 
         * @private
         * @param {any} sourcePath 路径
         * @param {...string[]} soundName 名字列表
         * @memberof sound
         */
        private createSound(sourcePath, ...soundName: string[]) {
            for (const name of soundName) {

                let audio: HTMLAudioElement = <HTMLAudioElement>document.createElement("audio");
                audio.src = sourcePath + "/" + name + ".mp3";
                audio.preload = "true";
                this.audioParent.appendChild(audio);

                this[name] = audio;
            }
        }

        /**
         * 停止当前对象内的所有音乐
         * 
         * 
         * @memberof sound
         */
        public stop() {
            for (const audio of this.soundList) {
                audio.stop();
            }
        }

        /**
         * 暂停当前对象内的所有音乐
         * 
         * 
         * @memberof sound
         */
        public pause() {
            for (const audio of this.soundList) {
                audio.pause();
            }
        }

        /**
         * 设置当前对象内的所有音乐的声音
         * 
         * 1
         * @memberof sound
         */
        public set volume(volume: number) {
            for (const name of this.soundNameList) {
                this[name].volume = volume;
            }
        }
    }
}