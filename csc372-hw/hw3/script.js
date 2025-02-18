"use strict";

const gallery = document.querySelectorAll('img');
const section = document.querySelectorAll('.flex-item');

console.log(section.item(1));
for (let index = 0; index < section.length; index++) {
    const element = section[index];
    element.addEventListener('click', expand);
}

function expand(event) {
    //const smallImage = event.currentTarget; 
    const smallImage = event.currentTarget.querySelector('img');
    if (smallImage.classList[0] == 'small') {
        const hiddenText = event.currentTarget.querySelector('.hidden');

        const bigImage = document.querySelector(".big");
        const visibleText = document.querySelector('.visible');

        if (bigImage != null) {
            bigImage.classList.remove('big');
            bigImage.classList.add('small');
            visibleText.classList.remove('visible');
            visibleText.classList.add('hidden');
        }
        smallImage.classList.remove('small');
        smallImage.classList.add('big');
        hiddenText.classList.remove('hidden');
        hiddenText.classList.add('visible');
    }
}

const food = document.querySelectorAll('.meal');

let meals = document.querySelectorAll('.plan-item');



for (let index = 0; index < food.length; index++) {
    const element = food[index];
    console.log(food);
    element.addEventListener('click', add_to_plan);
}
let cost = 0.0;
function add_to_plan(event) {
    var mealPlan = document.querySelector('#meal-plan');
    let costText = document.createElement("h1");

    //console.log(event.currentTarget.querySelector('input').value);
    let itemCost = parseFloat(event.currentTarget.querySelector('.hidden').innerHTML);
    cost += itemCost;
    //console.log(typeof(event.currentTarget.querySelector('input').value));

    let mealText = event.currentTarget.querySelector('p').innerHTML;
    let para = document.createElement('p');
    para.append(mealText);
    para.classList.add("plan-item");

    let inputCost = document.createElement('p');
    inputCost.classList.add('hidden');
    inputCost.append(itemCost);
    para.appendChild(inputCost);
    console.log(mealText);
    mealPlan.appendChild(para);
    costText.append("Cost: " + cost);
    console.log(costText);
    let costHeader = document.querySelector("#cost-header");
    costHeader.innerHTML = "";
    costHeader.append(costText);
    meals = document.querySelectorAll('.plan-item');

    console.log(meals);
    console.log(food);
    check_meals(para);
}
function check_meals(para) {

    const element = para;
    element.addEventListener('click', remove_meal);
}


function remove_meal(event) {

    let meal = event.currentTarget

    let itemCost = parseFloat(meal.querySelector('.hidden').innerHTML);

    cost += -itemCost;

    if (cost < 2) {
        cost = 0;
    }

    let costHeader = document.querySelector('#cost-header');
    costHeader.innerHTML = "";
    costHeader.append("Cost: " + cost);

    meal.remove();



}