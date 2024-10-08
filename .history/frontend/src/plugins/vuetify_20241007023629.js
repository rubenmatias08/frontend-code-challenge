import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        error: '#B00020',
      },
    },
  },
});
