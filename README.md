# Beer App

<br/>

### UPD 

сервер punkapi.com перестал работать 1 мая 2024 года, поэтому запросы работать не будут

<br/>

## Приложение представляет собой коллекцию с различными сортами пива в виде SPA.

При первоначальной загрузке делает запрос на api (punkapi.com), которое возвращает все виды пива.
Это приложение создано с целью демонстрации умения работы с React / Redux / typescript. Применена архитектура FLUX. Для хранения глобального стейта использован Redux. 
<br/>
Все приложение написано с Typescript.
<br/>
Реализован фильтр по разным критериям (IBU, ABV, год выпуска, подходящие блюда ) с использованием Formik и хуков react-hook-form, который в зависимости от критерия делает соответствующий запрос. Фильтр по имени возвращает все сорта пива, соответствующие частичным строкам, поэтому, например, IPA вернет Juniper Wheat Beer – такие особенности сервера. Имеется синхронизация адресной строки и запроса на сервер, есть пагинатор, слайдеры, реализовано добавление в избранное на хуках. Запросы выполняются с помощью axios, используется React Router.

<br/>

### Стек технологий:

<br/>
React
<br/>
Redux 
<br/>
React-Redux 
<br/>
TypeScript
<br/>
React-Router-Dom
<br/>
Axios
<br/>
REST API
<br/>
Formik
<br/>
React Hook Form
<br/>
Antd
<br/>
