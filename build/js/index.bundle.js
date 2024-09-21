!function(){"use strict";var e=JSON.parse('["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]'),t=JSON.parse('["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентября","Октябрь","Ноябрь","Декабрь"]');JSON.parse('["Калининград","Казань","Киров","Краснодар","Москва","Нижний Новгород","Ростов-на-Дону","Санкт-Петербург","Симферополь","Волгоград","Воронеж","Астрахань","Самара","Саратов","Ульяновск","Челябинск","Пермь","Тюмень","Уфа","Екатеринбург","Омск","Барнаул","Красноярск","Новокузнецк","Новосибирск","Томск","Иркутск","Чита","Хандыга","Якутск","Усть-Нера","Владивосток","Магадан","Сахалин","Среднеколымск","Анадырь","Камчатка"]');var n,i,o,a,s,r;n=e,i=t,o=new Date,a=o.getDay(),s=o.getMonth(),r=o.getDate(),document.getElementById("dayNow").innerHTML=r,document.getElementById("monthNow").innerHTML=i[s]+",",document.getElementById("weekNow").innerHTML=n[a],function(){let e=document.querySelector("#imageID");function t(e){return e<10&&(e="0"+e),e}!function n(){let i=new Date,o=i.getHours(),a=i.getMinutes(),s=i.getSeconds();o>=0&&(e.classList.add("slide1"),e.classList.remove("slide4")),o>=6&&(e.classList.add("slide2"),e.classList.remove("slide1")),o>=12&&(e.classList.add("slide3"),e.classList.remove("slide2")),o>=18&&(e.classList.add("slide4"),e.classList.remove("slide3")),o=t(o),a=t(a),s=t(s),document.getElementById("timeNow").innerHTML=o+":"+a+":"+s,setTimeout((function(){n()}),1e3)}()}(),function(){const e="81e07743ed08d5f5ad4197ca18dd8075",t=document.querySelector("#weatherID"),n=document.querySelector(".form__input");t.onsubmit=async function(t){if(t.preventDefault(),n.value==="".trim())return;const i=await async function(t){const n=`http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=${e}`,i=await fetch(n);return await i.json()}(n.value.trim());if(0===i.lenght)return;console.log(i);const o=await async function(t,n){const i=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=${e}&units=metric&lang=ru`,o=await fetch(i);return await o.json()}(i[0].lat,i[0].lon);!function(e){const t=document.querySelector(".weather__temp"),n=document.querySelector(".weather__city"),i=document.querySelector("#humidity"),o=document.querySelector("#wind"),a=document.querySelector(".weather__img");t.innerText=Math.round(e.temp)+"°c",n.innerText=e.name,i.innerText=e.humidity+"%",o.innerText=e.wind+" м/с";const s={Clouds:"clouds",Rain:"rain",Clear:"clear",Snow:"snow",Thunderstorm:"thunderstorm",Mist:"mist",Drizzle:"drizzle"};s[e.info]&&(a.src=`./img/weather-app/${s[e.info]}.png`,a.srcset=`./img/weather-app/${s[e.info]}@2x.png`)}({name:o.name,temp:o.main.temp,humidity:o.main.humidity,wind:o.wind.speed,info:o.weather[0].main})},document.addEventListener("DOMContentLoaded",(()=>{let e=document.querySelector(".form__input");e&&(e.value="Краснодар"),document.querySelectorAll(".form__btn").forEach((e=>e.click()))}))}(),function(){let e=document.querySelector("#form"),t=document.querySelector("#taskInput"),n=document.querySelector("#tasksList"),i=(document.querySelector("#emptyList"),[]);function o(){if(0===i.length){let e='\n            <li id="emptyList" class="list-group-item empty-list">\n                <p class="empty-list__title">Список дел пуст</p>\n            </li>';n.insertAdjacentHTML("afterbegin",e)}if(i.length>0){let e=document.querySelector("#emptyList");e&&e.remove()}}function a(){localStorage.setItem("tasks",JSON.stringify(i))}function s(e){let t=e.done?"task-title task-title--done":"task-title",i=`                \n                    <li id="${e.id}" class="list-group-item task-item">\n                        <span class="${t}">${e.text}</span>\n                        <div class="task-item__buttons">\n                            <button type="button" data-action="done" class="btn-action">\n                                <img src="./../../img/todo/tick.svg" alt="Done" width="18" height="18">\n                            </button>\n                            <button type="button" data-action="delete" class="btn-action">\n                                <img src="./../../img/todo/cross.svg" alt="Done" width="18" height="18">\n                            </button>\n                        </div>\n                    </li>`;n.insertAdjacentHTML("beforeend",i)}localStorage.getItem("tasks")&&(i=JSON.parse(localStorage.getItem("tasks")),i.forEach((function(e){s(e)}))),o(),e.addEventListener("submit",(function(e){e.preventDefault();let n=t.value;if(""==n)return void alert("Введите текст задачи");let r={id:Date.now(),text:n,done:!1};i.push(r),a(),s(r),t.value="",t.focus(),o()})),n.addEventListener("click",(function(e){if("delete"===e.target.dataset.action){if("delete"===e.target.dataset.action){let t=e.target.closest("li"),n=Number(t.id),o=i.findIndex((function(e){return e.id===n}));i.splice(o,1),a(),t.remove()}o()}})),n.addEventListener("click",(function(e){if("done"===e.target.dataset.action&&"done"===e.target.dataset.action){let t=e.target.closest("li"),n=Number(t.id),o=i.find((function(e){return e.id===n}));o.done=!o.done,a(),t.querySelector("span").classList.toggle("task-title--done")}}))}(),function(){let e=document.querySelector(".todo-head"),t=document.querySelector(".card"),n=document.querySelector(".card-bottom");e.addEventListener("click",(function(){"block"==t.style.display?t.style.display="none":t.style.display="block","block"==n.style.display?n.style.display="none":n.style.display="block"}))}()}();