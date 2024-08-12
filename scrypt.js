async function GetUsers1() {
  try {
      let request = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!request.ok) {
          throw new Error(`HTTP error! Status: ${request.status}`);
      }
      let response = await request.json();
      response.forEach(user => {
          displayusers(user.name, user.email, user.id);
      });
      let div = document.createElement("div");
      div.innerHTML = `<h2>All_Users</h2>`;
      div.style.cssText = "word-wrap:break-word;margin:15px;padding:10px;background-color:white;color:black;border-radius:8px;cursor:pointer;";
      let usersDivs = document.querySelector(".users");
      usersDivs.prepend(div);
      document.querySelectorAll(".users div").forEach(user => user.addEventListener("click", handler));
  } catch (error) {
      console.error('Error fetching users:', error);
      let errorDiv = document.createElement("div");
      errorDiv.innerHTML = `<p>Failed to load users. Please try again later.</p>`;
      errorDiv.style.cssText = "color: red; margin: 15px;";
      let usersDivs = document.querySelector(".users");
      usersDivs.prepend(errorDiv);
      throw error
  }
}

function GetUsers(){
  return new Promise((resolve,reject) => {
    let request = axios.get('https://jsonplaceholder.typicode.com/users');
    request.then((response) => {
      let users = response.data;
      users.forEach(user => {
        displayusers(user.name,user.email,user.id)
      })
    let div = document.createElement("div");
    div.innerHTML = `<h2>All_Users</h2>`
    div.style.cssText = "word-wrap:break-word;margin:15px;padding:10px;background-color:white;color:black;border-radius:8px;cursor:pointer;"
    let usersDivs = document.querySelector(".users");
    usersDivs.prepend(div);
    document.querySelectorAll(".users div").forEach(user => user.addEventListener("click",handler));
    resolve();
    }).catch( (error) => reject(error))
})
}
function getposts(){
  let request = axios.get('https://jsonplaceholder.typicode.com/posts');
  request.then((response) => {
    let posts = response.data;
    posts.forEach(post => displaypost(post.title,post.body))     
  })
}
function displayusers(name,email,id){
  let span = document.createElement("span");
  span.innerHTML = id;
  span.style.visibility = "hidden";
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.append(name);
  h3.style.display = "inline-block";
  div.append(h3);
  div.append(span);
  div.innerHTML += `<h3>${email}</h3>`;  
  div.style.cssText = "word-wrap:break-word;margin:15px;padding:10px;background-color:white;color:black;border-radius:8px;cursor:pointer;"
  document.querySelector(".users").append(div);
}
function displaypost(title,body){
    let div = document.createElement("div");
    let postTitle = document.createElement("h2");
    postTitle.append(title);
    postTitle.style.textAlign = "center";
    div.append(postTitle)
    div.innerHTML += `<br><hr>`;
    div.innerHTML += `<br><p>${body}</p>`;
    div.style.cssText = "padding:10px;margin:10p;background-color:white;color:black;border-radius:8px;"
    document.querySelector(".posts").append(div);
}
function handler(){
  document.querySelectorAll(".users div").forEach(d => {d.style.border = "none"})
  if(this.lastChild.innerHTML == "All_Users"){document.querySelector(".posts").innerHTML = "";
    getposts();
  }
  else{
    let id = Number(this.querySelector("span").innerHTML);
    getuserposts(id);
  }
  this.style.border = "solid red 3px";
}
 function getuserposts(id){
  let request = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  request.then((response) => {
    let userPosts = response.data;
    document.querySelector(".posts").innerHTML = "";
    userPosts.forEach(post => displaypost(post.title,post.body)); 
  })
}
GetUsers1()
.then(() => {
  document.querySelector(".users").firstChild.style.border = "solid red 3px";
  setTimeout(getposts,1000)
}).catch(reject => console.log(reject));





