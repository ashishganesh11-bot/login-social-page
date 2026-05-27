
      const title = document.querySelector("#title");
    const image = document.querySelector("#image");
    const description = document.querySelector("#description");
    const createBtn = document.querySelector("#createBtn");
    const timeline = document.querySelector("#timeline");
    const logout = document.querySelector(".logout");
    const profileBtn = document.querySelector(".profile-btn");
    const profileModal = document.querySelector("#profileModal");
    const closeProfile = document.querySelector("#closeProfile");
    const modalLogout = document.querySelector("#modalLogout");
    const profileName = document.querySelector("#profileName");
    const profileEmail = document.querySelector("#profileEmail");
    const profileStatus = document.querySelector("#profileStatus");

    const currentUser = localStorage.getItem("notesAppCurrentUser");

    if(!currentUser){
      window.location.replace("app.html");
    } else {
      const users = JSON.parse(localStorage.getItem("notesAppUsers") || "[]");
      const userData = users.find(u => u.email.toLowerCase() === currentUser.toLowerCase());
      profileName.textContent = userData?.name || "User";
      profileEmail.textContent = currentUser;
      profileStatus.textContent = "Logged in";
    }

    createBtn.addEventListener("click", function(){
      if(
        title.value.trim() === "" ||
        image.value.trim() === "" ||
        description.value.trim() === ""
      ){
        alert("Please fill all fields");
        return;
      }

      const post = document.createElement("div");
      post.classList.add("post");
      post.innerHTML = `
        <img 
          src="${image.value}" 
          onerror="this.src='https://via.placeholder.com/800x400?text=Image+Not+Found';"
          alt="Post image"
        >
        <div class="post-content">
          <h3>${title.value}</h3>
          <p>${description.value}</p>
          <div class="actions">
            <button class="like-btn">
              ❤️ Like
            </button>
            <button class="delete-btn">
              🗑 Delete
            </button>
          </div>
        </div>
      `;

      timeline.prepend(post);

      const deleteBtn = post.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function(){
        post.style.opacity = "0";
        post.style.transform = "scale(0.8)";
        setTimeout(function(){
          post.remove();
        },300);
      });

      const likeBtn = post.querySelector(".like-btn");
      let liked = false;
      likeBtn.addEventListener("click", function(){
        if(!liked){
          likeBtn.innerHTML = "💖 Liked";
          likeBtn.style.background = "#db2777";
          liked = true;
        } else {
          likeBtn.innerHTML = "❤️ Like";
          likeBtn.style.background = "#ec4899";
          liked = false;
        }
      });

      title.value = "";
      image.value = "";
      description.value = "";
    });

    function closeProfileModal(){
      profileModal.classList.add("hidden");
    }

    profileBtn.addEventListener("click", function(){
      profileModal.classList.remove("hidden");
    });

    closeProfile.addEventListener("click", closeProfileModal);

    profileModal.addEventListener("click", function(e){
      if(e.target === profileModal){
        closeProfileModal();
      }
    });

    function logoutUser(){
      localStorage.removeItem("notesAppCurrentUser");
      window.location.replace("app.html");
    }

    logout.addEventListener("click", logoutUser);
    modalLogout.addEventListener("click", logoutUser);

