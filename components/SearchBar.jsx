import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import COLORS from '../constants/colors';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery}
    style={{marginVertical:22,backgroundColor: COLORS.gray,alignItems: "center",
    justifyContent: "center", color: COLORS.terceary}}
    />
  );r
};

export default SearchBar;