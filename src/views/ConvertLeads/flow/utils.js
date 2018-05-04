// Find in objectList reducer
// Client details may have the info as well, but it costs too much, skip for now
export const findLead = (id, store) => store.objectList.data.find(record => record.id == id);

export const formatPayload = ({
  email,
  portalPassword,
  type,
  password,
}) => {
  const a = {
    cloudhub: {
      email,
      password: portalPassword,
    },
    opportunity: {
      c__salesforce_id: type,
      c__a1: password,
    },
  };
  console.dir(a);
  return a;
};


// export const formatPayload = ({
//   email,
//   portalPassword,
//   type,
//   password,
// }) => ({
//   cloudhub: {
//     email,
//     password: portalPassword,
//   },
//   opportunity: {
//     type,
//     password,
//   },
// });