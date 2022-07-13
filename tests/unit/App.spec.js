import App from "@/App.vue";
import {mount} from "@vue/test-utils";

describe('Counter', ()=>{

let wrapper;
afterEach(()=>{
  wrapper.destroy();
});

const createComponent = () =>{
  wrapper = mount(App);
}

  it('shows 0 when initialized',()=>{
//Arrange
createComponent();
//Act

//Assert
//expect(wrapper.find("#app")text()).toContain('0') - такая запись не приемлемая так как нас
//не интересует в данном тесте гда находится элемент, а интересует только его инициализирование
expect(wrapper.text()).toContain('0')
  })
})
