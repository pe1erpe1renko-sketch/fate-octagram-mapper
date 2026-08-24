# Destiny Matrix Explorer

Создай React-приложение — интерактивную визуализацию «Матрицы судьбы».
ВАЖНО: файл matrixEngine.js приложен. Положи его в src/lib/matrixEngine.js и используй как единственный источник расчётов. Не переписывай его, не создавай свою математику, не «оптимизируй» функцию toArcana. Все числа берутся только из calculateMatrix().
Это функциональный прототип для передачи другой команде. Дизайн делать не нужно: нейтральные цвета, системный шрифт, тонкие серые линии. Приоритет — читаемый код и понятная структура компонентов.
ГЕОМЕТРИЯ ОКТАГРАММЫ
Рисуй в SVG, viewBox="0 0 560 560", центр (280, 280), радиус R=200.
Восемь внешних точек по углам, координата = центр + R по углу (в SVG ось Y инвертирована: y = 280 − R·sin(угол)):
W 180°, NW 135°, N 90°, NE 45°, E 0°, SE 315°, S 270°, SW 225°.
Числа берутся из matrix.core: W, NW, N, NE, E, SE, S, SW.
Линии: восьмиугольник по всем внешним точкам; квадрат W–N–E–S; квадрат NW–NE–SE–SW; оси W–E и N–S; диагонали NW–SE и NE–SW.
ТОЧКИ НА ОСЯХ
Горизонтальная ось из matrix.axes.horizontal, размещай по доле пути от W к E:
startOuter 0.25, startMid 0.5, startInner 0.75, center 1.0 (это центр октаграммы), endMid 1.225, endOuter 1.375, end 1.5.
Вертикальная ось из matrix.axes.vertical по тем же долям от N к S.
ТОЧКИ НА ДИАГОНАЛЯХ
Для каждой из NW, NE, SE, SW из matrix.diagonals: outer на доле 0.3 от угла к центру, mid на доле 0.6.
РАЗМЕРЫ КРУЖКОВ
Внешние точки — радиус 26, шрифт 20. Центр — радиус 30, шрифт 24. Точки осей и диагоналей — радиус 14, шрифт 12. Числа внутри кружков, по центру.
ВОЗРАСТНАЯ ШКАЛА
Отдельный слой на радиусе 240 из matrix.timeline: 32 точки. Кратные 10 годам — крупнее, с подписью возраста. Промежуточные — мелкие засечки.
СЛОИ
Четыре чекбокса над матрицей, все включены по умолчанию кроме первого:
возрастная шкала (выключена), родовые линии, зона денег, зона отношений.
Родовые линии: диагональ NW–SE подписать «линия мужского рода», NE–SW — «линия женского рода», подписи вдоль линий мелким шрифтом.
Зона денег: значок $ рядом с диагональю SE.
Зона отношений: значок ♥ рядом с диагональю SW.
ВЗАИМОДЕЙСТВИЕ
Клик по любой точке открывает панель под матрицей: название позиции, номер аркана, заглушка текста. Названия внешних точек бери из POINT_CODES в matrixEngine.js. Активная точка подсвечивается обводкой. Наведение курсором слегка увеличивает точку.
МОБИЛЬНАЯ ВЕРСИЯ
Это критично. При ширине меньше 768px матрица не должна сжиматься до нечитаемости.
Оберни SVG в контейнер с зумом и перетаскиванием: щипок двумя пальцами и перетаскивание одним. Кнопки «+», «−» и «сброс» под матрицей. Стартовый масштаб подобран так, чтобы вся октаграмма помещалась. Возрастная шкала на мобильном по умолчанию скрыта.
СТРАНИЦА
Сверху поле ввода даты рождения (три селектора: день, месяц, год от 1930 до текущего) и кнопка «Построить матрицу». По умолчанию 13.07.1998. Под матрицей — панель выбранной точки.
СТРУКТУРА ФАЙЛОВ
src/lib/matrixEngine.js — приложенный файл, не менять
src/components/Octagram.tsx — SVG-визуализация
src/components/OctagramLayers.tsx — переключатели слоёв
src/components/ZoomPan.tsx — зум и перетаскивание
src/components/PointPanel.tsx — панель точки
src/components/DateInput.tsx — ввод даты
src/pages/Index.tsx — сборка

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fate-octagram-mapper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/50fdfe4c-416c-4aab-b1d9-d7db6f71b093).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
