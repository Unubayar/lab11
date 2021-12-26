import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

export default function Contain({ children, style }) {
    return (
        <SafeAreaView style={[styles.fullScreen]}>
            <View style={[styles.fullScreen, style,]}>
                {children}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
})
