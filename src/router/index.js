import Music from '../components/Music';
import Rank from '../components/Rank';
import Station from '../components/Station';
import Index from '../components/Index';

export default [
  {
    path: '/',
    component: Index
  }, {
    path: '/music',
    component: Music
  }, {
    path: '/station',
    component: Station
  }, {
    path: '/rank',
    component: Rank
  }
];

