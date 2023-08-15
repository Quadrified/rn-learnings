import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export const downloadFile = (uri, requestPermission, callback) => {
  let filename = uri?.split('/');
  filename = filename?.[filename?.length - 1];
  let fileUri = FileSystem.documentDirectory + filename;

  FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
      saveFile(uri, requestPermission, callback);
    })
    .catch((error) => {
      callback();
      console.log('>>>Error downloading file<<<', error);
      Alert.alert(
        "Couldn't Download Certificate",
        "Having 7+ certificates gets you noticed by Learntube's 900+ hiring partners",
        [{ text: 'Try Again' }]
      );
    });
};

const saveFile = async (fileUri, requestPermission, callback) => {
  try {
    const permission = await requestPermission();

    if (!permission?.canAskAgain || permission?.status === 'denied') {
      callback();
    } else if (permission?.granted) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Certificates', asset, false);
      callback();
      Alert.alert(
        'Certificate Downloaded',
        'Having 4+ certificates puts your job application in the top 10%',
        [{ text: 'Done' }]
      );
    }
  } catch (error) {
    callback();
    console.log('>>>Error saving file<<<', error);
    Alert.alert(
      "Couldn't Download Certificate",
      "Having 7+ certificates gets you noticed by Learntube's 900+ hiring partners",
      [{ text: 'Try Again' }]
    );
  }
};

export const uploadFile = async (requestPermission, callback) => {
  try {
    const { granted } = await requestPermission();

    if (granted) {
      const image = await ImagePicker.launchImageLibraryAsync();

      if (!image?.cancelled) {
        callback(image?.uri);
      }
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', "Couldn't upload photo");
  }
};
