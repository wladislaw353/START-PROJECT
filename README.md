# START-PROJECT
💻 Готовый фундамент для любого проекта

# <h2></h2>

# <h2>Обработка форм</h2>
Каждая форма должна иметь идентификатор #formx-1, где 1 - уникальный на страницу номер формы. Остальные атрибуты для тега form не требуются.
Формы отправляются с помощью ajax методом POST. Отправщик находится в корне в файле send.php
Событие Lead срабатывает автоматически, при успешной отправке формы, если на странице в head добавлен код Facebook Pixel
Скрипт находится в main.js (см. FORMS)

По умолчанию предусмотрены поля: имя, телефон, емеил, комментарий, а также служебное поле, содержащее цель заявки из атрибута кнопки data-modalq-target
При создании новой формы достаточно указать ей новый идентификатор, например #form-2, дополнительных действий не требуется, форма уже будет работать.

# <h4>Файл send.php</h4>
Все настройки отправщика выведены в конфиг в начало файла. Для добавления полей используйте массив $lang_input_names. В код лезть нет необходимости!

Если вам нужно добавить поля, которые не были предусмотрены в сборке, добавьте name полей и описание поля в массив $lang_input_names
Заголовок письма указывается в $title_text
Почта для служебных сообщений об ошибках, в случае неудачной отправки, указывается в $admin_for_errors

Для отправки сообщений на почту установите значение $to_email true и укажите емеил получается в $send_to_mail

Для отправки сообщений в telegram, установите значение $to_telegram true и заполните поля ниже

Для отправки сообщений в bitrix24, установите значение $to_bitrix true и заполните поля ниже
Обращаю внимание, что в зависимости от тарифа (платный/бесплатный) заполняется соответствующий набор полей, т.к. в бесплатной версии crm заблокирован доступ к webhook и используется альтернативный способ. Недостаток использования альтернативного способа: utm метки приходят в поле комментария, а не в специальное поел в crm.

# <h2>Модалки</h2>
Каждая модалка содержит идентификатор modalq-1, где 1 - уникальный на страницу номер модалки.
Скрипт находится в main.js (см. MODAL)
Стили в _forms-modals.scss

# <h2>main.js</h2>
Основной js файл проекта. В первых строках содержит плагины wow, input mask а также движок для работы с em
В файле реализовано много базовых функций:
- реализация прелоадера
- инициализация wow, input mask, swiper (см. SLIDER)
- удаление атрибутов href="#" из ссылок, содержащих #
- а также:

# <h4>Маска для телефона</h4>
Добавьте полю для телефона класс .phone-mask для инициализации маски.
Маску можно изменить в переменной phoneMask (см. PHONE MASK)

# <h4>Проверка iOS</h4>
Для определения данной системы, используйте функцию is_iOS().

# <h4>Получение UTM меток</h4>
Объект utm содержит все utm метки.
Передача меток в файл отправщика send.php уже реализована.

# <h4>Получение GET параметров</h4>
Объект get_params содержит все GET параметры.

# <h4>Фиксация шапки при скролле</h4>
Для фиксированной шапки используется класс .fixed-header
Добавьте стили в style.scss
Скрипт находится в main.js (см. FIXED HEADER)

# <h4>Плавный скролл к секции</h4>
Добавьте ссылке класс .anchor
Добавьте стили в style.scss
Скрипт находится в main.js (см. SCROLL TO SECTION)

# <h4>Кнопка "наверх"</h4>
Добавьте кнопке идентификатор #totop
Скрипт находится в main.js (см. GO TO TOP)

# <h2>Анимация числового счетчика</h2>
Раскомментируйте подключение файла spincrement.js
В main.js найдите инизиализацию (см. COUNTS ANIMATION)
Инициализируйте числа, пример: countup('count1', $('.count1').text()), где .count1 - класс тега с числом

# <h2>Бургер для мобильного меню</h2>
Используйте <div class="burger"></div> в HTML
В style.scss ищите .burger, чтоб изменить стили:
$bar-width   // ширина линии
$bar-height  // высота линии
$bar-spacing // расстояние между линиями
$bar-color   // цвет линий
$breakpoint  // ширина экрана, меньше которой бургер будет виден
Скрипт находится в main.js (см. BURGER)
