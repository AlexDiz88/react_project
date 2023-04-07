# создание React-App typescript

npx create-react-app my-app --template typescript

<!-- (вместо my-app - можно указать своё название проекта, либо просто поставить точку . чтобы создать проект в текущей папке (проект при этом должен иметь в имени только маленькие буквы без пробелов и спец.символов)) -->

## Настройка eslint

<!-- - Нужно создать файл с именем .env в директории проекта и добавить в него следующую строку: -->

ESLINT_NO_DEV_ERRORS=true

<!-- А также добавить следующий код в package.json (например в самый конец): -->

"envFile": "./.env",

### Изменение файла package.json

<!-- Необходимо вставить этот код от "scripts" до "browserslist": -->

"scripts": {
"start": "react-scripts start",
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

### Решение ошибки с airbnb/airbnb-typescript

<!-- После этого скорее всего будут 2 ошибки при запуске проекта -->
<!-- Для их решения нужно ввести 2 команды по очереди: -->

npm install --save-dev eslint-config-airbnb
npm install --save-dev eslint-config-airbnb-typescript

<!-- После выполнения убедиться, что в самом конце файла package.json появилось 2 новые development dependencies: -->

"devDependencies": {
"eslint-config-airbnb": "^19.0.4",
"eslint-config-airbnb-typescript": "^17.0.0"
}

# Установка React-Router-DOM

npm i react-router-dom

<!-- Если в файлах проекта при импорте from 'react-router-dom' возникает ошибка, то её можно исправить добавлением правила в package.json: -->

"rules": { "import/no-extraneous-dependencies": "off" } (убирает ошибки импорта)

# Выгрузка проекта на github pages

<!-- Чтобы избежать проблем с путями к файлам проекта, нужно добавить в файл package.json следующий код (например в самом начале): -->

"homepage": "./",

<!-- Перед тем как выгрузить проект на GitHub нужно сначала выполнить его билд (из корневой папки проекта) с помощью команды: -->

npm run build

<!-- После этого в папке проекта появится новая папка build. Именно её нужно выгрузить на репо github (разумееется перед этим нужно создать новый репо для вашего проекта на GitHub) -->
<!-- Все команды необходимо выполнить из папки build -->

git init
git add .
git commit -m 'first commit'
git remote add origin URL*РЕПОЗИТОРИЯ*ВАШЕГО*ПРОЕКТА*НА_GitHub (например: git@github.com:AlexDiz88/react_project.git)
git push -u origin master

<!-- Далее создаем страницу на GitHub Pages и наслаждаемся своим проектом -->

### Мой репо на github

git remote add origin git@github.com:AlexDiz88/react_project.git
git push -u origin master
