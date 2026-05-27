
    const loginTab = document.querySelector('[data-tab="login"]');
    const signupTab = document.querySelector('[data-tab="signup"]');
    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");
    const loginEmail = document.querySelector("#loginEmail");
    const loginPassword = document.querySelector("#loginPassword");
    const signupName = document.querySelector("#signupName");
    const signupEmail = document.querySelector("#signupEmail");
    const signupPassword = document.querySelector("#signupPassword");
    const signupConfirmPassword = document.querySelector("#signupConfirmPassword");
    const loginMsg = document.querySelector("#loginMsg");
    const signupMsg = document.querySelector("#signupMsg");
    const boxTitle = document.querySelector("#boxTitle");
    const boxSubtitle = document.querySelector("#boxSubtitle");

    function getUsers(){
      return JSON.parse(localStorage.getItem("notesAppUsers") || "[]");
    }

    function saveUsers(users){
      localStorage.setItem("notesAppUsers", JSON.stringify(users));
    }

    function showMessage(element, text, type){
      element.textContent = text;
      element.className = type === "error" ? "message error" : "message success";
    }

    function switchTab(tab){
      if(tab === "login"){
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        boxSubtitle.textContent = "Login to continue 🚀";
        loginMsg.textContent = "";
        signupMsg.textContent = "";
      } else {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        boxSubtitle.textContent = "Create your account";
        loginMsg.textContent = "";
        signupMsg.textContent = "";
      }
    }

    loginTab.addEventListener("click", function(){
      switchTab("login");
    });

    signupTab.addEventListener("click", function(){
      switchTab("signup");
    });

    loginForm.addEventListener("submit", function(e){
      e.preventDefault();

      const email = loginEmail.value.trim();
      const password = loginPassword.value.trim();
      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if(!email || !password){
        showMessage(loginMsg, "Please fill all fields", "error");
        return;
      }

      if(!user){
        showMessage(loginMsg, "Invalid email or password", "error");
        return;
      }

      localStorage.setItem("notesAppCurrentUser", user.email);

      showMessage(loginMsg, "Login Successful ✅", "success");

      setTimeout(function(){
        window.location.replace("home.html");
      }, 1000);
    });

    signupForm.addEventListener("submit", function(e){
      e.preventDefault();

      const name = signupName.value.trim();
      const email = signupEmail.value.trim();
      const password = signupPassword.value.trim();
      const confirmPassword = signupConfirmPassword.value.trim();
      const users = getUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if(!name || !email || !password || !confirmPassword){
        showMessage(signupMsg, "Please fill all fields", "error");
        return;
      }

      if(password.length < 6){
        showMessage(signupMsg, "Password must be at least 6 characters", "error");
        return;
      }

      if(password !== confirmPassword){
        showMessage(signupMsg, "Passwords do not match", "error");
        return;
      }

      if(existingUser){
        showMessage(signupMsg, "This email is already registered", "error");
        return;
      }

      users.push({ name, email: email.toLowerCase(), password });
      saveUsers(users);

      showMessage(signupMsg, "Account created successfully ✅", "success");
      signupName.value = "";
      signupEmail.value = "";
      signupPassword.value = "";
      signupConfirmPassword.value = "";

      setTimeout(function(){
        switchTab("login");
      }, 1200);
    });

    switchTab("login");
