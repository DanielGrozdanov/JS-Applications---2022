function loadCommits() {
 
    //https://api.github.com/repos/<username>/<repository>/commits
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    let ul = document.getElementById("commits");
    ul.textContent = '';


    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then(handleResponse)
    .then(handleData)
    .then(handleError);


    function handleResponse(response){
        if(response.ok == true){
            return response.json();
        }
        handleError(response);
    }
    
    function handleData(data){
     data.map(commit => {
        let li = document.createElement('li');
        li.textContent = `${commit.commit.author.name}: ${commit.commit.message}` 
        ul.appendChild(li);
      });

    }
    
    function handleError(err){
       let error = document.createElement("li");
       error.textContent = `Error: ${err.status} (Not Found)`
       ul.appendChild(error);
    }
}