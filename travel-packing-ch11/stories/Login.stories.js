import {action} from '@storybook/addon-actions';
import StyleWrapper from './StyleWrapper.svelte';
import Login from '../src/Login.svelte';
import '../public/global.css';

export default {title: 'Login'};

export const basic = () => ({
  Component: StyleWrapper,
  props: {
    component: Login,
    props: {
      'on:login': null
    },
    style: `
      background-color: cornflowerblue;
      height: 100vh;
      padding: 1rem
    `
  },
  on: {login: action('login dispatched')}
});
