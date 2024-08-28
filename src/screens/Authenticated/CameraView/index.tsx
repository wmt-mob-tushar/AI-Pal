import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  SkPath,
  PaintStyle,
} from '@shopify/react-native-skia';
import ViewShot from 'react-native-view-shot';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {Color} from 'src/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticatedParamList} from 'src/router/Authenticated';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';

type CameraViewProps = NativeStackScreenProps<
  AuthenticatedParamList,
  'CameraView'
>;

const CameraView = ({navigation, route}: CameraViewProps) => {
  const {setImage, setIsHighlightedImage} = route.params;
  const viewShotRef = useRef(null as any);
  const camera = useRef<Camera>(null);
  const [paths, setPaths] = useState<SkPath[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath>();
  const [startPoint, setStartPoint] = useState({x: 0, y: 0});
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, Templates.Instagram);
  const [paintEnabled, setPaintEnabled] = useState(false);
  const [granted, setGranted] = useState(false);
  const {requestPermission} = useCameraPermission();

  useEffect(() => {
    (async () => {
      const result = await requestPermission();
      setGranted(result);
      if (!result) {
        navigation.goBack();
      }
    })();
  }, []);

  const paint = useMemo(() => {
    const p = Skia.Paint();
    p.setStyle(PaintStyle.Stroke);
    p.setStrokeWidth(5);
    p.setColor(Skia.Color(Color.LITE_GREEN));
    return p;
  }, []);

  const takeScreenshot = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        setImage(uri);
        setIsHighlightedImage(true);
        navigation.goBack();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleTouchStart = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;
    setStartPoint({x: locationX, y: locationY});
    const newPath = Skia.Path.Make();
    newPath.moveTo(locationX, locationY);
    setCurrentPath(newPath);
  };

  const handleTouchMove = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;
    if (currentPath) {
      currentPath.lineTo(locationX, locationY);
      setCurrentPath(currentPath.copy());
    }
  };

  const handleTouchEnd = () => {
    if (currentPath) {
      currentPath.lineTo(startPoint.x, startPoint.y);
      currentPath.close();
      setPaths([...paths, currentPath]);
      setCurrentPath(undefined);
      if (isShapeComplete(currentPath)) {
        takeScreenshot();
      } else {
        eraseAll();
      }
    }
  };

  const isShapeComplete = (path: SkPath) => {
    // For simplicity, let's assume the shape is complete if it has more than 3 points
    return path.countPoints() > 4;
  };

  const tackPhoto = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        setImage(`file://${photo.path}`);
        navigation.goBack();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const eraseAll = () => {
    setPaths([]);
    setCurrentPath(undefined);
  };

  const captureButton = () => {
    return (
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity style={styles.drawingButton} onPress={eraseAll}>
          <Icon name="refresh-outline" size={20} color={Color.DARK} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCaptureButton}
          activeOpacity={0.7}
          onPress={tackPhoto}>
          <View style={styles.innerCircle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawingButton}
          onPress={() => setPaintEnabled(!paintEnabled)}>
          <Icon
            name={paintEnabled ? 'brush' : 'brush-outline'}
            size={20}
            color={Color.DARK}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {granted && device && (
        <>
          <ViewShot
            ref={viewShotRef}
            options={{
              format: 'png',
              quality: 0.9,
              handleGLSurfaceViewOnAndroid: true,
            }}
            style={styles.container}>
            <Camera
              ref={camera}
              photo={true}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              format={format}
              enableZoomGesture={true}
            />
            {paintEnabled && (
              <Canvas
                style={styles.canvas}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                {paths.map((path, index) => (
                  <Path key={index} path={path} paint={paint} />
                ))}
                {currentPath && <Path path={currentPath} paint={paint} />}
              </Canvas>
            )}
          </ViewShot>
          {captureButton()}
        </>
      )}
    </View>
  );
};

export default CameraView;
