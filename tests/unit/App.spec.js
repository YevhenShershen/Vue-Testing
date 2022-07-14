import App from "@/App.vue";
import CounterInput from "@/components/CounterInput.vue";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("Counter", () => {
  //создаем переменную враппер
  let wrapper;

  //функция принимающая текст и возвращающая враппер с элементом содержащим текст который мы указываем
  const findButtonByText = (text) =>
    wrapper.findAll("button").wrappers.find((w) => w.text() === text);

  //единственная фабрика создания компонента(враппер присваивает компонент)
  const createComponent = (props) => {
    wrapper = shallowMount(App, {
      propsData: props,
    });
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
    //KeyboardEvent objects describe a user interaction with the keyboard; each event describes a single interaction between the user and a key (or combination of a key with modifier keys) on the keyboard.
    //The event type (keydown, keypress, or keyup)
    const event = new KeyboardEvent("keyup", {
      key: "+",
    });
    document.dispatchEvent(event);
    await nextTick();
    expect(wrapper.text()).toContain("1");
  });

  it("removes attached event listener when detroyed", async () => {
    jest.spyOn(document, "addEventListener");
    jest.spyOn(document, "removeEventListener");
    createComponent();
    const [, keyUpListener] = document.addEventListener.mock.calls.find(
      ([key]) => key === "keyup"
    );
    expect(document.removeEventListener).not.toHaveBeenCalledWith(
      "keyup",
      keyUpListener
    );
    wrapper.destroy();
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "keyup",
      keyUpListener
    );
  });

  it("correctly resets both counters when initialValue is changed", async () => {
    const INITIAL_VALUE = 5;
    const NEW_INITIAL_VALUE = 10;
    createComponent({ initialValue: INITIAL_VALUE });
    await findButtonByText("-").trigger("click");
    await findButtonByText("minus").trigger("click");
    //при клике у двух кнопок (минус counter и минус counter2 получается у нас 4 / -1)
    //соответсвенно первая проверка 4/ -1
    expect(wrapper.text()).toContain(`${INITIAL_VALUE - 1} / -1`);
    //передаем пропс 10
    await wrapper.setProps({ initialValue: NEW_INITIAL_VALUE });
    //при изминении counter у нас counter2 обнуляется и вывод будет: 10 / 0
    expect(wrapper.text()).toContain(`${NEW_INITIAL_VALUE} / 0`);
  });

  it("update current value when CounterInput provides new one", async () => {
    const INITIAL_VALUE = 30;
    const NEW_INITIAL_VALUE = 40;
    createComponent({ initialValue: INITIAL_VALUE });
    //единственный сценарий когда используем .vm. когда эмитим
    wrapper.findComponent(CounterInput).vm.$emit("input", NEW_INITIAL_VALUE);
    await nextTick();

    expect(wrapper.text()).toContain(`${NEW_INITIAL_VALUE} / 0`);
  });
});
