import Checklist from '../src/Checklist.svelte';
import '../public/global.css';

export default {title: 'Checklist'};

//TODO: How can you change the background-color for this story?
//TODO: Do you have to wrap this in a new component that does it?
export const basic = () => ({Component: Checklist});
