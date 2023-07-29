import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { IntensityPage, FeelingPage, AffectPage, TypePage } from './PainScale';
import { setLastSelectedCategoryId, getLastSelectedCategoryId } from '../services/selectedPainCategory';


const IntensityRoute = () => <IntensityPage />;
const FeelingRoute = () => <FeelingPage />;
const AffectRoute = () => <AffectPage />;
const TypeRoute = () => <TypePage />;

const renderScene = SceneMap({
  intensity: IntensityRoute, 
  feeling: FeelingRoute,
  affect: AffectRoute,
  type: TypeRoute
});

export default function Home() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'intensity', title: 'Intensity', },
    { key: 'feeling', title: 'Feeling' },
    { key: 'affect', title: 'Affect' },
    { key: 'type', title: 'Type' }
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
      indicatorStyle={{ backgroundColor: 'white' }} // active tab underline color
      style={{ backgroundColor: 'red' }} // TabBar background
      indicatorContainerStyle={{backgroundColor: "red"}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? 'red' : 'white', backgroundColor: focused ? "white" : "red", paddingLeft: 12, 
                        paddingRight: 12, paddingTop: 5, paddingBottom: 5, borderRadius: 15, overflow: 'hidden', }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      animationEnabled={false}
    />
  );
}