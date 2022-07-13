import App from "@/App.vue";
import { mount } from "@vue/test-utils";

describe("Counter", () => {
  let wrapper;
  const findButtonByText = (text) =>
    wrapper.findAll("button").wrappers.find((w) => w.text() === text);

  const createComponent = () => {
    wrapper = mount(App);
  };
  afterEach(() => {
    wrapper.destroy();
  });
  it("shows 0 when initialized", () => {
    //Arrange
    createComponent();
    //Act

    //Assert
    //expect(wrapper.find("#app")text()).toContain('0') - такая запись не приемлемая так как нас
    //не интересует в данном тесте гда находится элемент, а интересует только его инициализирование
    expect(wrapper.text()).toContain("0");
  });
  //https://jestjs.io/docs/api#testeachtablename-fn-timeout
  it.each`
    buttonText | change                 | expectedResult
    ${"+"}     | ${"increments by one"} | ${"1"}
    ${"-"}     | ${"decrements by one"} | ${"-1"}
  `(
    "$change when $buttonText button clicked",
    async ({ buttonText, expectedResult }) => {
      createComponent();

      await findButtonByText(buttonText).trigger("click");
      //await nextTick() - подождать пока произойдет следующий тик
      //nextTick - это Утилита для ожидания следующего сброса обновления DOM.
      // await nextTick();
      expect(wrapper.text()).toContain(expectedResult);
    }
  );
  it("shows reset button when counter is below zero", async () => {
    createComponent();
    wrapper.vm.counter = -1;
    await wrapper.vm.$nextTick();
    expect(wrapper.find({ ref: "reset" }).exists()).toBe(true);
  });
});
