import React, { useState, useEffect } from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

function Post({ postId,  username, caption, imageUrl, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timeStamp", "asc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post"> 
            <div className="post__header">
            <Avatar 
                className="post__avatar"
                alt={username}
                src='/static/images/1.png'
            />
            <h4>{username}</h4>
            </div>
            
            <img
                className="post__image"
                src={imageUrl}
                alt=""
            />
            <p className="post__text"><strong>{username}</strong> {caption}</p>
            <div className="post__comments">
                {comments.map((comment) => (
                    <p className="post__comment">
                        <strong>{comment.username}</strong> {comment.text} 
                    </p>
                ))}
            </div>
            { user ? (
            <form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add Comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button 
                    disabled={!comment}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form> ): null
            }
        </div>
    )
}

export default Post
