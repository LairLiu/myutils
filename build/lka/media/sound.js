"use strict";
var lka;
(function (lka) {
    /**
     * 音效类，用于播放没有图标的音乐
     * 在进入时进行初始化
     * 播放时调用play()方法
     *
     * @export
     * @class sound
     */
    class sound {
        constructor(soundName, ...soundName1) {
            this.createSound(...soundName);
        }
        createSound(...soundName) {
            console.log(soundName);
            for (const name of soundName) {
            }
        }
    }
    lka.sound = sound;
})(lka || (lka = {}));
//# sourceMappingURL=sound.js.map