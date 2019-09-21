import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import UserItem from '../users/UserItem';
import TopDiscussion from '../TopDiscussion';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <div className='main-grid'>
      <div className='posts-grid'>
        <h1 className='large text-primary'>Ideas</h1>
        <div className='posts'>
          {posts
            .sort((a, b) =>
              a.likes.length > b.likes.length
                ? -1
                : b.likes.length > a.likes.length
                ? 1
                : 0
            )
            .map(post => (
              <PostItem key={post._id} post={post} />
            ))}
        </div>
      </div>
      <div className='right-panel-grid'>
        <UserItem />
        <TopDiscussion posts={posts} />
        <div
          className='fb-group'
          data-href='https://www.facebook.com/groups/ideatoshare/'
          data-width='350'
          data-show-social-context='true'
          data-show-metadata='false'
        ></div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
