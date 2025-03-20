"use strict";

const form_checker = document.getElementById("username-form");

form_checker.addEventListener("submit", function (event) {

    event.preventDefault();
    console.log("testing");



    fetch("https://api.github.com/users/" + document.getElementById("username").value + "/repos", {
        owner: 'OWNER',
        repo: 'REPO',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            //console.log(response.json());

            //const data = response;

            //const data = response.data;

            //console.log(data);




            return response.json();
        })
        .then((data) => {

            //const repo
            //data = JSON.stringify(data)
            const repo1 = data[1]["name"];
            for (let i = 0; i < data.length; i++) {
                const repo = document.createElement("div");
                repo.classList.add("repo");
                //let para = document.createElement("p");

                let values = ["name", "description", "created_at", "updated_at", "size", "language", "watchers_count"];
                let descripters = ["Repo name: ", "Repo description: ", "Created on: ", "Updated on: ", "Number of commits: ", "Languages: ", "Current viewer count: "]

                for (let j = 0; j < values.length; j++) {


                    let para;

                    

                    if (j === 0) {
                        para = document.createElement("a");
                        para.href = data[i]["svn_url"];
                        para.innerHTML = `<i class="fab fa-github"></i>`;
                    } else {
                        para = document.createElement("p");
                        para.innerHTML = descripters[j];
                    } 
                    
                    
                    
                    if (j > 1 && j < 4) {
                        para.innerHTML += data[i][values[j]].substring(0, 10);
                    } else {
                        para.innerHTML += data[i][values[j]];
                    }


                    repo.appendChild(para);


                }






                //repo.innerHTML = repo_info;
                document.getElementById("container").append(repo);
            }


            //console.log(JSON.stringify(repo1));

            console.log("Data:" + data.length);

        })
        .catch((error) => {
            console.error("Error:", error);
        });




});



async function repo_collector() {



}

