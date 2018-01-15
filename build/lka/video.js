"use strict";
var lka;
(function (lka) {
    class video {
        /**
         * @author lka
         * @version 1.0.0 2018.1.16
         * @description 当使用手机播放视频时，根据输入的系统不同使用不同的视频播放方式，主要用于微信H5开发，适用于微信浏览器。单位默认为rem
         * @param system {string} 手机系统
         * @param T {string} top dom元素距离顶部的距离
         * @param L {string} left dom元素距离左边的距离
         * @param W {string} width dom元素宽度
         * @param H {string} height dom元素高度
         */
        constructor(system, T = "0", L = "0", W = "100%", H = "100%") {
            this.size = { top: T, left: L, width: W, height: H };
            this.createParent();
            console.log(1);
            const os = system.toLowerCase();
            os == "ios" ? this.createVideo() : this.createCavas();
        }
        ;
        createParent() {
            this.parent = document.createElement("div");
            document.body.appendChild(this.parent);
            this.setStyle(this.parent);
        }
        /**
         * @author lka
         * @version 1.0.0 2018.1.16
         * @description ios创建视频标签
         */
        createVideo() {
            let video = document.createElement("video");
            this.parent.appendChild(video);
            this.setStyle(video);
            video.
            ;
        }
        createCavas() {
        }
        setStyle(obj) {
            obj.style.top = this.size.top;
            obj.style.left = this.size.left;
            obj.style.width = this.size.width;
            obj.style.height = this.size.height;
            obj.style.position = "absolute";
        }
    }
    lka.video = video;
})(lka || (lka = {}));
//# sourceMappingURL=video.js.map