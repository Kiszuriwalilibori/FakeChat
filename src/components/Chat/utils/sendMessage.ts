import axios from "axios";

const sendMessage = async (input:string,threadId: number) => {
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

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };