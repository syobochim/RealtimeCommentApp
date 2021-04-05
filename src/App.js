import './App.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import React, { useState, useEffect} from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import { listCommentSortedByTimestamp } from './graphql/queries';
import { onCreateComment } from './graphql/subscriptions';

Amplify.configure(config);

function App() {
  const [comment, setComment] = useState([])
  const [newComment, setNewComment] = useState()
  // const [nextToken, setNextToken] = useState(null);

  const getComments = async (eventId) => {
    const res = await API.graphql(graphqlOperation(listCommentSortedByTimestamp, {
      eventId: eventId,
      sortDirection: 'ASC',
      limit: 20 //default = 10
      // nextToken: nextToken,
    }));
    console.log(res.data.listCommentSortedByTimestamp.items);
    // setNextToken(res.data.ListCommentSortedByTimestampp.nextToken);
    setComment(res.data.listCommentSortedByTimestamp.items)
  }

  useEffect(() => {
    getComments('sample');
    const subscription = API.graphql(graphqlOperation(onCreateComment)).subscribe({
      next: (msg) => {
        const newComment = msg.value.data.onCreateComment;
        console.log('allcomments subscription fired: ', JSON.stringify(msg.value.data.onCreateComment))
        setNewComment(newComment)
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (newComment) {
      setComment([...comment, newComment])
    }
  }, [newComment]);

  return (
    <div className="App">
      <ul>
        {comment.map(item => {
          const date = new Date(item.timestamp * 1000)
          const user = item.username ? item.username : 'ゲスト'
          return (<li key={item.id}>{user} : {item.comment} : {date.toLocaleDateString() + " " + date.toLocaleTimeString()}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
