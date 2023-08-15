import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
