const saveUser = async () => {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const cpassword = document.getElementById('cpassword').value.trim();

    if (!email || !password || !fname || !lname || !cpassword) {
        alert("Please fill all details");
    }
   else if (password != cpassword) {
        alert("Please type same password ");
    }
    else {
        const data = {firstname : fname,lastname : lname , email : email,password:password};
        const response = await fetch('http://localhost:8080/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data['value']) {
                    alert(data['msg']);
                    sessionStorage.setItem("token", data['token']);
                    window.location.href = "dashboard.html";
                }
                else alert(data['msg']);
            });
     }

}

const checkUser = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const data = { "email": email, "password": password };
    if (email && password) {
        const response = await fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => {
                if (data['value']) {
                    alert(data['msg']);
                    sessionStorage.setItem("token", data['token']);
                    window.location.href = "dashboard.html";
                }
                else alert(data['msg']);
            }
            );
    }
    else {
        alert("Please Enter value");
    }
}


const getDashboard = async () =>{
    document.getElementById('fn').innerText =  null;
    document.getElementById('ln').innerText = null;
    document.getElementById('email').innerText = null;
    document.getElementById('password').innerText = null;
  
    const token =  sessionStorage.getItem("token");
    if(!token) {

        window.location.href = 'index.html';
        return;
    }  
    const response = await fetch('http://localhost:8080/dashboard', {
        method: "GET",
        headers: { 
             'Content-Type': 'application/json',
             'Authorization': token ,        
         }
    }).then(response => response.json())
        .then(data => {
            if (data['value']) {
                document.getElementById('msg').innerText = data['msg'];
                document.getElementById('fn').innerText = data['data']['firstname'] ;
                document.getElementById('ln').innerText = data['data']['lastname'];
                document.getElementById('email').innerText = data['data']['email'];
                document.getElementById('password').innerText = data['data']['password'];
            }
            else alert(data['msg']);
        });

}


 const  logOut = async()=> {
    
    sessionStorage.setItem("token",'');
    window.location.href = 'index.html';
 }


 const googleAuth = async()=> {
   window.location.href = "http://localhost:8080/auth/google";
 }

 const facebookAuth = ()=> {
    window.location.href = "http://localhost:8080/auth/facebook"; 
 }



const githubAuth = ()=> {
    window.location.href = "http://localhost:8080/auth/github"; 
}