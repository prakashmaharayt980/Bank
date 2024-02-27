// src/api.js



const user = {
  name: 'John Doe',
  accountNumber: '123456789',
  bankBranch: 'Main Branch',
  bankName: 'Acme Bank',
  banktype: 'Normal Saving',
  Irate: '3.85%',
  ActualAmount: 2580458,
  AccrudeAmount: 64,
  CurrentAmount: 2580100,
};

const getUser = () => {
  return new Promise((resolve) => {
    // setTimeout(() => {
    //   resolve(user);
    // }, 1000);
    resolve(user)
  });
};



export { getUser };