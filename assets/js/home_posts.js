
{
    let createPost = function () {
        let newPostForm = $('#new-post-form')

        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {

                    let newPost = newPostDom(data.data.post, data.data.userName);
                    $('#posts-container').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                    createComment($('#new-comment-form', newPost));

                }, error: function (err) {
                    console.log(err.responseText);
                }
            })
        })
    }

    //Method to create a post in Dom
    let newPostDom = function (post, userName) {
        noty('Posted Successfully!', "success", "mint", 500);
        return $(` 
        <li id="post-${post._id}">
        <div>
            ${post.content}
                <small>
                    ${userName}
                </small>
                 <a  class='delete-post-button' href='/post/destroy/${post._id}'>X</a>  
        </div>
        <div>
            <small>
                <a href="/likes/toggle?id=${post._id}&type=Post">Like</a>
                <span>Count=${post.likes.length}</span>
            </small>
        </div>  
        <div class="post-comments">
            <form action="/comment/create" id="new-comment-form" method='post'>
                <input type="text" name='content' placeholder="Type here to comment">
                <input type="hidden" name='post' value=${post._id}>
                <input type="submit" value="Add comment">
            </form>
        </div>
        
        <ul id="post-comments-${post._id}">
        </ul>
    </li>`)
    }



    //Method to delete post from Dom
    let deletePost = function (deleteLink) {

        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),

                success: function (data) {

                    $(`#post-${data.data.post_id}`).remove();

                    noty('Deleted Successfully!', "error", "mint", 500);
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            })

        })
    }

    // setting Ajax delete functionallity After reloading a page also 
    let settingDeleteOnReload = function () {

        let posts = $('.delete-post-button');
        for (p of posts) {
            deletePost(p);
        }
    }

    //setting up noty notifications
    var noty = function (text, type, theme, timeout) {
        new Noty({
            text: text,
            type: type,
            layout: 'bottomCenter',
            theme: theme,
            timeout: timeout
        }).show();
    }

    let createComment = function (newComment) {
        newComment.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: newComment.serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data.data);
                    $(`#post-comments-${data.data.post._id}`).prepend(newComment);
                },
                error: function (err) {
                    console.log('Error in creating comment', err.responseText);
                }
            })
        })
    }

    //method to add comment in Dom
    let newCommentDom = function (data) {

        return $(`
        <p>
            ${data.comment.content} 
            <small>
                ${data.userName}
            </small>
            <a href='/comment/destroy/${data.comment._id}'>X</a>
        </p>
        `)
    }

    createPost();
    settingDeleteOnReload();

}