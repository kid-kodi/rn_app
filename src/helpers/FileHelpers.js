import Icon from 'react-native-vector-icons/FontAwesome';

export const getMessageType = mimeType => {
  if (mimeType.startsWith('text')) return 'text';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf' || mimeType.startsWith('application/'))
    return 'document';
  return 'unknown';
};

export const getFileIcon = fileName => {
  if (fileName.endsWith('.pdf'))
    return <Icon name="file-pdf-o" size={40} color="red" />;
  if (fileName.endsWith('.doc') || fileName.endsWith('.docx'))
    return <Icon name="file-word-o" size={40} color="blue" />;
  if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx'))
    return <Icon name="file-excel-o" size={40} color="green" />;
  return <Icon name="file-o" size={40} color="gray" />;
};
