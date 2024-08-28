import {Pressable} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticatedParamList} from 'src/router/Authenticated';
import styles from './style';

type ImagePreviewProps = NativeStackScreenProps<
  AuthenticatedParamList,
  'ImagePreview'
>;

const ImagePreview = ({navigation, route}: ImagePreviewProps) => {
  const {image} = route.params;

  return (
    <Pressable style={styles.container} onPress={() => navigation.goBack()}>
      <Animated.Image
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
        sharedTransitionTag="preview_chat_image"
      />
    </Pressable>
  );
};

export default ImagePreview;
