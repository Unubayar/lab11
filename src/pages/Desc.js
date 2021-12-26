import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native'
import Contain from '../components/contain';
import UIModal from '../components/UIModal';
import { fireStore } from '../const';
import { getFirestore, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import moment from 'moment';
import UIButton from '../components/UIButton'
import Input from '../components/Input';
import Back from '../../assets/Back.png';
const { width, heigh } = Dimensions.get('screen')
const Desc = ({ route, navigation }) => {

    const { book } = route.params;

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editedBook, setEditedBook] = useState(book);
    const [wrongDateFormat, setWrongDateFormat] = useState(false);
    const [dateText, setDateText] = useState(
        moment.unix(book?.date.seconds).format('MM / DD / YYYY'),
    );
    console.log(book?.date.seconds);
    console.log(book.name)

    const checkValue = (str, max) => {
        if (str.charAt(0) !== '0' || str == '00') {
            var num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            str =
                num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                    ? '0' + num
                    : num.toString();
        }
        return str;
    }

    const onDateChange = (input) => {
        if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
        var values = input.split('/').map(function (v) {
            return v.replace(/\D/g, '');
        });
        if (values[0]) values[0] = checkValue(values[0], 12);
        if (values[1]) values[1] = checkValue(values[1], 31);
        var output = values.map(function (v, i) {
            return v.length == 2 && i < 2 ? v + ' / ' : v;
        });
        setDateText(output.join('').substr(0, 14));
    };
    // console.log({ ...editedBook })

    const onSend = async () => {
        var date_regex = /^\d{2} \/ \d{2} \/ \d{4}$/;
        if (!date_regex.test(dateText)) {
            setWrongDateFormat(true);
            return;
        } else {
            setWrongDateFormat(false)
        }
        const publishDate = new Timestamp(moment(dateText, 'MM / DD / YYYY').toDate().getTime() / 1000, 0);
        // console.log({ ...editedBook, publishDate }, '=============')
        const docRef = doc(fireStore, 'book', editedBook.id)
        await updateDoc(docRef,
            {
                ...editedBook,
                // publishDate
            })
        setEditModal(false)
        navigation.pop();
    }
    const onDelete = async () => {
        const docRef = doc(fireStore, 'book', editedBook.id)
        await deleteDoc(docRef)
        setEditModal(false)
        navigation.pop()
    }
    const EditForm = () => {
        return (
            <>
                <Input
                    label={'Name'}
                    style={{ width: width / 1.3 }}
                    value={editedBook.name}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Нэр"
                    onChangeText={text => setEditedBook({ ...editedBook, name: text })}
                />
                <Input
                    label={'Author'}
                    style={{ width: width / 1.3 }}
                    value={editedBook.author}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Зохиолч"
                    onChangeText={text => setEditedBook({ ...editedBook, author: text })}
                />
                <Input
                    label={'Page Count'}
                    style={{ width: width / 1.3 }}
                    value={editedBook.page}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                    placeholder="Хуудсийн тоо"
                    onChangeText={text => setEditedBook({ ...editedBook, page: text })}
                />
                <Input
                    label={'Publish date'}
                    style={{ width: width / 1.3 }}
                    value={dateText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Хэвлэгдсэн огноо"
                    onChangeText={onDateChange}
                />
                {wrongDateFormat && <Text style={styles.warning}>Огноо алдаатай утгатай байна</Text>}
            </>
        );
    };
    return (
        <Contain style={{ backgroundColor: '#f2f2f2' }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <Image source={Back} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, alignItems: 'center', paddingHorizontal: 10 }}>{book?.name}-ын дэлгэрэнгүй</Text>
            </View>
            <View style={styles.container}>
                <Text>Киноны нэр: <Text style={styles.desc_mn}>{book?.name}</Text></Text>
                <Text >Зохиолчын нэр: <Text style={styles.desc_mn}>{book?.author}</Text></Text>
                <Text >Хэвлэсэн он: <Text style={styles.desc_mn}>{moment.unix(book?.date.seconds).format('MM/DD/YYYY')}</Text></Text>

                <Text>Хуудсын тоо: <Text style={styles.desc_mn}>{book?.page}</Text></Text>
            </View>
            <View style={styles.row}>
                <UIButton
                    title="Өөрчилөх"
                    type="secondary"
                    style={{ marginRight: 12 }}
                    onPress={() => setEditModal(true)}
                />
                <UIButton title="Устгах" type="danger" onPress={() => setDeleteModal(true)} />
            </View>
            <UIModal
                visible={deleteModal}
                title="Анхааруулга"
                body={`"${book.name}" номыг усгахдаа итгэлтэй байна уу?`}
                okTitle="Устга"
                onOk={onDelete}
                cancelTitle="Буцах"
                onCancel={() => setDeleteModal(false)}
            />
            <UIModal
                visible={editModal}
                title="Номын мэдээлэл өөрчилөх"
                bodyComponent={EditForm}
                okTitle="Илгээх"
                onOk={onSend}
                cancelTitle="Буцах"
                onCancel={() => setEditModal(false)}
            />
        </Contain >
    )
}
export default Desc;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: '#FFFF',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'center',
    },
    desc_mn: {
        color: '#2E28D4', fontWeight: '700', fontSize: 18
    }
})
