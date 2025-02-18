const http = require('http') // Чтобы использовать HTTP-интерфейсы в Node.js
const fs = require('fs') // Для взаимодействия с файловой системой
const path = require('path') // Для работы с путями файлов и каталогов
const url = require('url') // Для разрешения и разбора URL

const PORT = 3000; // Указываем порт для сервера

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    // Определяем MIME-тип
    let ext = path.extname(filePath);
    let contentType = "text/html";

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.ico': 'image/x-icon',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
    };

    if (mimeTypes[ext]) {
        contentType = mimeTypes[ext];
    }

    // Читаем файл и отправляем пользователю
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile("404.html", (error, page) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(page, "utf8");
                });
            } else {
                res.writeHead(500);
                res.end(`Ошибка сервера: ${err.code}`);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    });
});

// Запускаем сервер
server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
