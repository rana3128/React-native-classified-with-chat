import { View, Text, StyleSheet, Button, ScrollView ,FlatList,TouchableOpacity} from "react-native";
import React,{useEffect,useState} from "react";
import Slideshow from "react-native-image-slider-show";
import AppIcon from "../components/AppIcon";
import { catagories } from "../config/constant";
import { useIsFocused } from '@react-navigation/native';
import ListItemMenu from "../components/ListItemMenu";
import { userAds as apiUserAds, apiActiveAction, apiDeleteAds } from "../network/userApi";

const dataSource = [
  {
    url: "https://i2-prod.hulldailymail.co.uk/incoming/article3566355.ece/ALTERNATES/s615/0_IMG_1363.jpg",
  },
  {
    url: "https://static.theprint.in/wp-content/uploads/2019/08/Office-India-stress.jpg",
  },
  {
    url: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/01/07/948308-marriage.jpg",
  },
  {
    url:"http://avrindia.in/wp-content/uploads/2021/01/event.jpg"
  }
];



export default function HomeScreen({ navigation}) {

  const navToCatagory = (catagory) => {
    navigation.navigate("CatagoryList", { catagory })
  }
/// slider
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 2000);

    return () => clearInterval(toggle);
  });
// flat list
  const isFocused = useIsFocused()
  const [userAds, setUserAds] = useState([]);
  const navToAdsDetails = (adsBasic) => {
    props.navigation.navigate("AdsDetails", { adsBasic })
  }
  const getUserAds = () => {
    apiUserAds()
      .then(res => {
        setUserAds(res.data);
        console.log(res)
      })
  }

  useEffect(() => {
    getUserAds();
  }, [isFocused])



  return (<>
 
      <ScrollView>
       <Slideshow position={position} dataSource={dataSource} />
    <View style={styles.container}>
    
       <View style={styles.catogry}>

        <View style={styles.catogr}>
          <View style={styles.iconcontainer}>
            <AppIcon name="tag" backgroundColor="#fed000" onPress={() => navToCatagory(catagories.FOR_SALE)} />
            <Text style={styles.font}>For Sale</Text>
          </View>
          <View style={styles.iconcontainer}>
            <AppIcon name="calendar-month" backgroundColor="hotpink" onPress={() => navToCatagory(catagories.EVENTS)} />
            <Text style={styles.font}>Event</Text>
          </View>
        </View>

        <View style={styles.catogr}>
          <View style={styles.iconcontainer}>
            <AppIcon name="briefcase" backgroundColor="#0055b3" onPress={() => navToCatagory(catagories.JOBS)} />
            <Text style={styles.font}>Jobs</Text>
          </View>
          <View style={styles.iconcontainer}>
            <AppIcon name="heart" backgroundColor="red" onPress={() => navToCatagory(catagories.PERSONALS)} />
            <Text style={styles.font}>Personals</Text>
          </View>
        </View>
      </View>

    </View>
    
    <View>
     
      <FlatList data={userAds}
        keyExtractor={list => list._id.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navToAdsDetails(item)}>
            <ListItemMenu
              row={item}
              
            />
          </TouchableOpacity>
        }>
      </FlatList>
    </View>


      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  catogry: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 400,
    backgroundColor: "white",
    justifyContent: "center",

  },
  iconcontainer: {
    alignItems: "center",
    flex: 1
  },
  catogr: {
    flexDirection: "row",
    width: 400,
    backgroundColor: "white",
  },
  font: {
    fontSize: 15,
    marginBottom: 50,
    textAlign: "center"
  }
});
