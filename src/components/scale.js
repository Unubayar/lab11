import { Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseRatio = 2.165;
const ratio = WINDOW_HEIGHT / WINDOW_WIDTH;
export default scaleSize = size => size / (guidelineBaseRatio / ratio);