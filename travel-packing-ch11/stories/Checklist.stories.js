import Checklist from '../src/Checklist.svelte';
import StyleWrapper from './StyleWrapper.svelte';
import '../public/global.css';

export default {title: 'Checklist'};

export const basic = () => ({
  Component: StyleWrapper,
  props: {
    component: Checklist,
    style: `
      background-color: cornflowerblue;
      height: 100vh;
      padding: 1rem
    `
  }
});
