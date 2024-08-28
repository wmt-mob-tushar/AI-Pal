/* eslint-disable */
import React from 'react';
import BaseToast from './base';
import {icons} from '../assets';
import colors from '../colors';

interface SuccessToastProps {
  // Define any additional props specific to ErrorToast if needed

  onClose: () => void;
  text1: string;
  text2: string;
}

const SuccessToast: React.FC<SuccessToastProps> = (
  props: SuccessToastProps,
) => {
  return <BaseToast {...props} color={colors.mantis} icon={icons.success} />;
};
export default SuccessToast;
