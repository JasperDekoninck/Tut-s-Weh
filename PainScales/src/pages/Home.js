import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { IntensityPage, FeelingPage, AffectPage, TypePage } from './PainScale';
import { setLastSelectedCategoryId, getLastSelectedCategoryId } from '../services/selectedPainCategory';
import FlashMessage from 'react-native-flash-message';
import styles from './Home.styles';
import CustomTabBar from '../components/CustomTabBar';

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
    { key: 'intensity', title: 'Stärke', },
    { key: 'type', title: 'Art' },
    { key: 'feeling', title: 'Gefühle' },
    { key: 'affect', title: 'Einfluss' },
    
  ]);

  /**
   * Fetches the last selected category and updates the index accordingly.
   * @returns {Promise<void>} A promise that resolves when the index is updated.
   */
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

  /**
   * Handles the change of index.
   * @param {number} index - The new index value.
   */
  const handleIndexChange = (index) => {
    setIndex(index);
    setLastSelectedCategoryId(index.toString());
    }

  /**
   * Renders the custom TabBar component.
   * 
   * @param {object} props - The props passed to the TabBar component.
   * @returns {JSX.Element} The rendered TabBar component.
   */
  const renderTabBar = props => (
    <CustomTabBar
      {...props}
      renderStyle={styles.tabBarRenderStyle}
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
      <FlashMessage position="top" style={styles.FlashMessageStyle} titleStyle={styles.title}/>
    </>
  );
}