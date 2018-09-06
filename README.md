Task:
1. таблица user - поля: (firstName, lastName, image(binary), pdf(binary))
2. сделать веб сервис в который подается firstName
3. далее функция находит пользователя в базе по firstName
4. генерит pdf файл вида firstName + lastName + image
5. сохраняет pdf файл в поле pdf базы данных- возвращает пользователю результат   в виде JSON (true/false).

По end-point'у http://localhost:3011/createPdf?firstName=Nikita получаем пользователя из БД, генерируем PDF файл с его
именем, фамилией и картинкой, которые заранее сохранены в БД и возвращаем true/false в зависимости от успеха операции.
