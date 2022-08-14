const fs = require('fs').promises;
const path = require('path');

// // 1. сортування
// // readeFolder шлях до папки яку будемо зчитувати
// // gender передаємо стать
// // writeFolder папка в яку перенесемо файли
//
// const sortFolder = async (readeFolder, gender, writeFolder) => {
//     try {
//         // шлях до папки яку будемо читати
//         const folderPath = path.join(__dirname, readeFolder);
//         // читаємо папку з файлами
//         const files = await fs.readdir(folderPath);
//
//         //  ітеруємо отриманий масив файлів
//         for (const file of files) {
//             // шлях до файлу який перевіряємо на стать
//             const filePath = path.join(folderPath, file);
//             // читаємо отриманий файл
//             const data = await fs.readFile(filePath);
//             // парсимо дані
//             const user = JSON.parse(data.toString());
//
//             // перевіряємо стать користувача
//             if (user.gender !== gender) {
//                 await fs.rename(filePath, path.join(__dirname, writeFolder, file));
//             }
//         }
//     }catch (e) {
//         console.log(e)
//     }
// }
//
// sortFolder('boys', 'male', 'girls');
// sortFolder('girls', 'female', 'boys');

// // 2. рекурсивне перенесення файлів
// const transferFile = async (folderPath) => {
//     // читаємо папку
//     const files = await fs.readdir(folderPath);
//     //  ітеруємо масив даних який отримали з readdir
//     for (const file of files) {
//         // шлях до кожного файлу
//         const pathToFile = path.join(folderPath, file);
//         //  перевфряємо чи то папка чи файл, якщо файл то переносимо його в початкову папку,
//         // якщо папка то запускаємо функцію ще раз(рекурсію)
//         const stat = await fs.stat(pathToFile);
//
//         if (stat.isFile()) {
//             await fs.rename(pathToFile, path.join(__dirname, 'users', file));
//         }
//
//         if (stat.isDirectory()) {
//             await transferFile(pathToFile);
//         }
//     }
// }
//
// transferFile(path.join(__dirname, 'users'));

