# SPORTSPACE

## Запуск и разработка

Для запуска локально нужно:

1. Клонировать данный репозиторий
2. Перейти в корневую директорию проекта и установить все npm зависимости командой `npm install`
3. Запустить devserver командой `npm run dev`
5. Открыть в браузере `http://localhost:3000`


Для запуска docker образа нужно:
```bash
docker run -e BACKEND_URL=http://sportspace-api:8080 -p 3000:3000 sportspace-frontend
```

Для запуска docker container через docker-compose нужно:
1. создать сеть для работы с фронтом ```docker network create sportspace-network```
2. запустить ```docker-compose up``` или пересобрать и запустить ```docker-compose up --build```