import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MainStyle from '../../assets/style';
export default function index({
    title,
    textStyle,
    style,
    onPress,
    image,
    imageStyle,
    isDisabled,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                style,
                isDisabled ? { backgroundColor: '#DDE3F0' } : null,
            ]}
            onPress={!isDisabled ? onPress : null}>
            {image ? <Image source={image} style={imageStyle} /> : null}
            {title ? (
                <Text
                    style={[
                        MainStyle.buttonText,
                        textStyle,
                        isDisabled ? { color: '#929CB5' } : null,
                    ]}>
                    {title}
                </Text>
            ) : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 1,
        backgroundColor: '#0066FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        // borderRadius: 25,
    },
});
