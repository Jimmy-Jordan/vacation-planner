import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import DefaultNavBar from './DefaultNavBar.vue';
import FlightCollection from './FlightCollection.vue';
import FlightSummary from './FlightSummary.vue';
import CreateFlightSearch from './CreateFlightSearch.vue';

Vue.component(DefaultNavBar.name, DefaultNavBar);
Vue.component(FlightCollection.name, FlightCollection);
Vue.component(FlightSummary.name, FlightSummary);
Vue.component(CreateFlightSearch.name, CreateFlightSearch);

