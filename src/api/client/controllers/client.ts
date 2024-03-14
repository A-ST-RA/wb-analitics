import { factories } from '@strapi/strapi'
import { API_CLIENT_ID } from '../constants';

export default factories.createCoreController(API_CLIENT_ID, ({ strapi }) => ({
  async createRegistrationRequest(ctx) {
    const data = ctx.request.body;
    
    try {
      data.status = false;
      const result = await strapi.services[API_CLIENT_ID].create({ data });

      return result;
    } catch (err) {
      ctx.throw(err);
    }
  },
}));
