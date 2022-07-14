import App from "@/App.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from 'vue';

describe("Counter", () => {
  //создаем переменную враппер
  let wrapper;

  //функция принимающая текст и возвращающая враппер с элементом содержащим текст который мы указываем
  const findButtonByText = (text) =>
    wrapper.findAll("button").wrappers.find((w) => w.text() === text);

  //единственная фабрика создания компонента(враппер присваивает компонент)
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
  //https://jestjs.io/docs/api#testeachtablename-fn-timeout
  it.each`
    buttonText | change                 | expectedResult
    ${"+"}     | ${"increments by one"} | ${"1"}
    ${"-"}     | ${"decrements by one"} | ${"-1"}
  `(
    "$change when $buttonText button clicked",
    async ({ buttonText, expectedResult }) => {
      createComponent();
      //В trigger также можно передать опциональный объект options
      //примеры:  await wrapper.trigger('click') либо  await wrapper.trigger('click', {  button: 0  })
      await findButtonByText(buttonText).trigger("click");
      //await nextTick() - подождать пока произойдет следующий тик
      //nextTick - это Утилита для ожидания следующего сброса обновления DOM.
      // await nextTick();
      expect(wrapper.text()).toContain(expectedResult);
    }
  );
  // создаем переменную кнопка что бы в случае если название кнопки будет изменено
  //было удобно в одном месте изменять данные а не во всем коде
  const RESET_BUTTON = "Reset";
  it("shows reset button when counter is below zero", async () => {
    createComponent();
    await findButtonByText("-").trigger("click");
    expect(wrapper.text()).toContain("-1");

    expect(findButtonByText(RESET_BUTTON).exists()).toBe(true);
  });

  it("does not shows reset button when counter is not below zero", async () => {
    createComponent();

    //неготивная проверка и это неправильно
    expect(findButtonByText(RESET_BUTTON)).toBe(undefined);
  });
  it("increases by one when plus key is pressed", async () => {
    createComponent();
    const event = new KeyboardEvent("keyup", {
      key: "+",
    });
    document.dispatchEvent(event);
    await nextTick();
    expect(wrapper.text()).toContain("+");
  });
});
