import App from "@/App.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("Counter", () => {
  let wrapper;
  const findPlusButton = () =>
    wrapper.findAll("button").wrappers.find((w) => w.text() === "+");

    afterEach(() => {
    wrapper.destroy();
  });

  const createComponent = () => {
    wrapper = mount(App);
  };

  it("shows 0 when initialized", () => {
    //Arrange
    createComponent();
    //Act

    //Assert
    //expect(wrapper.find("#app")text()).toContain('0') - такая запись не приемлемая так как нас
    //не интересует в данном тесте гда находится элемент, а интересует только его инициализирование
    expect(wrapper.text()).toContain("0");
  });

  it("increments by one when + button clicked", async ()=>{
    createComponent();
    await findPlusButton().trigger('click');
    //await nextTick() - подождать пока произойдет следующий тик
    //nextTick - это Утилита для ожидания следующего сброса обновления DOM.
    // await nextTick();
    expect(wrapper.text()).toContain('1');
  });
});
