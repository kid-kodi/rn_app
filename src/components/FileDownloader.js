import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';
import ImagePath from '../constants/ImagePath';

export default function FileDownloader({fileUrl, fileName}) {
  const downloadFile = async () => {
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      // Télécharger le fichier
      await RNFS.downloadFile({fromUrl: fileUrl, toFile: localFilePath})
        .promise;
      console.log('Fichier téléchargé à:', localFilePath);

      // Partager le fichier téléchargé
      await Share.open({
        url: `file://${localFilePath}`,
        type: 'application/*',
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement ou du partage :', error);
    }
  };

  const downloadAndOpenFile = async () => {
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    console.log(fileUrl);

    try {
      // Download the file
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl.uri,
        toFile: localFilePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        console.log('File downloaded successfully:', localFilePath);

        // Open the file based on its type
        await FileViewer.open(localFilePath, {
          showOpenWithDialog: true,
        });
      } else {
        throw new Error('Failed to download the file.');
      }
    } catch (error) {
      console.error('Error opening the file:', error);
      Alert.alert('Error', 'Could not open the file. Please try again.');
    }
  };

  const getFileIcon = () => {
    if (fileName.endsWith('.pdf')) return ImagePath.icPdf;
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx'))
      return ImagePath.icWord;
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx'))
      return ImagePath.icExcel;
    return ImagePath.icGenericFile; // Default icon for other types
  };

  return (
    <View style={styles.fileContainer}>
      <Image source={getFileIcon()} style={styles.icon} />
      <View style={styles.details}>
        <Text>{fileName}</Text>
        <TouchableOpacity onPress={downloadAndOpenFile}>
          <Text style={styles.downloadText}>Télécharger et ouvrir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  downloadText: {
    color: '#007bff',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
