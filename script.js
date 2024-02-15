document.addEventListener("DOMContentLoaded", function() {
    // Тестовые данные, встроенные непосредственно в код для имитации ответа от REST API

        // в случае отсутствия доступа к реальному API или в ожидании уточнения от HR.

    const testData = {
        "services": [
            {"id": 1, "head": null, "name": "Проф.осмотр", "node": 0, "price": 100.0, "sorthead": 20},
            {"id": 2, "head": null, "name": "Хирургия", "node": 1, "price": 0.0, "sorthead": 10},
            {"id": 3, "head": 2, "name": "Удаление зубов", "node": 1, "price": 0.0, "sorthead": 10},
            {"id": 4, "head": 3, "name": "Удаление зуба", "node": 0, "price": 800.0, "sorthead": 10},
            {"id": 5, "head": 3, "name": "Удаление 8ого зуба", "node": 0, "price": 1000.0, "sorthead": 30},
            {"id": 6, "head": 3, "name": "Удаление осколка зуба", "node": 0, "price": 2000.0, "sorthead": 20},
            {"id": 7, "head": 2, "name": "Хирургические вмешательство", "node": 0, "price": 200.0, "sorthead": 10},
            {"id": 8, "head": 2, "name": "Имплантация зубов", "node": 1, "price": 0.0, "sorthead": 20},
            {"id": 9, "head": 8, "name": "Коронка", "node": 0, "price": 3000.0, "sorthead": 10},
            {"id": 10, "head": 8, "name": "Слепок челюсти", "node": 0, "price": 500.0, "sorthead": 20}
        ]
    };


        // Функция построения дерева услуг

    function buildTree(services, head = null) {
                // Создание базового элемента дерева (списка)

        let tree = document.createElement('ul');
                // Фильтрация и сортировка услуг для текущего уровня вложенности

        services.filter(service => service.head === head)
                 .sort((a, b) => a.sorthead - b.sorthead)
                 .forEach(service => {
                                // Создание элемента дерева для каждой услуги

            let node = document.createElement('li');
            node.className = service.node ? 'tree-node' : 'tree-leaf';
                        // Задание текстового содержимого элемента (название и стоимость услуги)

            node.textContent = `${service.name} (${service.price})`;
                        // Рекурсивное построение дерева для вложенных услуг

            let children = buildTree(services, service.id);
            if (children.hasChildNodes()) {
                node.appendChild(children);
            }
            tree.appendChild(node);
        });
        return tree;
    }
    // Добавление построенного дерева услуг в контейнер на веб-странице

    const treeContainer = document.getElementById('tree');
    treeContainer.appendChild(buildTree(testData.services));
});



// В комментариях приведен код, предполагающий асинхронную загрузку данных через REST API.
// Этот код может быть активирован, когда будет получена точная информация от HR 
// о доступности и адресе REST API.
// В текущей реализации используются встроенные тестовые данные для демонстрации логики работы.


// async function fetchServicesData() {
//     const response = await fetch('URL_API'); // URL вашего REST API
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return await response.json();
// }

// document.addEventListener("DOMContentLoaded", async function() {
//     try {
//         const { services } = await fetchServicesData();
//         const treeContainer = document.getElementById('tree');
//         treeContainer.appendChild(buildTree(services));
//     } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//     }
// });
