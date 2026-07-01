import { appendNewById } from "./pagination";

describe("appendNewById", () => {
  it("concatena itens quando não há sobreposição", () => {
    const current = [{ id: 1, name: "a" }];
    const incoming = [{ id: 2, name: "b" }];

    expect(appendNewById(current, incoming)).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });

  it("não duplica itens quando todos já existem", () => {
    const current = [{ id: 1, name: "a" }];
    const incoming = [{ id: 1, name: "a" }];

    expect(appendNewById(current, incoming)).toEqual([{ id: 1, name: "a" }]);
  });

  it("adiciona apenas itens novos em lista mista", () => {
    const current = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ];
    const incoming = [
      { id: 2, name: "b" },
      { id: 3, name: "c" },
    ];

    expect(appendNewById(current, incoming)).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
    ]);
  });
});
