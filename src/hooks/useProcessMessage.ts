import { useCallback } from 'react';
import axios from 'axios';
import { useDispatchAction } from 'hooks';
import { createResponse } from 'components/Chat/utils';
import createQuestions from 'components/Chat/utils/createQuestion';
import { getRandomDelay } from 'components/Chat/utils/getRandomDelay';
import useMessage from './useMessage';
import { sanitizeInput } from 'components/Chat/utils/sanitizeInput';
import DOMPurify from 'dompurify';

export const useProcessMessage = () => {
  const showMessage = useMessage();
  const { addMessage: addMessageBody, updateLastMessage } = useDispatchAction();
  
  const sendMessage = useCallback(async (
    input: string, 
    threadId: string, 
    personality: string
  ) => {
    const sanitizedInput = sanitizeInput(input);
  if (!sanitizedInput) {
    showMessage.error('Invalid message content');
    return { error: 'Invalid message content' };
  }
    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: 'mistral-small',
          messages: [
            { role: 'user', content: sanitizedInput },
            { role: 'system', content: personality }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MISTRAL}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const responseContent = response.data.choices[0].message.content;
      const sanitizedContent = DOMPurify.sanitize(responseContent, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p', 'span'],
        ALLOWED_ATTR: ['class', 'style'],
        ALLOW_DATA_ATTR: false
      }) || '';
      
      const timestamp = +new Date();
      
      // Add user's question
      addMessageBody(createQuestions(sanitizedInput, threadId));
      updateLastMessage({
        ID: threadId,
        lastMessage: { content: sanitizedInput, timestamp }
      });
      
      // Add AI response after a delay
      const delay = getRandomDelay();
      setTimeout(() => {
        addMessageBody(createResponse(sanitizedContent, threadId));
        updateLastMessage({ 
          ID: threadId, 
          lastMessage: { 
            content: sanitizedContent, 
            timestamp 
          } 
        });
      }, delay);
      
    } catch (error: unknown) {
      let errorMessage = 'Failed to send message';
      
      if (axios.isAxiosError(error)) {
        // Handle Axios specific errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = 'No response from server. Please check your connection.';
        }
      } else if (error instanceof Error) {
        // Handle other types of errors
        errorMessage = error.message;
      }
      
      // Show user-friendly error message
      showMessage.error(errorMessage);
      
      // Return error information
      return { error: errorMessage };
    }
  }, [addMessageBody, updateLastMessage, showMessage]);

  return { sendMessage };
};

export default useProcessMessage;