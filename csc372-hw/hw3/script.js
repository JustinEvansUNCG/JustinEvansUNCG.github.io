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


let totalCost = 0.0;



function add_to_plan(event) {

    if (event.currentTarget.classList[2] === "not-in-plan") {
        //document.getElementsByClassName(itemId)

        event.currentTarget.classList.remove('not-in-plan');
        event.currentTarget.classList.add('in-plan');

        var mealPlan = document.querySelector('#meal-plan');

        let itemCost = parseFloat(event.currentTarget.querySelector('.hidden').innerHTML);

        let mealText = event.currentTarget.querySelector('p').innerHTML;
        let para = document.createElement('p');
        para.append(mealText);
        para.classList.add("plan-item");
        para.classList.add(event.currentTarget.classList[1]);

        //below lines allow a quantity for a given item to be entered
        let amount = document.createElement('input');
        amount.type = 'number';
        amount.value = 1;


        //recreates the hidden value of the currentTarget, it is dereferenced and will be attached to the 
        let inputCost = document.createElement('p');
        inputCost.classList.add('hidden');

        inputCost.append(itemCost);
        para.appendChild(inputCost);
        para.appendChild(document.createElement('br'));
        para.appendChild(amount);
        
        check_amount(para);

        console.log(mealText);

        change_balance(para);

        mealPlan.appendChild(para);


        meals = document.querySelectorAll('.plan-item');

        console.log(meals);
        console.log(food);
        check_meals(para);
    }
}

//Function below exists so we can check when the amount of a product changes
function check_amount(amount) {

    const element = amount;
    element.addEventListener('input', change_balance);


}

//this function is called to change the total cost of a users meal plan
function change_balance(event) {

    let amount;
    let cost;
    let para;
    let subTotal;

    //this if else statement allows this function to be called as a result of an event as well as a function call
    if (event.currentTarget != undefined) {
        amount = event.currentTarget.querySelector('input').value;

        //hidden variable holds the items cost
        cost = parseFloat(event.currentTarget.querySelector('.hidden').innerHTML);
        para = event.currentTarget;

        //subtract the subtotal of a meal from the totalcost
        totalCost += -parseFloat(para.querySelector('.sub-total').innerHTML);
        
    } else {
        amount = event.querySelector('input').value;
        cost = parseFloat(event.querySelector('.hidden').innerHTML);
        para = event;

        //this creates the sub-total object in the html file
        subTotal = document.createElement('p');
        subTotal.append(cost * amount);
        subTotal.classList.add('sub-total');
        para.appendChild(subTotal);
    }

    //an items cost times the amount wanted
    let itemTotal = cost * amount;

    //updates total cost
    totalCost += itemTotal;
    console.log(totalCost);
    


    //let temp = parseFloat(para.querySelector('.sub-total').innerHTML);
    //totalCost += -temp;
    para.querySelector('.sub-total').innerHTML = "";
    para.querySelector('.sub-total').append(itemTotal);

    //this object will be used to replace the old cost displayed on the website
    
    let costText = "Cost: " + totalCost;

    //retrieves the old cost displayer, and clears it, before replacing it
    let costHeader = document.querySelector("#cost-header");
    costHeader.innerHTML = "";
    costHeader.append(costText);

}




//all items in the meal plan wait in this function for a double click, and deletes the item from the meal plan if done
function check_meals(para) {

    const element = para;
    element.addEventListener('dblclick', remove_meal);
}

//this function actually removes the item from the meal plan
function remove_meal(event) {

    let meal = event.currentTarget;

    //lines below change the class in-list back to not-in-list
    let temp = document.querySelector('.' + meal.classList[1]);
    temp.classList.remove('in-plan');
    temp.classList.add('not-in-plan');


    let subTotal = parseFloat(meal.querySelector('.sub-total').innerHTML);

    totalCost += -subTotal;


    //this catches some of the issues that come with float values, doesnt allow impossible costs
    if (totalCost < 2) {
        totalCost = 0;
    }

    let costHeader = document.querySelector('#cost-header');
    costHeader.innerHTML = "";
    costHeader.append("Cost: " + totalCost);

    meal.remove();



}