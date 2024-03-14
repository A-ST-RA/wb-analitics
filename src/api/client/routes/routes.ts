export default {
  routes: [
    {
      path: '/clients/create-registration-request',
      method: 'POST',
      handler: 'client.createRegistrationRequest',
    },
    {
      path: '/clients/wb-api-request',
      method: 'POST',
      handler: 'client.findOne',
    },
  ],
};
