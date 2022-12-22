 //Начинаем с проверки данных в localStorage
checkStorage()

// Функция проверки данных в localStorage
function checkStorage(){
  const myPage = localStorage.getItem('myPage');
  const myLimit = localStorage.getItem('myLimit');

  if (myPage && myLimit) {
    // Если данные в localStorage есть - просто вызываем функцию с запросом
    useRequest(`https://picsum.photos/v2/list?page=${myPage}&limit=${myLimit}`, displayResult);
    console.log(myPage, myLimit);
//Передаём данные в localStorage для следующего обновления
    localStorage.setItem('myPage', myPage);
    localStorage.setItem('myLimit', myLimit);
    return {
      myPage: myPage,
      myLimit:myLimit
    }
  } else {
    // Если данных в localStorage нет - выводим в косоль какую-нибудь запись
    console.log('localStorage is empty, wait for input');
  }
};

//Основная функция с запросом и проверкой условий
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  let page = document.querySelector('.page').value;
  let limit = document.querySelector('.limit').value;
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);

    } else if ((0 > page || page > 10) && (0 > limit || limit > 10)) {
      resultNode.innerHTML = "<p>Номер страницы и лимит вне диапазона от 1 до 10</p>";
    } else if (0 > page || page > 10){
      resultNode.innerHTML = "<p>Номер страницы вне диапазона от 1 до 10</p>";
    } else if (0 > limit || limit > 10){
        resultNode.innerHTML = "<p>Лимит вне диапазона от 1 до 10</p>";
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
//Передаём данные в localStorage
  localStorage.setItem('myPage', page);
  localStorage.setItem('myLimit', limit);
  return {
    myPage: page,
    myLimit: limit
  }
};

// Ищем поля ввода, при заполнении которых будет запрос
const numberNode = document.querySelector('.page');
const limitNode = document.querySelector('.limit');
// Ищем кнопку, по нажатии на которую будет запрос
const btnRequestNode = document.querySelector('.j-btn-request');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);

  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  // console.log('end cards', cards);

  resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnRequestNode.addEventListener('click', () => {
  useRequest(`https://picsum.photos/v2/list?page=${document.querySelector('.page').value}&limit=${document.querySelector('.limit').value}`, displayResult)
})
