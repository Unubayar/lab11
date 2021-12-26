import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import MainStyles from '../../assets/style';
import scale from './scale';

export default function Input({ ...props }) {
    const { colors } = useTheme();
    const [toggleSecure, settoggleSecure] = useState(false);
    const isSecure = toggleSecure ? false : props.secure;
    const inputType = props.email
        ? "email-address"
        : props.number
            ? "numeric"
            : props.phone
                ? "phone-pad"
                : "default";
    function Label() {
        return (
            <Text style={[styles.h4, { color: '#000040' }]}>{(props.label) ? props.label : ''}</Text>
        );
    }
    function Icon() {
        if (props.hasIcon) {
            return (
                <TouchableOpacity onPress={() => { (props.onIconPress) ? props.onIconPress() : null }}>
                    <Image source={(props.icon) ? props.icon : colors.profile_circle} style={[styles.icon_24]} />
                </TouchableOpacity>
            );
        }
        return null;
    }
    function Secure() {
        if (props.secure) {
            return (
                <TouchableOpacity style={[styles.center]} onPress={() => { settoggleSecure(!toggleSecure) }}>
                    <Image
                        style={[styles.icon_24]}
                        source={(!toggleSecure) ? colors.eye_off : colors.eye_on}
                    />
                </TouchableOpacity>
            );
        }
        return null;
    }
    const Error = () => {
        if (props.error) {
            return (
                <Text style={[styles.bodySmall, { color: colors.highligth_b }]}>{props.error}</Text>
            )
        }
        return null;
    }
    return (
        <View style={[styles.container, props.style]}>
            <Label />
            <View style={[styles.inside_cont, { borderColor: props.inputColor }]}>
                <TextInput
                    {...props}
                    keyboardType={inputType}
                    secureTextEntry={isSecure}
                    returnKeyType="done"
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.gray}
                    style={[styles.bodyMedium, styles.flex1, { color: 'gray', padding: 15 }]}
                />
                <Icon />
                <Secure />
            </View>
            <Error />
        </View>
    );
}
const styles = StyleSheet.create({
    ...MainStyles,
    container: {
        paddingVertical: scale(10),
    },
    inside_cont: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: scale(24),
        alignItems: 'center'
    }

})