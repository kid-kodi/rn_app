export const SignalType = {
  request: 'request',
  notify: 'notify',
};

export const serviceConfig = {
  requestTimeout: 10000,
  connectTimeout: 20000,
  reconnectTimeout: 60000,
  mediaTimeout: 10000,
  allowTimeout: 10000,
};

export const MessageType = {
  file: 'file',
  text: 'text',
};

export const FileJobType = {
  upload: 'upload',
  download: 'download',
};

export const FileJobStatus = {
  progressing: 'progressing',
  completed: 'completed',
  failed: 'failed',
  unDownloaded: 'unDownloaded',
};
