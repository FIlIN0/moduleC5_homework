let parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

//Получаем все DOMNode
const student = xmlDOM.querySelectorAll("student");

//Получаем результат
let result = {
  list: []
}
for (let i = 0; i < student.length; i++) {
  let temp = {};
  temp.name = student[i].querySelector("first").textContent + ' ' + student[i].querySelector('second').textContent;
  temp.age = student[i].querySelector("age").textContent;
  temp.prof = student[i].querySelector("prof").textContent;
  temp.lang = student[i].querySelector("name").getAttribute("lang");
  result.list.push(temp);
}

console.log(result)
