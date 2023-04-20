const db = require('./config/connection');
const { Users, Posts, Comments } = require('./models');

const userData = require('./data/users.json');
const postData = require('./data/posts.json');
const commentData = require('./data/comments.json');
