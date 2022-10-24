export default function(){
  return 'Nycp inputs'
}

export var nycpText = Vue.component('nycp_text', {
  props: ['label', 'value'],
  methods: {
    change_value(_event) {
      console.log('Checking text');
      this.class_obj.changed = true;
      this.data_value = _event.target.value;
    },
    on_error() {
      this.class_obj.is_error = true;
    },
  },
  data() {
    return {
      class_obj: {
        error: false,
        changed: false,
      },
      data_value: '',
    }
  },
  mounted(){
    this.data_value = this.value;
  },
  template: `
    <tr class='nycp-input'>
      <td><label @click='on_error'>{{ label }}: </label></td>
      <td><input
            type='text'
            :class="class_obj"
            @change="event => change_value(event)"
            :value=data_value></td>
          <span>Prop: {{ value }}</span>&nbsp;/&nbsp;
          <span>Data: {{ this.data_value }}</span>
    </tr>
  `,
})

export var nycpInt = Vue.component('nycp_int', {
  props: ['label', 'value'],
  template: `
    <tr class='nycp-input'>
      <td><label>{{ label }}: </label></td>
      <td><input type='text' :value=value></td>
    </tr>
  `
})