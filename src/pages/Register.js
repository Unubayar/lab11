import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { collection, addDoc, Timestamp, doc, setDoc, serverTimestamp, } from "firebase/firestore";
import { fireStore } from '../const';
import Input from '../components/Input';
import scale from '../components/scale';
import Contain from '../components/contain';
import Button from '../components/button';
import Back from '../../assets/Back.png';
import moment from 'moment';

export default function Register({ navigation }) {
    const [name, setname] = useState(null)
    const [auth, setAuth] = useState(null)
    const [page, setPage] = useState(null)
    const [date, setDate] = useState(null);
    const [err, setErr] = useState(null)
    const request = async () => {
        var date_regex = /^\d{2} \/ \d{2} \/ \d{4}$/;
        if (name !== null && auth !== null && (!date_regex.test(date)) && page !== null) {
            const publishDate = new Timestamp(moment(date, 'MM / DD / YYYY').toDate().getTime() / 1000, 0);
            const collectionRef = collection(fireStore, 'book');
            const payLoad = {
                name: name,
                author: auth,
                page: page,
                date: publishDate,
            }
            await addDoc(collectionRef, payLoad);
            navigation.pop();
        } else {
            setErr('Оруулсан утга алдаатай')
        }
    }
    return (
        // <Contain>
        <View style={styles.container}>
            <View style={styles.container_inner}>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.pop() }}>
                        <Image source={Back} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <View><Text style={styles.text_mn}>{'Ном бүртгэх'}</Text></View>

                </View>
                <View style={{ display: 'flex' }}>
                    <Input
                        returnKeyType="done"
                        label="Номын нэр"
                        placeholder={'Нэр'}
                        placeholderTextColor={'gray'}
                        hasIcon={true}
                        icon={''}
                        value={name}
                        inputColor={'#000090'}
                        onChangeText={name => setname(name)}
                    />
                    <Input
                        returnKeyType="done"
                        label="Номын зохиолч"
                        placeholder={'Зохиолч'}
                        placeholderTextColor={'gray'}
                        hasIcon={true}
                        icon={''}
                        value={auth}
                        inputColor={'#000090'}
                        style={{ paddingVertical: 20 }}
                        onChangeText={auth => setAuth(auth)}
                    /><Input
                        returnKeyType="done"
                        label="Үйлдвэрлэгдсэн он"
                        placeholder={'XX-XX-XXXX'}
                        placeholderTextColor={'gray'}
                        hasIcon={true}
                        icon={''}
                        value={date}
                        inputColor={'#000090'}
                        onChangeText={date => setDate(date)}
                    /><Input
                        number
                        returnKeyType="done"
                        keyboardType={'numeric'}
                        label="Хэвлэгдсэн хуудас"
                        placeholder={'хуудасын тоо'}
                        placeholderTextColor={'gray'}
                        hasIcon={true}
                        icon={''}
                        value={page}
                        inputColor={'#000090'}
                        style={{ paddingVertical: 30 }}
                        onChangeText={page => setPage(page)}
                    />
                    {err ? <Text>{err}</Text> : null}
                    <View style={styles.btn}>
                        <Button
                            onPress={() => { request() }}
                            title={'Ном бүртгэх'}
                        />
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    text_mn: {
        fontSize: 21,
        fontWeight: "700",
        color: '#000040',
        marginLeft: 80
    },
    marginLeft: { marginLeft: 20 },
    container_inner: {
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
    },
    btn: {
        marginTop: 0
    }
});
