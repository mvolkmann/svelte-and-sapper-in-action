import {action} from '@storybook/addon-actions';
import Item from '../src/Item.svelte';
import '../public/global.css';

export default {title: 'Item'};

export const basic = () => ({
  Component: Item,
  props: {
    categoryId: 1,
    dnd: {},
    item: {id: 2, name: 'socks', packed: false}
  },
  on: {delete: action('trashcan clicked')}
});
