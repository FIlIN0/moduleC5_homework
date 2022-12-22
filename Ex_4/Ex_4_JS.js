const btn = document.querySelector('.j-btn-request');
const resultNode = document.querySelector('.j-result');

function useRequest () {
  btn.addEventListener('click', () => {
    let wid = +document.querySelector('.width_j').value;
    let hei = +document.querySelector('.height_j').value;
    console.log(wid, hei)
    if (wid < 300 && wid > 100 && hei < 300 && hei > 100) {
// Делаем запрос за данными
      fetch(`https://picsum.photos/${wid}/${hei}`)
        .then((response) => {
          const result = response;
          resultNode.innerHTML = `<img class="img" src="${result.url}" alt="">`;
        })
        .catch(() => { console.log('error') });
    } else {
      alert ('одно из чисел вне диапазона от 100 до 300')
    }
  });
};


useRequest ()
