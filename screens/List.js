import * as React from 'react';
import getTheme from '../native-base-theme/components';
import Custom from '../native-base-theme/variables/custom';
import {
  Container,
  Content,
  Body,
  StyleProvider,
  Icon,
  Button,
  Header,
  List,
  ListItem,
  Text,
  Title,
  Left
} from 'native-base';

import store from '../redux/store';
import {SafeAreaView, StyleSheet, ScrollView, View,   Image} from 'react-native';
import PersonRepository from '../repositories/person';
import {useState} from 'react';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  photo: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 35,
  },
});

export default function Lista(props) {
  const [people, setPeople] = useState([]);

  const retrieveData = () => {
    const repository = new PersonRepository();
    repository.Retrieve((tx, results) => {
      
      let data = [];

      for (let i = 0; i < results.rows.length; i++) {
        data.push(results.rows.item(i));
      }

      setPeople(data);
    });
  };

  React.useEffect(() => {
    retrieveData();
  }, []);

  return (
    <StyleProvider style={getTheme(Custom)}>
      <SafeAreaView style={styles.safeArea}>
        <Container style={styles.container}>
          <Header>
            <Body>
              <Title>Pessoas</Title>
            </Body>
          </Header>
          <Content style={styles.content}>
            <ScrollView style={styles.scrollView}>
              <List>
                {people.map((person, index) => (
                  <ListItem key={`person-${index}`}>
                    <Left>
                      <Image
                        style={styles.photo}
                        source={{uri: `data:image/png;base64,${person.photo}`}}
                      />
                    </Left>
                    <Body>
                      <Text>{person.name}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </ScrollView>
          </Content>
        </Container>

        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: 25,
          }}>
          <Button
            rounded
            dark
            style={{
              height: 50,
              width: 50,
            }}
            onPress={() => {             
              const navigation = props.navigation;
              navigation.navigate('Form');

            }}>
            <Icon type="FontAwesome" name="plus" />
          </Button>
        </View>
      </SafeAreaView>
    </StyleProvider>
  );
}
