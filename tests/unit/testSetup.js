import {enableAutoDestroy } from "@vue/test-utils";

//автоматически все врапперы между тестами будут уничтожатся
//enableAutoDestroy will destroy all created Wrapper
enableAutoDestroy(afterEach);