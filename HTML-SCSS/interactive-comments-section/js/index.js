let user_data = JSON.parse(localStorage.getItem("data"));
const sortUserData = () => {
    user_data.comments.sort((a, b) => b.score - a.score);
}
const findNextId = () => {
    let length = user_data.comments.length;
    user_data.comments.forEach((user) => {
        length += user.replies.length;
    });
    return length;
}

const addNewComment = async () => {
    event.preventDefault();
    let content = document.getElementById("comment__text");
    const contentValue = content.value.trim();
    content.value = "";
    const nextId = await findNextId() + 1;
    const newComment = {
        "id": nextId,
        "content": contentValue,
        "score": 0,
        "replies": [],
        "user": user_data.currentUser,
        "createdAt": "1 minute ago"
    }
    user_data.comments.push(newComment);
    localStorage.setItem("data", JSON.stringify(user_data));
    displayUser();
}
const increaseScore = (userId, replyStatus) => {
    user_data.comments.map((user) => {
        replyStatus ?
            (user.replies.map((reply) => {
                if (reply.id === userId) {
                    reply.score++;
                }
                return reply;
            })) : (user.id === userId && user.score++)
        return user;
    })
    localStorage.setItem("data", JSON.stringify(user_data));
    displayUser();
}
const decreaseScore = (userId, replyStatus) => {
    user_data.comments.map((user) => {
        replyStatus ?
            (user.replies.map((reply) => {
                if (reply.id === userId) {
                    if (reply.score !== 0) {
                        reply.score--;
                    }
                }
                return reply;
            })) : (user.id === userId && user.score !== 0 && user.score--)
        return user;
    })
    localStorage.setItem("data", JSON.stringify(user_data));
    displayUser();
}
const showModal = () => {
    document.querySelector(".comments__container").style.opacity = "0.2";
    document.querySelector(".modal__confirm-delete").style.display = "block";
}
const hideModal = () => {
    document.querySelector(".comments__container").style.opacity = "1";
    document.querySelector(".modal__confirm-delete").style.display = "none";
}
const deleteCommentConfirm = (userId, replyStatus) => {
    user_data.comments = replyStatus ? user_data.comments.map(user => {
        user.replies = user.replies.filter(reply => reply.id !== userId);
        return user;
    }) :
        user_data.comments.filter(user => user.id !== userId)

    localStorage.setItem("data", JSON.stringify(user_data));
    displayUser();
    hideModal();
}
const deleteComment = (userId, replyStatus) => {
    showModal();
    document.querySelector(".button__confirm--no").addEventListener("click", hideModal);
    document.querySelector(".button__confirm--yes").addEventListener("click", () => deleteCommentConfirm(userId, replyStatus));

}
const updateComment = (userId) => {
    const contentEdit = document.getElementById(`user__content--${userId}`);
    const buttonUpdate = document.getElementById(`button__update--${userId}`);
    buttonUpdate.style.display = "none";
    contentEdit.contentEditable = false;
}
const editComment = (userId) => {
    document.getElementById(`button__update--${userId}`).onclick = () => updateComment(userId);
    const contentEdit = document.getElementById(`user__content--${userId}`);
    const buttonUpdate = document.getElementById(`button__update--${userId}`);
    contentEdit.contentEditable = true;
    if(contentEdit.contentEditable === true){
        contentEdit.focus();
    }
    var range = document.createRange();
    range.selectNodeContents(contentEdit);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    buttonUpdate.style.display = "block";
}
const findNestedObj = (keyToFind, valToFind) =>{
    let foundObj;
    JSON.stringify(user_data, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
};
const addNewReply = (userId, selectorName) => {
    event.preventDefault();
    let content = document.getElementById(`reply__text--${userId}`);
    const contentValue = content.value.trim();
    content.value = "";
    const nextId = findNextId() + 1;
    const newComment = {
        "id": nextId,
        "content": contentValue,
        "score": 0,
        "user": user_data.currentUser,
        "createdAt": "1 minute ago"
    }
    if(selectorName.id.substr(0, 7) === 'replies'){
        userId = parseInt(selectorName.id.substr(7));
    }
    user_data.comments.map((user) => {
        if(user.id === userId){
            user.replies.push(newComment);
        }
        return user;
    });
    localStorage.setItem("data", JSON.stringify(user_data));
    displayUser();

}
const replyComment = (userId, selectorName) => {
    document.getElementById(`reply__container--${userId}`).style.display = "block";
    document.getElementById(`reply--${userId}`).addEventListener("click", () => addNewReply(userId, selectorName));
}

const userCode = (user, selectorClassName, selectorIdName) => {
    const userCode = `
    <div class="user__container">
        <div class="user" id="user--${user.id}">
            <div class="user__header" id="user__header--${user.id}">
                <img src=${user.user.image.png} alt="image-amyrobson" class="user__image" id="user__image--${user.id}">
                <span class="user__username" id="user__username--${user.id}">${user.user.username}</span>       
                ${(user.user.username === user_data.currentUser.username) ?
                    `<span class="user__status status--you" id="user__status--${user.id}">you</span>` :
                    `<span class=" user__status status--not-you"></span>`
                }
                <span class="user__created-at" id="user__created-at--${user.id}">${user.createdAt}</span>
            </div>
            <p class="user__content" id="user__content--${user.id}">
                ${user.replyingTo ?
                    `<span class="user__replying-to" id="user__replying-to--${user.id}">@${user.replyingTo}</span>` :
                    `<span></span>`
                }
                ${user.content}
            </p>
            <div class="score" id="score--${user.id}">
                <button class="score__button" id="button__increase--${user.id}" onclick="increaseScore(${user.id}, ${selectorClassName === ".replies"})">
                    <img src="./images/icon-plus.svg" alt="icon-plus" class="img__increase">
                </button>
                    <span class="score__count" id="score__count--${user.id}">${user.score}</span>
                <button class="score__button" id="button__decrease--${user.id}" onclick="decreaseScore(${user.id}, ${selectorClassName === ".replies"})">
                    <img src="./images/icon-minus.svg" alt="icon-minus" class="img__decrease">
                </button>
            </div>
            <div class="container__button" id="container__button--${user.id}">
                ${(user.user.username === user_data.currentUser.username) ?
                `
                        <button class="button button__delete" id="button__delete--${user.id}" onclick="deleteComment(${user.id}, ${selectorClassName === ".replies"})">
                            <img src="./images/icon-delete.svg" alt="icon-delete" class="button__image button__image--delete">
                            <span class="button__value button__value--delete">Delete</span>
                        </button>
                        <button class="button button__edit" id="button__edit--${user.id}" onclick="editComment(${user.id})">
                            <img src="./images/icon-edit.svg" alt="icon-edit" class="button__image button__image--edit">
                            <span class="button__value button__value--edit">Edit</span>
                        </button>
                    
                    ` :
                `
                        <button class="button button__reply" id="button__reply--${user.id}" onclick = "replyComment(${user.id}, ${selectorIdName.slice(1)})">
                            <img src="./images/icon-reply.svg" alt="icon-reply" class="button__image button__image--reply">
                            <span class="button__value button__value--reply">Reply</span>
                        </button>
                    `
            }
            </div> 
            ${(user.user.username === user_data.currentUser.username) ?
                `<button class="button button__current-user button__update" id="button__update--${user.id}">
                    Update
                </button> ` : 
                `<button class="content--false">
                </button>`
            }
            
        </div>
        <div class="user user__current user__current--reply" id="reply__container--${user.id}">
            <form class="form" id="form--${user.id}">
                <img src=${user_data.currentUser.image.png} alt="image-juliusomo" class="user__image">
                <textarea cols="20" placeholder="Add a reply..." class="textarea" id="reply__text--${user.id}" required></textarea>
                <button class="button button__current-user button--reply"  id="reply--${user.id}" type="submit">
                    Reply
                </button>
            </form>
        </div>
    </div>
    `

    document.querySelector(selectorIdName).innerHTML += userCode;

}
const displayUser = () => {
    user_data = JSON.parse(localStorage.getItem("data"));
    sortUserData();
    document.querySelector("#comments__container").innerHTML = ``;
    for (user of user_data.comments) {
        userCode(user, ".comments__container", "#comments__container");
        const repliesDiv = `
                <div class="replies" id="replies${user.id}">
                </div>
            `
        if (user.replies !== undefined && user.replies.length !== 0) {
            
            document.querySelector("#comments__container").innerHTML += repliesDiv;
            for (reply of user.replies) {
                userCode(reply, ".replies" ,`#replies${user.id}`);
            }
        }
    }
    const currentUserCommentDiv = `
    <div class="user user__current user__current--comment">
        <form class="form">
            <img src=${user_data.currentUser.image.png} alt="image-juliusomo" class="user__image">
            <textarea cols="20" placeholder="Add a comment..." class="textarea" id="comment__text" required></textarea>
            <button class="button button__current-user button--send" type="submit">
                Send
            </button>
        </form>
    </div>
`
    document.querySelector("#comments__container").innerHTML += currentUserCommentDiv;
    document.querySelector(".button--send").addEventListener("click", addNewComment);

}

displayUser();
