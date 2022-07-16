import CounterInput from "@/components/CounterInput.vue";
import { shallowMount } from "@vue/test-utils";

describe("Counter Input component", () => {
  it("emits input event when input value changes", () => {
    const wrapper = shallowMount(CounterInput);
    const NEW_VALUE = "34";
    wrapper.find("input").setValue(NEW_VALUE);
    //wrapper.emitted() - содержит список всех событий которые генерировал ваш компонент
    //под .input содержится массив событий инпут которые были сгенерированы в порядке их генерации
    //никогда ни смотрите на эмитед ничего другого кроме самого враппера
    //expect(wrapper.findComponent(SomeComponent)emitted())... ЭТО ОШИБКА
    //ваш компонент не может проверять что создовали другие компоненты, это вне зоны его ответственности
    //он обязан проверять как он отреагировал на это, а что компонент создал это зона ответственности самого компонента
    expect(
      wrapper.emitted()[CounterInput.model?.event ?? "input"]
    ).toStrictEqual([[NEW_VALUE]]);
  });
});
