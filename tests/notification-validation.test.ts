import { describe, expect, it } from "vitest";

import { validateNotificationContent } from "../lib/notification-validation";

describe("validateNotificationContent", () => {
  it("normaliza espaços e aceita uma composição válida", () => {
    expect(validateNotificationContent("  Minha equipe  ", "  Assunto da mensagem  ")).toEqual({
      valid: true,
      senderName: "Minha equipe",
      subject: "Assunto da mensagem",
    });
  });

  it("recusa nome exibido vazio", () => {
    expect(validateNotificationContent("   ", "Assunto")).toEqual({
      valid: false,
      message: "Preencha o nome exibido na notificação.",
    });
  });

  it("recusa assunto vazio", () => {
    expect(validateNotificationContent("Minha equipe", "")).toEqual({
      valid: false,
      message: "Preencha o assunto da notificação.",
    });
  });

  it("recusa textos acima dos limites do formulário", () => {
    expect(validateNotificationContent("a".repeat(41), "Assunto")).toEqual({
      valid: false,
      message: "O nome exibido ultrapassou o limite permitido.",
    });
    expect(validateNotificationContent("Minha equipe", "a".repeat(141))).toEqual({
      valid: false,
      message: "O assunto ultrapassou o limite permitido.",
    });
  });
});
