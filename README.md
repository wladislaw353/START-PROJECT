# START-PROJECT
Готовый фундамент для любого проекта

# <h2>index.html</h2>
Прописана базовая структура, а также подключения файлов проекта, библиотек и плагинов.
<br> - theme-color для указания цвета шапки браузера в Chrome
<br> - подключен шрифт Montserrat
<br> - подключен Swiper c jsdelivr CDN
<br> - подключен FancyBox c jsdelivr CDN
<br> - подключена jQuery c Google CDN
<br> - февикон <code>img/favicon.png</code>
<br> - прелоадер - <code>.preloader</code>
<br> - ниже пример кнопки для открытия модалки
<br> - меню с микроразметкой
<br> - 2 модалки (с формой и "спасибо за заявку")
<br>
<br>Класс <code>.holder</code> используется в качестве контейнера. Изменить ширину можно в <code>style.scss</code>, по умолчанию 1200px и по 15px горизонтальных падингов.
<br>Классы <code>.align-left</code> <code>.align-canter</code> <code>.align-right</code> <code>.hidden</code> используется для горизонтального выравнивания и скрытия элементов. Изменить свойства можно в <code>style.scss</code>. Для использования оберните элемент классом.
<br>Классы для построения grid-сеток <code>.span-col-2</code> <code>.span-row-2</code> (2-4)

# <h2>CSS</h2>
Все файлы стилей находятся в папке css. Используется препроцессор Sass с синтаксисом scss.
<br>Все scss файлы компилируются в <code>style.min.css</code>. Для компиляции используется плагин для VS Code - Live Sass Compiler в связке с Live Server для автоматического обновления изменений в браузере. В папке <code>.vscode</code> в файле <code>settings.json</code> содержатся настройки для компиляции.
<br>Структура файлов:
<br> - <code>style</code> - основной файл
<br> - <code>forms-modals</code> - модалки, формы, кнопки
<br> - <code>keyframes</code> - кейфреймы
<br> - <code>text-sections</code> - стили для секций с текстом для статьи и страницы 404
<br> - <code>functions</code> - функции, в т.ч. конвертер px в em
<br> - <code>media-queries</code> - миксины для media-запросов
<br> - <code>default</code> - reset и базовые стили
<br> - <code>default</code> - reset и базовые стили
<br>
<br>Стили для статьи прописаны, предусматривают практически все возможные теги и компиляции визуальных редакторов.
<br>Чтоб использовать, укажите section класс <code>.seo-text</code>. Для применения отступов абзаца добавьте к section класс <code>.indent</code>
<br>Добавлен механизм "Читать далее" для <code>.seo-text</code>:
<br>Свернутый текст необходимо обернуть блоком `.readmore-content`. Под ним разместить кнопку:
<pre><code>&lt;div class="readmore"&gt;
    &lt;button data-text="Свернуть"&gt;
        &lt;span&gt;Читать далее&lt;/span&gt;
    &lt;/button&gt;
&lt;/div&gt;
</code></pre>
<br>В <code>data-text</code> находится текст кнопки для обратного сворачивания текста. Текст кнопки обязательно должен быть обернут в <code><span></code>, это сделано для возможности размещения рядом с текстом стрелочки.
<br>При разворачивании текста, блоку <code>.readmore-content</code> добавляется класс <code>.active</code>
<br>
<br>Добавьте <code>data-hover-text</code> к ссылке с текстом ссылки, чтоб при ховере, менялась жирность.
<br>
<br>Для указания высоты экрана, крайне не рекомендуется использовать <code>100vh</code>, т.к. оно не учитывает высоту навигации и строки поиска браузера.
<br>Используйте <code>var(--vh, 100vh)</code> вместо <code>100vh</code>.
<br>
# <h4>Единица em</h4>
<br>В сборку заложен удобный движок для работы с em вместо px для шрифта и отступов.
<br>Используйте <code>em(15)</code>, вместо <code>15px</code>. Принимая во внимание принцип работы em, отступ отталкивается от шрифта, используйте второй параметр для указания размера шфрита, который был задан текущему элементу: <code>em(15, 20)</code> - 15px отступа для элемента с размером шрифта 20px.
<br>По умолчанию размер шрифта 16, изменить можно в <code>main.js</code> (см. <code>CONFIG</code>), а также в <code>_functions.scss</code> (см. <code>$base-font-size</code>). Менять параметры не рекомендуется.
<br>
<br>Написание media запросов через миксин: @include _767 { } и @include _767min { }. Добавить брейкпоинты можно в файле _media-queries.scss
<br>
<br>Добавлены кейфреймы arrow и rotate, а также кейфреймы fade-* и zoom-* из animate.css. Изменить можно в файле _keyframes.scss

