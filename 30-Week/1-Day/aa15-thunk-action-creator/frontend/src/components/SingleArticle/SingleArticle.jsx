import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './SingleArticle.css';

const SingleArticle = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const singleArticle = useSelector(
    state => state.articleState.entries.find(article => article.id === +id)
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000)
  }, [])

  return (
    loading ? <h1>Loading</h1> :
      <div className='singleArticle'>
        <h1>{singleArticle.title}</h1>
        <img
          src={singleArticle.imageUrl}
          alt={singleArticle.title}
        />
        <p>
          {singleArticle.body}
        </p>
      </div>
  );
};

export default SingleArticle;
