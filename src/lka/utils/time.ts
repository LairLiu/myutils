module lka {
    export class Time {
        // 判断游戏是否可玩
        // 活动时间与当前时间比对
        public static canPalyGmae(year, month, day, hour: number = 0, minutes: number = 0, second: number = 0) {
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
}