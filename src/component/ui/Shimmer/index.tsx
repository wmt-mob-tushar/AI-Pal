import {View, ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SHIMMER_COLOR} from 'src/utils/Constants';
import styles from './style';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Shimmer = () => (
    <ScrollView style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <View style={styles.chatContainer} key={index}>
          <ShimmerPlaceholder
            shimmerStyle={styles.image}
            shimmerColors={SHIMMER_COLOR}
          />
          <View style={styles.chat}>
            {index === 2 && (
              <ShimmerPlaceholder
                shimmerStyle={styles.chatimage}
                shimmerColors={SHIMMER_COLOR}
              />
            )}
            <ShimmerPlaceholder
              shimmerStyle={styles.line}
              shimmerColors={SHIMMER_COLOR}
            />
            <ShimmerPlaceholder
              shimmerStyle={styles.line}
              shimmerColors={SHIMMER_COLOR}
            />
            <ShimmerPlaceholder
              // eslint-disable-next-line react-native/no-inline-styles
              shimmerStyle={[styles.line, {width: '80%'}]}
              shimmerColors={SHIMMER_COLOR}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );

export default Shimmer;
