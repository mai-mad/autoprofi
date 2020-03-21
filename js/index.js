// Массив марок машин
// F - Ferarri      L - Lamb        R - Rolls
// M - Maserati     T - Tesla       B - BWM
// D - Dodge        K - Kia         V - Volvo
//             0    1    2    3   4          5   6   7   8
let brands = ["F", "L", "R", "M","T"];  // ,"B","D","K","V"

// Двухмерный массив моделей авто
const M = 6;
let models = [
    ["250gto", "ff", "enzo", "california", "portofino", "gtc4lusso"],
    ["gallardo", "huracan", "urus", "veneno", "countach", "diablo"],
    ["cullinan", "seraph", "phantom", "spirit", "Wraith", "dawn"],
    ["alfieri", "ghibli", "levante", "mc12", "quattroporte", "granturismo"],
    ["model-s","model-3","model-x","model-y","cybertruck","roadster"]
];

// Правильный ответ
let rightAnswer;

let rScore = 0, wScore = 0;

// Функция которая обновляет (генерирует) новую картинку
function newOne() {

    // убираем выделение рамки
    $('button').css('background', 'white');

    // сбрасываем цвет кнопок на белый
    $(".buttons button").css("background", "white");

    // генерируем индекс бренда авто (случайно)
    let brandRandom = Math.floor(Math.random() * brands.length);

    // генерируем индекс модели авто (случайно)
    let modelRandom = Math.floor(Math.random() * M);

    // формируем название картинки из частей
    let imgName = brands[brandRandom] + "-" + models[brandRandom][modelRandom] + ".jpg";

    // Обращаемся к элементу с id=img и вставляем в него картинку
    $("#img").html("<img id=\"picture\" style='display: none' src='img/cars/" + imgName + "'>");

    $("#img img").fadeIn(500);
    // Формируем варианты ответов (тексты на кнопках)
    let answers = [];

    // добавляем сначала правильный ответ
    answers.push(models[brandRandom][modelRandom]);
    rightAnswer = models[brandRandom][modelRandom];

    // добавляем еще 4 варианта ответов
    for (let i = 0; i < 4; i++) {

        // если сгенерированная модель уже есть среди варианов отвеов,
        // необходимо перегенерировать

        let flag; // совпадений картинок не найдено
        let r;
        do {
            // изначально предполагаем, что совпадений нет
            flag = false;
            // генерируем случайное число до М
            r = Math.floor(Math.random() * M);

            // ищем совпадения
            for (let k = 0; k < answers.length; k++) {
                if (answers[k] === models[brandRandom][r]) {
                    flag = true;
                }
            }
        } while (flag === true);
        answers.push(models[brandRandom][r]);
    }

    // перемешиваем массив из вариантов ответов
    for (let i = 0; i < 10; i++) {
        // генерируем случайные индексы для перестановки
        let i1 = Math.floor(Math.random() * 5);
        let i2 = Math.floor(Math.random() * 5);

        // перестановка местами i1 и i2 элементов с помощью вспомогательной треьей переменной tmp
        let tmp = answers[i1];
        answers[i1] = answers[i2];
        answers[i2] = tmp;
    }

    // Вставляем тексты в кнопки
    $("#btn1").text(answers[0]);
    $("#btn2").text(answers[1]);
    $("#btn3").text(answers[2]);
    $("#btn4").text(answers[3]);
    $("#btn5").text(answers[4]);


}

// Вызов функции
newOne();

// Добавление обработчиков кликов по кнопкам
$(function () {
    $(".buttons button").click(function () {
        // Обращаемся к кликнуой кнопке
        let buttonText = $(this).text();

        // Проверка ответа
        // Меняем цвет кнопке в зависимости от правильности
        if (rightAnswer === buttonText) {
            $(this).css("background", "green");
            rScore++;
            // обновляем счет на экране
            $(".score .green").text("Correct: " + rScore);
        } else {
            $(this).css("background", "red");
            wScore++;
            $(".score .red").text("Incorrect: " + wScore);

            // подсветим правильный ответ
            $('button:contains('+rightAnswer+')').css('background', 'green');

        }

        // Плавно скрывает картинку
        $("#img img").fadeOut(500);

        // Запускаем таймер переключения картинки
        setTimeout(newOne,500);  // 1000ms = 1 sec

    });
});