import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicOfTheDay, fetchCommentsForTopic } from '../../store/topics';
import pillarImage from './pillar.png';
import './landing.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const topicOfTheDay = useSelector(state => state.topics.topicOfTheDay);
    const comments = useSelector(state => Object.values(state.topics.comments));

    useEffect(() => {
        dispatch(fetchTopicOfTheDay());
    }, [dispatch]);

    useEffect(() => {
        if (topicOfTheDay) {
            dispatch(fetchCommentsForTopic(topicOfTheDay.id));
        }
    }, [dispatch, topicOfTheDay]);

  return (

    <div className="landing-page-container">
  <div className="pillar left-pillar">
    {/* Pillar image here */}
    <img src={pillarImage} alt="Pillar" />
  </div>
  <div className="topic-of-the-day-container">
    <h3>today's discussion:</h3>
    {topicOfTheDay ? (
      <>
        <h1>{topicOfTheDay.title}</h1>
        <p>{topicOfTheDay.description}</p>
        <div className="comments-preview">
          {comments.slice(0, 3).map(comment => (
            <div key={comment.id} className="comment">
              <p><span className="comment-username">{comment.username || 'User'}</span> said: {comment.content}</p>
            </div>
          ))}
        </div>
        <a href="/comments" className="see-all-comments">See All Comments</a>
        <a href="/topics" className="topcs">Propose Your Own Topic</a>
      </>
    ) : (
      <p>Loading topic...</p>
    )}
  </div>
  <div className="pillar right-pillar">
    {/* Pillar image here */}
    <img src={pillarImage} alt="Pillar" />
  </div>
</div>
  );
};

export default LandingPage;
