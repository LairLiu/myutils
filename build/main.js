class main {
    static init() {
        lka.init();
    }
}
var lka;
(function (lka) {
    class base {
        /**
         * 初始化框架
         *
         * @static
         * @memberof base
         */
        static init() {
        }
    }
    lka.base = base;
    function init() {
        lka.stage.init();
        base.init();
    }
    lka.init = init;
})(lka || (lka = {}));
var lka;
(function (lka) {
    class stage {
        /**
         * 初始化设备相关
         * 开启对浏览器的屏幕大小监听
         * 与对设备的方向监听
         *
         * @static
         * @memberof stage
         */
        static init() {
            // 浏览器舞台
            window.onresize = function () {
                console.log(`resize:{width:${this.innerWidth},height:${this.innerHeight}}`);
            };
            // 设备方向改变
            window.onorientationchange = function () {
                let orientation = window.orientation;
                console.log(`onorientationchange:{orientation:${orientation}}`);
            };
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
        static get innerWidth() {
            const innerWidth = window.innerWidth;
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
        static get innerHeight() {
            const innerHeight = window.innerHeight;
            return innerHeight;
        }
    }
    lka.stage = stage;
})(lka || (lka = {}));
var lka;
(function (lka) {
    /**
     * 系统类，用于判断包括操作系统，使用环境等一系列变量
     *
     * @author lka
     * @version 0.0.1
     * @export
     * @class system
     */
    class system {
        /**
         * 判断是否为打开的是否是微信
         *
         * @static
         * @returns {boolean} 返回是否是微信环境
         * @memberof system
         */
        static get isWeixin() {
            var ua = navigator.userAgent.toLowerCase();
            if (String(ua.match(/MicroMessenger/i)) == "micromessenger") {
                return true;
            }
            else {
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
        static systemIsiOS() {
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端          
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log("system is :", isiOS ? "ios" : "android");
            let result = isiOS ? true : false;
            return result;
        }
    }
    lka.system = system;
})(lka || (lka = {}));
var lka;
(function (lka) {
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
    class sound {
        /**
         * Creates an instance of sound.
         * @param {string} sourcePath 路径
         * @param {...string[]} soundName 名字列表
         * @memberof sound
         */
        constructor(sourcePath, ...soundName) {
            // 初始化两个参数
            this.soundNameList = [...soundName];
            this.soundList = {};
            // 创建存放audio的仓库
            // this.audioParent = new HTMLDivElement();
            this.audioParent = document.createElement("div");
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
                }
                else {
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
        createSound(sourcePath, ...soundName) {
            for (const name of soundName) {
                let audio = document.createElement("audio");
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
        stop() {
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
        pause() {
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
        set volume(volume) {
            for (const name of this.soundNameList) {
                this[name].volume = volume;
            }
        }
    }
    lka.sound = sound;
})(lka || (lka = {}));
var lka;
(function (lka) {
    /**
     * 视频类，根据系统创建符合操作的视频对象
     *
     * @author lka
     * @version 0.0.1 2018/01/24
     * @export
     * @class video
     */
    class video {
        /**
         * Creates an instance of video.
         * @param {string} videoSrc 不加后缀的视频路径，会自动寻路找.mp4/.ts/.jpg路径
         * @param {string} jsSrc jsmpeg文件路径，不改则默认
         * @param {Function} [endFunc] 结束方法
         * @param {string} [top] 距顶部位置
         * @param {string} [left] 距左部位置
         * @param {string} [width] 视频宽度
         * @param {string} [height] 视频高度
         * @memberof video
         */
        constructor(videoSrc, jsSrc, endFunc, top, left, width, height) {
            // 创建<script>标签，用于引用jsmpeg
            var jsmpeg = document.createElement("script");
            jsmpeg.type = "text/javascript";
            jsmpeg.src = jsSrc || "./src/lka/media/jsmpeg.min.js";
            document.body.appendChild(jsmpeg);
            // 设置初始值
            this.videoSrc = videoSrc;
            this.top = top || "0";
            this.left = left || "0";
            this.width = width || "100%";
            this.height = height || "100%";
            this.endFunc = endFunc || function endFunc() { console.log("video is play end"); };
            // 开始创建视频供播放使用
            lka.system.systemIsiOS ? this.createIosVideo() : this.createAndroidVideo();
        }
        /**
         * 创建ios用video标签，用于播放视频
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @private
         * @memberof video
         */
        createIosVideo() {
            let video1 = new HTMLVideoElement();
            video1.src = this.videoSrc + ".mp4";
            video1.poster = this.videoSrc + ".jpg";
            video1.style.top = this.top;
            video1.style.left = this.left;
            video1.style.width = this.width;
            video1.style.height = this.height;
            video1.style.position = "absolute";
            video1.style.zIndex = "99";
            video1.onended = this.endFunc();
            // 判断是否为微信环境，如果是则设置为H5同层播放器
            // 相关参数在media/H5同层播放器接入规范_20170117.pdf中查看
            if (lka.system.isWeixin) {
                video1.setAttribute("webkit-playsinline", "true");
                video1.setAttribute("playsinline", "true");
                video1.setAttribute("preload", "auto");
                video1.setAttribute("x5-video-player-type", "h5");
                video1.setAttribute("x5-video-player-fullscreen", "true");
                video1.setAttribute("x5-video-orientation", "portraint");
            }
            document.body.appendChild(video1);
            video.videoObj = video1;
            video.video = video1;
        }
        /**
         * 创建Android用canvas办法给视频
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @private
         * @memberof video
         */
        createAndroidVideo() {
            // 如果非微信环境则创建video标签，否则则创建canvas标签
            if (!lka.system.isWeixin) {
                this.createIosVideo();
                return;
            }
            let canvas = new HTMLCanvasElement();
            canvas.style.top = this.top;
            canvas.style.left = this.left;
            canvas.style.widows = this.width;
            canvas.style.height = this.height;
            canvas.style.position = "absolute";
            canvas.style.zIndex = "99";
            video.canvasObj = canvas;
            // 创建播放视频对象，详细参数参考：https://github.com/phoboslab/jsmpeg
            let player = new window['JSMpeg'].Player(this.videoSrc + ".ts", {
                canvas: canvas,
                onPlayEnd: this.endFunc,
                autoplay: false,
                audio: true,
                chunkSize: 0.5 * 1024 * 1024,
                disableGl: true
            });
            video.video = player;
        }
        /**
         * 播放视频
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @memberof video
         */
        static play() {
            video.video.play();
        }
        /**
         * 暂停播放
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @memberof video
         */
        static pause() {
            video.video.pause();
        }
        /**
         * 结束播放
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @param {boolean} hide 播放结束是否隐藏视频
         * @memberof video
         */
        static stop(hide) {
            video.video.currentTime = 0;
            video.pause();
            if (hide)
                video.video.hide();
        }
        /**
         * 设置音量
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @memberof video
         */
        set volume(v) {
            video.video.volume = v;
        }
        /**
         * 获取音量
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @type {number}
         * @memberof video
         */
        get volume() {
            return video.video.volume;
        }
        /**
         * 设置播放进度
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @memberof video
         */
        set currentTime(v) {
            video.video.currentTime = v;
        }
        /**
         * 获取播放进度
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @type {number}
         * @memberof video
         */
        get currentTime() {
            return video.video.currentTime;
        }
        /**
         * 显示视频
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @memberof video
         */
        static show() {
            if (video.canvasObj)
                video.canvasObj.style.display = "block";
            if (video.videoObj)
                video.videoObj.style.display = "block";
        }
        /**
         * 隐藏视频
         *
         * @author lka
         * @version 0.0.1 2018/01/24
         * @static
         * @memberof video
         */
        static hide() {
            if (video.canvasObj)
                video.canvasObj.style.display = "none";
            if (video.videoObj)
                video.videoObj.style.display = "none";
        }
    }
    lka.video = video;
})(lka || (lka = {}));
var lka;
(function (lka) {
    class Time {
        // 判断游戏是否可玩
        // 活动时间与当前时间比对
        static canPalyGmae(year, month, day, hour = 0, minutes = 0, second = 0) {
            var date = new Date();
            // 当前时间
            var timeNow = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            // 活动时间
            var timeGame = `${year}/${month}/${day} ${hour}/${minutes}/${second}`;
            let oDate1 = Date.parse(timeNow);
            let oDate2 = Date.parse(timeGame);
            var canPlay = (oDate1 - oDate2) / 1000 / 60 / 60 / 24;
            console.log(`当前时间:${timeNow}`, ` 活动时间${timeGame}`, console.log(` ${canPlay},${canPlay > 0 ? " 能玩" : " 不能玩"}`));
            return canPlay > 0 ? true : false;
        }
    }
    lka.Time = Time;
})(lka || (lka = {}));
//# sourceMappingURL=main.js.map