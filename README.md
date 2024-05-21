# my-library

Многостраничное приложение «Библиотека»

Для генерации HTML применяется шаблонизатор [ejs](https://www.npmjs.com/package/ejs).\
Для сохранения данных сессии пользователя используется [express-session](https://www.npmjs.com/package/express-session), для авторизации [passport.js](https://www.npmjs.com/package/passport)

В качестве базы данных используется mongoDB, для работы с ней [mongoose](https://mongoosejs.com/).\
На странице просмотра книги присутствует функционал для её обсуждения в комментариях с использованием [Socket.IO](https://socket.io/).

В `dev` режиме устанавливается зависимость [nodemon](https://www.npmjs.com/package/nodemon).

## Routers

- Cтраница с формой входа / регистрации:\
   `GET /api/user/login`

- Cтраница профиля:\
   `GET /api/user/me`

- Просмотр списка всех книг (вывод заголовков):\
   `GET /books`

- Информация по конкретной книге c комментариями:\
   `GET /books/[id]`

- создание книги:\
  `GET /books/create`

- Редактирование книги:\
   `GET /books/[id]/update`

## Установка

- `npm install`
- `npm run start` - запуск приложения стандартный порт - `3000`
- `npm run dev` - запуск приложения с помощью `nodemon`, стандартный порт - `3000`

## Docker container

`cyrillaz/library`

## Ссылка посмотреть

http://lib.klazar.ru/
