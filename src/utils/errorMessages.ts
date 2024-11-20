export const ERROR_MESSAGES: Record<string, string> = {
  API_NOT_CONFIGURED: 'Twitter API 未配置，请先配置 API',
  TIMEOUT: '请求超时，请检查网络连接',
  USER_NOT_FOUND: '未找到该用户',
  PARSE_ERROR: '响应解析失败',
  API_ERROR: 'API 调用失败',
  RATE_LIMIT: 'API 调用次数超限',
  NETWORK_ERROR: '网络连接失败',
};

export function getErrorMessage(error: Error): string {
  const code = error.message.split(':')[0];
  const details = error.message.split(':').slice(1).join(':');
  
  if (code === 'API_ERROR') {
    const status = details.split(':')[0];
    if (status === '429') return ERROR_MESSAGES.RATE_LIMIT;
    return `${ERROR_MESSAGES.API_ERROR} (${status})`;
  }
  
  if (code === 'PARSE_ERROR') {
    return `${ERROR_MESSAGES.PARSE_ERROR}: ${details}`;
  }
  
  return ERROR_MESSAGES[code] || '未知错误';
}