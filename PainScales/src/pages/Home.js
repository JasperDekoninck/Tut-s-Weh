import * as React from 'react';
import { useEffect } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IntensityPage, FeelingPage, AffectPage, TypePage } from './PainScale';
import { setLastSelectedCategoryId, getLastSelectedCategoryId } from '../services/selectedPainCategory';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';
import FlashMessage from 'react-native-flash-message';

const IntensityRoute = () => <IntensityPage />;
const FeelingRoute = () => <FeelingPage />;
const AffectRoute = () => <AffectPage />;
const TypeRoute = () => <TypePage />;

const renderScene = SceneMap({
  intensity: IntensityRoute, 
  feeling: FeelingRoute,
  affect: AffectRoute,
  type: TypeRoute,
});

export default function Home() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'intensity', title: 'Intensität', },
    { key: 'feeling', title: 'Gefühle' },
    { key: 'type', title: 'Art' },
    { key: 'affect', title: 'Einfluss' },
    
  ]);

  const fetchLastCategory = async () => {
    const lastCategory = await getLastSelectedCategoryId();
    if(lastCategory != null)
    {   
        let new_index = parseInt(lastCategory);
        setIndex(new_index);
    }
    else
    {
        setIndex(0);
    }
    
    } 

  React.useEffect(() => {
        fetchLastCategory();               
    }, []); 

  const handleIndexChange = (index) => {
    setIndex(index);
    setLastSelectedCategoryId(index.toString());
    }

  const renderTabBar = props => (
    <TabBar
      {...props}
      
      indicatorStyle={{ backgroundColor: SecondaryColor, height: 3 }} // active tab underline color
      style={{ backgroundColor: PrimaryColor, height: 50 }} // TabBar background
      indicatorContainerStyle={{backgroundColor: PrimaryColor}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? 'white' : SecondaryColor, backgroundColor: focused ? SecondaryColor : PrimaryColor, paddingLeft: 9, 
                        paddingRight: 9, paddingTop: 5, paddingBottom: 5, borderRadius: 15, overflow: 'hidden', marginLeft: -5, marginRight:-5, fontWeight: 500}}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        animationEnabled={true}
      />
      <FlashMessage position="top" style={{marginTop: 50}}/>
    </>
  );
}