# <h2>Обработка форм</h2>
Каждая форма должна иметь идентификатор <code>#formx-1</code>, где 1 - уникальный на страницу номер формы. Остальные атрибуты для тега form не требуются.
<br>Формы отправляются с помощью ajax методом POST. Отправщик находится в корне в файле <code>send.php</code>
<br>Событие Lead срабатывает автоматически, при успешной отправке формы, если на странице в head добавлен код FB Pixel
<br>Скрипт находится в <code>main.js</code> (см. <code>FORMS</code>)
<br>
<br>По умолчанию предусмотрены поля: имя, телефон, емеил, комментарий, а также служебное поле, содержащее цель заявки из атрибута кнопки <code>data-modalq-target</code>
<br>При создании новой формы достаточно указать ей новый идентификатор, например <code>#form-2</code>, дополнительных действий не требуется, форма уже будет работать.
<br>
<br>Перед отправкой, форме добавляется класс валидации <code>.check-validation</code>, который подтягивает стили для invalid элементов формы.
<br>Скрипт находится в <code>main.js</code> (см. <code>FORMS</code>)
<br>Стили можно изменить в <code>_forms-modals.scss</code> (см. <code>form.check-validation</code>)

# <h4>Файл send.php</h4>
Все настройки отправщика выведены в конфиг в начало файла. Для добавления полей используйте массив <code>$lang_input_names</code>. В код лезть нет необходимости!
<br>
<br>Если вам нужно добавить поля, которые не были предусмотрены в сборке, добавьте name полей и описание поля в массив <code>$lang_input_names</code>
<br>Заголовок письма указывается в <code>$title_text</code>
<br>Почта для служебных сообщений об ошибках, в случае неудачной отправки, указывается в <code>$admin_for_errors</code>
<br>
<br>Для отправки сообщений на почту установите значение <code>$to_email</code> true и укажите емеил получается в <code>$send_to_mail</code>
<br>
<br>Для отправки сообщений в telegram, установите значение <code>$to_telegram true</code> и заполните поля ниже
<br>
<br>Для отправки сообщений в bitrix24, установите значение <code>$to_bitrix</code> true и заполните поля ниже
<br>Обращаю внимание, что в зависимости от тарифа (платный/бесплатный) заполняется соответствующий набор полей, т.к. в бесплатной версии crm заблокирован доступ к webhook и используется альтернативный способ. Недостаток использования альтернативного способа: utm метки приходят в поле комментария, а не в специальное поел в crm.

# <h2>Модалки</h2>
Каждая модалка содержит идентификатор <code>modalq-1</code>, где 1 - уникальный на страницу номер модалки.
<br> <code>[data-modalq-opener]</code> с номером модалки для открытия
<br> <code>[data-modalq-close]</code> для закрытия модалки
<br>Закрытие по клику на темную область реализовано.
<br>Модалки связаны с отправкой формы - после отправки открывается модалка благодарности с номером 0
<br>При открытии модалки добавляется хеш #modal для поддержки функции "назад" в андроиде и навигации браузера
<br>Используйте <code>data-modalq-target=""</code> в кнопке для передачи информации о цели в служебное поле target в форме модалки
<br>Используйте <code>data-modalq-info=""</code> в кнопке для передачи html в модалку в блок <code>.modalq-info</code>
<br>Скрипт находится в <code>main.js</code> (см. <code>MODAL</code>)
<br>Стили в <code>_forms-modals.scss</code>

# <h2>main.js</h2>
Основной js файл проекта.
В первых строках содержит плагины wow, input mask а также движок для работы с em
<br>В файле реализовано много базовых функций:
<br>- реализация прелоадера
<br>- инициализация wow, input mask, swiper (см. <code>SLIDER</code>)
<br>- удаление атрибутов <code>href="#"</code> из ссылок, содержащих #
<br>- а также:

