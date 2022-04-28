import PropTypes from 'prop-types';

const Post = PropTypes.shape({
  body: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  userId: PropTypes.object,
});
export default Post;