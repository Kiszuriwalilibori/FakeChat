import { useCallback } from 'react';
import axios from 'axios';
import useDispatchAction from './useDispatchAction';
import { createResponse } from 'components/Chat/utils';
import createQuestions from 'components/Chat/utils/createQuestion';
import { getRandomDelay } from 'components/Chat/utils/getRandomDelay';

export const useProcessMessage = () => {
  const {addMessage: addMessageBody,updateLastMessage } = useDispatchAction();
  const sendMessage = useCallback(async (input: string, threadId: string, personality:string) => {
    
    try {
    
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: 'mistral-small',
          messages: [{ role: 'user', content: input }, { role: 'system', content: personality }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MISTRAL}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const responseContent = response.data.choices[0].message.content;
      const timestamp = +new Date();
      
      addMessageBody(createQuestions(input, threadId));
      updateLastMessage({ID: threadId,lastMessage: {content: input, timestamp}})
      const delay = getRandomDelay();
      
      setTimeout(() => {
        addMessageBody(createResponse(responseContent, threadId));
        updateLastMessage({ 
          ID: threadId, 
          lastMessage: { 
            content: responseContent, 
            timestamp 
          } 
        });
      }, delay);
      
      // return response.data; // Return the response data
    } catch (error) {
      console.error('Error sending message:', error);
      // throw error; // Re-throw the error to handle it in the component
    }
  }, []);

  return sendMessage;
};

export default useProcessMessage;
