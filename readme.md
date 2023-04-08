# создание React-App typescript

**npx create-react-app my-app --template typescript**

_(вместо my-app - можно указать своё название проекта, либо просто поставить точку . чтобы создать проект в текущей папке (проект при этом должен иметь в имени только маленькие буквы без пробелов и спец.символов))_

# Настройка eslint

Нужно создать файл с именем **.env** в директории проекта и добавить в него следующую строку:

**ESLINT_NO_DEV_ERRORS=true**

А также добавить следующий код в package.json (например в самый конец):

```json lines
"envFile": "./.env",
```

## Изменение файла package.json

Необходимо вставить этот код от "scripts" до "browserslist":

```json lines
"scripts": {
    "start": "ESLINT_NO_DEV_ERRORS=true react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "typecheck": "tsc",
    "lint": "eslint ."
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "airbnb",
      "airbnb-typescript"
    ],
    "rules": {
      "react/jsx-indent": 0,
      "implicit-arrow-linebreak": 0,
      "@typescript-eslint/indent": 0,
      "@typescript-eslint/comma-dangle": 0,
      "function-paren-newline": 0,
      "no-param-reassign": 0,
      "no-nested-ternary": 0,
      "no-confusing-arrow": 0,
      "operator-linebreak": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "react/jsx-one-expression-per-line": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "default-case": 0,
      "@typescript-eslint/default-param-last": 0,
      "@typescript-eslint/switch-exhaustiveness-check": 2,
      "@typescript-eslint/explicit-function-return-type": [
        2,
        {
          "allowExpressions": true,
          "allowTypedFunctionExpressions": true,
          "allowHigherOrderFunctions": true,
          "allowDirectConstAssertionInArrowFunctions": true
        }
      ]
    },
    "parserOptions": {
      "project": [
        "tsconfig.json"
      ]
    }
  },
```

### Решение ошибки с airbnb/airbnb-typescript

После этого скорее всего будут 2 ошибки при запуске проекта.
Для их решения нужно ввести 2 команды по очереди:

- **npm install --save-dev eslint-config-airbnb**
- **npm install --save-dev eslint-config-airbnb-typescript**

После выполнения убедиться, что в самом конце файла package.json появилось 2 новые development dependencies:

```json lines
"devDependencies": {
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-airbnb-typescript": "^17.0.0"
  }
```

#### Решение проблемы с line-breaks LF/CRLF (для Windows)

Если в ваших файлах на каждом переносе строки eslint показывает ошибку:

> Expected linebreaks to be 'CRLF' but found 'LF'.

то необходимо добавить в package.json правило для eslint

```json lines
"rules": {
      "linebreak-style": [
        "error",
        "windows"
      ],
    },
```

```json lines
_(Имейте ввиду что в файлах App.tsx, index.tsx и прочих, которые были созданы вместе с приложением, всё равно останется эта ошибка.)_
```

Для исправления этой ошибки в этих файлах, введите следующие команды:

> Выполнять команды необходимо находясь в папке, где расположен искомый файл, либо указать путь к файлу.

1. **(Get-Content index.tsx) -replace "`r", "" | Set-Content index.tsx**

Второй вариант - с прописанным путем к файлу:

2. **(Get-Content src/App/App.tsx) -replace "`r", "" | Set-Content src/App/App.tsx**

> По аналогии можно указать любой другой файл.

## Установка React-Router-DOM

**npm i react-router-dom**

Если в файлах проекта при импорте from 'react-router-dom' возникает ошибка, то её можно исправить добавлением правила в package.json:

```json lines
"rules": { "import/no-extraneous-dependencies": "off" } (убирает ошибки импорта)
```

# Выгрузка проекта на github pages

Чтобы избежать проблем с путями к файлам проекта, нужно добавить в файл package.json следующий код (например в самом начале):

```json lines
"homepage": "./",
```

Один из самых простых способов деплоя проекта на GitHub Pages - это использование специального **npm** пакета. Для его установки надо выполнить команду:

**npm install gh-pages -D**

Обратите внимание, что после выполнения в файле package.json будет добавлена новая development dependencies:

```json lines
"devDependencies": {
    "gh-pages": "^5.0.0"
  }
```

А также изменена команда "build" в "scripts" на следующую строку:

> Имейте ввиду что эта строка для Windows. На системах Mac/Linux она будет отличаться

```json lines
"build": "react-scripts build && type nul > build\\.gitkeep",
```

Затем в "scripts" файла package.json нужно добавить следующие скрипты:

```json lines
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

Если репозиторий уже создан, сохраняем изменения и комтитим их. Если нет, то выпоняем следующие шаги:

Создаем новый репозиторий для вашего проекта локально а также на сайте GitHub (если еще не был создан)

> Все команды необходимо выполнять из корневой папки вашего проекта!!

- **git init**
- **git add .**
- **git commit -m 'first commit'**

Затем делаем привязку проекта к онлайн репозиторию.

- **git remote add origin URL-РЕПОЗИТОРИЯ-ВАШЕГО-ПРОЕКТА-НА-GITHUB**
- (например: git@github.com:your-name/your-project.git)
- **git push -u origin master**

Теперь можно разворачивать React приложение одной командой:

**npm run deploy**

Эта команда сама сделает билд (build) вашего React приложения и, если нет никаких ошибок, то создаст (или обновит) дополнительную ветвь gh-pages и закомитит туда последнюю версию сборки вашего приложения. Если это первый деплой для вашего проекта, то будет создана новая папка build. Именно она будет выгружена на ветку gh-pages

Также будет автоматически создана страница с вашим проектом на GitHub Pages по адресу:
https://user-name.github.io/repository-name/
