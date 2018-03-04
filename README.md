![Logo](assets/apoj.gif)  
[![Build Status](https://travis-ci.org/frontend-park-mail-ru/2017_2_ToP.svg?branch=develop)](https://travis-ci.org/frontend-park-mail-ru/2017_2_ToP)

Apoj - игра для ценителей приятной музыки и хороших шуток. Написана на TypeScript.

[**Сыграть в игру!**](apoj.me) / [**Backend репозиторий**](https://github.com/ToP-developers/Apoj-backend) / [**Frontend на heroku**](https://gametes.herokuapp.com)

## Содержание
* [Описание игры](#description)
* [Режимы игры](#modes)
* [Установка и запуск](#install)
* [Тесты и запуск линтера](#tests)
* [Технологии](#devstack)
  * [Frontend](#devstackfront)
    + [Сервер](#devstackfrontserver)
    + [Клиент](#devstackfrontclient)
    + [Дополнительно](#devstackfronttools)
  * [Backend](#devstackback)
* [Команда](#team)
  * [Frontend](#frontend)
  * [Backend](#backend)
* [Bug report](#bugreport)

<a name="description"></a>
## Описание игры
1. Первый игрок поет песню. Запись его аудио переворачивается, передается второму игроку. 

2. Второй игрок слушает присланное аудио. Его задача - спеть прослушанное аудио как есть. Это записывается, отсылается на сервер, где переворачивается. 
 
3. Сервер отдает перевернутое аудио, второй игрок прослушивает, ему необходимо отгадать изначальную мелодию. 

<a name="modes"></a>
## Режимы игры
#### Singleplayer
Режим тренировки. Для него реализован функционал игры на стороне клиента.  

Задача: спеть перевернутый фрагмент и угадать изначальную песню. 


#### Multiplayer
Оригинальная игра из описания. Всего в игровой сессии два игрока. Взаимодействие по сокету. 

Задача: качественно спеть песню или спеть перевернутый фрагмент и угадать изначальную песню. 


<a name="install"></a>
## Установка и запуск

Сперва скачать репозиторий, затем в папке проекта:

```
npm install
npm start
```
<a name="tests"></a>
## Тесты и запуск линтера

```sh
npm test
npm run eslint
```

<a name="devstack"></a>
## Технологии
<a name="devstackfrontserver"></a>
### Особенности проекта

- работа игры в офлайн режиме
- Web Audio Api
- работа с Media Recording API: запись аудио файлов в wav формат, переворачивание, обработка wav файлов
- автодеплой с помощью travis на сервер
- https, http2 

<a name="devstackfront"></a>
### Frontend

<a name="devstackfrontserver"></a>
#### Сервер

- Node JS, Express
- Nginx

<a name="devstackfrontclient"></a>
#### Клиент
- TypeScript, ES6
- Service Worker
- Web Audio API
- Web Video API
- Media Recording API

<a name="devstackfronttools"></a>
#### Дополнительно

- Webpack
- Babel
- Sass
- Travis
- Jasmine

<a name="devstackback"></a>
### Backend

- Java, Spring, PostgreSQL

<a name="team"></a>
## Команда
<a name="frontend"></a>
### Frontend
  * [Пряхин Владимиир](http://github.com/pryahin)
  * [Свойкина Надежда](http://github.com/couatl)
  
<a name="backend"></a>
### Backend
  * [Москалев Илья](http://github.com/ilyamoskalev)


<a name="bugreport"></a>
## Bug report
Нашли баг? Сообщите нам об этом здесь - [ссылка](https://github.com/frontend-park-mail-ru/2017_2_ToP/issues)