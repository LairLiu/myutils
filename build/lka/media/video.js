"use strict";
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
            if (lka.system.isWeixin()) {
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
            if (!lka.system.isWeixin()) {
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
//# sourceMappingURL=video.js.map