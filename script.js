// Определяем функцию randMax, которая генерирует случайное число в заданном диапазоне.
function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}
// Создаем объект reel, представляющий барабан игрового автомата, 
//с определенными символами, функцией вращения и функцией отображения текущего символа.
var reel = {
    symbols: [
        "X", "Y", "Z", "W", "$", "*", "<", "@"
    ],
    // Определяем функцию spin, которая вращает барабан, генерируя случайную позицию для него.
    spin() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        this.position = (
            this.position + 100 + randMax(100)
        ) % this.symbols.length;
    },
    // Определяем функцию display, которая возвращает текущий символ на позиции барабана.
    display() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        return this.symbols[this.position];
    }
};
// Создаем объект slotMachine, представляющий игровой автомат, 
//с массивом барабанов, функцией вращения всех барабанов и функцией 
//отображения символов на барабанах в определенном формате.
var slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel)
    ],
    // Определяем функцию spin, которая вращает каждый барабан в игровом автомате.
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    // Определяем функцию display, которая формирует строки с символами на разных позициях барабанов и объединяет их в одну строку.
    display() {
        var lines = [];
        for (
            let linePos = -1; linePos <= 1; linePos++
        ) {
            let line = this.reels.map(
                function getSlot(reel) {
                    var slot = Object.create(reel);
                    slot.position = (
                        reel.symbols.length +
                        reel.position +
                        linePos
                    ) % reel.symbols.length;
                    return reel.display.call(slot);
                }
            );
            lines.push(line.join(" | "));
        }
        return lines.join("\n");
    }
};


console.log(slotMachine.spin());
console.log(slotMachine.display());
// < | @ | *
// @ | X | <
// X | Y | @
console.log(slotMachine.spin());
console.log(slotMachine.display());
    // Z | X | W
    // W | Y | $
    // $ | Z | *