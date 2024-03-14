import { API_CLIENT_ID } from "./api/client/constants";
import { PLUGIN_TELEGRAM_BOT_ID } from "./constants";

export default {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: [API_CLIENT_ID],
      async afterCreate(event) {
        await strapi
          .plugin(PLUGIN_TELEGRAM_BOT_ID)
          .telegramBot.sendMessageToAdmins(
            `Получена новая заявка ID: ${event.result.id}\n\n` +
            `Номер клиента: ${event.result.phoneNumber}\n` + 
            `Имя: ${event.result.name}\n` +
            `Описание: ${event.result.description}`
          );
      },
      async afterUpdate(event) {
        await strapi
          .plugin(PLUGIN_TELEGRAM_BOT_ID)
          .telegramBot.sendMessageToAdmins(
            `Результат заявки ID: ${event.result.id}\n\n` +
            `Был изменен пользователем: ${event.result.updatedBy.firstname} ${event.result.updatedBy.lastname}`
          );
      },
    });
  },
};
