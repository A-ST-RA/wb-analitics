import { factories } from '@strapi/strapi'
import { errors } from '@strapi/utils';
import axios from 'axios';
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
  
  async wbApiRequest(ctx) {
    const { wbApiUrl, llkApiKey, data, method } = ctx.request.body;
    console.log(wbApiUrl);

    try {
      if (!['get', 'post', 'delete', 'patch', 'put'].includes(method)) {
        throw new errors.ValidationError("method must be 'get', 'post', 'delete', 'patch', 'put'");
      }

      const requestData = await strapi.db.query(API_CLIENT_ID).findOne({
        select: ['wbApiKey'],
        where: { phoneNumber: llkApiKey },
      });
      
      if (!requestData?.wbApiKey) {
        throw new errors.NotFoundError(`User with llkApiKey: ${llkApiKey} not found`);
      }

      const result = await axios({
        method,
        baseURL: wbApiUrl,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${requestData?.wbApiKey}`
        }
      });

      return result.data;
    } catch (err) {
      ctx.throw(err);
    }
  },
}));
