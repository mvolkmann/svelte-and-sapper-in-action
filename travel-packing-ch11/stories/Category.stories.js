import {action} from '@storybook/addon-actions';
import Category from '../src/Category.svelte';
import '../public/global.css';

export default {title: 'Category'};

const category = {id: 1, name: 'Clothes', items: {}};

export const basic = () => ({
  Component: Category,
  props: {
    category,
    categories: [category],
    dnd: {},
    show: 'all'
  },
  on: {delete: action('category deleted')}
});