# <h4>Маска для телефона</h4>
Добавьте полю для телефона класс <code>.phone-mask</code> для инициализации маски.
<br>Маска подставляется в зависимости от IP (см. <code>PHONE MASK</code> и <code>CHECK LOCATION</code>)
<br>Под каждую страну можно добавить свою маску. По умолчанию добавлены маски для Украины и РФ, для остальных страх маска отключается. Получение IP для 127.0.0.1 отключено.

# <h4>Определение iOS</h4>
Для определения данной системы, используйте функцию <code>is_iOS()</code>.
<br>Возвращает true/false

# <h4>Определение главной страницы</h4>
Для определения главной страницы, используйте функцию <code>is_home()</code>.
<br>Возвращает true/false
<br>Принцип работы: Проверяются классы у body, идентифицирующие главную страницу в WordPress и Opencart, также проверяется url на '/', '/ua/', '/en/', '/ru/'

# <h4>Получение UTM меток</h4>
Объект utm содержит все utm метки.
<br>Передача меток в файл отправщика <code>send.php</code> уже реализована.

# <h4>Получение GET параметров</h4>
Объект <code>get_params</code> содержит все GET параметры.

# <h4>Фиксация шапки при скролле</h4>
Для фиксированной шапки используется класс <code>.fixed-header</code>
<br>Добавьте стили в <code>style.scss</code>
<br>Скрипт находится в <code>main.js</code> (см. <code>FIXED HEADER</code>)

# <h4>Плавный скролл к секции</h4>
Добавьте ссылке класс <code>.anchor</code> и укажите атрибут name или href
<br>Добавьте стили в <code>style.scss</code>
<br>Скрипт находится в <code>main.js</code> (см. <code>SCROLL TO SECTION</code>)

# <h4>Кнопка "наверх"</h4>
Добавьте кнопке идентификатор <code>#totop</code>
Кнопка добавлена в html, стили находятся в <code>_default.scss</code>
<br>Скрипт находится в <code>main.js</code> (см. <code>GO TO TOP</code>)

# <h4>Обработка кнопок поделиться в twitter, facebook и pinterest</h4>
Добавьте кнопкам атрибуты <code>data-shareq</code> и <code>data-type</code>:
<br><code>data-shareq="www.facebook.com/sharer.php?u=" data-type="displayWindow"</code>
<br><code>data-shareq="twitter.com/share?text=" data-type="displayWindow"</code>
<br><code>data-shareq="telegram.me/share/url?url=" data-type="_blank"</code>
<br><code>data-shareq="api.whatsapp.com/send?text=" data-type="_blank"</code>
<br>Скрипт находится в <code>main.js</code> (см. <code>SHARE BUTTON</code>)

# <h2>Анимация числового счетчика</h2>
Раскомментируйте подключение файла <code>spincrement.js</code>
<br>Элементу с числом необходимо добавить 2 класса в html: <code>wow</code> <code>count</code>
<br>Инициализация происходит автоматически для всех элементов, привязана к wow.js и находится в <code>main.js</code> (см. <code>COUNTS ANIMATION</code>)

# <h2>Accordion component</h2>
В <code>index.html</code> находится компонент <code>.accordion</code>
В <code>style.scss</code> найдите стили для <code>.accordion</code>
<br>В <code>main.js</code> найдите инизиализацию (см. <code>ACCORDION</code>)
<br>Добавьте класс <code>multiple</code> для <code>.accordion</code> для множественного раскрытия пунктов

# <h2>Tabs component</h2>
В <code>index.html</code> находится компонент <code>.tab-container</code>
В <code>style.scss</code> найдите стили для <code>.tab-container</code>
<br>В <code>main.js</code> найдите инизиализацию (см. <code>TABS</code>)

# <h2>Бургер для мобильного меню</h2>
Используйте блок с классом .burger в HTML
<br>В <code>style.scss</code> ищите <code>.burger</code>, чтоб изменить стили:
<br> <code>$bar-width</code>   // ширина линии
<br> <code>$bar-height</code>  // высота линии
<br> <code>$bar-spacing</code> // расстояние между линиями
<br> <code>$bar-color</code>   // цвет линий
<br> <code>$breakpoint</code>  // ширина экрана, меньше которой бургер будет виден
<br>Скрипт находится в <code>main.js</code> (см. <code>BURGER</code>)
