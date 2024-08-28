/* eslint-disable */
import React from 'react';
import BaseToast from './base';
import {icons} from '../assets';
import colors from '../colors';

interface ErrorToastProps {
  // Define any additional props specific to ErrorToast if needed
  onClose: () => void;
  text1: string;
  text2: string;
}

const ErrorToast: React.FC<ErrorToastProps> = (props: ErrorToastProps) => {
  return <BaseToast {...props} color={colors.blazeOrange} icon={icons.error} />;
};
export default ErrorToast;
