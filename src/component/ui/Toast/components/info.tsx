/* eslint-disable */
import React from 'react';
import BaseToast from './base';
import {icons} from '../assets';
import colors from '../colors';

interface InfoToastProps {
  // Define any additional props specific to ErrorToast if needed
  onClose: () => void;
  text1: string;
  text2: string;
}

const InfoToast: React.FC<InfoToastProps> = (props: InfoToastProps) => {
  return <BaseToast {...props} color={colors.lightSkyBlue} icon={icons.info} />;
};
export default InfoToast;
