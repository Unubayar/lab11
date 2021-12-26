import React from 'react';
import { Modal, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import UIButton from './UIButton';

const UIModal = ({
    visible,
    title,
    body,
    onOk,
    onCancel,
    okTitle,
    cancelTitle,
    bodyComponent = () => { },
}) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <SafeAreaView style={css.view}>
                <View style={css.inner}>
                    <Text style={css.title}>{title}</Text>
                    {body && <Text style={css.body}>{body}</Text>}
                    {bodyComponent && bodyComponent()}
                    <View style={css.btnContainer}>
                        <UIButton
                            type="primary"
                            title={okTitle}
                            onPress={onOk}
                            style={{ marginRight: 12 }}
                        />
                        <UIButton type="secondary" title={cancelTitle} onPress={onCancel} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default UIModal;

const css = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 24,
        width: '90%',
        borderRadius: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        // width: "60%",
        justifyContent: 'center',
    },
    btn: {
        width: '40%',
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
    },
    body: {
        fontSize: 14,
        width: '100%',
        textAlign: 'center',
    },
});