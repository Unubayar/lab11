import { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native'
import Button from '../components/button'
import Contain from '../components/contain';
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { fireStore } from '../const';
import Search from '../../assets/search.png';
import Input from '../components/Input';
import UIModal from '../components/UIModal';
const { width, height } = Dimensions.get('screen');

const Home = ({ navigation }) => {
    const [book, setBook] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('')
    const [searchModal, setSearchModal] = useState(false);
    useEffect(() => {
        (async () => {
            const snapshot = await getDocs(collection(fireStore, 'book'));
            const arr = [];
            snapshot.docs.forEach(s => {
                arr.push({ ...s.data(), id: s.id });
                setBook(arr);
                setFilteredBooks(arr);
            })
        })();
        return () => {
            snapshot();
        }
    }, [])
    // useEffect(() => {
    //     // await snapshot();
    //     return () => {
    //         const snapshot = getDocs(collection(fireStore, 'book'));
    //         const arr = [];
    //         snapshot.forEach(s => {
    //             arr.push({ ...s.data(), id: s.id });
    //             setBook(arr);
    //             setFilteredBooks(arr);
    //         })
    //             ();
    //     }
    // }, [])
    console.log(book)

    const search = () => {
        if ((bookName == null || bookName === '') && (bookAuthor == null || bookAuthor === '')) {
            setBookAuthor('')
            setBookName('')
            setSearchModal(false)
            return;
        }
        let sBooks = []
        book.forEach(el => {
            if (el.name.toLowerCase().indexOf(bookName) !== -1 && el.author.toLowerCase().indexOf(bookAuthor) !== -1) {
                sBooks.push(el);
            }
        })
        setFilteredBooks(sBooks);
        setBookAuthor('')
        setBookName('')
        setSearchModal(false);
    }
    const SearchForm = () => {
        return (
            <>
                <Input
                    style={{ width: width / 1.4 }}
                    value={bookName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Нэр"
                    onChangeText={text => setBookName(text.toLowerCase())}
                />
                <Input
                    style={{ width: width / 1.4 }}
                    value={bookAuthor}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Зохиолч"
                    onChangeText={text => setBookAuthor(text)}
                />
            </>
        );
    };
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[
                styles.item,
                index === 0 && styles.firstItem,
                index === book.length - 1 && styles.lastItem,
            ]} onPress={() => navigation.navigate('Desc', { book: item })}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style>{index + 1})</Text>
                    <Text style={{ paddingHorizontal: 10 }}>
                        {item.name}
                    </Text></View>
            </TouchableOpacity>
        );
    };
    return (
        <Contain>
            <View style={styles.conatiner}>
                <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text>         </Text>
                    <Text style={styles.text_mn}>{'Номны жагсаалт'}</Text>
                    <TouchableOpacity onPress={() => setSearchModal(true)}>
                        <Image source={Search} style={{ width: 30, height: 30, marginBottom: 15, }} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ height: height / 2.5 }}> */}
                {book.length !== 0 ? <FlatList data={filteredBooks} renderItem={renderItem} /> : <Text style={{ marginVertical: 20, fontSize: 18, color: 'red' }}>Хоосон</Text>}
                {/* </View> */}
                <UIModal
                    visible={searchModal}
                    title="Номын мэдээлэл өөрчилөх"
                    bodyComponent={SearchForm}
                    okTitle="Хайх"
                    onOk={search}
                    cancelTitle="Буцах"
                    onCancel={() => setSearchModal(false)}
                />
                <Button
                    onPress={() => { navigation.navigate('Register') }}
                    title={'Бүртгэх'}
                />
                <Button onPress={() => {
                    setFilteredBooks(book);
                }}
                    style={{ marginVertical: 20 }}
                    title={'Бүх жагсаалтыг харах'} />
            </View>
        </Contain>
    )
}

export default Home

const styles = StyleSheet.create({
    conatiner: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: 'pink'
    },
    text_mn: {
        fontSize: 28,
        fontWeight: "700",
        color: '#000040',
        paddingBottom: 20
    },
    item: {
        backgroundColor: '#FFF',
        marginVertical: 3,
        borderRadius: 12,
        padding: 16,
        width: width / 1.3,
    },
    lastItem: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
})
