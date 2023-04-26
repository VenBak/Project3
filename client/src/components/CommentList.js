import React from 'react';

const CommentList = ({ comments = [] }) => {
    console.log(comments);
    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return (
        <>
            <div>
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id}>
                            <div>
                                <h5>
                                    { comment.commentAuthor}
                                    <span>
                                        on {comment.createdAt}
                                    </span>
                                </h5>
                                <p className="card-body">{comment.commentText}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CommentList;
