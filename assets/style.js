import { Dimensions, StyleSheet, Platform } from 'react-native';
import scale from '../src/components/scale';

const { width, height } = Dimensions.get('window');

export default styles = {
    //IMAGE
    logo: {
        height: scale(100),
        width: scale(200),
        resizeMode: 'contain'
    },
    back: {
        height: scale(100),
        width: (50),
        resizeMode: 'contain'
    },
    logo_cont: {
        // justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: scale(2)
    },
    //ICON
    icon_10: {
        height: scale(10),
        width: scale(10),
        resizeMode: 'contain'
    },
    icon_13: {
        height: scale(13),
        width: scale(13),
        resizeMode: 'contain'
    },
    icon_16: {
        height: scale(16),
        width: scale(16),
        resizeMode: 'contain'
    },
    icon_20: {
        height: scale(20),
        width: scale(20),
        resizeMode: 'contain'
    },
    icon_22: {
        height: scale(22),
        width: scale(22),
        resizeMode: 'contain'
    },
    icon_28: {
        height: scale(28),
        width: scale(28),
        resizeMode: 'contain'
    },
    icon_24: {
        height: scale(24),
        width: scale(24),
        resizeMode: 'contain'
    },
    icon_36: {
        height: scale(36),
        width: scale(36),
        resizeMode: 'contain'
    },
    icon_40: {
        height: scale(40),
        width: scale(40),
        resizeMode: 'contain'
    },
    icon_50: {
        height: scale(50),
        width: scale(50),
        resizeMode: 'contain'
    },
    icon_60: {
        height: scale(60),
        width: scale(60),
        resizeMode: 'contain'
    },
    icon_120: {
        height: scale(120),
        width: scale(120),
        resizeMode: 'contain'
    },
    icon_150: {
        height: scale(150),
        width: scale(150),
        resizeMode: 'contain'
    },
    icon_180: {
        height: scale(180),
        width: scale(180),
        resizeMode: 'contain'
    },
    icon_75: {
        height: scale(4),
        width: scale(75),
        resizeMode: 'contain'
    },
    logo_white: {
        height: scale(100),
        width: '95%',
        resizeMode: 'cover',
    },
    backg: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    /**FONT*/
    h1: {
        lineHeight: scale(36),
        fontSize: scale(30),
        fontWeight: '700',
        // fontFamily: Bold,
    },
    h2: {
        lineHeight: scaleSize(30),
        fontSize: scaleSize(22),
        fontWeight: '700',
        // fontFamily: Bold
    },
    h3: {
        lineHeight: scaleSize(24),
        fontSize: scaleSize(16),
        fontWeight: '700',
        // fontFamily: Bold
    },
    h4: {
        lineHeight: scaleSize(20),
        fontSize: scaleSize(14),
        fontWeight: '700',
        // fontFamily: Bold
    },
    h5: {
        lineHeight: scaleSize(16),
        fontSize: scaleSize(12),
        fontWeight: '700',
        // fontFamily: Bold
    },
    h6: {
        lineHeight: scaleSize(16),
        fontSize: scaleSize(10),
        fontWeight: '700',
        // fontFamily: Bold
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 24,
        color: '#fff',
        textAlign: 'center',
    },

}