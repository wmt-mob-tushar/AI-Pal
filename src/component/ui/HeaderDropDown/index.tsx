import {Color} from 'src/utils';
import {Text, View} from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';
import styles from './style';

export type Props = {
  title: string;
  items: Array<{
    key: string;
    title: string;
    icon: string;
  }>;
  selected?: string;
  onSelect: (key: string) => void;
};

const HeaderDropDown = ({title, selected, items, onSelect}: Props) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={styles.container}>
          <Text style={styles.headerText}>{title}</Text>
          {selected && (
            <Text style={styles.selectedVer}>
              {selected.slice(0, 15) + (selected.length > 15 ? '...' : '')} &gt;
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map(item => (
          <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: item.icon,
                pointSize: 18,
              }}
            />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
export default HeaderDropDown;
