import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import DefaultNavBar from './DefaultNavBar.vue';
import OutboundFlightResults from './OutboundFlightResults.vue';
import OutboundFlightSummary from './OutboundFlightSummary.vue';
import FlightSearch from './FlightSearch.vue';
import TicketSummary from './TicketSummary.vue';
import ReturnFlightSummary from './ReturnFlightSummary.vue';
import ReturnFlightOptions from './ReturnFlightOptions.vue';
import UserProfile from './UserProfile.vue';
import SavedFlightRouteSummary from './SavedFlightRouteSummary.vue';

Vue.component(DefaultNavBar.name, DefaultNavBar);
Vue.component(OutboundFlightResults.name, OutboundFlightResults);
Vue.component(OutboundFlightSummary.name, OutboundFlightSummary);
Vue.component(FlightSearch.name, FlightSearch);
Vue.component(TicketSummary.name, TicketSummary);
Vue.component(ReturnFlightSummary.name, ReturnFlightSummary);
Vue.component(ReturnFlightOptions.name, ReturnFlightOptions);
Vue.component(UserProfile.name, UserProfile);
Vue.component(SavedFlightRouteSummary.name, SavedFlightRouteSummary);

