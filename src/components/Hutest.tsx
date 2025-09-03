

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Thread {
  id: number;
  messages: Message[];
}

const ChatApp = () => {
  const [threads, setThreads] = useState<Thread[]>([{ id: 1, messages: [] }]);
  const [input, setInput] = useState('');

  useEffect(()=>{console.log(threads)},[threads])
  const sendMessage = async (threadId: number) => {
    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: 'mistral-small',
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MISTRAL}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };

      setThreads((prev:any) =>
        prev.map((thread: { id: number; messages: any; }) =>
          thread.id === threadId
            ? { ...thread, messages: [...thread.messages, { role: 'user', content: input }, newMessage] }
            : thread
        )
      );
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const addThread = () => {
    setThreads([...threads, { id: threads.length + 1, messages: [] }]);
  };

  return (
    <div>
      <button onClick={addThread}>Nowy wątek</button>
      {threads.map((thread) => (
        <div key={thread.id}>
          <h3>Wątek {thread.id}</h3>
          {thread.messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.role }:</strong> {msg.content}
            </div>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wpisz wiadomość..."
          />
          <button onClick={() => sendMessage(thread.id)}>Wyślij</button>
        </div>
      ))}
    </div>
  );
};

export default ChatApp;


// to jest tylko dop rzejrzenia dost. modeli
// const axios = require('axios');

// const testApiKey = async () => {
//   try {
//     const response = await axios.post(
//       'https://api.mistral.ai/v1/models',
//       {},
//       {
//         headers: {
//           Authorization: 'Bearer yqdyU96FYKyEBEg4LYmdJUS8zidj6D3m',
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log('Available models:', response.data);
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message);
//   }
// };