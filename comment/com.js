document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("commentForm");
    const commentsList = document.getElementById("commentsList");

    // Load comments from local storage when page loads
    loadComments();

    // Form Submit Event
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input
        const username = document.getElementById("username").value.trim();
        const bookname = document.getElementById("bookname").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (username && bookname && comment) {
            // Create a unique ID for each comment
            const commentData = {
                id: Date.now(), // Unique ID for deletion
                username,
                bookname,
                comment
            };

            // Save to local storage
            saveComment(commentData);

            // Display comment
            addCommentToPage(commentData);

            // Clear form fields
            commentForm.reset();
        }
    });

    // Function to save a new comment to local storage without overriding existing comments
    function saveComment(commentData) {
        let comments = JSON.parse(localStorage.getItem("comments")) || []; // Get existing comments
        comments.push(commentData); // Append new comment
        localStorage.setItem("comments", JSON.stringify(comments)); // Save updated list
    }

    // Function to load comments from local storage and display them
    function loadComments() {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.forEach(addCommentToPage);
    }

    // Function to display comment on the page with profile photo and delete button
    function addCommentToPage(commentData) {
        const commentBox = document.createElement("div");
        commentBox.classList.add("comment-box");
        commentBox.setAttribute("data-id", commentData.id); // Store comment ID for deletion

        const profilePhoto = document.createElement("img");
        profilePhoto.src = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"; // Default empty profile photo
        profilePhoto.classList.add("profile-photo");

        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");
        commentContent.innerHTML = `<strong>${commentData.username}</strong> on <em>${commentData.bookname}</em>:<br>${commentData.comment}`;

        // Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            deleteComment(commentData.id);
        };

        commentBox.appendChild(profilePhoto);
        commentBox.appendChild(commentContent);
        commentBox.appendChild(deleteBtn);
        commentsList.appendChild(commentBox);
    }

    // Function to delete a comment and update local storage
    function deleteComment(commentId) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments = comments.filter(comment => comment.id !== commentId); // Remove comment
        localStorage.setItem("comments", JSON.stringify(comments)); // Save updated list

        // Remove from UI
        document.querySelector(`[data-id='${commentId}']`).remove();
    }
});