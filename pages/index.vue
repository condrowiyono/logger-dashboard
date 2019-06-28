<template>
  <div>
    <page-header :title="'Dashboard'" />
      <v-container fluid>
        <v-layout>
          <v-btn
            fab
            small
            color="primary"
            @click="$refs.calendar.prev()"
          >
            <v-icon dark>
              keyboard_arrow_left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            small
            color="primary"
            @click="$refs.calendar.next()"
          >
          <v-icon dark>
              keyboard_arrow_right
            </v-icon>
          </v-btn>
          <v-spacer/>
          <h1>{{$moment(today).format('MMMM YYYY')}}</h1>
        </v-layout>
        <v-layout>
        <v-flex>
          <v-sheet height="500">
            <v-calendar
              ref="calendar"
              v-model="today"
              :now="today"
              :value="today"
              color="primary"
            >
              <template v-slot:day="{ date }">
                  <v-flex style="display:-webkit-box">
                    <div v-for="event in eventsMap[date]" :key="event.title"
                      :title="event.time"
                      v-ripple
                      @click="eventClick(event.date)"
                      style="margin:1px;width:10px;height:10px;background-color:#0D47A1; border-radius:50%">
                  </div>
                  </v-flex>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      events: []
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    created() {
      this.loadMonthly();
    },
    methods: {
      loadMonthly() {
        this.$axios.get('/logs/monthly', {params: {month:this.$moment(this.today).format('MM'), year: this.$moment(this.today).format('YYYY')}}).then((res) => {
          let data = res.data.data;
          this.events = data.map(e => {return {date: e.date, time:e.time}} )
        });
      },
      eventClick(date) {
        this.$router.push({path: '/logs', query: {date_from:date, date_to:date}});
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>