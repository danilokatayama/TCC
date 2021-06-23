// interface Response {
//   token: string;
//   user: {
//     name: string;
//     email: string;
//   }
// }

// export function signIn(): Promise<Response> {
//   // similar ao axios.get
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAzMjMxMzgxLCJleHAiOjE2MDMzMTc3ODF9.OA65FS3yqXnXaEWm6jXuQccGkjtOtONGokAi86d8V3E',
//         user: {
//           name: 'Danilo',
//           email: 'danilokatayama@gmail.com',
//         },
//       });
//     }, 2000);
//   });
// }