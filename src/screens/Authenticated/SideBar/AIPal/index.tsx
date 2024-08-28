import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Keyboard,
  Alert,
  TextInput,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/reduxToolkit/store';
import {setGptVersion} from 'src/reduxToolkit/rootSlice';
import {
  Color,
  Constants,
  copytoClipboard,
  fileToGenerativePart,
  GeminiConfig,
  Strings,
} from 'src/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {HeaderDropDown, Shimmer} from 'src/component';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from 'src/router/DrawerNavigation';
import Markdown from 'react-native-markdown-display';
import database from '@react-native-firebase/database';
import Routes from 'src/router/Routes';
import {Message, Role} from 'src/utils/interfaces';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthenticatedParamList} from 'src/router/Authenticated';
import type {Content} from '@google/generative-ai';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import {markdownStyles} from 'src/utils/markdownStyles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {SHIMMER_COLOR} from 'src/utils/Constants';
import storage from '@react-native-firebase/storage';

type HomeProps = DrawerScreenProps<
  DrawerParamList & AuthenticatedParamList,
  'AIPal'
>;
const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const AIPal = ({navigation, route}: HomeProps) => {
  const dispatch = useDispatch();
  const id = route.params?.chatRoomId;
  const {user, gptVersion} = useSelector((state: RootState) => state?.app);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(
    null,
  );
  const [isHighlightedImage, setIsHighlightedImage] = useState<boolean>(false);
  const expanded = useSharedValue(0);
  const [chatId, _setChatId] = useState(id);
  const chatIdRef = useRef(chatId);
  const setChatId = (id: string) => {
    chatIdRef.current = id;
    _setChatId(id);
  };

  const {genAI, generationConfig} = GeminiConfig();
  const model = useMemo(
    () =>
      genAI.getGenerativeModel({
        model: gptVersion,
        generationConfig,
      }),
    [gptVersion],
  );

  const chat = useMemo(
    () =>
      model.startChat({
        generationConfig,
        history: chatHistory,
      }),
    [model, chatHistory],
  );

  useEffect(() => {
    if (route.params?.image) {
      setSelectedImage(route.params?.image);
    }
  }, [route.params?.image]);

  useEffect(() => {
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);
    Tts.setDefaultLanguage('en-IN');
    Tts.addEventListener('tts-finish', () => {
      setCurrentlySpeaking(null);
      Tts.stop();
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (chatId) {
      const chatRef = database().ref('chats').child(chatId);
      chatRef
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            const messagesData = snapshot.val();
            const messagesArray = Object.values(messagesData ?? {}).sort(
              (a: any, b: any) => a.timestamp - b.timestamp,
            ) as Message[];
            setMessages([...messagesArray]);
            setChatHistoryFetch(messagesArray);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching chat data:', error);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId) {
      const chatRef = database().ref('chats').push();
      const chatRoomKey = chatRef.key as string;
      setChatId(chatRoomKey);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      collapseItems();
    }
  }, [selectedImage]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderDropDown
          title="AIPal"
          items={[
            {
              key: 'gemini-1.5-flash-latest',
              title: 'Gemini-1.5-Flash',
              icon: 'bolt',
            },
            {key: 'gemini-pro', title: 'Gemini-pro', icon: 'sparkles'},
          ]}
          onSelect={onGptVersionChange}
          selected={gptVersion}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Routes.AIPal, {
              chatRoomId: '',
            })
          }>
          <Ionicons
            name="create-outline"
            size={24}
            color={Color.WHITE}
            style={styles.newIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [gptVersion, navigation]);

  const setChatHistoryFetch = (data: Message[]) => {
    if (data) {
      data.map((item: Message) => {
        setChatHistory(prevHistory => [
          ...prevHistory,
          {role: item.role, parts: [{text: item.text}]},
        ]);
      });
    }
  };

  const handleGotoBottom = useCallback(() => {
    flatListRef.current?.scrollToEnd({animated: true});
  }, []);

  const updateChatHistory = async (role: string, content: string) => {
    setChatHistory(prevHistory => [
      ...prevHistory,
      {
        role: role,
        parts: [{text: content}],
      },
    ]);
  };

  const storeMessage = useCallback(
    async (role: Role, message: string, image?: string) => {
      const chatRef = database().ref(`chats/${chatIdRef.current}`);
      chatRef.push({
        role,
        text: message,
        image: image ?? undefined,
        timestamp: database.ServerValue.TIMESTAMP,
      });
    },
    [chatIdRef],
  );

  const botResponse = async () => {
    if (!userInput) return;
    storeMessage(Role.User, userInput);
    updateChatHistory(Role.User, userInput);
    handleGotoBottom();
    try {
      const prompt = userInput;

      setUserInput('');

      const result = await chat.sendMessage(prompt);
      const responseMessage = result.response.text();
      const botMessage: Message = {
        text: responseMessage,
        role: Role.Model,
        loading: false,
      };

      setMessages(prevMessages =>
        prevMessages.map(msg => (msg.loading ? botMessage : msg)),
      );

      if (responseMessage) {
        storeMessage(Role.Model, responseMessage);
        updateChatHistory(Role.Model, responseMessage);
      }
    } catch (error: any) {
      console.log('Error while chat [Bot Chat] ====> ', error);
    }
  };

  const imageResponse = async () => {
    if (!selectedImage) return;
    storeMessage(Role.User, userInput, selectedImage);
    updateChatHistory(Role.User, userInput);
    handleGotoBottom();
    try {
      const prompt = isHighlightedImage
        ? Constants.CustomImagePrompt
        : userInput;

      setUserInput('');
      setSelectedImage(null);
      setIsHighlightedImage(false);

      const image = await fileToGenerativePart(selectedImage, 'image/png');
      const result = await model.generateContent([prompt, image]);
      const responseMessage = result.response.text();
      const botMessage: Message = {
        text: responseMessage,
        role: Role.Model,
        loading: false,
      };

      setMessages(prevMessages =>
        prevMessages.map(msg => (msg.loading ? botMessage : msg)),
      );

      if (responseMessage) {
        storeMessage(Role.Model, responseMessage);
        updateChatHistory(Role.Model, responseMessage);
      }
    } catch (error: any) {
      console.error('Error while chat [Image Chat] ======> ', error);
    }
  };

  const startChat = useCallback(async () => {
    if (!userInput) return;
    try {
      Keyboard.dismiss();

      const userMessage: Message = {
        role: Role.User,
        text: userInput,
        image: selectedImage!,
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const loadingMessage: Message = {
        text: '',
        role: Role.Model,
        loading: true,
      };
      setMessages(prevMessages => [...prevMessages, loadingMessage]);

      if (selectedImage) {
        await imageResponse();
      } else {
        await botResponse();
      }
      await database()
        .ref(`users/${user?.uid}/chatsRoom/${chatIdRef.current}`)
        .set({
          chatId: chatIdRef.current,
          lastUserMessage: userInput,
        });
    } catch (error: any) {
      console.error('Error while chat [Start Chat] ======> ', error);
    }
  }, [userInput, selectedImage, botResponse, imageResponse, user?.uid]);

  const onGptVersionChange = useCallback(
    (key: string) => {
      dispatch(setGptVersion(key));
    },
    [dispatch],
  );

  const startSpeechHandler = async (text: string, messageId: string) => {
    if (currentlySpeaking === messageId) {
      Tts.stop();
      setCurrentlySpeaking(null);
    } else {
      setCurrentlySpeaking(messageId);
      Tts.stop();
      Tts.speak(Constants.removeMarkdown(text));
    }
  };

  const expandItems = useCallback(() => {
    expanded.value = withTiming(1, {duration: 150});
  }, [expanded]);

  const collapseItems = useCallback(() => {
    expanded.value = withTiming(0, {duration: 150});
  }, [expanded]);

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 70],
      Extrapolation.CLAMP,
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  const openImagePicker = useCallback(() => {
    if (gptVersion === 'gemini-pro') {
      Alert.alert(
        'Image Generation Not Supported in Gemini Pro',
        Strings.imageNotSupportedModel,
      );
      return;
    }
    setIsImageLoading(true);
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.5,
        },
        response => {
          if (response.assets) {
            setSelectedImage(response.assets[0].uri as string);
          }
          setIsImageLoading(false);
        },
      );
    } catch (error) {
      console.log('Error in Image Picker :: ', error);
      setIsImageLoading(false);
    }
  }, [gptVersion]);

  const renderMessages = useCallback(
    ({item, index}: {item: Message; index: number}) => {
      const isUser = item.role === Role.User;
      const showPlayIcon =
        !currentlySpeaking || currentlySpeaking !== `${index}`;
      const iconName = showPlayIcon
        ? 'play-circle-outline'
        : 'stop-circle-outline';

      return (
        <View style={styles.messageBox}>
          <Image
            source={
              isUser
                ? {uri: 'https://galaxies.dev/img/meerkat_2.jpg'}
                : require('src/assets/images/logo-dark.png')
            }
            style={styles.logo}
          />
          <View style={styles.messageContainer}>
            {isUser && <Text style={styles.user}>You</Text>}
            {item.image && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(Routes.ImagePreview, {
                    image: item.image,
                  })
                }>
                <Animated.Image
                  source={{uri: item.image}}
                  style={styles.image}
                  resizeMode="cover"
                  sharedTransitionTag="preview_chat_image"
                />
              </TouchableOpacity>
            )}

            {!isUser && !item.loading && (
              <View style={styles.responseHeader}>
                <TouchableOpacity
                  style={styles.responseIcon}
                  onPress={() => copytoClipboard(item.text)}>
                  <Ionicons
                    name="copy-outline"
                    size={22}
                    color={Color.SELECTED}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.responseIcon}
                  onPress={() => startSpeechHandler(item.text, `${index}`)}>
                  <Ionicons name={iconName} size={22} color={Color.SELECTED} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.message}>
              {item.loading ? (
                <View style={styles.skeleton}>
                  {[0, 1, 2].map((_, index) => (
                    <ShimmerPlaceholder
                      LinearGradient={LinearGradient}
                      key={index}
                      shimmerStyle={[
                        styles.skeletonStyle,
                        {
                          width: index == 2 ? '70%' : '100%',
                        },
                      ]}
                      shimmerColors={SHIMMER_COLOR}
                      height={15}
                    />
                  ))}
                </View>
              ) : (
                <Markdown style={markdownStyles}>{item.text}</Markdown>
              )}
            </View>
          </View>
        </View>
      );
    },
    [gptVersion, navigation, currentlySpeaking],
  );

  const messageInput = () => (
    <View
      style={[
        styles.inputContainer,
        {
          alignItems: selectedImage ? 'flex-end' : 'center',
        },
      ]}>
      <ATouchableOpacity
        activeOpacity={0.7}
        onPress={expandItems}
        style={styles.inputIcon}>
        <Ionicons name="add-circle-outline" size={25} color={Color.WHITE} />
      </ATouchableOpacity>
      <Animated.View style={[styles.iconContainer, buttonViewStyle]}>
        <TouchableOpacity activeOpacity={0.7} onPress={openImagePicker}>
          <Ionicons name="image-outline" size={25} color={Color.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(Routes.CameraView, {
              setImage: setSelectedImage,
              setIsHighlightedImage,
            })
          }>
          <Ionicons name="camera-outline" size={25} color={Color.WHITE} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.inputWrapper}>
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Ionicons
              name="close-circle"
              size={20}
              color={Color.WHITE}
              style={styles.icon}
              onPress={() => setSelectedImage(null)}
            />
            <Image
              source={{uri: selectedImage}}
              style={styles.inputImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.inputPanel}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor={Color.GREY_LIGHT}
            value={userInput}
            onChangeText={setUserInput}
            onPressIn={collapseItems}
            multiline
          />
          {isImageLoading && (
            <ActivityIndicator size="small" color={Color.TEXT_SECONDARY} />
          )}
        </View>
      </View>

      <View style={styles.sendButton}>
        {userInput.length > 0 ? (
          <TouchableOpacity onPress={startChat}>
            <Ionicons name="arrow-up-circle" size={25} color={Color.SKY} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={25} color={Color.SKY} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const emptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        {loading ? (
          <Shimmer />
        ) : (
          <Image
            source={require('src/assets/images/logo-dark.png')}
            style={[styles.gptLogo, styles.emtyTop]}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={emptyContainer}
        contentContainerStyle={styles.contentContainer}
      />
      {messageInput()}
    </View>
  );
};

export default AIPal;


