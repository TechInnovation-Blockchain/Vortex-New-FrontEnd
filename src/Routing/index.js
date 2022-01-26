import Deposit from '../Pages/Deposit'
import StakePage from '../Pages/Stake'
/*

const routes = [
  { path: '/1', component: Deposit },
  { path: '/2', component: Stake },
  { path: '/3', component: Stake },
  { path: '/4', component: Deposit },
  { path: '/5', component: Portal },
  { path: '/6', component: Stake },
  { path: '/8', component: Disclaimer },
  { path: '/9', component: Deposit },
  { path: '/10', component: StakePending },
  { path: '/11', component: StakeComplete },
  { path: '/12', component: Deposit },
  { path: '/13', component: PortalCreate },
  { path: '/14', component: PortalCreated },
  { path: '/themeModal', component: ThemeModal },
  { path: '', component: Stake }
];
*/

const routes = [
  { path: '/app', component: StakePage },
  { path: '/create', component: Deposit },
  { path: '', redirectTo: '/app' },
]

export default routes
