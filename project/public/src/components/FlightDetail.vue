<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<div v-bind:key="event.id">
				<p>Title: {{event.title}}</p> 
				<p>Description: {{event.description}}</p>
				<p>Location: {{event.location}}</p>
			</div>
			
			<edit-event 
				v-if="mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
				v-on:editSubmitted="mode.edit = false"
			>
			</edit-event>
		</transition-group>
		
		
			
		<btn 
			type="danger"
			size="xs" 
			v-bind:key="event.id"
			v-on:click="deleteEvent"
		>
			Delete
		</btn>
		

		<transition-group name="component-fade" mode="in-out">
			<create-attendee 
				v-if="mode.detail"
				v-bind:event="event"
				v-bind:key="event.id"
			>
			</create-attendee>

			<ul 
				v-bind:event="event"
				v-bind:key="event.id"
			>
				<li 
					is="attendee-detail"
					v-for="attendee in event.attendees"
					v-bind:attendee="attendee"
					v-bind:key="attendee.id"
				></li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>

<script>
export default {
	name: 'event-detail',
	props:{
		event: Object
	},
	data: function(){
		return {
			mode: {
				edit: false,
				attendees: false,
			}
		}
	},
	methods: {
		deleteEvent: function(event){
			this.$store.dispatch("deleteEvent", {
				event: this.event
			});
		}
	},	
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"Edit";
		}
	}	
};
</script>