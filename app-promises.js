const users = [
  {
    id: 1,
    name: 'Andrew',
    schoolId: 101
  },
  {
    id: 2,
    name: 'Jessica',
    schoolId: 999
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => {
      return user.id === id;
    });
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise(function(resolve, reject) {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

//Andrew has an 83% in the class
const getStatus = userId => {
  let user;
  return getUser(userId)
    .then(tempUser => {
      user = tempUser;
      return getGrades(user.schoolId);
    })
    .then(grades => {
      let average = 0;
      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;
      }
      return `${user.name} has a ${average}% in the class.`;
    });
};

//You have to use await inside an async function

const getStatusAlt = async userId => {
  //add the async will always return promises
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} has a ${average}% in the class.`;
};
// const getStatusAlt = async userId => {
//   //add the async will always return promises
//   return 'mike';
// };
// //above isidentical to thisbelow:
// () => {
//   return new Promise(function(resolve, reject) {
//     resolve('mike');
//   });
// };

// const getStatusAlt = async userId => {
//   //add the async will always return promises
//   throw new Error('This is an wrrer');
// };
// // () => {
// //   return new Promise(function(resolve, reject) {
// //     rejeect('Thisis an error');
// //   });
// // };

getStatusAlt(2)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e);
  });

// getStatus(1)
//   .then(status => {
//     console.log(status);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// getGrades(101)
//   .then(grades => {
//     console.log(grades);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// getUser(2)
//   .then(user => {
//     console.log(user);
//   })
//   .catch(e => {
//     console.log(e);
//   });
