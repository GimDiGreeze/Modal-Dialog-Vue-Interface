import {
  nycpText,
  nycpInt,
} from '/js/nycp_inputs.js'

var list1 = [
  {name: 'Adam', nick: 'Sandler', age: '20'},
  {name: 'Isaak', nick: 'Newton', age: '3'},
]
var list2 = [
  {name: 'Eva', nick: 'Palmer', age:'19'},
  {name: 'Kleo', nick: 'Egypt', age: '99'},
]
export var males = {
  type: 'males',
  content: list1
}
export var females = {
  type: 'females',
  content: list2
}

export default function total_list(){
  return {males: males, females: females};
}

export var items = Vue.component('items', {
  props: ['data'],
  template: `
    <ul>
      <li v-for="item in data.content">
        {{ item.name }} -- {{ item.nick }} -- {{ item.age }}
        <span @click='toggle_dialog(item)'>Show dialog</span>
      </li>
    </ul>
  `,
  methods: {
    toggle_dialog(_item){
      this.$parent.nycp_dialog_data = _item;
      this.$parent.nycp_dialog_style.display =
        this.$parent.nycp_dialog_style.display=='none'?'block':'none';
    },
  },
})

export var nycpDialog = Vue.component('nycp-dialog', {
  props: ['data'],
  methods: {
    hide_dialog(){
      this._data = this.data;
      this.$parent.nycp_dialog_style.display = 'none';
    },
    submit_data(){
      // At the ending
      console.log(this.data);
      this.hide_dialog();
    },
    update_name(_event){
      //this.data.name = _event.target.value;
    },
    count_inputs(){
      console.log(
          this.$el.querySelectorAll('#nycp-form input.changed').length
        );
      console.log(
        this.$el.querySelectorAll('#nycp-form input')[0].value
      );
    }
  },
  data(){
    return {
      _data: {},
    }
  },
  mounted(){
    this._data = this.data;
  },
  template: `
    <div>
      <div @click='hide_dialog' class="shadow"></div>
      <div class='dialog-body'>
        <h4>I am a nycp dialog. For {{ _data.name }} age of {{ _data.age }}</h4>
        <form id="nycp-form" @submit.prevent="submit_data">
          <table>
            <nycp-text label='Имя'
              :value=data.name
              @change="event => update_name(event)"
              :key=data.name>
            </nycp-text>
            <nycp-text label='Ник'
              :value=data.nick
              @change="event => update_name(event)"
              :key=data.nick>
            </nycp-text>
            <nycp-int label='Возраст' :value=data.age></nycp-int>
            <tr>
              <td><button @click='hide_dialog'>Cancel</button></td>
              <td><button type='submit'>OK</button></td>
            </tr>
          </table>
        </form>
          <button @click='count_inputs'>Count inputs in dialog</button>
      </div>
    </div>
  `,
  components: {
    'nycp-text': nycpText,
    'nycp-int': nycpInt,
  }
})

export var single_component = Vue.component('single-component',{
  components: {
    //'items': items,
    'nycp-dialog': nycpDialog,
  },
  data() {
    return {
      visible_default: 'Visible default value',
      visible_dialog_default: 'Visible_dialog value',
      nycp_dialog_data: {
                          name: 'def_name',
                          nick: 'def_nick',
                          age: 'def_age'
                        },
      nycp_dialog_style: {
        display: 'none',
      },
    }
  },
  template: `
<div>
  <h2>I am a total component</h2>
  <items :data=this.$root.males></items>
  <items :data=this.$root.females></items>
  <nycp-dialog
    :style= nycp_dialog_style
    :data=nycp_dialog_data>
  </nycp-dialog>
</div>
  `,
})
