interface HttpError extends Error {
    status?: number;
    details?: any;
    type?: string;
}

const sendMessage = async (prompt: string) => {
    const API_URL = 'https://chat-proxy-nvv86fo27-kiszuriwaliliboris-projects.vercel.app/api/chat';
    const requestId = Math.random().toString(36).substr(2, 9);
    
    const log = (message: string, data?: any) => {
        console.log(`[${requestId}] ${message}`, data || '');
    };

    try {
        log('Starting request', { 
            time: new Date().toISOString(),
            url: API_URL,
            payload: { prompt, model: 'mistral-large', max_tokens: 500 }
        });

        // Test CORS preflight
        try {
            log('Testing OPTIONS preflight...');
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
            
            const optionsResponse = await fetch(API_URL, {
                method: 'OPTIONS',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            log('OPTIONS response received', {
                status: optionsResponse.status,
                statusText: optionsResponse.statusText,
                headers: Object.fromEntries(Array.from(optionsResponse.headers.entries())),
            });
        } catch (optionsError) {
            const error = optionsError as Error;
            log('OPTIONS preflight failed', {
                name: error.name,
                message: error.message,
                type: 'options_error'
            });
            // Continue with the request even if OPTIONS fails
        }

        // Make the actual request
        const startTime = performance.now();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Request-ID': requestId,
                },
                body: JSON.stringify({
                    prompt,
                    model: 'mistral-large',
                    max_tokens: 500,
                }),
                credentials: 'omit',
                mode: 'cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const responseTime = Math.round(performance.now() - startTime);
            const responseHeaders: Record<string, string> = {};
            response.headers.forEach((value: string, key: string) => {
                responseHeaders[key] = value;
            });

            log('Response received', {
                time: `${responseTime}ms`,
                status: response.status,
                statusText: response.statusText,
                type: response.type,
                headers: responseHeaders,
            });

            if (!response.ok) {
                let errorDetails;
                try {
                    const errorText = await response.text();
                    try {
                        errorDetails = JSON.parse(errorText);
                    } catch {
                        errorDetails = errorText;
                    }
                } catch (e) {
                    errorDetails = 'Could not read error details';
                }

                const error: HttpError = new Error(
                    `HTTP error! status: ${response.status} ${response.statusText}`
                );
                error.name = 'HttpError';
                error.status = response.status;
                error.details = errorDetails;
                error.type = 'http_error';
                throw error;
            }

            const responseData = await response.json();
            log('Response data', responseData);
            
            if (!responseData.response) {
                log('Unexpected response format', responseData);
                throw new Error('Unexpected response format from server');
            }
            
            return responseData.response;

        } catch (requestError) {
            const error = requestError as HttpError;
            if (error.name === 'AbortError') {
                error.message = 'Request timed out';
                error.type = 'timeout';
            }
            throw error;
        }

    } catch (error: unknown) {
        const typedError = error as HttpError;
        log('Request failed', {
            name: typedError.name,
            message: typedError.message,
            status: typedError.status,
            type: typedError.type || 'unknown_error',
            stack: typedError.stack,
        });
        throw typedError;
    }
};

export default sendMessage;